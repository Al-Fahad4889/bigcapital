
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import {
  IUserInvitedEventPayload,
  IUserInviteResendEventPayload,
  IUserInviteTenantSyncedEventPayload,
} from '../Users.types';
import { events } from '@/common/events/events';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';
import { TenantUser } from '@/modules/Tenancy/TenancyModels/models/TenantUser.model';
import { UserInvite } from '../models/InviteUser.model';
import { SystemUser } from '@/modules/System/models/SystemUser';
import { TenancyContext } from '@/modules/Tenancy/TenancyContext.service';

@Injectable()
export class SyncSystemSendInviteSubscriber {
  constructor(
    @Inject(TenantUser.name)
    private readonly tenantUserModel: TenantModelProxy<typeof TenantUser>,

    @Inject(SystemUser.name)
    private readonly systemUserModel: typeof SystemUser,

    @Inject(UserInvite.name)
    private readonly inviteModel: typeof UserInvite,
    private readonly eventEmitter: EventEmitter2,
    private readonly tenancyContext: TenancyContext
  ) {}

  @OnEvent(events.inviteUser.sendInvite)
  async syncSendInviteSystem({ inviteToken, user, invitingUser }: IUserInvitedEventPayload) {
    const authorizedUser = await this.tenancyContext.getSystemUser();
    const tenantId = authorizedUser.tenantId;

    const systemUser = await this.systemUserModel.query().insert({
      email: user.email,
      active: user.active,
      tenantId,
      verified: true,
    });

    const invite = await this.inviteModel.query().insert({
      email: user.email,
      tenantId,
      userId: systemUser.id,
      token: inviteToken,
    });

    await this.tenantUserModel().query().findById(user.id).patch({
      systemUserId: systemUser.id,
    });

    await this.eventEmitter.emitAsync(
      events.inviteUser.sendInviteTenantSynced,
      {
        invite,
        user,
        invitingUser,
      } as IUserInviteTenantSyncedEventPayload,
    );
  }

  @OnEvent(events.inviteUser.resendInvite)
  async syncResendInviteSystemUser({
    inviteToken,
    user,
    invitingUser,
  }: IUserInviteResendEventPayload) {
    const authorizedUser = await this.tenancyContext.getSystemUser();
    const tenantId = authorizedUser.tenantId;

    await this.clearInviteTokensByUserId(tenantId, user.systemUserId);

    const invite = await this.inviteModel.query().insert({
      email: user.email,
      tenantId,
      userId: user.systemUserId,
      token: inviteToken,
    });

    await this.eventEmitter.emitAsync(
      events.inviteUser.sendInviteTenantSynced,
      {
        invite,
        user,
        invitingUser,
      } as IUserInviteTenantSyncedEventPayload,
    );
  }

  private clearInviteTokensByUserId = async (tenantId: number, userId: number) => {
    await this.inviteModel
      .query()
      .where({
        userId,
        tenantId,
      })
      .delete();
  };
}

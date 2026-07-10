import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/Account.repository';

@Injectable()
export class ApplyPresetAccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  /**
   * Applies the travel-agency preset accounts.
   * Idempotent — safe to call multiple times.
   */
  async applyTravelAgencyPreset(): Promise<{ created: number }> {
    let created = 0;

    const findOrCreateMethods = [
      this.accountRepository.findOrCreateAirlineConsolidatorPayables.bind(this.accountRepository),
      this.accountRepository.findOrCreateCommissionIncome.bind(this.accountRepository),
      this.accountRepository.findOrCreateServiceFeeIncome.bind(this.accountRepository),
      this.accountRepository.findOrCreatePenaltyIncome.bind(this.accountRepository),
      this.accountRepository.findOrCreateClientAdvances.bind(this.accountRepository),
      this.accountRepository.findOrCreateVatPayable.bind(this.accountRepository),
    ];

    for (const method of findOrCreateMethods) {
      // Each repository method returns { account, created } — the `created`
      // boolean is set to true only when insertAndFetch actually ran.
      const { created: wasCreated } = await method();
      if (wasCreated) {
        created++;
      }
    }
    return { created };
  }
}
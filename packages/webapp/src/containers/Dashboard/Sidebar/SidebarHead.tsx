// @ts-nocheck
import { Button, Popover, Menu, Position } from '@blueprintjs/core';
import { useBranding } from '@/hooks/useBranding';
import { Icon } from '@/components';
import { x } from '@xstyled/emotion';

import { withCurrentOrganization } from '@/containers/Organization/withCurrentOrganization';
import { useAuthenticatedAccount } from '@/hooks/query';
import { compose, firstLettersArgs } from '@/utils';

// Popover modifiers.
const POPOVER_MODIFIERS = {
  offset: { offset: '28, 8' },
};

/**
 * Sideabr head.
 */
function SidebarHeadJSX({
  // #withCurrentOrganization
  organization,
}) {
  // Retrieve authenticated user information.
  const { data: user } = useAuthenticatedAccount();
  const { logoUri, name } = useBranding();
  return (
    <div className="sidebar__head">
      <div className="sidebar__head-organization">
        <Popover
          modifiers={POPOVER_MODIFIERS}
          boundary={'window'}
          content={
            <Menu className={'menu--dashboard-organization'}>
              <div class="org-item">
                <div class="org-item__logo">
                  {firstLettersArgs(...(organization.name || '').split(' '))}{' '}
                </div>
                <div class="org-item__name">{organization.name}</div>
              </div>
            </Menu>
          }
          position={Position.BOTTOM}
          minimal={true}
        >
          <Button
            className="title"
            rightIcon={<Icon icon={'caret-down-16'} size={16} />}
          >
            {organization.name}
          </Button>
        </Popover>
        <span class="subtitle">{user.full_name}</span>
      </div>

      <div className="sidebar__head-logo">
        {logoUri ? (
          <x.img
            src={logoUri}
            alt={name}
            width={28}
            height={28}
            objectFit="cover"
            borderRadius={6}
          />
        ) : (
          <x.div
            width={28}
            height={28}
            borderRadius={6}
            backgroundColor="#CB22E5"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize={11}
            fontWeight={600}
            color="#fff"
          >
            {firstLettersArgs(...(name || '').split(' '))}
          </x.div>
        )}
      </div>
    </div>
  );
}

export const SidebarHead = compose(
  withCurrentOrganization(({ organization }) => ({ organization })),
)(SidebarHeadJSX);

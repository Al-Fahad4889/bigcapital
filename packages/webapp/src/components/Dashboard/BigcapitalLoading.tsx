// @ts-nocheck
import classNames from 'classnames';
import React from 'react';
import { Icon } from '@/components';
import { Spinner } from '@blueprintjs/core';
import '@/style/components/BigcapitalLoading.scss';
import { useIsDarkMode } from '@/hooks/useDarkMode';

/**
 * Bigcapital logo loading.
 */
export default function BigcapitalLoading({ className }) {
  const isDarkmode = useIsDarkMode();

  return (
    <div className={classNames('bigcapital-loading', className)}>
      <div class="center">
        <Spinner size={40} />
      </div>
    </div>
  );
}

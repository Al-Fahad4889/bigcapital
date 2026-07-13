// @ts-nocheck
import React from 'react';
import classNames from 'classnames';
import { Spinner } from '@blueprintjs/core';
import { useIsDarkMode } from '@/hooks/useDarkMode';

/**
 * Bigcapital logo loading.
 */
export default function BigcapitalLoading({ className }) {
  const isDarkmode = useIsDarkMode();

  return (
    <div className={classNames('bigcapital-loading', className)}>
      <div className="center">
        {isDarkmode ? (
          <Spinner className="bp4-dark" size={37} />
        ) : (
          <Spinner size={37} />
        )}
      </div>
    </div>
  );
}

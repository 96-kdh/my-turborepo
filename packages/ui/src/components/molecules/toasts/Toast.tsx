'use client';

import React, { useState, useEffect, JSX } from 'react';

import DropDownBox from '@components/atoms/box/ToastBox';

export type ToastTypes = 'noti' | 'warning' | 'error' | 'success';

declare interface TOAST {
  toastType: ToastTypes;
  message: string;
}

/**
 * Toast Item Components
 * @description Toast Container Componenet의 toast 메서드를 통해 컨트롤 되는 Components
 */

function Toast({ toastType, message }: TOAST) {
  return (
    <DropDownBox $toastType={toastType}>
      <span className="center">{message}</span>
    </DropDownBox>
  );
}

/**
 * Toast Container Components
 * @description Toast Container Componenet의 toast 메서드를 통해 컨트롤 되는 Components
 */
const GlobalToast = () => {
  const [toasts, setToasts] = useState<{ [key in number]: JSX.Element }>({});

  /**
   * Toast 생성 & 표시 메서드
   */
  const toast = (toastType: ToastTypes, message: string) => {
    const uuid = +new Date();
    const instanceToast = <Toast key={uuid} toastType={toastType} message={message} />;

    const tempToasts = toasts;
    const keysToasts = Object.keys(toasts);
    if (keysToasts.length > 2) {
      // 표시된 Toast가 3개 이상일때
      delete tempToasts[keysToasts[keysToasts.length - 1]];
    }

    setToasts({
      [uuid]: instanceToast,
      ...tempToasts,
    });
  };

  useEffect(() => {
    window.toast = toast;
  }, []);

  return <div>{Object.values(toasts).map((item) => item)}</div>;
};

export default GlobalToast;

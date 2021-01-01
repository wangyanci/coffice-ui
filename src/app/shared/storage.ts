import { InjectionToken } from '@angular/core';

export const StorageToken = new InjectionToken<Storage>('Storage');
export function StorageProvider(window: Window) {
  try {
    return window.localStorage;
  } catch {
    // When cookies are disabled in the browser, even trying to access
    // `window.localStorage` throws an error. Use a no-op storage.
    return {
      length: 0,
      clear: () => undefined,
      getItem: () => null,
      key: () => null,
      removeItem: () => undefined,
      setItem: () => undefined
    };
  }
}

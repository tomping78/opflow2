import { useEffect } from 'react';

/**
 * 초기화 Hook
 *  - 컴포넌트 초기화할 때 사용할 수 있는 Hook
 * @param func Function
 */
export const useInitialize = (func: Function) => {
  useEffect(() => {
    try {
      if (!func) return;
      func();
    } catch (e) {
      console.error(e);
    }
  }, []);
};

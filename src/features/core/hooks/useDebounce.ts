import _ from 'lodash';
import { useCallback } from 'react';

export function useDebounce<T extends unknown[]>(
  fn: (...args: [...T]) => any,
  wait = 200,
  ...params: any[]
): (...args: [...T]) => void {
  return useCallback(_.debounce(fn, wait, { maxWait: 500 }), params);
}

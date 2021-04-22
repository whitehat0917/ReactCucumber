import { useWindowResize } from './useWindowResize';

export function useMediaQueries<T>(queries: { minWidth?: number; maxWidth?: number; value?: T }[], defaultVal?: T) {
  return useWindowResize((w, h) => {
    const foundQuery = queries?.find((q) => (!q.minWidth || w >= q.minWidth) && (!q.maxWidth || w <= q.maxWidth));
    return foundQuery?.value || defaultVal;
  });
}

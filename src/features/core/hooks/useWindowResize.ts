import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

export function useWindowResize<T>(map: (w: number, h: number) => T) {
  const [state, setState] = useState(map(window.innerWidth, window.innerHeight));

  const cb = useDebounce(() => {
    setState(map(window.innerWidth, window.innerHeight));
  });

  useEffect(() => {
    window.addEventListener('resize', cb);
    return () => {
      window.removeEventListener('resize', cb);
    };
  }, []);
  return state;
}

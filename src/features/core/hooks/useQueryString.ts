import * as React from 'react';
import { useLocation } from 'react-router-dom';
export function useQueryString() {
  const location = useLocation();

  const queryParams = React.useMemo(() => {
    const params = location?.search?.split('?')[1];
    const paramsParts = params?.split('&') || [];
    const queryParameters: { [id: string]: string } = {};
    for (let p of paramsParts) {
      const key = p.split('=')[0];
      const value = p.split('=')[1];
      queryParameters[key] = value;
    }
    return queryParameters;
  }, [location.search]);
  return queryParams;
}

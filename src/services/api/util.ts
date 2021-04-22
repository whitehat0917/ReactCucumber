import httpClient from '../index';

export function apiRequest<T extends unknown[], U = unknown, RequestType = unknown, M = U, E = Error>(
  url: ((...data: T) => string) | string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
  mapRequestData?: (...data: T) => RequestType,
  mapResult?: (d: M) => U,
  mapError?: (err: any) => E,
) {
  return async (...data: T) => {
    try {
      const result = await httpClient.request({
        url: typeof url === 'string' ? url : url(...data),
        data: mapRequestData ? mapRequestData(...data) : undefined,
        method,
      });

      return mapResult ? mapResult(result.data) : (result.data as U);
    } catch (err) {
      if (mapError) {
        throw mapError(err);
      }
      throw err;
    }
  };
}

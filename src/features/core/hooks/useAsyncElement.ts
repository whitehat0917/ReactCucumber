import * as React from 'react';
import { fixFn, mapFn1 } from 'utils/func.utils';
type ActionType = 'loading' | 'show-loader' | 'success' | 'error' | 'start';
export function useAsyncRetryElement<T>(
  retry: (count: number) => Promise<T> | void,
  delayToShowLoader = 500,
  retryTime = 0,
  retryCount = 0,
  deps: any[] = [],
) {
  const [loadingState, dispatch] = React.useReducer(
    (
      state: { loading: boolean; error: boolean; showLoader: boolean; data: T; started: number; retries: number },
      action: { type: ActionType; data?: T; started?: number },
    ) => {
      switch (action.type) {
        case 'start':
          return { ...state, loading: true, error: false, showLoader: false, started: action.started, retries: 0 };
        case 'loading':
          return { ...state, loading: true, error: false, showLoader: false };
        case 'show-loader':
          return { ...state, showLoader: true };
        case 'success':
          console.log('data success', action);
          return { ...state, error: false, loading: false, showLoader: false, data: action.data };
        case 'error':
          console.error('data error', action);
          if (
            (Date.now() - state.started > retryTime * 1000 && retryTime) ||
            (state.retries >= retryCount && retryCount) ||
            (!retryCount && !retryTime)
          ) {
            return { ...state, error: true, loading: false, showLoader: false };
          } else {
            return { ...state, retries: state.retries + 1 };
          }

        default:
          return state;
      }
    },
    { loading: false, error: false, showLoader: false, data: null as T, started: 0, retries: 0 },
  );
  const onSuccess = mapFn1((data?: T) => ({ type: 'success' as ActionType, data }), dispatch);
  const onError = mapFn1((error?: any) => ({ type: 'error' as ActionType, error }), dispatch);
  const onStart = fixFn(dispatch, { type: 'start', started: Date.now() });
  React.useEffect(() => {
    const promise = retry(loadingState.retries);
    if (promise) {
      promise.then(onSuccess).catch(onError);
      if (loadingState.retries === 0) {
        onStart();
      }
    }
  }, [loadingState.retries, ...deps]);
  React.useEffect(() => {
    if (!loadingState.loading) {
      return;
    }
    const timeOut = setTimeout(() => {
      dispatch({ type: 'show-loader' });
    }, delayToShowLoader);
    return fixFn(clearTimeout, timeOut);
  }, [loadingState.loading, delayToShowLoader]);

  return {
    data: loadingState.data,
    loading: loadingState.loading,
    error: loadingState.error,
    showLoader: loadingState.showLoader,
    onSuccess,
    onError,
    onStart,
  };
}

export function useAsyncElement<T>(fetchData: () => Promise<T>, delayLoader = 0, deps: any[] = []) {
  const { data, loading, showLoader, error } = useAsyncRetryElement<T>(() => fetchData(), delayLoader, 0, 1, deps);
  return { data, loading, showLoader, error };
}

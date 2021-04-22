import { toast } from 'react-toastify';
import monitoringService from 'services/sentry';
import { assign, EventObject, Machine } from 'xstate';
export enum CommonStateNames {
  Loading = 'Loading',
  Loaded = 'Loaded',
  Error = 'Error',
  ErrorUnRecoverable = 'ErrorUnRecoverable',
  Idle = 'Idle',
}

interface SimpleLoadMachineCtx {
  retryCount: number;
}

export enum CommonStateActions {
  LoadData = 'LoadData',
  SendData = 'SendData',
}
export interface SimpleStateEvent<T> extends EventObject {
  data: T;
}
export function simpleLoadMachine<T>(
  fetch: (ctx: T) => Promise<Partial<T>>,
  parseLoadEventData: (ctx: T, evt: EventObject) => Partial<T> = (ctx, evt) => ({}),
  loadAtStart = false,
  retryCount = 3,
  retryTime = 1000,
) {
  return Machine<T & SimpleLoadMachineCtx>({
    initial: loadAtStart ? CommonStateNames.Loading : CommonStateNames.Idle,
    on: {
      [CommonStateActions.LoadData]: {
        cond: (ctx, evt) => {
          const toFetch = parseLoadEventData(ctx, evt);
          const difference = Object.entries(toFetch).some(([k, v]) => {
            return v !== ctx[k];
          });
          return difference || evt.refresh;
        },
        actions: assign(parseLoadEventData),
        target: CommonStateNames.Loading,
      },
    },
    states: {
      [CommonStateNames.Idle]: {
        on: {
          [CommonStateActions.LoadData]: {
            actions: assign(parseLoadEventData),
            target: CommonStateNames.Loading,
          },
        },
      },
      [CommonStateNames.Loaded]: {},
      [CommonStateNames.Loading]: {
        invoke: {
          src: fetch,
          onDone: {
            target: CommonStateNames.Loaded,
            actions: assign((ctx, evt) => evt.data),
          },
          onError: {
            target: CommonStateNames.Error,
          },
        },
      },
      [CommonStateNames.Error]: {
        always: { cond: (ctx, evt) => ctx.retryCount >= retryCount, target: CommonStateNames.ErrorUnRecoverable },
        after: {
          [retryTime]: {
            actions: assign((ctx, evt) => ({ ...ctx, retryCount: (ctx.retryCount || 0) + 1 })),
          },
        },
      },
      [CommonStateNames.ErrorUnRecoverable]: {},
    },
  });
}

export function simpleSendMachine<T, Result = any>(
  fetch: (ctx: T, evt: SimpleStateEvent<T>) => Promise<Result>,
  toastSuccess?: string,
  toastError?: string,
  retryCount = 3,
  retryTime = 1000,
) {
  return Machine<{ result: Result; error?: any; retryCount: number }>(
    {
      initial: CommonStateNames.Idle,
      on: {
        [CommonStateActions.SendData]: {
          target: CommonStateNames.Loading,
        },
      },
      states: {
        [CommonStateNames.Idle]: {},
        [CommonStateNames.Loaded]: {
          entry: ['onSuccess'],
        },
        [CommonStateNames.Loading]: {
          invoke: {
            src: fetch as any,
            onDone: {
              target: CommonStateNames.Loaded,
              actions: assign((ctx, evt) => ({ result: evt.data })),
            },
            onError: {
              target: CommonStateNames.Error,
            },
          },
        },
        [CommonStateNames.Error]: {
          always: { cond: (ctx, evt) => ctx.retryCount >= retryCount, target: CommonStateNames.ErrorUnRecoverable },
          entry: ['onError'],
          after: {
            [retryTime]: {
              actions: assign((ctx, evt) => ({ ...ctx, retryCount: (ctx.retryCount || 0) + 1 })),
            },
          },
        },
        [CommonStateNames.ErrorUnRecoverable]: {},
      },
    },
    {
      actions: {
        onSuccess(ctx, evt) {
          if (toastSuccess) {
            toast.success(toastSuccess);
          }
        },
        onError(ctx, evt) {
          if (toastError) {
            toast.error(toastError);
          }
          monitoringService.logError(evt);
        },
      },
    },
  );
}

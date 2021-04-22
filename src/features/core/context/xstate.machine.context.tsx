import { useMachine } from '@xstate/react';
import * as React from 'react';
import { AnyEventObject, State, StateMachine } from 'xstate';
export function createMachineContext<MachineCtx, EvtData = any>(
  machine: StateMachine<MachineCtx, any, AnyEventObject>,
): [
  any,
  React.FunctionComponent<any>,
  () => [State<MachineCtx, AnyEventObject, any, any>, (name: string, data: EvtData) => any],
] {
  const MachineContext = React.createContext({
    machineState: null as State<MachineCtx, AnyEventObject, any, any>,
    send: (evt: string, data: EvtData) => {},
  });

  return [
    MachineContext,
    (props: { children: any }) => {
      const [implementation, send, service] = useMachine(machine);
      return (
        <MachineContext.Provider
          value={{
            machineState: implementation,
            send: (evt, data) => send(evt, { data }),
          }}
        >
          {props.children}
        </MachineContext.Provider>
      );
    },
    () => {
      const { machineState, send } = React.useContext(MachineContext);
      return [machineState, send];
    },
  ];
}

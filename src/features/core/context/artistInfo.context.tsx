import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { State } from 'xstate';
import { TArtist } from '../../../model/artist.types';
import { artistInfoMachine } from '../../../model/machines/artist.machine';
import { CommonStateActions } from '../../../model/machines/common.state.machines';
import { createMachineContext } from './xstate.machine.context';
const [ArtistDataContext, ArtistDataContextProvider, useArtistDataHook] = createMachineContext(artistInfoMachine);

export function useArtistData(): [
  State<{ userName: string; artistData: TArtist }, any, any>,
  (evt: string, data: any) => any,
] {
  const [artistStateMachine, sendArtistMachine] = useArtistDataHook();
  const { params } = useRouteMatch<{ userName?: string }>();
  React.useEffect(() => {
    if (params.userName) {
      sendArtistMachine(CommonStateActions.LoadData, { userName: params.userName });
    }
  }, [params.userName]);
  return [artistStateMachine, sendArtistMachine];
}

export { ArtistDataContext, ArtistDataContextProvider };

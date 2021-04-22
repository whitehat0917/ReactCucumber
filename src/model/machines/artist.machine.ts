import { artistInfoFromUserNameRequest } from '../../services/api/artist.endpoints.service';
import { TArtist } from '../artist.types';
import { simpleLoadMachine, SimpleStateEvent } from './common.state.machines';

export const artistInfoMachine = simpleLoadMachine<{ userName: string; artistData: TArtist }>(
  async (ctx) => {
    const artistData = await artistInfoFromUserNameRequest(ctx.userName);
    return { artistData };
  },
  (ctx, evt: SimpleStateEvent<{ userName: string }>) => {
    return { userName: evt.data.userName };
  },
);

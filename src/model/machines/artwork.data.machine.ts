import { artworkDataFromId } from '../../services/api/artwork.endpoints.service';
import { ApiArtwork } from '../artwork.types';
import { simpleLoadMachine, SimpleStateEvent } from './common.state.machines';

export const artworkDataMachine = simpleLoadMachine<{ artwork: ApiArtwork; id: string }>(
  async (ctx) => {
    const artwork = await artworkDataFromId(ctx.id);
    return { artwork };
  },
  (ctx, evt: SimpleStateEvent<{ id: string }>) => {
    return { id: evt.data.id };
  },
);

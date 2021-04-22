import { keyBy } from 'lodash';
import { Actor, assign, Machine, spawn } from 'xstate';
import {
  artistCollectionsRequest,
  CollectionsResponse,
  sparseCollectionsRequest,
  SparseCollectionsResponse,
} from '../../services/api/artist.endpoints.service';
import { CollectionMachineActions, createCollectionMachine } from './collection.machine';
export enum CollectionsMachineStates {
  Idle = 'Idle',
  Loading = 'Loading',
  Loaded = 'Loaded',
  LoadingMore = 'LoadingMore',
  ErrorInitialLoad = 'ErrorLoading',
  ErrorLoadingMore = 'ErrorLoadingMore',
}

export interface CollectionsMachineContext {
  artistId: string;
  collections: { [id: number]: Actor };
  offset: number;
  limit: number;
}
export enum CollectionsMachineActions {
  ArtistChanged = 'ArtistChanged',
}
export const CollectionsMachine = Machine<CollectionsMachineContext>(
  {
    initial: CollectionsMachineStates.Idle,
    on: {
      [CollectionsMachineActions.ArtistChanged]: {
        target: CollectionsMachineStates.Loading,
        actions: assign((ctx, evt: { data: { artistId: string }; type: string }) => ({
          artistId: evt.data.artistId,
          limit: 40,
          offset: 0,
        })),
      },
    },
    states: {
      [CollectionsMachineStates.Idle]: {},
      [CollectionsMachineStates.Loading]: {
        invoke: {
          src: 'getCollectionsOfArtist',
          onDone: {
            target: CollectionsMachineStates.Loaded,
            actions: assign((ctx, evt: { type: string; data: [CollectionsResponse, SparseCollectionsResponse] }) => {
              console.log('evt', evt);
              const [basicCollectionResults, artworksCollectionResult] = evt.data;
              return {
                collections: {
                  ...ctx.collections,
                  ...keyBy(
                    basicCollectionResults.results.map((col, idx) => {
                      const child = spawn(createCollectionMachine(col));
                      child.send({
                        type: CollectionMachineActions.ArtworksLoaded,
                        data: artworksCollectionResult.results[idx],
                      });
                      //child.send({ type: CollectionMachineActions.Init, data: col } as any);

                      return child;
                    }),
                    'id',
                  ),
                },
              };
            }),
          },

          onError: CollectionsMachineStates.ErrorInitialLoad,
        },
      },
      [CollectionsMachineStates.LoadingMore]: {},
      [CollectionsMachineStates.ErrorLoadingMore]: {},
      [CollectionsMachineStates.ErrorInitialLoad]: {},
      [CollectionsMachineStates.Loaded]: {},
    },
  },
  {
    services: {
      getCollectionsOfArtist: (ctx, msg) =>
        Promise.all([
          artistCollectionsRequest(ctx.artistId, { limit: ctx.limit, offset: ctx.offset, artworkLimit: 5 }),
          sparseCollectionsRequest(ctx.artistId, { limit: ctx.limit, offset: ctx.offset, artworkLimit: 5 }),
        ]),
    },
  },
  { limit: 40, offset: 0, artistId: '', collections: {} },
);

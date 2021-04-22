import { assign, Machine } from 'xstate';
import { ApiSimpleCollection, ApiSparseArtwork, ApiSparseCollection } from '../artwork.types';

export enum CollectionMachineState {
  LoadedGeneralInfo = 'LoadedInfo',
  LoadingArtworks = 'LoadingArtworks',
  LoadingMoreArtworks = 'LoadingMoreArtworks',
  Loaded = 'Loaded',
  ErrorLoading = 'ErrorLoading',
  Idle = 'Idle',
}
export enum CollectionMachineActions {
  Init = 'Init',
  ArtworksLoaded = 'ArtworksLoaded',
}
export interface CollectionMachineCtx extends ApiSimpleCollection {
  artworkData?: ApiSparseArtwork[];
  artworkCount?: number;
}
export const createCollectionMachine = (collectionData: ApiSimpleCollection) =>
  Machine<CollectionMachineCtx>(
    {
      initial: CollectionMachineState.LoadedGeneralInfo,
      on: {
        [CollectionMachineActions.ArtworksLoaded]: {
          target: CollectionMachineState.Loaded,
          actions: assign((ctx, evt: { type: string; data: ApiSparseCollection }) => ({
            artworkData: evt.data.artworks.results,
            artworkCount: evt.data.artworks.count,
          })),
        },
      },
      states: {
        [CollectionMachineState.Idle]: {
          on: {
            [CollectionMachineActions.Init]: {
              target: CollectionMachineState.LoadedGeneralInfo,
            },
          },
        },
        [CollectionMachineState.LoadedGeneralInfo]: {},
        [CollectionMachineState.Loaded]: {},
      },
    },
    {},
    collectionData,
  );

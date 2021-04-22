import { CollectionsMachineContext } from 'model/machines/artist.collections.machine';
import { CommonStateNames } from 'model/machines/common.state.machines';
import * as React from 'react';
import { AnyEventObject, State } from 'xstate';
import { SkeletonBox } from '../skeleton/skeleton.box';
import { CollectionCell } from './artist.collection.cell';
import './collections.scss';
export const ArtistCollections = (props: {
  collectionsState: State<CollectionsMachineContext, AnyEventObject, any>;
}) => {
  const { collectionsState } = props;
  const message = 'No public collections';
  return (
    <div className="collections_table">
      <SkeletonBox
        loading={collectionsState.value !== CommonStateNames.Loaded}
        skeletonClassName="collections_table__skeleton"
        items={3}
        noList
      >
        {Object.values(collectionsState.context.collections).map((col) => (
          <CollectionCell collection={col} />
        ))}
        {collectionsState.value === CommonStateNames.Loaded &&
          !Object.values(collectionsState.context.collections).length && <div>{message}</div>}
      </SkeletonBox>
    </div>
  );
};

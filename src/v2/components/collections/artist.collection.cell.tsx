import { useActor } from '@xstate/react';
import { take } from 'lodash';
import { CollectionMachineCtx } from 'model/machines/collection.machine';
import * as React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Actor, AnyEventObject, State } from 'xstate';

export const CollectionCell = (props: { collection: Actor<State<CollectionMachineCtx>, AnyEventObject> }) => {
  const { collection: collectionActor } = props;
  const [collectionState, sendCollection] = useActor(collectionActor);
  const { params } = useRouteMatch();
  console.log(params);

  return (
    <Link to={`${(params as any).userName}/collections/${collectionState.context.url}`}>
      <div className="collection_cell">
        <div className="collection_cell__artworks_container">
          {take(collectionState.context.artworkData || [], 4).map((a) => (
            <>
              <div
                className="collection_cell__artworks_container__thumbnail"
                style={{
                  backgroundImage: `url(${
                    a.artwork_data?.images && a.artwork_data?.images[0]
                      ? a.artwork_data.images[0]?.thumbnails.small
                      : ''
                  })`,
                }}
              />
            </>
          ))}
        </div>
        <div className="collection_cell__artwork_title">{collectionState.context.name}</div>
        <div className="collection_cell__artwork_legend">
          {typeof collectionState.context.artworkCount === 'number' &&
            `${collectionState.context.artworkCount} Artworks`}
        </div>
      </div>
    </Link>
  );
};

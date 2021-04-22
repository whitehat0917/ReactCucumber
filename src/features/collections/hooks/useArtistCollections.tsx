import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectionsFetchRequest } from '../collectionsSlice';
import { collectionsSelector } from '../selectors';

function useArtistCollections({ collectionsLimit, artworksLimit }) {
  const dispatch = useDispatch();
  const { collections, status, isEmptyCollections } = useSelector(collectionsSelector);

  useEffect(() => {
    if (!collections.length && status.hasNeverLoaded && !status.isLoading) {
      dispatch(
        collectionsFetchRequest({
          offset: collections.length,
          collectionsLimit,
          artworksLimit,
        }),
      );
    }
  }, [dispatch, collections, status]);

  const updatedCollections = collections.reduce((prev, current) => {
    const collection = {
      ...current,
    };

    return [...prev, collection];
  }, []);

  return {
    collections: updatedCollections,
    collectionsStatus: status,
    isEmptyCollections,
  };
}

export default useArtistCollections;

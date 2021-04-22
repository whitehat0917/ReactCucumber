import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { PageTemplateLoader } from '../../../templates/PageTemplate';
import { selectedCollectionFetchRequest } from '../collectionSlice';
import NextCollection from '../NextCollection';
import { selectedCollectionsSelector } from '../selectors';
import SingleCollection from './SingleCollection';

const RenderSingleCollection = ({ selectedCollection }) => {
  if (selectedCollection) {
    return <SingleCollection selectedCollection={selectedCollection} />;
  }

  return null;
};

export interface IRouterParams {
  collectionUrl?: string;
  userName?: string;
  artworkId?: string;
  imageId?: string;
}

const SingleCollectionPage = (location) => {
  const dispatch = useDispatch();
  const params = useParams<IRouterParams>();
  const {
    selectedCollection,
    selCollUpdateId,
    isLoading,
    hasMoreArtworks,
    publicInfo,
    nextCollection,
    nextArtworks,
  } = useSelector(selectedCollectionsSelector(params.collectionUrl));
  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef?.current.scrollTo(0, 0);
    }
  }, [params.collectionUrl || '']);
  //console.log('scroll top', scrollTop);
  useEffect(() => {
    // console.log('PublicArtistBioPage -> ', isLoading);
    //scrollTop();
    if (!selectedCollection && !isLoading) {
      dispatch(
        selectedCollectionFetchRequest({
          userName: params.userName,
          collectionUrl: params.collectionUrl,
          append: false,
        }),
      );
    }
  }, [dispatch, selectedCollection]);

  const handleLoadMore = (start: number, end: number) => {
    if (true) {
      dispatch(
        selectedCollectionFetchRequest({
          userName: params.userName,
          collectionUrl: params.collectionUrl,
          append: true,
        }),
      );
    }
  };
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
  const thresholdValue = isRetina ? 3 : 2.25;
  const scrollRef = useRef(null as HTMLElement);
  return (
    <PageTemplateLoader
      location={location}
      publicInfo={publicInfo}
      //onLoadMore={hasMoreArtworks && handleLoadMore}
      //loadThreshold={thresholdValue}
      scrollRef={scrollRef}
    >
      <Fragment>
        <SingleCollection
          scrollRef={scrollRef}
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          selectedCollection={selectedCollection}
          selCollUpdateId={selCollUpdateId}
        />
        <NextCollection publicInfo={publicInfo} nextCollection={nextCollection} nextArtworks={nextArtworks} />
      </Fragment>
    </PageTemplateLoader>
  );
};

export default SingleCollectionPage;

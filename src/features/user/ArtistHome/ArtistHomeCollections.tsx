import { RenderCollections } from 'features/collections/PublicCollections';
import React from 'react';

const ArtistHomeCollections = ({ collections, collectionsStatus, userName, isEmptyCollections }) => {
  return (
    <RenderCollections
      collections={collections}
      userName={userName}
      isEmptyCollections={isEmptyCollections}
      isLoading={collectionsStatus?.isLoading}
    />
  );

  // if (!collectionsStatus.isLoading) {
  //     return (
  //         <RenderCollections
  //             collections={collections}
  //             userName={userName} />
  //     );
  // }

  // return <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  //     <MinorLoader />
  // </div>;
};

export default ArtistHomeCollections;

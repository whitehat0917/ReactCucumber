import React from 'react';
import PageTemplate from 'templates/PageTemplate';
import ArtistPublicCollections from 'containers/ArtistPublicCollections';

const PublicCollectionsPage = ({ history }) => (
  <PageTemplate history={history} isPublicGallery>
    <ArtistPublicCollections />
  </PageTemplate>
);

export default PublicCollectionsPage;

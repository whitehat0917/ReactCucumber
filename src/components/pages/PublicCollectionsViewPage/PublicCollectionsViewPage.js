import React from 'react';
import PageTemplate from 'templates/PageTemplate';
import ArtistPublicCollectionsView from 'containers/ArtistPublicCollectionsView';

const PublicCollectionsViewPage = ({ history }) => (
  <PageTemplate history={history} isPublicGallery>
    <ArtistPublicCollectionsView />
  </PageTemplate>
);

export default PublicCollectionsViewPage;
// PublicCollectionsViewPage

import React from 'react';
import PageTemplate from 'templates/PageTemplate';
import ArtworksPublicGallery from 'containers/ArtworksPublicGallery';

const PublicGalleryPage = ({ history, match }) => (
  <PageTemplate history={history} isPublicGallery>
    <ArtworksPublicGallery />
  </PageTemplate>
);

export default PublicGalleryPage;

import React from 'react';
import { useSelector } from 'react-redux';
import HomeTemplate from '../../../templates/PageTemplate/HomeTemplate';
import ArtistPublicBio from './ArtistPublicBio';

import { userSelector, STATUS_PUBLIC_INFO } from '../selectors';

const PublicArtistBioPage = (location) => {
  const { status, publicInfo } = useSelector(userSelector(STATUS_PUBLIC_INFO));

  return  (
    <HomeTemplate 
      location={location}
      publicInfo={publicInfo} 
      isLoading={status.isLoading}>
        <ArtistPublicBio publicInfo={publicInfo} isLoading={status.isLoading} />
    </HomeTemplate>
  );
}

export default PublicArtistBioPage;

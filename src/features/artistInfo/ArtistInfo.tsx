import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MLink, MPseudoLink, Skeleton } from 'styled';
import { artistInfoRequest, logout } from './artistInfoSlice';
import { artistInfoSelector, STATUS_INFO } from './selectors';
import { ArtistInfoHolder, UploadButtonHolder, UserName } from './styled';

// import { useParams } from 'react-router-dom';

const ArtistInfo = ({ url }) => {
  const dispatch = useDispatch();
  const { status, info } = useSelector(artistInfoSelector(STATUS_INFO));

  useEffect(() => {
    if (_.isEmpty(info) && !status.isLoading) {
      dispatch(artistInfoRequest({}));
    }
  }, [dispatch, status, info]);

  if (info && info.first_name) {
    return (
      <ArtistInfoHolder>
        <UploadButtonHolder>
          <MLink to={`/uploader`} fontSize="16">
            Upload Artworks
          </MLink>
        </UploadButtonHolder>
        <div>
          <UserName>{`${info.first_name || ''} ${info.last_name || ''}`}</UserName>
          <MPseudoLink onClick={() => dispatch(logout({}))} fontSize="14">
            Logout
          </MPseudoLink>
        </div>
      </ArtistInfoHolder>
    );
  }

  return (
    <ArtistInfoHolder>
      <div>
        <UserName>
          <Skeleton />
        </UserName>
        <MPseudoLink fontSize="14">
          <Skeleton />
        </MPseudoLink>
      </div>
    </ArtistInfoHolder>
  );
};

export default ArtistInfo;

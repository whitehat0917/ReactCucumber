import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Button from 'atoms/Button';
import Avatar from 'atoms/Avatar';
import { CATEGORIES } from 'constants/artworks';

const BasicFont = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.secondary};
  line-height: 1.25rem;
`;

const ArtworkByLabel = styled(BasicFont)`
  font-size: 0.9375rem;
  color: #222222;
`;

const Sublabel = styled(BasicFont)`
  font-style: normal;
  font-weight: normal;
  font-size: 0.8125rem;
  color: #A1A4A6;
`;

const Title = styled(BasicFont)`
  font-size: 1.125rem;
  color: #16162A;
`;

const ArtistAvatar = styled.div`
  margin-right: 8px;
`;

const EditButton = styled(Button)`
  width: 4rem;
  height: 1.875rem;
  font-family: Open Sans;
  font-size: 0.875rem;
  font-weight: normal;
  line-height: 1.4375rem;
  text-align: center;
  color: #FF5B00;
  margin-left: auto;
  &:hover {
    color: #e25000;    
  }
`;

const ImageWrapper = styled.div`
  cursor: pointer;
`;

const PostHeader = styled.div`
  margin-right: 8px;
  cursor: pointer;
`;

const FeedArtworkCard = ({
  img, artistAvatar, title, artist, date, category, onEditClick, hideEditButton, onImageClick, onHeaderClick, dateFormat,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
      <ArtistAvatar>
        <Avatar iconSize="small" size={2.25} type="square" src={artistAvatar} />
      </ArtistAvatar>
      <PostHeader onClick={onHeaderClick}>
        <ArtworkByLabel>
          Artwork by
          {' '}
          {artist}
        </ArtworkByLabel>
        <Sublabel>
          { moment.utc(date).format(dateFormat) }
        </Sublabel>
      </PostHeader>
      {!hideEditButton && <EditButton styleType="gray" onClick={onEditClick}>Edit</EditButton>}
    </div>
    <ImageWrapper onClick={onImageClick}>
      <img style={{ width: '100%', borderRadius: 8 }} src={img} alt={title} />
    </ImageWrapper>
    <Title>{ title }</Title>
    { category && <Sublabel>{ CATEGORIES[category].label }</Sublabel>}
  </div>
);

FeedArtworkCard.propTypes = {
  img: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onEditClick: PropTypes.func,
  artistAvatar: PropTypes.string,
  title: PropTypes.string,
  dateFormat: PropTypes.string,
  category: PropTypes.number,
  hideEditButton: PropTypes.bool,
  onHeaderClick: PropTypes.func,
  onImageClick: PropTypes.func,
};

FeedArtworkCard.defaultProps = {
  dateFormat: 'MM/DD/YYYY h:mm a',
};

export default FeedArtworkCard;

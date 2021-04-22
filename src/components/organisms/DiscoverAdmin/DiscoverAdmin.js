import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';
import EventListener from 'react-event-listener';
import AdminContentHeader from 'molecules/AdminContentHeader';
import FeedArtworkCard from 'organisms/FeedArtworkCard';
import Pagination from 'molecules/Pagination';
import LoadingOverlay from 'molecules/LoadingOverlay';
import config from 'config';

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 32px;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

class FeedAdmin extends React.PureComponent {
  renderArtworks = () => {
    const { artworks } = this.props;
    return artworks.map((artwork) => {
      const {
        id, year, images, title, artist_data: artistData, artist, category, published,
      } = artwork;
      const titleText = year ? `${title}, ${year}` : title;
      let imageUrl = '';
      if (images[0]) {
        imageUrl = get(images[0], 'thumbnails.small') || get(images[0], 'thumbnails.mid');
      }
      const avatar = get(artistData, 'thumbnails.tiny');
      const djangoAdminUrl = `https://${config.isDev ? 'staging' : 'app'}.marcelforart.com/admin/feed/artworkfeeditem/add/`;
      const redirectUrl = `/${artistData.marcel_username}/artwork/${id}`;
      return (
        <FeedArtworkCard
          key={id}
          img={imageUrl}
          artistAvatar={avatar}
          title={titleText}
          artist={artist}
          date={published}
          category={category}
          hideEditButton
          onHeaderClick={this.handleItemClick(djangoAdminUrl)}
          onImageClick={this.handleItemClick(redirectUrl)}
        />
      );
    });
  }

  handleItemClick = (url) => () => {
    window.open(url, '_blank');
  }

  handleKeyDown = (e) => {
    const { meta, requestArtworks } = this.props;
    switch (e.key) {
      case 'ArrowRight':
        if (meta.page < meta.pageCount) {
          requestArtworks(meta.page + 1);
        }
        break;
      case 'ArrowLeft':
        if (meta.page > 1) {
          requestArtworks(meta.page - 1);
        }
        break;
      default:
    }
  }

  handlePageChange = (page) => {
    this.props.requestArtworks(page);
  }

  render() {
    const { meta: { page, pageCount }, fetchStatus } = this.props;

    return (
      <Wrapper>
        <EventListener
          target="window"
          onKeyDown={this.handleKeyDown}
        />
        <AdminContentHeader title="Admin discover" />
        {fetchStatus.isLoading && <LoadingOverlay />}
        {!fetchStatus.isLoading && (
          <Fragment>
            <Cards>
              { this.renderArtworks() }
            </Cards>
            <Pagination
              onPageChange={this.handlePageChange}
              currentPage={page}
              pages={pageCount}
            />
          </Fragment>
        )}
      </Wrapper>
    );
  }
}


FeedAdmin.propTypes = {
  artworks: PropTypes.array.isRequired,
  meta: PropTypes.shape({
    page: PropTypes.number,
    pageCount: PropTypes.number,
  }).isRequired,
  requestArtworks: PropTypes.func.isRequired,
  fetchStatus: PropTypes.shape({
    isLoading: PropTypes.bool,
  }).isRequired,
};

export default FeedAdmin;

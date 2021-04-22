import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EventListener from 'react-event-listener';
import get from 'lodash/get';
import moment from 'moment';
import config from 'config';
import FeedArtworkCard from 'organisms/FeedArtworkCard';
import FeedBlogPostCard from 'organisms/FeedBlogPostCard';
import AdminContentHeader from 'molecules/AdminContentHeader';
import PageArrows from 'molecules/PageArrows';
import LoadingOverlay from 'molecules/LoadingOverlay';

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
  state = {
    date: new Date().toUTCString(),
  }

  renderArtwork = (item) => {
    const {
      id, year, images, title, artist_data: artistData, artist, category,
    } = item.artwork;
    const titleText = year ? `${title}, ${year}` : title;
    let imageUrl = '';
    if (images[0]) {
      imageUrl = get(images[0], 'thumbnails.small') || get(images[0], 'thumbnails.mid');
    }
    const avatar = get(artistData, 'thumbnails.tiny');
    const djangoAdminUrl = `https://${config.isDev ? 'staging' : 'app'}.marcelforart.com/admin/feed/artworkfeeditem/${item.id}/change/`;
    const redirectUrl = `/${artistData.marcel_username}/artwork/${id}`;
    return (
      <FeedArtworkCard
        key={id}
        img={imageUrl}
        artistAvatar={avatar}
        title={titleText}
        artist={artist}
        date={item.publish_date}
        category={category}
        onEditClick={this.handleItemClick(djangoAdminUrl)}
        onImageClick={this.handleItemClick(redirectUrl)}
        onHeaderClick={this.handleItemClick(redirectUrl)}
        dateFormat="h:mm a"
      />
    );
  }

  renderBlogPost = (item) => {
    const { url, image, title } = item;
    const djangoAdminUrl = `https://${config.isDev ? 'staging' : 'app'}.marcelforart.com/admin/feed/artworkfeeditem/${item.id}/change/`;
    return (
      <FeedBlogPostCard
        key={item.id}
        title={title}
        img={image}
        onEditClick={this.handleItemClick(djangoAdminUrl)}
        onPostClick={this.handleItemClick(url)}
      />
    );
  }

  renderArtworks = (items) => items.map((item) => {
    if (item.item_type === 1) {
      return this.renderArtwork(item);
    }
    if (item.item_type === 2) {
      return this.renderBlogPost(item);
    }
    return null;
  })

  handleItemClick = (url) => () => {
    window.open(url, '_blank');
  }

  handleDateChange = (date) => {
    this.setState({ date });
  }

  handleKeyDown = (e) => {
    const { date } = this.state;
    const momentDate = moment(date);
    switch (e.key) {
      case 'ArrowRight':
        this.setState({ date: momentDate.add(1, 'day').toString() });
        break;
      case 'ArrowLeft':
        this.setState({ date: momentDate.subtract(1, 'day').toString() });
        break;
      default:
    }
  }

  render() {
    const { date } = this.state;
    const { items, fetchStatus } = this.props;
    const currentDate = new Date(date);
    const itemsToShow = items.filter((item) => moment(item.publish_date).isSame(currentDate, 'day'));
    return (
      <Wrapper>
        <EventListener
          target="window"
          onKeyDown={this.handleKeyDown}
        />
        <AdminContentHeader
          title="Admin feed"
          selectedDate={currentDate}
          onDateChange={this.handleDateChange}
        />
        {fetchStatus.isLoading && <LoadingOverlay />}
        {!fetchStatus.isLoading && (
          <Fragment>
            <Cards>
              { this.renderArtworks(itemsToShow) }
            </Cards>
            <PageArrows
              prevValue={moment(date).subtract(1, 'day')}
              nextValue={moment(date).add(1, 'day')}
              onPrevClick={this.handleDateChange}
              onNextClick={this.handleDateChange}
            />
          </Fragment>
        )}
      </Wrapper>
    );
  }
}

FeedAdmin.propTypes = {
  items: PropTypes.array.isRequired,
  fetchStatus: PropTypes.shape({
    isLoading: PropTypes.bool,
  }).isRequired,
};

export default FeedAdmin;

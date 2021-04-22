import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import FeedAdmin from 'organisms/FeedAdmin';
import { connect } from 'react-redux';
import { feedItemsFetchRequest } from 'store/actions';
import { fromFeed } from 'store/selectors';

class FeedAdminContainer extends React.Component {
  componentDidMount() {
    const { fetchStatus, requestArtworks } = this.props;
    if (fetchStatus.hasNeverLoaded && !fetchStatus.isLoading) {
      requestArtworks();
    }
  }

  render() {
    const { items, fetchStatus } = this.props;
    return (
      <FeedAdmin items={items} fetchStatus={fetchStatus} />
    );
  }
}

const mapStateToProps = (state) => ({
  fetchStatus: fromFeed.getStatus(state, 'feed_fetch_items'),
  items: fromFeed.getFeedItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestArtworks: () => dispatch(feedItemsFetchRequest()),
});

FeedAdminContainer.propTypes = {
  requestArtworks: PropTypes.func.isRequired,
  fetchStatus: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedAdminContainer);

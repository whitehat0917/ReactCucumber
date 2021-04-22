import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import DiscoverAdmin from 'organisms/DiscoverAdmin';
import { connect } from 'react-redux';
import { feedDiscoverArtworksFetchRequest } from 'store/actions';
import { fromFeed } from 'store/selectors';

class DiscoverAdminContainer extends React.Component {
  componentDidMount() {
    const { fetchStatus, requestArtworks } = this.props;
    if (fetchStatus.hasNeverLoaded && !fetchStatus.isLoading) {
      requestArtworks();
    }
  }

  render() {
    const {
      artworks, meta, requestArtworks, fetchStatus,
    } = this.props;
    return (
      <DiscoverAdmin
        artworks={artworks}
        meta={meta}
        requestArtworks={requestArtworks}
        fetchStatus={fetchStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  fetchStatus: fromFeed.getStatus(state, 'discover_fetch_artworks'),
  artworks: fromFeed.getDiscoverArtworks(state),
  meta: fromFeed.getDiscoverMeta(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestArtworks: (page) => dispatch(feedDiscoverArtworksFetchRequest(page)),
});

DiscoverAdminContainer.propTypes = {
  requestArtworks: PropTypes.func.isRequired,
  fetchStatus: PropTypes.object.isRequired,
  artworks: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverAdminContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import { fromArtworks, fromUser } from 'store/selectors';
import { artworksSetSelected, artworksSingleArtworkFetchRequest, artworksClickToViewMetadata } from 'store/actions';
import ArtworkView from 'organisms/ArtworkView';
import userAnalyticsService from 'services/user_analytics';
import customAnalytics from 'services/custom_analytics';
import authService from 'services/auth';

class ArtworkViewContainer extends React.PureComponent {
  componentDidMount() {
    const {
      publicUserInfo, requestArtwork, artwork, artworkIds, match, setSelectedArtwork,
    } = this.props;
    if (match.params.artworkId) { // we're looking for a specific artwork
      if (artworkIds.includes(match.params.artworkId)) { // and we have it downloaded already
        setSelectedArtwork(match.params.artworkId);
      } else { // or we have to request it from the BE
        requestArtwork(match.params.artworkId);
      }
    }

    if (match.params.artworkId && publicUserInfo.id) {
      const page = `/artist/${publicUserInfo.id}/artwork/${match.params.artworkId}/`;
      userAnalyticsService.set({ page });
      if (!authService.isImpersonated()) {
        // userAnalyticsService.ga('send', 'pageview', { page });
        artwork && customAnalytics.trackGA('Artwork View', { "ref": artwork.id });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      publicUserInfo, requestArtwork, setSelectedArtwork, artwork, artworkIds, match,
    } = this.props;
    // we either open a new artwork from the Public profile page or navigate through the artworks
    if (match.params.artworkId && (!prevProps.match.params.artworkId || match.params.artworkId !== prevProps.match.params.artworkId)) {
      if (artworkIds.includes(match.params.artworkId)) { // we have it downloaded already
        setSelectedArtwork(match.params.artworkId);
      } else { // or we have to request it from the BE
        requestArtwork(match.params.artworkId);
      }
      const page = `/artist/${publicUserInfo.id}/artwork/${match.params.artworkId}/`;
      userAnalyticsService.set({ page });
      if (!authService.isImpersonated()) {
        // userAnalyticsService.ga('send', 'pageview', { page });
        // console.log('artwork -> ', artwork);
        artwork && customAnalytics.trackGA('Artwork View', { "ref": artwork.id });
      }
    }
  }

  handleNextClick = () => {
    const {
      artwork, artworkIds, replacePage, match, location,
    } = this.props;
    if (artwork) {
      const currentIdx = artworkIds.indexOf(artwork.id);
      if (currentIdx !== -1 && currentIdx < artworkIds.length - 1) {
        replacePage(`/${match.params.userName}/artwork/${artworkIds[currentIdx + 1]}${location.search}`);
      }
    }
  }

  handlePrevClick = () => {
    const {
      artwork, artworkIds, replacePage, match, location,
    } = this.props;
    if (artwork) {
      const currentIdx = artworkIds.indexOf(artwork.id);
      if (currentIdx > 0) {
        replacePage(`/${match.params.userName}/artwork/${artworkIds[currentIdx - 1]}${location.search}`);
      }
    }
  }

  handleCloseClick = () => {
    const { replacePage, match: { params: { collectionUrl, userName } } } = this.props;
    if (collectionUrl) {
      return replacePage(`/${userName}/${collectionUrl}`);
    }
    return replacePage(`/${userName}`);
  }

  render() {
    const { artwork, match, artworkIds, status } = this.props;
    if (!match.params.artworkId || !artwork) {
      return null;
    }

    const currentIdx = artworkIds.indexOf(artwork.id);
    const nextArtworkExists = currentIdx !== -1 && currentIdx + 1 < artworkIds.length;
    const prevArtworkExists = currentIdx !== -1 && currentIdx - 1 >= 0;

    return (
      <ArtworkView
        onNextClick={this.handleNextClick}
        onPrevClick={this.handlePrevClick}
        onCloseClick={this.handleCloseClick}
        nextArtworkExists={nextArtworkExists}
        prevArtworkExists={prevArtworkExists}
        isLoading={status.isLoading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  artworkIds: fromArtworks.getArtworkIds(state),
  artwork: fromArtworks.getSelected(state),
  publicUserInfo: fromUser.getPublicInfo(state),
  status: fromArtworks.getStatus(state, 'fetch_single'),
});

const mapDispatchToProps = (dispatch) => ({
  replacePage: (url) => dispatch(replace(url)),
  requestArtwork: (artworkId) => dispatch(artworksSingleArtworkFetchRequest(artworkId)),
  setSelectedArtwork: (artworkId) => dispatch(artworksSetSelected(artworkId)),
  artworksClickToViewMetadata: () => dispatch(artworksClickToViewMetadata())
});
//
ArtworkViewContainer.propTypes = {
  checkImagesStatus: PropTypes.object,
  replacePage: PropTypes.func.isRequired,
  artwork: PropTypes.object,
  onLoad: PropTypes.func,
  requestArtwork: PropTypes.func.isRequired,
  setSelectedArtwork: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtworkViewContainer));

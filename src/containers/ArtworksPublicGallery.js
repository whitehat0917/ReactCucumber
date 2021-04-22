import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import userAnalyticsService from 'services/user_analytics';
import { push } from 'connected-react-router';
import Typography from 'atoms/Typography';
import LoadingOverlay from 'molecules/LoadingOverlay';
import ArtworksPublicGallery from 'organisms/ArtworksPublicGallery';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  userPublicInfoRequest, 
  modalOpen, 
  artworksPublicProfileRequest, 
  artworksFetchRequest, 
  artworksClearAll,
  artworksClickToViewMetadata
} from 'store/actions';
import { fromUser, fromArtworks } from 'store/selectors';
// import customAnalytics, { SOURCES, INTERACTION_TYPES } from 'services/custom_analytics';

userAnalyticsService.initialize();

class ArtworksPublicGalleryContainer extends Component {
  componentDidMount() {
    const { match, publicUserInfo } = this.props;
    if (match.params && match.params.userName) {
      // console.log('ArtworksPublicGalleryContainer -> ', publicUserInfo);

      this.props.requestUserInfo(match.params.userName);

      if (!_.isEmpty(publicUserInfo)) {
        this.props.requestPublicArtworks();
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match, requestUserInfo, statusPublicUserInfo, artwork, requestPublicArtworks, publicUserInfo,
    } = this.props;
    const { artworkId } = match.params;
    const { artworkId: prevArtworkId } = prevProps.match.params;

    if (prevProps.match.params.userName !== match.params.userName) {
      requestUserInfo(match.params.userName);
    } else if (prevProps.statusPublicUserInfo.isLoading
      && !statusPublicUserInfo.isLoading
      && !statusPublicUserInfo.errorMessage) {
      if (!artworkId) { // this means Artwork page is loaded, ignore this one
        const page = `/artist/${publicUserInfo.id}/`;
        // userAnalyticsService.set({ page });
        // userAnalyticsService.ga('send', 'pageview', { page });
        
        // {"Artwork View": {"target_model": Artwork, "interaction_model": ArtworkView, "source": SOURCES.DEFAULT,
        // "interaction_type": INTERACTION_TYPES.VIEW},

        // customAnalytics.trackGA('Artwork Feed View', { "ref": artwork.id });
        requestPublicArtworks();
      }
    } else if (prevArtworkId && !artworkId && publicUserInfo.id) {
      const page = `/artist/${publicUserInfo.id}/`;
      // userAnalyticsService.set({ page });
      // userAnalyticsService.ga('send', 'pageview', { page });
      // console.log('artworkId -> ', artworkId);
      // customAnalytics.trackGA('Artwork Feed View', { "ref": artwork.id });
    }
  }

  componentWillUnmount() {
    this.props.clearArtworks({ resetStatus: true });
  }

  render() {
    const { statusPublicUserInfo } = this.props;
    if (statusPublicUserInfo.isLoading) {
      return <LoadingOverlay />;
    }
    // TODO redirect to not found page
    if (statusPublicUserInfo.errorMessage) {
      return <Typography type="h3">Profile not found</Typography>;
    }
    return <ArtworksPublicGallery {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { artworkId } = ownProps.match.params;
  return {
    publicUserInfo: fromUser.getPublicInfo(state),
    artworks: fromArtworks.getArtworks(state),
    artwork: fromArtworks.getArtwork(state, artworkId),
    statusPublicUserInfo: fromUser.getStatus(state, 'user_public_info'),
    statusPublicArtworks: fromArtworks.getStatus(state, 'public_profile'),
    artworksMeta: fromArtworks.getMeta(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestUserInfo: (userName) => dispatch(userPublicInfoRequest(userName)),
  openContactModal: () => dispatch(modalOpen('contact')),
  openBurgerModal: () => dispatch(modalOpen('burger')),
  requestPublicArtworks: () => dispatch(artworksPublicProfileRequest()),
  pushPage: (url) => dispatch(push(url)),
  requestArtworks: () => dispatch(artworksFetchRequest()),
  clearArtworks: (data) => dispatch(artworksClearAll(data)),
  artworksClickToViewMetadata: () => dispatch(artworksClickToViewMetadata())
});

ArtworksPublicGalleryContainer.propTypes = {
  clearArtworks: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtworksPublicGalleryContainer));

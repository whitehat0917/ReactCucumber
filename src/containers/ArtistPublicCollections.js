import React, { Component } from 'react';
import _ from 'lodash';
import userAnalyticsService from 'services/user_analytics';
import { push } from 'connected-react-router';
import Typography from 'atoms/Typography';
import LoadingOverlay from 'molecules/LoadingOverlay';
import ArtistPublicCollections from 'organisms/ArtistPublicCollections';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userPublicInfoRequest, modalOpen, collectionsFetchRequest, collectionsLoadMore } from 'store/actions';
import { fromUser, fromCollections } from 'store/selectors';

userAnalyticsService.initialize();

class ArtistPublicCollectionsContainer extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params && match.params.userName) {
      // this.props.requestUserInfo(match.params.userName);
      
      // this.props.requestUserCollections(0, match.params.userName);
    }
  }

  render() {
    const { statusPublicUserInfo, statusCollections } = this.props;
    // if (statusPublicUserInfo.isLoading || statusCollections.isLoading) {
    //   return <LoadingOverlay />;
    // }

    if (statusPublicUserInfo.isLoading) {
      return <LoadingOverlay />;
    }
    // TODO redirect to not found page
    if (statusPublicUserInfo.errorMessage) {
      return <Typography type="h3">Profile not found</Typography>;
    }
    return <ArtistPublicCollections {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  publicUserInfo: fromUser.getPublicInfo(state),
  statusPublicUserInfo: fromUser.getStatus(state, 'user_public_info'),
  statusCollections: fromCollections.getStatus(state, 'fetch'),
  collections: fromCollections.getCollections(state),
  hasMore: state.collections.hasMore,
  collections: state.collections.collections
});

const mapDispatchToProps = (dispatch) => ({
  requestUserInfo: (userName) => dispatch(userPublicInfoRequest(userName)),
  openContactModal: () => dispatch(modalOpen('contact')),
  openBurgerModal: () => dispatch(modalOpen('burger')),
  pushPage: (url) => dispatch(push(url)),
  requestUserCollections: (offset, userName) => dispatch(collectionsFetchRequest(offset, userName)),
  collectionsLoadMore: (offset) => dispatch(collectionsLoadMore(offset))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistPublicCollectionsContainer));

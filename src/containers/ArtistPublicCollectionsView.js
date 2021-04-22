import React, { Component } from 'react';
import { push } from 'connected-react-router';
import Typography from 'atoms/Typography';
import LoadingOverlay from 'molecules/LoadingOverlay';
import ArtistPublicCollectionsView from 'organisms/ArtistPublicCollectionsView';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  userPublicInfoRequest,
  modalOpen,
  collectionsSingleCollectionFetchRequest,
} from 'store/actions';
import { fromUser, fromCollections } from 'store/selectors';

class ArtistPublicCollectionsViewContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    if (match.params && match.params.userName && match.params.collectionUrl) {
      // this.props.requestUserInfo(match.params.userName);
      
      this.props.collectionsSingleCollectionFetchRequest(match.params.collectionUrl, match.params.userName);
    }
  }

  render() {
    const { statusPublicUserInfo, statusSelectedCollection } = this.props;
    if (statusPublicUserInfo.isLoading || statusSelectedCollection.isLoading) {
      return <LoadingOverlay />;
    }
    // TODO redirect to not found page
    if (statusPublicUserInfo.errorMessage) {
      return <Typography type="h3">Profile not found</Typography>;
    }
    return <ArtistPublicCollectionsView {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    publicUserInfo: fromUser.getPublicInfo(state),
    statusPublicUserInfo: fromUser.getStatus(state, 'user_public_info'),
    statusSelectedCollection: fromCollections.getStatus(state, 'fetch_selected'),
    // selectedCollection: fromCollections.getSelectedCollection(state),
    selectedCollection: state.collections.selectedCollection,
    collectionsArtworks: state.collections.collectionsArtworks
  }
};

const mapDispatchToProps = (dispatch) => ({
  requestUserInfo: (userName) => dispatch(userPublicInfoRequest(userName)),
  openContactModal: () => dispatch(modalOpen('contact')),
  openBurgerModal: () => dispatch(modalOpen('burger')),
  pushPage: (url, state = {}) => dispatch(push(url, state)),
  collectionsSingleCollectionFetchRequest: (collectionUrl, userName) => dispatch(collectionsSingleCollectionFetchRequest(collectionUrl, userName)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistPublicCollectionsViewContainer));

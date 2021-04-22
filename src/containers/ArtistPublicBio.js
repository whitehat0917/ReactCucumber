import React, { Component } from 'react';
import userAnalyticsService from 'services/user_analytics';
import { push } from 'connected-react-router';
import Typography from 'atoms/Typography';
import LoadingOverlay from 'molecules/LoadingOverlay';
// import ArtistPublicBio from 'features/user/ArtistPublicBio';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userPublicInfoRequest, modalOpen } from 'store/actions';
import { fromUser } from 'store/selectors';
import customAnalytics from 'services/custom_analytics';

userAnalyticsService.initialize();

class ArtistPublicBioContainer extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params && match.params.userName) {
      // this.props.requestUserInfo(match.params.userName);
    }
  }

  componentDidUpdate() {
    const { publicUserInfo } = this.props;

    if (publicUserInfo.id) {
      customAnalytics.trackGA('Profile View', { "ref": publicUserInfo.id });
    }
    
  }

  render() {
    const { statusPublicUserInfo, publicUserInfo } = this.props;
    if (statusPublicUserInfo.isLoading) {
      return <LoadingOverlay />;
    }
    // TODO redirect to not found page
    if (statusPublicUserInfo.errorMessage) {
      return <Typography type="h3">Profile not found</Typography>;
    }

    return <ArtistPublicBio {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  publicUserInfo: fromUser.getPublicInfo(state),
  statusPublicUserInfo: fromUser.getStatus(state, 'user_public_info'),
});

const mapDispatchToProps = (dispatch) => ({
  requestUserInfo: (userName) => dispatch(userPublicInfoRequest(userName)),
  openContactModal: () => dispatch(modalOpen('contact')),
  openBurgerModal: () => dispatch(modalOpen('burger')),
  pushPage: (url) => dispatch(push(url)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistPublicBioContainer));

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Responsive from 'react-responsive';
import { fromUser, fromAuth } from 'store/selectors';
import {
  userInfoRequest, authLogoutRequest, modalOpen, artworksClearAll,
  artworksFetchRequest, userClearImpersonated,
} from 'store/actions';
import PageHeaderDesktop from 'molecules/PageHeaderDesktop';
import PageHeaderMobile from 'molecules/PageHeaderMobile';
import authService from 'services/auth';

const Desktop = (props) => <Responsive {...props} minWidth={992} />;
const Tablet = (props) => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = (props) => <Responsive {...props} maxWidth={767} />;

const Header = (props) => (
  <Fragment>
    <Desktop>
      <PageHeaderDesktop {...props} />
    </Desktop>
    <Tablet>
      {!props.isPublicGallery && <PageHeaderMobile {...props} />}
    </Tablet>
    <Mobile>
      {!props.isPublicGallery && <PageHeaderMobile {...props} />}
    </Mobile>
  </Fragment>
);

class PageHeaderContainer extends Component {
  componentDidMount() {
    const { userInfoStatus, requestUserInfo } = this.props;
    if (userInfoStatus.hasNeverLoaded && !userInfoStatus.isLoading && authService.isLoggedIn()) {
      requestUserInfo();
    }
  }

  getActionButtonData = () => {
    const { history } = this.props;
    if (history && history.location.pathname === '/') {
      return {
        title: 'Upload images',
        modal: 'upload',
      };
    }
    if (history && history.location.pathname.includes('edit')) {
      return {
        title: 'Add more images',
        modal: 'upload_images',
      };
    }
    return {};
  }

  handleLogoutClick = () => {
    const { logout, pushPage } = this.props;
    logout();
    pushPage('/login');
  }

  handleOpenModal = (modalName) => () => {
    const { openModal } = this.props;
    openModal(modalName);
  }

  handleImpersonateClick = () => {
    const { openModal } = this.props;
    openModal('impersonate_modal');
  }

  handleImpersonatedLogoutClick = () => {
    const { clearArtworks, requestArtworks, clearImpersonated } = this.props;
    authService.logoutImpersonated();
    clearArtworks({ resetStatus: true });
    clearImpersonated();
    requestArtworks();
  }

  render() {
    const buttonData = this.getActionButtonData();

    return (
      <Header
        isLoggedIn={authService.isLoggedIn()}
        onLogoutClick={this.handleLogoutClick}
        openUploadModal={this.handleOpenModal(buttonData.modal)}
        buttonTitle={buttonData.title}
        onImpersonateClick={this.handleImpersonateClick}
        onImpersonatedLogoutClick={this.handleImpersonatedLogoutClick}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: fromUser.getInfo(state),
  impersonatedInfo: fromUser.getImpersonatedInfo(state),
  userInfoStatus: fromUser.getStatus(state, 'user_info'),
  impersonateStatus: fromAuth.getStatus(state, 'impersonate'),
  publicUserInfo: fromUser.getPublicInfo(state),
  statusPublicUserInfo: fromUser.getStatus(state, 'user_public_info'),
  router: state.router,
});

const mapDispatchToProps = (dispatch) => ({
  requestUserInfo: () => dispatch(userInfoRequest()),
  logout: () => dispatch(authLogoutRequest()),
  pushPage: (url) => dispatch(push(url)),
  openModal: (modalToOpen) => dispatch(modalOpen(modalToOpen)),
  clearArtworks: (data) => dispatch(artworksClearAll(data)),
  clearImpersonated: () => dispatch(userClearImpersonated()),
  requestArtworks: () => dispatch(artworksFetchRequest()),
});

PageHeaderContainer.propTypes = {
  userInfo: PropTypes.object.isRequired,
  impersonatedInfo: PropTypes.object.isRequired,
  impersonateStatus: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeaderContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { modalClose, modalOpen } from 'store/actions';
import { fromModal, fromUser } from 'store/selectors';
import BurgerDrawerModal from 'molecules/BurgerDrawerModal';

class ContactModalContainer extends Component {
  handlePageChangeClick = (url) => () => {
    const { onClose, pushPage } = this.props;

    onClose();
    pushPage(url);
  };

  handleContactLinkClick = () => {
    const { onClose, openContactModal } = this.props;

    onClose();
    openContactModal();
  };

  render() {
    return (
      <BurgerDrawerModal
        {...this.props}
        onPageLinkClick={this.handlePageChangeClick}
        onContactLinkClick={this.handleContactLinkClick}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: fromModal.isOpen(state, 'burger'),
  publicUserInfo: fromUser.getPublicInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(modalClose('burger')),
  openContactModal: () => dispatch(modalOpen('contact')),
  pushPage: (url) => dispatch(push(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactModalContainer);

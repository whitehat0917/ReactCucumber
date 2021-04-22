import React from 'react';
import { connect } from 'react-redux';
import { modalOpen } from 'store/actions';
import EmptyScreen from 'organisms/EmptyScreen';

const EmptyScreenContainer = (props) => <EmptyScreen {...props} />;

const mapDispatchToProps = (dispatch) => ({
  openUploadModal: () => dispatch(modalOpen('upload')),
});

export default connect(() => ({}), mapDispatchToProps)(EmptyScreenContainer);

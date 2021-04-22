import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromArtworks } from 'store/selectors';
import { artworksChangeMode } from 'store/actions';
import ArtworksViewSwitcher from 'molecules/ArtworksViewSwitcher';

const ArtworksViewSwitcherContainer = ({ mode, changeMode, ...props }) => (
  <ArtworksViewSwitcher
    mode={mode}
    changeMode={changeMode}
    {...props}
  />
);

const mapStateToProps = (state) => ({
  mode: fromArtworks.getMode(state),

});

const mapDispatchToProps = (dispatch) => ({
  changeMode: (mode) => dispatch(artworksChangeMode(mode)),
});

ArtworksViewSwitcherContainer.propTypes = {
  mode: PropTypes.oneOf(['grid', 'list']),
  changeMode: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworksViewSwitcherContainer);

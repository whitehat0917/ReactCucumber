import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'atoms/Icon';

const Mode = ({
  mode, changeMode, type, ...props
}) => (
  <Icon
    size={1}
    color={(mode === type) ? 'primary' : 'muted'}
    clickable
    onClick={() => { changeMode(type); }}
    {...props}
  >
    {type}
  </Icon>
);
Mode.propTypes = {
  mode: PropTypes.oneOf(['grid', 'list']),
  changeMode: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['grid', 'list']),
};

const ArtworksViewSwitcher = ({ mode, changeMode, ...props }) => (
  <div {...props}>
    <Mode type="list" style={{ marginRight: '0.1rem' }} mode={mode} changeMode={changeMode} />
    <Mode type="grid" mode={mode} changeMode={changeMode} />
  </div>
);

ArtworksViewSwitcher.propTypes = {
  mode: PropTypes.oneOf(['grid', 'list']),
  changeMode: PropTypes.func.isRequired,
};

export default ArtworksViewSwitcher;

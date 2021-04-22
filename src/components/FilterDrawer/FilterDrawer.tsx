import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '../Drawer';
import ArtworkFilterForm from 'containers/ArtworkFilterForm';

const FilterDrawer = ({ filterDrawerOpened }) => (
  <Drawer open={filterDrawerOpened}>
    <ArtworkFilterForm />
  </Drawer>
);

FilterDrawer.propTypes = {
  filterDrawerOpened: PropTypes.bool.isRequired,
};

export default FilterDrawer;

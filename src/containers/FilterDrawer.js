import React from 'react';
import { connect } from 'react-redux';
import { fromArtworks } from 'store/selectors';
import FilterDrawer from 'organisms/FilterDrawer';

const FilterDrawerContainer = (props) => <FilterDrawer {...props} />;

const mapStateToProps = (state) => ({
  filterDrawerOpened: fromArtworks.getFilterDrawerOpened(state),
});

export default connect(mapStateToProps)(FilterDrawerContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { artworksChangeSorting } from 'store/actions';
import { fromArtworks } from 'store/selectors';
import Sorting from 'molecules/Sorting';

const SortingContainer = ({ sorting, changeSorting }) => (
  <Sorting
    order={sorting.order}
    sortBy={sorting.key}
    onSortChange={changeSorting}
  />
);


const mapStateToProps = (state) => ({
  sorting: fromArtworks.getSorting(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeSorting: (data) => dispatch(artworksChangeSorting(data)),
});


SortingContainer.propTypes = {
  sorting: PropTypes.shape({
    order: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
  changeSorting: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortingContainer);

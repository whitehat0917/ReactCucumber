import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArtworkFilterForm from 'organisms/ArtworkFilterForm';
import isEqual from 'lodash/isEqual';
import {
  artworksEditFilter, artworksApplyFilterRequest,
} from 'store/actions';
import { fromArtworks } from 'store/selectors';

const initialFilters = {
  categories: [],
  statuses: [],
  years: [],
  price: {
    max: null,
    min: null,
  },
};

class ArtworkEditFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.filter;
  }

  handleCheckboxClick = (section, value) => (e) => {
    const { state } = this;
    const currentValues = state[section];
    let newValues = [];
    if (e.target.checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((val) => val !== value);
    }
    this.setState({ [section]: newValues });
  }

  handleYearsChange = (value, newValues) => {
    this.setState({ years: newValues });
  }

  handlePriceChange = (type) => (e) => {
    const { price: statePrice } = this.state;
    const price = e.value === '' ? null : Number.parseFloat(e.value);
    this.setState({ price: { ...statePrice, [type]: price } });
  }

  handleClose = () => {
    const { editFilter } = this.props;
    editFilter({ filterDrawerOpened: false });
  }

  handleReset = () => {
    this.setState(initialFilters);
  }

  handleSubmitFilters = () => {
    const { applyFilter } = this.props;
    applyFilter(this.state);
  }

  render() {
    const { state } = this;
    const filtersChanged = isEqual(state, this.props.filter);
    return (
      <ArtworkFilterForm
        onSubmitFilters={this.handleSubmitFilters}
        onCheckboxClick={this.handleCheckboxClick}
        onYearsChange={this.handleYearsChange}
        onPriceChange={this.handlePriceChange}
        onClose={this.handleClose}
        onReset={this.handleReset}
        filter={state}
        applyDisabled={filtersChanged}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  filter: fromArtworks.getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  editFilter: (data) => dispatch(artworksEditFilter(data)),
  applyFilter: (filters) => dispatch(artworksApplyFilterRequest(filters)),
});


ArtworkEditFormContainer.propTypes = {
  filter: PropTypes.object.isRequired,
  editFilter: PropTypes.func.isRequired,
  applyFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkEditFormContainer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromArtworks } from 'store/selectors';
import { artworksEditFilter, artworksApplyFilterRequest } from 'store/actions';
import PortfolioHeader from 'organisms/PortfolioHeader';

class PortfolioHeaderContainer extends Component {
  handleFilterButtonClick = () => {
    const { editFilter } = this.props;
    editFilter({ filterDrawerOpened: true });
  }

  handleChipDelete = (type, value) => () => {
    const { editFilter, applyFilter, filters } = this.props;
    switch (type) {
      case 'categories':
      case 'statuses':
      case 'years':
        editFilter({
          [type]: filters[type].filter((val) => val !== value),
          key: Date.now(),
        });
        break;
      case 'price':
        editFilter({ price: { min: null, max: null } });
        break;
      default:
    }
    applyFilter();
  }

  render() {
    const { filters } = this.props;
    return (
      <PortfolioHeader
        onFilterButtonClick={this.handleFilterButtonClick}
        onChipDelete={this.handleChipDelete}
        filters={filters}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  filters: fromArtworks.getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  editFilter: (data) => dispatch(artworksEditFilter(data)),
  applyFilter: () => dispatch(artworksApplyFilterRequest()),
});

PortfolioHeaderContainer.propTypes = {
  filters: PropTypes.object.isRequired,
  editFilter: PropTypes.func.isRequired,
  applyFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioHeaderContainer);

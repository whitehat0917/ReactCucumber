import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArtworkEditForm from 'organisms/ArtworkEditForm';
import { artworksEditSelected } from 'store/actions';
import { fromArtworks } from 'store/selectors';
import isEqual from 'lodash/isEqual';

const fieldsDictionary = {
  subCategory: 'sub_category',
  location: 'current_location',
};

class ArtworkEditFormContainer extends React.Component {
  state = {
    errors: {},
  }

  componentDidUpdate = (prevProps) => {
    const { artworkCommitStatus } = this.props;
    if (!isEqual(artworkCommitStatus, prevProps.artworkCommitStatus) && artworkCommitStatus.errorMessage) {
      this.setState({
        errors: artworkCommitStatus.errorMessage,
      });
    }
  }

  processValue = (field, value, data) => {
    switch (field) {
      case 'price':
      case 'width':
      case 'height':
      case 'depth':
        return value.value || null;
      case 'status':
      case 'category':
        return value !== null ? value.value : null;
      case 'metric':
        return data;
      case 'year':
        return value.target.value || null;
      default:
        return value.target.value;
    }
  }

  handleChange = (field, data) => (e) => {
    const { editArtwork } = this.props;
    const { errors } = this.state;
    this.setState({
      errors: {
        ...errors,
        [fieldsDictionary[field] || field]: null,
      },
    });
    const value = this.processValue(field, e, data);
    editArtwork({ [fieldsDictionary[field] || field]: value });
  }

  render() {
    const {
      artwork: {
        title, year, category, sub_category: subCategory, width, height, depth, edition, status,
        price, current_location: location, metric,
      },
    } = this.props;
    const { errors } = this.state;
    return (
      <ArtworkEditForm
        title={title}
        year={year}
        category={category}
        subCategory={subCategory}
        width={width}
        height={height}
        depth={depth}
        edition={edition}
        status={status}
        price={price}
        location={location}
        metric={metric}
        onChange={this.handleChange}
        errors={errors}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  artwork: fromArtworks.getSelected(state),
  artworkCommitStatus: fromArtworks.getStatus(state, 'commit'),
});

const mapDispatchToProps = (dispatch) => ({
  editArtwork: (data) => dispatch(artworksEditSelected(data)),
});


ArtworkEditFormContainer.propTypes = {
  artwork: PropTypes.object.isRequired,
  editArtwork: PropTypes.func.isRequired,
  artworkCommitStatus: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkEditFormContainer);

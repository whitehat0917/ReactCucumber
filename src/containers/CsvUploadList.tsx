import React from 'react';
import PropTypes from 'prop-types';
import CsvUploadList from 'components/CsvUploadList';
import { connect } from 'react-redux';
import { fromArtworks } from 'store/selectors';

class CsvUploadListContainer extends React.PureComponent {
  render() {
    const { csvData } = this.props;
    return (
      <CsvUploadList csvData={csvData} />
    );
  }
}

const mapStateToProps = (state) => ({
  csvData: fromArtworks.getCsv(state),
});

const mapDispatchToProps = (dispatch) => ({});

CsvUploadListContainer.propTypes = {
  csvData: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CsvUploadListContainer);

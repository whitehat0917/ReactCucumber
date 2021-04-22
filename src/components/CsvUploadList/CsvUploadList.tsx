import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import CellRenderer from 'components/TableCellRenderer';
import HeaderRenderer from 'components/TableHeaderRenderer';
import Typography from 'components/Typography';

import 'react-table/react-table.css';

const StyledTable = styled(ReactTable)`
  cursor: pointer;

  .hdrLastColumn {
    padding-right: 0 !important;
    margin-left: 1rem;
    margin-right: -1rem;
  }

  .rt-tr {
    border-bottom: 1px solid rgba(177, 178, 179, 0.2);
  }

  .rt-thead .rt-tr {
    border-bottom: none;
  }

  .rt-tr-group:last-child .rt-tr {
    border-bottom: none;
  }

  .rt-tr-group:hover {
    transition: background-color 0.2s ease-in-out;
    background-color: rgba(201, 203, 204, 0.2);
  }
`;

const StatusRenderer = ({ value }) => {
  let color = 'default';
  if (value === 'success') {
    color = 'success';
  } else if (value === 'error') {
    color = 'error';
  }
  return (
    <Typography type="body3" iswrap color={color}>{value}</Typography>
  );
};

StatusRenderer.propTypes = {
  value: PropTypes.string,
};

class CsvUploadList extends React.PureComponent {
  columns = [
    {
      Header: (props) => <HeaderRenderer value="Name" {...props} />,
      accessor: 'Name',
      Cell: CellRenderer,
    },
    {
      Header: (props) => <HeaderRenderer value="Status" {...props} />,
      accessor: (row) => row.uploadStatus || 'pending',
      id: 'uploadStatus',
      Cell: StatusRenderer,
    },
    {
      Header: (props) => <HeaderRenderer value="Error" {...props} />,
      id: 'error',
      accessor: (row) => (row.uploadStatus ? row.error : ''),
      Cell: CellRenderer,
    },
  ]

  render() {
    const { csvData } = this.props;
    return (
      <StyledTable
        data={csvData}
        columns={this.columns}
        showPagination={false}
        showPaginationBottom={false}
        showPageSizeOptions={false}
        minRows={0}
        pageSize={1000}
        sortable={false}
        resizable={false}
        getProps={() => ({
          style: {
            border: 'none',
          },
        })}
        getTheadProps={() => ({
          style: {
            boxShadow: 'none',
            padding: '0 1rem',
          },
        })}
        getTheadThProps={() => ({
          style: {
            border: 'none',
            textAlign: 'start',
            padding: '0.325rem 1rem 0.325rem 0',
            outline: 0,
            lastChild: {
              marginLeft: '1rem',
              marginRight: '-1rem',
            },
          },
        })}
        getTbodyProps={() => ({
          style: {
            backgroundColor: csvData.length === 0 ? 'transparent' : 'white',
            borderRadius: '6px',
            padding: '5px 0',
          },
        })}
        getTrGroupProps={() => ({
          style: {
            padding: '0 1rem',
            border: 'none',
          },
        })}
        getTdProps={() => ({
          style: {
            padding: '1rem 1rem 1rem 0',
            display: 'flex',
            alignItems: 'center',
            borderRight: 'none',
            borderLeft: 'none',
          },
        })}
      />
    );
  }
}

CsvUploadList.propTypes = {
  csvData: PropTypes.array.isRequired,
};

export default CsvUploadList;

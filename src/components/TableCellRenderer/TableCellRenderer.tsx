import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/Typography';

const TableCellRenderer = ({ value }) => (
  <Typography type="body3" iswrap>{value}</Typography>
);

TableCellRenderer.propTypes = {
  value: PropTypes.string,
};

export default TableCellRenderer;

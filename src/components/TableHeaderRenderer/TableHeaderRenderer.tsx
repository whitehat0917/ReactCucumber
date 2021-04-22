import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/Typography';

const TableHeaderRenderer = ({ value }) => (
  <Typography type="caption" color="muted" style={{ textTransform: 'uppercase' }}>{value}</Typography>
);

TableHeaderRenderer.propTypes = {
  value: PropTypes.string,
};

export default TableHeaderRenderer;

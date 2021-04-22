import React from 'react';
import PropTypes from 'prop-types';
import FormControl from 'components/FormControl';
import Select from 'components/Select';

const SelectWithLabel = ({ label, ...rest }) => (
  <FormControl label={label}>
    <Select {...rest} />
  </FormControl>
);

SelectWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  ...Select.propTypes,
};

export default SelectWithLabel;

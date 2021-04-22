import React from 'react';
import PropTypes from 'prop-types';
import FormControl from 'components/FormControl';
import Input from 'components/Input';

const TextField = ({ label, onChange, ...rest }) => (
  <FormControl label={label}>
    <Input
      onChange={onChange}
      errorStyle={{
        fontSize: '0.5rem',
        lineHeight: '0.625rem',
      }}
      {...rest}
    />
  </FormControl>
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  ...Input.propTypes,
};

export default TextField;

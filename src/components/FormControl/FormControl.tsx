import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'components/Typography';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  vertical-align: top;
  position: relative;
  width: 100%;
`;

const Label = styled((props) => <Typography type="small" weight="600" {...props} />)`
  margin-bottom: 0.25rem; 
`;

const FormControl = ({ label, children }) => (
  <Wrapper>
    <Label>{ label }</Label>
    {children}
  </Wrapper>
);

FormControl.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormControl;

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Typography from 'components/Typography';

const Wrapper = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  margin: 0.2rem;
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const Indicator = css`
  content: "";
  position: absolute;
  left: 0.3rem;
  top: 0.125rem;
  width: 3px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
`;

const CustomCheckbox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 1rem;
  width: 1rem;
  border-radius: 0.125rem;
  background-color: ${({ theme, checked }) => (checked ? theme.palette.primary[30] : theme.palette.white)};
  border: 1px solid ${({ theme, checked }) => (checked ? theme.palette.primary[30] : theme.palette.gray[30])};

  &:after {
    ${Indicator}
    display: ${({ checked }) => (checked ? 'block' : 'none')};
  }

  &:hover {
    background-color: ${({ theme, checked }) => (checked ? theme.palette.primary[30] : theme.palette.white)};
  }
  &:hover:after {
    ${Indicator}
    display: block;
    border-color: ${({ checked, theme }) => (checked ? theme.palette.white : theme.palette.gray[20])};
  }
`;

const Label = styled(Typography)`
  margin-left: 1.5rem;
  line-height: 1rem;
`;

class Checkbox extends React.PureComponent {
  state = {
    checked: this.props.defaultValue || false,
  }

  handleClick = (e) => {
    e.stopPropagation();
    const { checked, onChange } = this.props;
    if (typeof checked === 'undefined') {
      this.setState({ checked: e.target.checked });
    }
    onChange(e);
  }

  render() {
    const {
      checked: checkedProp, label, disabled, className
    } = this.props;
    const { checked: checkedState } = this.state;
    const checked = typeof checkedProp !== 'undefined' ? checkedProp : checkedState;
    return (
      <Wrapper className={className} onClick={(e) => { e.stopPropagation(); }}>
        {
          label && <Label type="small">{label}</Label>
        }
        <Input disabled={disabled} type="checkbox" checked={checked ? 'checked' : ''} onChange={this.handleClick} />
        <CustomCheckbox checked={checked} />
      </Wrapper>
    );
  }
}

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  defaultValue: PropTypes.bool,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;

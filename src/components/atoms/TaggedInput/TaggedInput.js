import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import InputBase from 'atoms/InputBase';
import Chip from 'atoms/Chip';

const InputContainer = styled.div`
  ${InputBase.wrapper};

  display: flex;
  align-items: center;
  padding: 0 0.3rem;
  overflow-x: auto;
`;

const Input = styled.input`
  ${InputBase.text};

  box-sizing: border-box;
  padding: 0rem;
  margin: 0rem;
  border: none;
  width: 100%;
  height: 100%;
  outline: 0;
  margin-left: 0.5rem;
`;

const NumberInput = (props) => (
  <NumberFormat
    customInput={Input}
    allowNegative={false}
    {...props}
  />
);

class TaggedInput extends PureComponent {
  constructor(props) {
    super(props);
    this.inputWrapper = React.createRef();
    this.state = {
      values: props.values || [],
      currentValue: '',
      focused: false,
      error: false,
    };
  }

  handleDeleteValue = (value) => () => {
    const { onDelete } = this.props;
    const { values } = this.state;
    const newValues = values.filter((label) => value !== label);
    this.setState({ error: false, values: newValues });
    onDelete(value, newValues);
  }

  handleInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  }

  handleKeyPress = (e) => {
    const { onAdd, maxTagsNumber, validateInput } = this.props;
    const { values, currentValue } = this.state;
    if (values.length >= maxTagsNumber) return;
    if ((e.keyCode === 32 || e.keyCode === 13) && currentValue !== '') {
      if (validateInput && !validateInput(currentValue)) {
        this.setState({ error: true });
        return;
      }
      const newValues = values.includes(currentValue) ? values : [...values, currentValue];
      this.setState({
        error: false,
        values: newValues,
        currentValue: '',
      });
      onAdd(currentValue, newValues);
    }
  }

  triggerFocus = (focused) => () => {
    this.setState({ focused });
  }

  render() {
    const { placeholder, type } = this.props;
    const {
      values, currentValue, focused, error,
    } = this.state;

    const InputComponent = type === 'number' ? NumberInput : Input;

    return (
      <InputContainer focused={focused} error={error}>
        {values.map((value) => <Chip key={value} size="big" label={value} onDelete={this.handleDeleteValue(value)} />)}
        <InputComponent
          error={error}
          value={currentValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyPress}
          placeholder={values.length === 0 ? placeholder : ''}
          onFocus={this.triggerFocus(true)}
          onBlur={this.triggerFocus(false)}
        />
      </InputContainer>
    );
  }
}

TaggedInput.defaultProps = {
  values: [],
  maxTagsNumber: 3,
};

TaggedInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  placeholder: PropTypes.string,
  maxTagsNumber: PropTypes.number,
  type: PropTypes.oneOf(['number', 'string']),
  validateInput: PropTypes.func,
};

export default TaggedInput;

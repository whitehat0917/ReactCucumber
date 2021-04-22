import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';
import theme from 'themes/default';
import Icon from 'components/Icon';
import Typography from 'components/Typography';
import isEqual from 'lodash/isEqual';

const customStyles = (error, popoverWidth) => ({
  indicatorSeparator: () => ({
    display: 'none',
  }),
  control: (base) => ({
    ...base,
    backgroundColor: theme.palette.white,
    borderWidth: 0,
    border: error ? `2px solid ${theme.palette.error}` : `1px solid ${theme.palette.gray[30]}`,
    borderRadius: '0.4375rem',
    boxSizing: 'border-box',
    boxShadow: 'initial',
    color: error ? theme.palette.error : theme.palette.gray[100],
    fontFamily: theme.fonts.primary,
    fontSize: '1rem',
    lineHeight: '1.6875rem',
    letterSpacing: '0.01rem',
    padding: '0 1rem',
    cursor: 'pointer',
    height: '3rem',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
  }),
  placeholder: (base) => ({
    ...base,
    color: error ? theme.palette.error : theme.palette.gray[30],
    fontSize: '1rem',
    lineHeight: '1.6875rem',
  }),
  valueContainer: (base) => ({
    ...base,
    maxHeight: 'initial',
    overflowY: 'initial',
    padding: 0,
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: theme.palette.white,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.4375rem',
    border: 'none',
    boxSizing: 'content-box',
    marginTop: '0.75rem',
    marginBottom: '1.5rem',
    padding: '1rem 0',
    zIndex: '100',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, { isSelected, isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? theme.palette.gray[20] : 'none',
    color: isSelected ? theme.palette.primary[30] : theme.palette.gray[100],
    fontFamily: theme.fonts.primary,
    lineHeight: '1.6875rem',
    padding: '0.375rem 1rem',
    cursor: 'pointer',
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999, minWidth: popoverWidth || 'auto' }),
  noOptionsMessage: () => ({
    fontFamily: theme.fonts.primary,
    lineHeight: '1.6875rem',
    textAlign: 'center',
    color: theme.palette.gray[30],
  }),
});

const DropdownIndicator = ({ isMenuOpened, ...props }) => (
  components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      <Icon clickable size={0.625}>{isMenuOpened ? 'arrow_up' : 'arrow_down'}</Icon>
    </components.DropdownIndicator>
  )
);

const ControlComponent = ({ label, ...props }) => (
  <div>
    {
      label
      && <Typography type="small" weight={600} style={{ marginBottom: '0.325rem' }}>{label}</Typography>
    }
    <components.Control {...props} />
  </div>
);

class Select extends React.Component {
  state = {
    isMenuOpened: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { value, options } = this.props;
    return !isEqual(value, nextProps.value)
      || !isEqual(options, nextProps.options)
      || !isEqual(this.state, nextState);
  }

  onMenuOpen = () => {
    this.setState({ isMenuOpened: true });
  }

  onMenuClose = () => {
    this.setState({ isMenuOpened: false });
  }

  render() {
    const {
      error, value, label, onChange, errorText, errorStyle, ...restProps
    } = this.props;
    const { isMenuOpened } = this.state;

    // console.log('Select -> ', value);

    return (
      <div style={{ position: 'relative' }}>
        <ReactSelect
          value={value}
          onChange={onChange}
          clearable={false}
          menuPlacement="bottom"
          menuPortalTarget={document.body}
          styles={customStyles(error)}
          components={{
            DropdownIndicator: (props) => (
              <DropdownIndicator
                isMenuOpened={isMenuOpened}
                {...props}
              />
            ),
            Control: (props) => <ControlComponent label={label} {...props} />,
          }}
          onMenuOpen={this.onMenuOpen}
          onMenuClose={this.onMenuClose}
          theme={(selectTheme) => ({
            ...selectTheme,
            colors: {
              ...selectTheme.colors,
              primary: theme.palette.gray[30],
            },
          })}
          {...restProps}
        />
        {
          errorText && (
            <Typography
              style={{ position: 'absolute', top: '3.125rem', ...errorStyle }}
              type="caption"
              color="error"
            >
              {errorText}
            </Typography>
          )
        }
      </div>
    );
  }
}

Select.propTypes = {
  error: PropTypes.bool,
  errorText: PropTypes.string,
  value: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })).isRequired,
  label: PropTypes.string,
};

export default Select;

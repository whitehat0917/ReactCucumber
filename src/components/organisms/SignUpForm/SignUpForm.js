/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import styled from 'styled-components';
import Typography from 'atoms/Typography';
import Input from 'atoms/Input';
import Link from 'atoms/Link';
import Button from 'atoms/Button';
import ContentWrapper from 'atoms/ContentWrapper';

const Login = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputsWrapper = styled.div`
  width:  20.375rem;
`;

const TitleWrapper = styled.div`
  margin-bottom: 2.25rem;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BottomLinkWrapper = styled.div`
  margin-top: 1.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class SignUpForm extends PureComponent {
  state = {
    errors: {
      first_name: false,
      last_name: false,
      email: false,
      password1: false,
      password2: false,
      non_field_errors: false,
    },
  } 

  componentDidUpdate = (prevProps) => {
    const { registrationStatus } = this.props;
    if (!isEqual(registrationStatus, prevProps.registrationStatus) && registrationStatus.errorMessage) {
      this.setState({
        errors: registrationStatus.errorMessage,
      });
    }
  }

  validateField = () => false

  handleFieldChange = (field) => (e) => {
    const { onChange } = this.props;
    const { errors } = this.state;
    const nonFieldError = field === 'password2' ? { non_field_errors: false } : {};
    this.setState({
      errors: {
        ...errors,
        [field]: this.validateField(field),
        ...nonFieldError,
      },
    });
    onChange(field)(e);
    if (field === 'password1' && e.target.value === '') {
      onChange('password2')(e);
    }
  }

  handleOnSubmitClick = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(e);
  };

  render() {
    const { errors } = this.state;
    const {
      first_name, last_name, email, password1, password2,
    } = this.props;

    return (
      <ContentWrapper fullHeight>
        <Login onSubmit={this.handleOnSubmitClick}>
          <TitleWrapper>
            <Typography type="h3">Sign Up</Typography>
          </TitleWrapper>
          <InputsWrapper>
            <NameWrapper style={{ marginBottom: '1rem' }}>
              <Input
                name="first_name"
                value={first_name}
                onChange={this.handleFieldChange('first_name')}
                placeholder="First Name"
                style={{ marginRight: '1rem' }}
                error={Boolean(errors && errors.first_name)}
                errorText={errors && errors.first_name}
              />
              <Input
                name="last_name"
                value={last_name}
                onChange={this.handleFieldChange('last_name')}
                placeholder="Last Name"
                error={Boolean(errors && errors.last_name)}
                errorText={errors && errors.last_name}
              />
            </NameWrapper>
            <Input
              name="email"
              value={email}
              onChange={this.handleFieldChange('email')}
              placeholder="Email"
              style={{ marginBottom: '1.25rem' }}
              error={Boolean(errors && errors.email)}
              errorText={errors && errors.email}
            />
            <Input
              type="password"
              name="password1"
              value={password1}
              onChange={this.handleFieldChange('password1')}
              placeholder="Create password"
              error={Boolean(errors && errors.password1)}
              errorText={errors && errors.password1}
            />
            {
              password1
              && (
              <Input
                type="password"
                name="password2"
                value={password2}
                onChange={this.handleFieldChange('password2')}
                placeholder="Confirm password"
                style={{ marginTop: '1.25rem' }}
                error={Boolean(password1 && errors && (errors.password2 || errors.non_field_errors))}
                errorText={password1 && errors && (errors.password2 || errors.non_field_errors)}
              />)
            }
            <Button style={{ marginTop: '3.25rem' }} type="submit" fullWidth>Get Started!</Button>
            <BottomLinkWrapper>
              <Typography type="small">Have an account?</Typography>
              {'\u00a0'}
              { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="/login">
                Login
              </Link>
            </BottomLinkWrapper>
          </InputsWrapper>
        </Login>
      </ContentWrapper>
    );
  }
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password1: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  registrationStatus: PropTypes.object.isRequired,
};

export default SignUpForm;

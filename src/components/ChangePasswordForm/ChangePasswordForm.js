import Button from 'atoms/Button';
import ContentWrapper from 'atoms/ContentWrapper';
import Input from 'atoms/Input';
import Typography from 'atoms/Typography';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputsWrapper = styled.div`
  width: 20.375rem;
  max-width: 100%;
`;

const TitleWrapper = styled.div`
  margin-bottom: 2rem;
`;

class ChangePasswordForm extends PureComponent {
  state = {
    errors: {},
  };

  componentDidUpdate = (prevProps) => {
    const { status } = this.props;
    if (!isEqual(status, prevProps.status) && status.errorMessage) {
      this.setState({
        errors: status.errorMessage.message,
      });
    }
  };

  handleOnSubmitClick = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(e);
  };

  handleFieldChange = (field) => (e) => {
    const { onChange } = this.props;
    this.setState({
      errors: { [field]: false },
    });
    onChange(field)(e);
  };

  render() {
    const { errors } = this.state;
    const {
      password,
      passwordConfirmation,
      status: { isLoading },
    } = this.props;
    const passwordError = errors.new_password && errors.new_password[0];
    const passwordConfirmationError = errors.new_password2 && errors.new_password2[0];
    return (
      <ContentWrapper fullHeight>
        <Form onSubmit={this.handleOnSubmitClick}>
          <TitleWrapper>
            <Typography type="h3">Set up new password</Typography>
          </TitleWrapper>
          <InputsWrapper>
            <Input
              name="password"
              type="password"
              value={password}
              placeholder="Create password"
              onChange={this.handleFieldChange('password')}
              style={{ marginBottom: '1.25rem' }}
              error={Boolean(passwordError)}
              errorText={passwordError}
              errorStyle={{ whiteSpace: 'nowrap' }}
            />
            <Input
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChange={this.handleFieldChange('passwordConfirmation')}
              style={{ marginBottom: '1.25rem' }}
              error={Boolean(passwordConfirmationError)}
              errorText={passwordConfirmationError}
              errorStyle={{ whiteSpace: 'nowrap' }}
            />
            <Button type="submit" fullWidth disabled={isLoading} loading={isLoading}>
              Change Password
            </Button>
          </InputsWrapper>
        </Form>
      </ContentWrapper>
    );
  }
}

ChangePasswordForm.propTypes = {
  password: PropTypes.string,
  passwordConfirmation: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.shape({
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
};

export default ChangePasswordForm;

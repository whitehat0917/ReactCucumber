import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEqual from 'lodash/isEqual';
import Typography from 'atoms/Typography';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import ContentWrapper from 'atoms/ContentWrapper';

const Form = styled.form`
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
  margin-bottom: 2rem;
`;

class ResetPasswordForm extends PureComponent {
  state = {
    errors: {
      email: false,
    },
  };

  componentDidUpdate = (prevProps) => {
    const { resetPasswordStatus } = this.props;
    if (!isEqual(resetPasswordStatus, prevProps.resetPasswordStatus) && resetPasswordStatus.errorMessage) {
      this.setState({
        errors: resetPasswordStatus.errorMessage.message,
      });
    }
  }

  handleOnSubmitClick = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(e);
  };

  handleFieldChange = (field) => (e) => {
    const { onChange } = this.props;
    this.setState({
      errors: { email: false },
    });
    onChange(field)(e);
  }

  render() {
    const { errors } = this.state;
    const { email, resetPasswordStatus: { isLoading } } = this.props;
    // FIXME backend errors are inconsistent. Remove this once backend is fixed
    const emailError = errors.email && (errors.email[0] || (errors.email.email && errors.email.email[0]));
    return (
      <ContentWrapper fullHeight>
        <Form onSubmit={this.handleOnSubmitClick}>
          <TitleWrapper>
            <Typography type="h3">Reset Password</Typography>
          </TitleWrapper>
          <InputsWrapper>
            <Input
              name="email"
              placeholder="yantreafalsee@gmail.com"
              value={email}
              onChange={this.handleFieldChange('email')}
              style={{ marginBottom: '1.25rem' }}
              error={Boolean(emailError)}
              errorText={emailError}
            />
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              loading={isLoading}
            >
              Reset
            </Button>
          </InputsWrapper>
        </Form>
      </ContentWrapper>
    );
  }
}

ResetPasswordForm.propTypes = {
  email: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  resetPasswordStatus: PropTypes.shape({
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
};

export default ResetPasswordForm;

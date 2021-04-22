// import Input from 'atoms/Input';
import Button from 'components/Button';
import ContentWrapper from 'components/ContentWrapper';
import Inputs from 'components/Inputs';
// import isEqual from 'lodash/isEqual';
import Typography from 'components/Typography';
import useForm from 'features/core/hooks/useForm';
import qs from 'query-string';
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { changePasswordRequest } from './resetPasswordSlice';

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputsWrapper = styled.div`
  width: 20.375rem;
`;

const TitleWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ChangePasswordForm = ({ status }) => {
  const { uid, token } = qs.parse(window.location.search);
  const { formState, handleChange, submitForm } = useForm({
    new_password1: '',
    new_password2: '',
    uid,
    token,
  });

  return (
    <ContentWrapper>
      <Form onSubmit={(e) => submitForm(e, changePasswordRequest)}>
        <TitleWrapper>
          <Typography type="h3">Set up new password</Typography>
        </TitleWrapper>
        <InputsWrapper>
          <Inputs.TextInput
            name="new_password1"
            value={formState.new_password1}
            type="password"
            onChange={handleChange}
            placeholder="Password"
            errors={status.errors}
          />
          <Inputs.TextInput
            name="new_password2"
            value={formState.new_password2}
            type="password"
            onChange={handleChange}
            placeholder="Confirm Password"
            errors={status.errors}
          />
          <div style={{ marginTop: '2.5rem' }}>
            <Button type="submit" fullWidth disabled={status.isLoading} loading={status.isLoading}>
              Change Password
            </Button>
          </div>
        </InputsWrapper>
      </Form>
    </ContentWrapper>
  );
};
// ChangePasswordForm.propTypes = {
//   password: PropTypes.string,
//   passwordConfirmation: PropTypes.string,
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   status: PropTypes.shape({
//     isLoading: PropTypes.bool,
//     errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   }).isRequired,
// };

export default ChangePasswordForm;

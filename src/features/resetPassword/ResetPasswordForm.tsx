import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import isEqual from 'lodash/isEqual';
import Typography from 'components/Typography';
// import Input from 'atoms/Input';
import Button from 'components/Button';
import ContentWrapper from 'components/ContentWrapper';
import Inputs from 'components/Inputs';
import useForm from '../core/hooks/useForm';

import { resetPasswordRequest } from './resetPasswordSlice';

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

const InputWrapper = styled.div`
margin: 0  0 48px 0;
`;

const constraints = {
  email: {
      presence: {
          allowEmpty: false,
          message: '^field is required'
      },
      email: {
          message: '^not a valid email'
      }
  },
};

const ResetPasswordForm = ({ resetPasswordStatus }) => {
    const { formState, errors, handleChange, submitForm } = useForm({
        email: '',
    }, constraints);
    
    return (
        <ContentWrapper>
        <Form onSubmit={e => submitForm(e, resetPasswordRequest)}>
          <TitleWrapper>
            <Typography type="h3">Reset Password</Typography>
          </TitleWrapper>
          <InputsWrapper>
            <InputWrapper>
              <Inputs.TextInput
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="text"
                    validation={errors}
                    errors={resetPasswordStatus.errors}
                />
            </InputWrapper>
            <Button
              type="submit"
              fullWidth
              disabled={resetPasswordStatus.isLoading}
              loading={resetPasswordStatus.isLoading}
            >
              Reset
            </Button>
          </InputsWrapper>
        </Form>
      </ContentWrapper> 
    );
}

export default ResetPasswordForm;

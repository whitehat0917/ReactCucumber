import Button from 'components/Button';
import ContentWrapper from 'components/ContentWrapper';
import Inputs from 'components/Inputs';
import Link from 'components/Link';
import Typography from 'components/Typography';
import _ from 'lodash';
import React from 'react';
import { signUpRequest } from '../coreSlice';
import useForm from '../hooks/useForm';
// import useFormValidator from '../hooks/useFormValidator';
import { InputsWrapper, Login, TitleWrapper } from '../Login/styled';
import { ContentHolder, Paragraph, SignUpBottom } from './styled';

const constraints = {
  first_name: {
    presence: {
      allowEmpty: false,
      message: '^field is required',
    },
    length: {
      maximum: 40,
      message: '^ensure this field has no more than 40 characters',
    },
  },
  last_name: {
    presence: {
      allowEmpty: false,
      message: '^field is required',
    },
    length: {
      maximum: 40,
      message: '^ensure this field has no more than 40 characters',
    },
  },
  email: {
    presence: {
      allowEmpty: false,
      message: '^field is required',
    },
    email: {
      message: '^not a valid email',
    },
  },
  password1: {
    presence: {
      allowEmpty: false,
      message: '^field is required',
    },
    length: {
      minimum: 8,
      message: '^is too short (minimum is 8 characters)',
    },
  },
  password2: {
    equality: {
      attribute: 'password1',
      message: '^not equal to password',
    },
  },
};

const SignUpForm = ({ status }) => {
  const { formState, errors, handleChange, submitForm } = useForm(
    {
      first_name: '',
      last_name: '',
      email: '',
      password1: '',
      password2: '',
    },
    constraints,
  );

  return (
    <ContentWrapper>
      <Login onSubmit={(e) => submitForm(e, signUpRequest)}>
        <TitleWrapper>
          <Typography type="h3">Sign Up</Typography>
        </TitleWrapper>
        <InputsWrapper>
          <ContentHolder>
            <Inputs.TextInput
              name="first_name"
              value={formState.first_name}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="First Name"
              type="text"
              validation={errors}
              textStyle="small"
            />
            <Inputs.TextInput
              name="last_name"
              value={formState.last_name}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Last Name"
              type="text"
              validation={errors}
              textStyle="small"
            />
            <Inputs.TextInput
              name="email"
              value={formState.email}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Email"
              type="text"
              errors={status.errors}
              validation={errors}
              textStyle="small"
            />
            <Inputs.TextInput
              name="password1"
              value={formState.password1}
              type="password"
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Password"
              errors={status.errors}
              validation={errors}
              textStyle="small"
            />
            <Inputs.TextInput
              name="password2"
              value={formState.password2}
              type="password"
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Confirm Password"
              errors={status.errors}
              validation={errors}
              textStyle="small"
            />
          </ContentHolder>
          <Button type="submit" disabled={!_.isEmpty(errors)} loading={status.isLoading} fullWidth>
            Get Started!
          </Button>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <SignUpBottom>
            <Paragraph>Have an account? </Paragraph>
            <Link
              to="/login"
              // style={{ textAlign: 'center', display: 'block', marginTop: '1.625rem' }}
            >
              Login
            </Link>
          </SignUpBottom>
        </InputsWrapper>
      </Login>
    </ContentWrapper>
  );
};

// class LoginForm extends PureComponent {
//   state = {
//     emailError: false,
//     passwordError: false,
//   }

//   handleEmailChange = (e) => {
//     const { onChange } = this.props;
//     this.setState({ emailError: false });
//     onChange('email')(e);
//   }

//   handlePasswordChange = (e) => {
//     const { onChange } = this.props;
//     this.setState({ passwordError: false });
//     onChange('password')(e);
//   }

//   handleOnSubmitClick = (e) => {
//     e.preventDefault();
//     const { onSubmit } = this.props;
//     const fieldsAreValid = this.validateFields();
//     if (fieldsAreValid) {
//       onSubmit(e);
//     }
//   };

//   handleOauthLoginError = () => {}

//   validateFields = () => {
//     const { email, password } = this.props;
//     this.setState({
//       emailError: !email,
//       passwordError: !password,
//     });
//     return Boolean(email && password);
//   };

//   render() {
//     const { emailError, passwordError } = this.state;
//     const {
//       email, password, loginStatus, onGoogleLoginSuccess, onFacebookLoginSuccess,
//     } = this.props;

//   }
// }

// LoginForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   onGoogleLoginSuccess: PropTypes.func.isRequired,
//   onFacebookLoginSuccess: PropTypes.func.isRequired,
//   email: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   loginStatus: PropTypes.object.isRequired,
// };

export default SignUpForm;

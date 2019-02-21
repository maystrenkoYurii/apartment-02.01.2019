import { combineForms } from 'react-redux-form';

export const formReducer = combineForms(
  {
    signInForm: {
      userNameOrEmail: '',
      userPassword: '',
      remember: false,
    },
    signUpForm: {
      userName: '',
      userEmail: '',
      userPassword: '',
      userConfirmPassword: '',
    },
    recoveryForm: {
      userEmail: '',
    },
    changePasswordForm: {
      userOldPassword: '',
      userNewPassword: '',
      userConfirmNewPassword: '',
    },
  },
  'forms',
);

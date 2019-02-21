import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import {
  intlShape,
  defineMessages,
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import { Form } from 'react-redux-form';
import { curryRight } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Wrapper from '../../../../../containers/Pages/Public/Auth/Wrapper/index';

import { withFetchErrorMessages } from '../../../../AppWrapper/HOK/withFetchErrorMessages';

import {
  TextFieldController,
  CustomTextField,
} from '../../../../FormsElement/TextField/index';
import {
  ButtonController,
  CustomButton,
} from '../../../../FormsElement/Button/index';

import {
  isValidLogin,
  helperTextLogin,
  isValidEmail,
  helperTextEmail,
  isValidPassword,
  helperTextPassword,
  isValidConfirmPassword,
  helperTextConfirmPassword,
} from '../../../../../core/functions/index';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  hint: {
    marginTop: theme.spacing.unit * 2,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  link: {
    fontWeight: 500,
    '&:link': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
    '&:active': {
      color: theme.palette.secondary.main,
    },
  },
});

const messages = defineMessages({
  userName: {
    id: 'app.auth.userName',
    defaultMessage: 'Логін',
  },
  userEmail: {
    id: 'app.auth.email',
    defaultMessage: 'Email',
  },
  userPassword: {
    id: 'app.auth.password',
    defaultMessage: 'Пароль',
  },
  userPasswordConfirm: {
    id: 'app.auth.passwordConfirm',
    defaultMessage: 'Підтвердження пароля',
  },
  hint: {
    id: 'app.auth.signUp.hint',
    defaultMessage:
      'Натискаючи регістрацію, Ви погоджуєтесь з {linkTermsOfUse} та {linkPrivacyPolicy} обробки персональних даних.',
  },
  linkTermsOfUse: {
    id: 'app.auth.signUp.hint.linkTermsOfUse',
    defaultMessage: 'Умовами використання',
  },
  linkPrivacyPolicy: {
    id: 'app.auth.signUp.hint.linkPrivacyPolicy',
    defaultMessage: 'Політикою конфіденційності',
  },
  action: {
    id: 'app.auth.signUp',
    defaultMessage: 'Зареєструватись',
  },
  errorRequired: {
    id: 'app.errors.input.required',
    defaultMessage: 'Обов`язковий для заповнення',
  },
  errorPasswordConfirm: {
    id: 'app.errors.password.confirm',
    defaultMessage: 'Паролі не співпадають',
  },
  errorPasswordLength: {
    id: 'app.errors.password.length',
    defaultMessage: 'Пароль має бути більшим або рівним 8 символів',
  },
  errorPasswordRequiredChars: {
    id: 'app.errors.password.format.requiredChars',
    defaultMessage: 'Пароль має містити цифри, великі та маленькі літери',
  },
  errorPasswordInvalidChars: {
    id: 'app.errors.password.format.invalidChars',
    defaultMessage: 'Пароль містить неприпустимі символи',
  },
  errorEmail: {
    id: 'app.errors.email.format',
    defaultMessage: 'Невірна адреса електронної пошти',
  },
  errorUserNameLength: {
    id: 'app.errors.userName.length',
    defaultMessage: 'Логін має бути більшим або рівним 5 символів',
  },
  errorUserNameInvalidChars: {
    id: 'app.errors.userName.format.invalidChars',
    defaultMessage: 'Логін містить неприпустимі символи',
  },
  success: {
    id: 'app.auth.signUp.success',
    defaultMessage: 'Користувач успішно зареєстрований',
  },
  busyLogin: {
    id: 'app.auth.signUp.error.busyLogin',
    defaultMessage: 'Такий логін використовується іншим користувачем',
  },
  busyEmail: {
    id: 'app.auth.signUp.error.busyEmail',
    defaultMessage: 'Такий email використовується іншим користувачем',
  },
  busyLoginEmail: {
    id: 'app.auth.signUp.error.busyLoginEmail',
    defaultMessage: 'Такий логін та email використовується іншим користувачем',
  },
});

@compose(
  withFetchErrorMessages,
  curryRight(injectIntl),
  withStyles(styles),
)
class SignUp extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
    fetchErrorMessages: PropTypes.object,
    submitForm: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    validateConfirmPassword: PropTypes.func.isRequired,
    onClickTermsOfUse: PropTypes.func.isRequired,
    onClickPrivacyPolicy: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;

    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const {
      classes,
      fetchErrorMessages,
      submitForm,
      formData,
      validateConfirmPassword,
      onClickTermsOfUse,
      onClickPrivacyPolicy,
    } = this.props;
    const { formatMessage } = this.props.intl;
    const { showPassword } = this.state;

    const userName = formData.userName;
    const email = formData.userEmail;
    const password = formData.userPassword;
    const confirmPassword = formData.userConfirmPassword;

    const linkTermsOfUse = (
      <a
        className={classes.link}
        href="javascript:void(0)"
        onClick={onClickTermsOfUse}
      >
        {formatMessage(messages.linkTermsOfUse)}
      </a>
    );

    const linkPrivacyPolicy = (
      <a
        className={classes.link}
        href="javascript:void(0)"
        onClick={onClickPrivacyPolicy}
      >
        {formatMessage(messages.linkPrivacyPolicy)}
      </a>
    );

    return (
      <Wrapper>
        <Form
          className={classes.form}
          model="forms.signUpForm"
          onSubmit={dataForm =>
            submitForm(dataForm, {
              success: formatMessage(messages.success),
              busyLogin: formatMessage(messages.busyLogin),
              busyEmail: formatMessage(messages.busyEmail),
              busyLoginEmail: formatMessage(messages.busyLoginEmail),
              ...fetchErrorMessages,
            })
          }
        >
          <TextFieldController
            fullWidth
            type="text"
            model="forms.signUpForm.userName"
            label={formatMessage(messages.userName)}
            helperText={helperTextLogin(
              userName,
              formatMessage(messages.errorRequired),
              formatMessage(messages.errorUserNameLength),
              formatMessage(messages.errorUserNameInvalidChars),
            )}
            component={CustomTextField}
            margin="normal"
            validators={{
              valid: login => isValidLogin(login),
            }}
          />

          <TextFieldController
            fullWidth
            type="text"
            model="forms.signUpForm.userEmail"
            label={formatMessage(messages.userEmail)}
            helperText={helperTextEmail(
              email,
              formatMessage(messages.errorRequired),
              formatMessage(messages.errorEmail),
            )}
            component={CustomTextField}
            margin="normal"
            validators={{
              valid: email => isValidEmail(email),
            }}
          />

          <TextFieldController
            fullWidth
            type={showPassword ? 'text' : 'password'}
            component={CustomTextField}
            model="forms.signUpForm.userPassword"
            label={formatMessage(messages.userPassword)}
            helperText={helperTextPassword(
              password,
              formatMessage(messages.errorRequired),
              formatMessage(messages.errorPasswordLength),
              formatMessage(messages.errorPasswordInvalidChars),
              formatMessage(messages.errorPasswordRequiredChars),
            )}
            margin="normal"
            validators={{
              valid: password => {
                validateConfirmPassword(password);
                return isValidPassword(password);
              },
            }}
            endAdornment={
              <IconButton
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />

          <TextFieldController
            fullWidth
            type={showPassword ? 'text' : 'password'}
            component={CustomTextField}
            model="forms.signUpForm.userConfirmPassword"
            label={formatMessage(messages.userPasswordConfirm)}
            helperText={helperTextConfirmPassword(
              password,
              confirmPassword,
              formatMessage(messages.errorRequired),
              formatMessage(messages.errorPasswordConfirm),
            )}
            margin="normal"
            validators={{
              valid: confirmPassword => {
                return isValidConfirmPassword(
                  formData.userPassword,
                  confirmPassword,
                );
              },
            }}
          />

          <Typography variant="body2" align="justify" className={classes.hint}>
            <FormattedMessage
              id={messages.hint.id}
              defaultMessage={messages.hint.defaultMessage}
              values={{
                linkTermsOfUse: linkTermsOfUse,
                linkPrivacyPolicy: linkPrivacyPolicy,
              }}
            />
          </Typography>

          <ButtonController
            className={classes.submit}
            model="forms.signUpForm"
            component={CustomButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            {formatMessage(messages.action)}
          </ButtonController>
        </Form>
      </Wrapper>
    );
  }
}

export default SignUp;

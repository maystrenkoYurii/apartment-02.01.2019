import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';
import { Form } from 'react-redux-form';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  TextFieldController,
  CustomTextField,
} from '../../../../../FormsElement/TextField/index';

import {
  isValidPassword,
  isValidNewPassword,
  helperTextPassword,
  helperTextNewPassword,
  isValidConfirmPassword,
  helperTextConfirmPassword,
} from '../../../../../../core/functions/index';

import { withFetchErrorMessages } from '../../../../../AppWrapper/HOK/withFetchErrorMessages';

const messages = defineMessages({
  userOldPassword: {
    id: 'app.profile.changePassword.oldPassword',
    defaultMessage: 'Старий пароль',
  },
  userNewPassword: {
    id: 'app.profile.changePassword.newPassword',
    defaultMessage: 'Новий пароль',
  },
  userNewPasswordConfirm: {
    id: 'app.profile.changePassword.newPasswordConfirm',
    defaultMessage: 'Підтвердження пароля',
  },
  equalsNewOldPassword: {
    id: 'app.profile.changePassword.equalsNewOldPassword',
    defaultMessage: 'Новий пароль співпадає з старим',
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
  success: {
    id: 'app.profile.changePassword.success',
    defaultMessage: 'Пароль успішно змінено',
  },
  invalidOldPassword: {
    id: 'app.profile.changePassword.oldPasswordInvalid',
    defaultMessage: 'Не вірний старий пароль',
  },
});

@compose(
  withFetchErrorMessages,
  curryRight(injectIntl),
)
class FormChangePassword extends Component {
  static propTypes = {
    intl: intlShape,
    fetchErrorMessages: PropTypes.object,
    formData: PropTypes.object.isRequired,
    validateNewPassword: PropTypes.func.isRequired,
    validateConfirmPassword: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
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
    const { formatMessage } = this.props.intl;
    const {
      fetchErrorMessages,
      formData,
      validateConfirmPassword,
      validateNewPassword,
      submitForm,
    } = this.props;
    const { showPassword } = this.state;

    const oldPassword = formData.userOldPassword;
    const newPassword = formData.userNewPassword;
    const confirmPassword = formData.userConfirmNewPassword;

    return (
      <Form
        model="forms.changePasswordForm"
        onSubmit={dataForm =>
          submitForm(dataForm, {
            success: formatMessage(messages.success),
            invalidOldPassword: formatMessage(messages.invalidOldPassword),
            ...fetchErrorMessages,
          })
        }
      >
        <TextFieldController
          fullWidth
          type={showPassword ? 'text' : 'password'}
          component={CustomTextField}
          model="forms.changePasswordForm.userOldPassword"
          label={formatMessage(messages.userOldPassword)}
          helperText={helperTextPassword(
            oldPassword,
            formatMessage(messages.errorRequired),
            formatMessage(messages.errorPasswordLength),
            formatMessage(messages.errorPasswordInvalidChars),
            formatMessage(messages.errorPasswordRequiredChars),
          )}
          margin="normal"
          validators={{
            valid: password => {
              validateNewPassword(password);
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
          model="forms.changePasswordForm.userNewPassword"
          label={formatMessage(messages.userNewPassword)}
          helperText={helperTextNewPassword(
            oldPassword,
            newPassword,
            formatMessage(messages.errorRequired),
            formatMessage(messages.errorPasswordLength),
            formatMessage(messages.errorPasswordInvalidChars),
            formatMessage(messages.errorPasswordRequiredChars),
            formatMessage(messages.equalsNewOldPassword),
          )}
          margin="normal"
          validators={{
            valid: password => {
              validateConfirmPassword(password);
              return isValidNewPassword(oldPassword, password);
            },
          }}
        />

        <TextFieldController
          fullWidth
          type={showPassword ? 'text' : 'password'}
          component={CustomTextField}
          model="forms.changePasswordForm.userConfirmNewPassword"
          label={formatMessage(messages.userNewPasswordConfirm)}
          helperText={helperTextConfirmPassword(
            newPassword,
            confirmPassword,
            formatMessage(messages.errorRequired),
            formatMessage(messages.errorPasswordConfirm),
          )}
          margin="normal"
          validators={{
            valid: confirmPassword => {
              return isValidConfirmPassword(
                formData.userNewPassword,
                confirmPassword,
              );
            },
          }}
        />
      </Form>
    );
  }
}

export default FormChangePassword;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { Form } from 'react-redux-form';
import { curryRight } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
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
  CheckBoxController,
  CustomCheckBox,
} from '../../../../FormsElement/CheckBox/index';

import {
  isValidLength,
  isValidPassword,
  helperTextPassword,
} from '../../../../../core/functions/index';

const styles = theme => ({
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  rememberContent: {
    display: 'flex',
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
});

const messages = defineMessages({
  userName: {
    id: 'app.auth.userNameOrEmail',
    defaultMessage: 'Логін або email',
  },
  userPassword: {
    id: 'app.auth.password',
    defaultMessage: 'Пароль',
  },
  remember: {
    id: 'app.auth.remember',
    defaultMessage: "Запам'ятати",
  },
  action: {
    id: 'app.auth.signIn',
    defaultMessage: 'Увійти',
  },
  errorRequired: {
    id: 'app.errors.input.required',
    defaultMessage: 'Обов`язковий для заповнення',
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
  invalidUser: {
    id: 'app.auth.signIn.error.invalid',
    defaultMessage: 'Невірний логін, email чи пароль',
  },
});

@compose(
  withFetchErrorMessages,
  curryRight(injectIntl),
  withStyles(styles),
)
class SignIn extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
    fetchErrorMessages: PropTypes.object,
    submitForm: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      rememberChecked: false,
    };
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleClickRemember = () => {
    const { rememberChecked } = this.state;
    this.setState({ rememberChecked: !rememberChecked });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { classes, submitForm, formData, fetchErrorMessages } = this.props;
    const { showPassword, rememberChecked } = this.state;

    const password = formData.userPassword;

    return (
      <Wrapper>
        <Form
          className={classes.form}
          model="forms.signInForm"
          onSubmit={dataForm =>
            submitForm(dataForm, {
              invalidUser: formatMessage(messages.invalidUser),
              ...fetchErrorMessages,
            })
          }
        >
          <TextFieldController
            fullWidth
            type="text"
            model="forms.signInForm.userNameOrEmail"
            label={formatMessage(messages.userName)}
            helperText={formatMessage(messages.errorRequired)}
            component={CustomTextField}
            margin="normal"
            id="userNameOrEmail"
            validators={{
              valid: text => {
                return isValidLength(text, 0);
              },
            }}
          />
          <TextFieldController
            fullWidth
            type={showPassword ? 'text' : 'password'}
            component={CustomTextField}
            model="forms.signInForm.userPassword"
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
          <div className={classes.rememberContent}>
            <CheckBoxController
              model="forms.signInForm.remember"
              component={CustomCheckBox}
              checked={rememberChecked}
              onChange={this.handleClickRemember}
              color="primary"
              label={formatMessage(messages.remember)}
            />
          </div>
          <ButtonController
            className={classes.submit}
            model="forms.signInForm"
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

export default SignIn;

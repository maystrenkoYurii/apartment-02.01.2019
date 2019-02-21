import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { Form } from 'react-redux-form';
import { curryRight } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Wrapper from '../../../../../containers/Pages/Public/Auth/Wrapper/index';

import {
  TextFieldController,
  CustomTextField,
} from '../../../../FormsElement/TextField/index';
import {
  ButtonController,
  CustomButton,
} from '../../../../FormsElement/Button/index';

import {
  isValidEmail,
  helperTextEmail,
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
});

const messages = defineMessages({
  userEmail: {
    id: 'app.auth.email',
    defaultMessage: 'Поштова адреса',
  },
  hint: {
    id: 'app.auth.recovery.hint',
    defaultMessage:
      'Введіть поштову адресу вказану під час реєстрації, на неї буде відправлено ваш логін та пароль.',
  },
  action: {
    id: 'app.auth.recovery',
    defaultMessage: 'Відновити',
  },
  errorRequired: {
    id: 'app.errors.input.required',
    defaultMessage: 'Обов`язковий для заповнення',
  },
  errorEmail: {
    id: 'app.errors.email.format',
    defaultMessage: 'Невірна адреса електронної пошти',
  },
});

@compose(
  curryRight(injectIntl),
  withStyles(styles),
)
class Recovery extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
    submitForm: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
  };

  render() {
    const { classes, submitForm, formData } = this.props;
    const { formatMessage } = this.props.intl;

    const email = formData.userEmail;

    return (
      <Wrapper>
        <Form
          className={classes.form}
          model="forms.recoveryForm"
          onSubmit={submitForm}
        >
          <TextFieldController
            fullWidth
            type="text"
            model="forms.recoveryForm.userEmail"
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

          <Typography
            variant="body2"
            color="default"
            align="justify"
            gutterBottom
            className={classes.hint}
          >
            {formatMessage(messages.hint)}
          </Typography>

          <ButtonController
            className={classes.submit}
            model="forms.recoveryForm"
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

export default Recovery;

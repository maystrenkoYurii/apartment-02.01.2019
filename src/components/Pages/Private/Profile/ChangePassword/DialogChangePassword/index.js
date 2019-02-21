import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import AppDialog from '../../../../../../containers/AppDialog/index';
import FormChangePassword from '../../../../../../containers/Pages/Private/Profile/ChangePassword/FormChangePassword/index';

import {
  ButtonController,
  CustomButton,
} from '../../../../../FormsElement/Button/index';

const messages = defineMessages({
  changePassword: {
    id: 'app.dialog.changePassword',
    defaultMessage: 'Зміна паролю',
  },
  close: {
    id: 'app.dialog.action.close',
    defaultMessage: 'Закрити',
  },
  submit: {
    id: 'app.dialog.action.change',
    defaultMessage: 'Змінити',
  },
});

const styles = theme => ({
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: theme.spacing.unit * 3,
  },
});

@compose(
  withStyles(styles),
  curryRight(injectIntl),
)
class DialogChangePassword extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
    isOpenChangePassword: PropTypes.bool.isRequired,
    onClickClose: PropTypes.func.isRequired,
    onClickChange: PropTypes.func.isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;
    const {
      classes,
      onClickClose,
      onClickChange,
      isOpenChangePassword,
    } = this.props;

    return (
      <AppDialog
        maxWidth="xs"
        fullWidth
        open={isOpenChangePassword}
        onClose={onClickClose}
      >
        <DialogTitle>{formatMessage(messages.changePassword)}</DialogTitle>
        <DialogContent className={classes.formContent}>
          <FormChangePassword isDialog />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose} color="primary">
            {formatMessage(messages.close)}
          </Button>
          <ButtonController
            model="forms.changePasswordForm"
            component={CustomButton}
            color="primary"
            onClick={onClickChange}
          >
            {formatMessage(messages.submit)}
          </ButtonController>
        </DialogActions>
      </AppDialog>
    );
  }
}

export default DialogChangePassword;

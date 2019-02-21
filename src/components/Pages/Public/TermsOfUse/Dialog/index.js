import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import AppDialog from '../../../../../containers/AppDialog/index';
import Content from '../../../../../containers/Pages/Public/TermsOfUse/Content/index';

const messages = defineMessages({
  termsOfUse: {
    id: 'app.page-dialog.termsOfUse',
    defaultMessage: 'Умови використання',
  },
  close: {
    id: 'app.dialog.action.close',
    defaultMessage: 'Закрити',
  },
});

@compose(curryRight(injectIntl))
class DialogTermsOfUse extends Component {
  static propTypes = {
    intl: intlShape,
    isOpenTermsOfUse: PropTypes.bool.isRequired,
    onClickClose: PropTypes.func.isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { isOpenTermsOfUse, onClickClose } = this.props;

    return (
      <AppDialog open={isOpenTermsOfUse} onClose={onClickClose}>
        <DialogTitle>{formatMessage(messages.termsOfUse)}</DialogTitle>
        <DialogContent>
          <Content />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose} color="primary">
            {formatMessage(messages.close)}
          </Button>
        </DialogActions>
      </AppDialog>
    );
  }
}

export default DialogTermsOfUse;

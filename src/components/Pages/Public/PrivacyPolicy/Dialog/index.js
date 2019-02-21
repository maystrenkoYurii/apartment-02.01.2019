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
import Content from '../../../../../containers/Pages/Public/PrivacyPolicy/Content/index';

const messages = defineMessages({
  privacyPolicy: {
    id: 'app.page-dialog.privacyPolicy',
    defaultMessage: 'Політика конфіденційності',
  },
  close: {
    id: 'app.dialog.action.close',
    defaultMessage: 'Закрити',
  },
});

@compose(curryRight(injectIntl))
class DialogPrivacyPolicy extends Component {
  static propTypes = {
    intl: intlShape,
    isOpenPrivacyPolicy: PropTypes.bool.isRequired,
    onClickClose: PropTypes.func.isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { isOpenPrivacyPolicy, onClickClose } = this.props;

    return (
      <AppDialog open={isOpenPrivacyPolicy} onClose={onClickClose}>
        <DialogTitle>{formatMessage(messages.privacyPolicy)}</DialogTitle>
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

export default DialogPrivacyPolicy;

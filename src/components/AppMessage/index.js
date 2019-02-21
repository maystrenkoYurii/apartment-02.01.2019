import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _, { toString } from 'lodash';

import Snackbar from '@material-ui/core/Snackbar';

class AppMessage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    appMessage: PropTypes.object.isRequired,
    autoHideDuration: PropTypes.number,
  };

  static defaultProps = {
    autoHideDuration: 5 * 1000,
  };

  handleRequestClose = () => {
    const { actions } = this.props;
    actions.setAppMessageState('');
  };

  getMessage = () => {
    const { appMessage } = this.props;
    return toString(_.get(appMessage, 'message'));
  };

  render() {
    const { autoHideDuration } = this.props;

    const message = this.getMessage();

    return (
      <Snackbar
        open={message.length > 1}
        color="accent"
        onClose={this.handleRequestClose}
        autoHideDuration={autoHideDuration}
        message={<span id="message-id">{message}</span>}
      />
    );
  }
}

export default AppMessage;

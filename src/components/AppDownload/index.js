import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

import { isOpenDownload } from '../../core/functions/common';

const styles = theme => ({
  content: {
    display: 'inline-flex',
    padding: theme.spacing.unit * 2,
    alignItems: 'center',
  },
  progress: {
    marginRight: theme.spacing.unit * 2,
  },
});

const messages = defineMessages({
  download: {
    id: 'app.message.fetch',
    defaultMessage: 'Завантаження...',
  },
});

@compose(
  withStyles(styles),
  curryRight(injectIntl),
)
class AppDownload extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
    fetching: PropTypes.object.isRequired,
  };

  renderTransition = props => {
    return <Grow direction="up" {...props} />;
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { classes, fetching } = this.props;

    return (
      <Dialog
        open={isOpenDownload(fetching)}
        TransitionComponent={this.renderTransition}
      >
        <div className={classes.content}>
          <CircularProgress className={classes.progress} />
          <Typography variant="body1">
            {formatMessage(messages.download)}
          </Typography>
        </div>
      </Dialog>
    );
  }
}

export default AppDownload;

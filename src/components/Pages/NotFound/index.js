import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing.unit,
  },
});

const messages = defineMessages({
  notFound: {
    id: 'app.page.notFound',
    defaultMessage: 'Не знайдено',
  },
});

@compose(
  withStyles(styles),
  curryRight(injectIntl),
)
class NotFound extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h3" align="center">
          {'404'}
        </Typography>
        <Typography variant="h4" align="center">
          {formatMessage(messages.notFound)}
        </Typography>
      </div>
    );
  }
}

export default NotFound;

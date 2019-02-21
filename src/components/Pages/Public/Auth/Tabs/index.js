import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  intlShape,
  defineMessages,
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import compose from 'recompose/compose';
import { curryRight } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
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
  signInHint: {
    id: 'app.auth.tab.signIn.hint',
    defaultMessage: 'Повернутись до {linkSignIn}',
  },
  signInLink: {
    id: 'app.auth.tab.signIn.hint.linkSignIn',
    defaultMessage: 'Входу',
  },
  signUpHint: {
    id: 'app.auth.tab.signUp.hint',
    defaultMessage: 'Немає аккаунта? {linkSignUp}',
  },
  signUpLink: {
    id: 'app.auth.tab.signUp.hint.linkSignUp',
    defaultMessage: 'Зареєструватись',
  },
  recoveryHint: {
    id: 'app.auth.tab.recovery.hint',
    defaultMessage: 'Забули пароль? {linkRecovery}',
  },
  recoveryLink: {
    id: 'app.auth.tab.recovery.hint.linkRecovery',
    defaultMessage: 'Відновити',
  },
});

@compose(
  curryRight(injectIntl),
  withStyles(styles),
)
class Tabs extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
    positionTab: PropTypes.number.isRequired,
    onChangePositionTab: PropTypes.func.isRequired,
  };

  handleChangePositionTab = position => {
    const { onChangePositionTab } = this.props;
    onChangePositionTab(position);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { classes, positionTab } = this.props;

    const linkSignIn = (
      <a
        className={classes.link}
        href="javascript:void(0)"
        onClick={() => this.handleChangePositionTab(0)}
      >
        {formatMessage(messages.signInLink)}
      </a>
    );

    const linkSignUp = (
      <a
        className={classes.link}
        href="javascript:void(0)"
        onClick={() => this.handleChangePositionTab(1)}
      >
        {formatMessage(messages.signUpLink)}
      </a>
    );

    const linkRecovery = (
      <a
        className={classes.link}
        href="javascript:void(0)"
        onClick={() => this.handleChangePositionTab(2)}
      >
        {formatMessage(messages.recoveryLink)}
      </a>
    );

    return (
      <div className={classes.root}>
        {positionTab === 0 ? (
          <Fragment>
            <Typography variant="body2" align="center" gutterBottom>
              <FormattedMessage
                id={messages.signUpHint.id}
                defaultMessage={messages.signUpHint.defaultMessage}
                values={{
                  linkSignUp: linkSignUp,
                }}
              />
            </Typography>
            <Typography variant="body2" align="center">
              <FormattedMessage
                id={messages.recoveryHint.id}
                defaultMessage={messages.recoveryHint.defaultMessage}
                values={{
                  linkRecovery: linkRecovery,
                }}
              />
            </Typography>
          </Fragment>
        ) : (
          <Typography variant="body2" align="center">
            <FormattedMessage
              id={messages.signInHint.id}
              defaultMessage={messages.signInHint.defaultMessage}
              values={{
                linkSignIn: linkSignIn,
              }}
            />
          </Typography>
        )}
      </div>
    );
  }
}

export default Tabs;

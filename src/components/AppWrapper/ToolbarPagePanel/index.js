import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import { constants } from '../../../core/constants/index';
import { isAuthenticatedInterface } from '../../../core/functions/index';
import { withPageHelper } from '../HOK/withPageHelper';

import PopoverMenu from '../../../containers/AppWrapper/ToolbarPagePanel/PopoverMenu';
import ToolbarSearchView from '../../../containers/AppWrapper/ToolbarPagePanel/ToolbarSearchView';

const styles = () => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: '1',
  },
  content: {
    display: 'inline-flex',
    alignItems: 'center',
  },
});

@compose(
  withPageHelper,
  withStyles(styles),
)
class ToolbarPagePanel extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onClickAuth: PropTypes.func,
    authUser: PropTypes.object,
    location: PropTypes.object.isRequired,
  };

  renderSignInOrUserAction = () => {
    const { location, authUser, onClickAuth } = this.props;

    const path = location.pathname;

    if (
      path !== constants.PATCH_URL_AUTH &&
      !isAuthenticatedInterface(authUser)
    ) {
      return (
        <IconButton color="inherit" onClick={onClickAuth}>
          <HomeIcon />
        </IconButton>
      );
    }

    return <Fragment />;
  };

  renderPagePanel = () => {
    const { location } = this.props;

    const path = location.pathname;

    switch (path) {
      case constants.PATCH_URL_HOME:
        return <Fragment />;

      case constants.PATCH_URL_PROFILE:
        return <ToolbarSearchView />;

      default:
        return <Fragment />;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          {this.renderPagePanel()}
          {this.renderSignInOrUserAction()}
          <PopoverMenu />
        </div>
      </div>
    );
  }
}

export default ToolbarPagePanel;

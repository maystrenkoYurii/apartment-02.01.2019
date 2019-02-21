import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/ArrowBack';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import { isAuthenticatedInterface } from '../../../core/functions/index';
import { constants } from '../../../core/constants/index';

import { withPageHelper } from '../HOK/withPageHelper';

const styles = theme => ({
  root: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: '3',
    minWidth: 100,
  },
  title: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

@compose(
  withPageHelper,
  withStyles(styles),
)
class ToolbarAppPanel extends Component {
  static propTypes = {
    classes: PropTypes.object,
    getPageTitle: PropTypes.func,
    onClickHome: PropTypes.func,
    location: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired,
    onOpenDrawer: PropTypes.func.isRequired,
    onCloseDrawer: PropTypes.func.isRequired,
    onOpenDrawerMobile: PropTypes.func.isRequired,
    onClickBack: PropTypes.func.isRequired,
    onClickLogo: PropTypes.func.isRequired,
    isOpenDrawer: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    getPageTitle: () => '',
  };

  renderTitle = pageTitle => {
    const { classes } = this.props;

    return (
      <Typography className={classes.title} variant="h6" color="inherit" noWrap>
        {pageTitle}
      </Typography>
    );
  };

  renderDrawerTitle = pageTitle => {
    const {
      onOpenDrawer,
      onCloseDrawer,
      onOpenDrawerMobile,
      isOpenDrawer,
    } = this.props;

    return (
      <Fragment>
        <Hidden smDown implementation="css">
          {!isOpenDrawer ? (
            <IconButton color="inherit" onClick={onOpenDrawer}>
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={onCloseDrawer}>
              <ChevronLeft />
            </IconButton>
          )}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton color="inherit" onClick={onOpenDrawerMobile}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        {this.renderTitle(pageTitle)}
      </Fragment>
    );
  };

  renderBackTitle = pageTitle => {
    const { onClickBack } = this.props;

    return (
      <Fragment>
        <IconButton color="inherit" onClick={onClickBack}>
          <BackIcon />
        </IconButton>
        {this.renderTitle(pageTitle)}
      </Fragment>
    );
  };

  renderPanel = () => {
    const { location, getPageTitle, authUser } = this.props;

    const path = location.pathname;
    const pageTitle = getPageTitle(path);

    switch (path) {
      case constants.PATCH_URL_HOME:
        return null;

      case constants.PATCH_URL_AUTH:
        return this.renderBackTitle(pageTitle);

      case constants.PATCH_URL_ABOUT:
        return isAuthenticatedInterface(authUser)
          ? this.renderDrawerTitle(pageTitle)
          : this.renderBackTitle(pageTitle);

      case constants.PATCH_URL_TERM_OF_USE:
        return isAuthenticatedInterface(authUser)
          ? this.renderDrawerTitle(pageTitle)
          : this.renderBackTitle(pageTitle);

      case constants.PATCH_URL_PRIVACY_POLICY:
        return isAuthenticatedInterface(authUser)
          ? this.renderDrawerTitle(pageTitle)
          : this.renderBackTitle(pageTitle);

      default:
        return this.renderDrawerTitle(pageTitle);
    }
  };

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>{this.renderPanel()}</div>;
  }
}

export default ToolbarAppPanel;

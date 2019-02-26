import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppHelmet from '../../containers/AppHelmet';
import AppMessage from '../../containers/AppMessage/index';
import AppDownload from '../../containers/AppDownload/index';
import AppLanguageDialog from '../../containers/AppLanguage';
import AppTermsOfUseDialog from '../../containers/Pages/Public/TermsOfUse/Dialog/index';
import AppPrivacyPolicyDialog from '../../containers/Pages/Public/PrivacyPolicy/Dialog/index';
import DialogChangePassword from '../../containers/Pages/Private/Profile/ChangePassword/DialogChangePassword';

import Header from '../../containers/AppWrapper/Drawer/Header';
import Menu from '../../containers/AppWrapper/Drawer/Menu/index';
import ToolbarPagePanel from '../../containers/AppWrapper/ToolbarPagePanel/index';
import ToolbarAppPanel from '../../containers/AppWrapper/ToolbarAppPanel/index';

import { isAuthenticatedInterface } from '../../core/functions/common';
import { constants } from '../../core/constants/index';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  appBar: {
    width: '100%',
  },
  appBarShift: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  appBarAnimated: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarAnimatedShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  contentShift: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  contentAnimated: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentAnimatedShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    flexShrink: 0,
  },
});

@compose(withStyles(styles))
class AppWrapper extends Component {
  static propTypes = {
    classes: PropTypes.object,
    width: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
    location: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired,
    isOpenDrawer: PropTypes.bool.isRequired,
    isOpenDrawerMobile: PropTypes.bool.isRequired,
    onCloseDrawerMobile: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const renderDrawer =
      isAuthenticatedInterface(nextProps.authUser) &&
      nextProps.location.pathname !== constants.PATCH_URL_HOME;

    if (!renderDrawer) {
      return {
        animatedContent: false,
        isOpenDrawer: nextProps.isOpenDrawer,
        renderDrawer: renderDrawer,
      };
    }

    if (nextProps.isOpenDrawer !== prevState.isOpenDrawer) {
      return {
        animatedContent: true,
        isOpenDrawer: nextProps.isOpenDrawer,
        renderDrawer: renderDrawer,
      };
    }

    return {
      renderDrawer: renderDrawer,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpenDrawer: props.isOpenDrawer,
      animatedContent: false,
      renderDrawer: false,
    };
  }

  render() {
    const {
      classes,
      children,
      isOpenDrawer,
      isOpenDrawerMobile,
      onCloseDrawerMobile,
    } = this.props;

    const { animatedContent, renderDrawer } = this.state;

    const drawerContent = (
      <Fragment>
        <Header />
        <Menu />
      </Fragment>
    );

    const drawer = renderDrawer ? (
      <Fragment>
        <Hidden smDown implementation="css">
          <Drawer
            variant="persistent"
            open={isOpenDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            open={isOpenDrawerMobile}
            onClose={onCloseDrawerMobile}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </Fragment>
    ) : (
      <Fragment />
    );

    return (
      <Fragment>
        <CssBaseline />
        <AppHelmet />
        <AppMessage />
        <AppDownload />
        <AppLanguageDialog />
        <AppTermsOfUseDialog />
        <AppPrivacyPolicyDialog />
        <DialogChangePassword />
        <div className={classes.root}>
          <AppBar
            position="fixed"
            className={classNames(
              animatedContent
                ? isOpenDrawer
                  ? [classes.appBar, classes.appBarAnimatedShift]
                  : [classes.appBar, classes.appBarAnimated]
                : isOpenDrawer && renderDrawer
                ? [classes.appBar, classes.appBarShift]
                : classes.appBar,
            )}
          >
            <Toolbar disableGutters className={classes.toolbar}>
              <ToolbarAppPanel />
              <ToolbarPagePanel />
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(
              animatedContent
                ? isOpenDrawer
                  ? [classes.content, classes.contentAnimatedShift]
                  : [classes.content, classes.contentAnimated]
                : isOpenDrawer && renderDrawer
                ? [classes.content, classes.contentShift]
                : classes.content,
            )}
          >
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default AppWrapper;

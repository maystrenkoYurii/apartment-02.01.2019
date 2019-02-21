import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import UserAction from '../../../../containers/AppWrapper/Drawer/Header/UserAction';
import SvgLogoApartment from '../../../SvgImage/LogoApartment';

const styles = theme => ({
  root: {
    width: '100%',
  },
  app: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit,
    ...theme.mixins.toolbar,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  logo: {
    width: 90,
    fill: theme.palette.primary.main,
  },
  typography: {
    marginLeft: theme.spacing.unit,
    marginRight: 6,
  },
});

@compose(withStyles(styles))
class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.app}>
          <SvgLogoApartment className={classes.logo} />
        </div>
        <div className={classes.user}>
          <UserAction />
        </div>
        <Divider />
      </div>
    );
  }
}

export default Header;

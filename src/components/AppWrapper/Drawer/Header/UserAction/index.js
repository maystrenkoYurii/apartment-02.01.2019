import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import _, { curryRight } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import avatarDefault from '../../../../../assets/images/avatar-default.jpg';

const styles = theme => ({
  root: {
    width: '100%',
  },
  avatarButtonBase: {
    width: '100%',
    height: 48,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 24,
    justifyContent: 'space-between',
    background: theme.palette.action.selected,
  },
  iconAvatar: {
    flex: '0 0 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconChevron: {
    flex: '0 0 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    pointerEvents: 'none',
  },
  typography: {
    width: '100%',
    minWidth: '1%',
  },
});

const messages = defineMessages({
  profile: {
    id: 'app.page.profile',
    defaultMessage: 'Профіль',
  },
  changePassword: {
    id: 'app.profile.changePassword',
    defaultMessage: 'Змінити пароль',
  },
  logout: {
    id: 'app.auth.logout',
    defaultMessage: 'Вийти',
  },
});

const keyItems = {
  changePassword: 'changePassword',
  logout: 'logout',
};

@compose(
  withStyles(styles),
  curryRight(injectIntl),
)
class UserAction extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
    authUser: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  handleClickOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  handleClickMenu = key => {
    const { actions } = this.props;
    this.handleClickClose();
    switch (key) {
      case keyItems.changePassword:
        return actions.setChangePasswordDialogState(true);
      case keyItems.logout:
        return actions.setFetchLogoutUserByTokenAsync();
      default:
        return () => null;
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { classes, authUser } = this.props;
    const { open, anchorEl } = this.state;

    const user =
      _.get(authUser, 'profile.displayName') || _.get(authUser, 'user.email');
    const avatar = avatarDefault;

    const menuItems = [
      {
        id: keyItems.changePassword,
        value: formatMessage(messages.changePassword),
      },
      {
        id: keyItems.logout,
        value: formatMessage(messages.logout),
      },
    ];

    return (
      <div className={classes.root}>
        <ButtonBase
          className={classes.avatarButtonBase}
          onClick={this.handleClickOpen}
        >
          <div className={classes.iconAvatar}>
            <Avatar alt={user} src={avatar} className={classes.avatar} />
          </div>
          <Typography
            className={classes.typography}
            variant="subtitle1"
            color="inherit"
            align="center"
            noWrap
          >
            {user}
          </Typography>
          <div className={classes.iconChevron}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />}
          </div>
        </ButtonBase>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClickClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {menuItems.map(option => (
            <MenuItem
              key={option.id}
              onClick={() => this.handleClickMenu(option.id)}
            >
              {option.value}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default UserAction;

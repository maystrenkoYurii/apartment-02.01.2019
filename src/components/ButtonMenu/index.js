import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';

class MenuButton extends Component {
  static propTypes = {
    onClickItem: PropTypes.func,
    menuItems: PropTypes.array,
    colorIcon: PropTypes.string,
  };

  static defaultProps = {
    onClick: () => null,
    menuItems: [],
    colorIcon: 'inherit',
  };

  constructor() {
    super(...arguments);
    this.state = {
      anchorEl: null,
      openMenu: false,
    };
  }

  handleClickOpen = event => {
    this.setState({ openMenu: true, anchorEl: event.currentTarget });
  };

  handleClickClose = () => {
    this.setState({ openMenu: false });
  };

  handleMenuClick = menuId => {
    const { onClickItem } = this.props;
    onClickItem(menuId);
    this.handleClickClose();
  };

  render() {
    const { menuItems, colorIcon } = this.props;
    const { openMenu, anchorEl } = this.state;

    if (menuItems.length > 0) {
      return (
        <div>
          <IconButton onClick={this.handleClickOpen} color={colorIcon}>
            <MoreVert />
          </IconButton>

          <Menu
            open={openMenu}
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
                onClick={() => this.handleMenuClick(option.id)}
              >
                {option.value}
              </MenuItem>
            ))}
          </Menu>
        </div>
      );
    }
    return <Fragment />;
  }
}

export default MenuButton;

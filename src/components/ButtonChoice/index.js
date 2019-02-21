import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DropDown from '@material-ui/icons/ArrowDropDown';

const styles = theme => ({
  button: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit - 3,
    paddingBottom: theme.spacing.unit - 3,
    minWidth: 20,
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: 0,
    fontSize: 22,
  },
});

@compose(withStyles(styles))
class ButtonChoice extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    menuItems: PropTypes.array,
    selected: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    menuItems: [],
  };

  constructor() {
    super(...arguments);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  get getText() {
    const { menuItems, selected } = this.props;
    return menuItems[selected].value;
  }

  handleClickOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  handleMenuClick = menuId => () => {
    const { onClick } = this.props;
    onClick(menuId);
    this.handleClickClose();
  };

  render() {
    const { classes, menuItems } = this.props;
    const { open, anchorEl } = this.state;
    const { getText } = this;

    if (menuItems.length > 0) {
      return (
        <div>
          <Button className={classes.button} onClick={this.handleClickOpen}>
            {getText}
            <DropDown className={classes.icon} />
          </Button>

          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClickClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {menuItems.map((option, index) => (
              <MenuItem
                key={option.id}
                onClick={this.handleMenuClick(option.id, index)}
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

export default ButtonChoice;

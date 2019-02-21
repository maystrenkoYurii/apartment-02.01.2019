import PropTypes from 'prop-types';
import React, { Component } from 'react';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import UserIcon from '@material-ui/icons/AccountCircle';
import UsersIcon from '@material-ui/icons/SupervisedUserCircle';
import EmailIcon from '@material-ui/icons/Email';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ObjectIcon from '@material-ui/icons/Domain';
import OrganizationsIcon from '@material-ui/icons/DeviceHub';
import StatisticsIcon from '@material-ui/icons/Timeline';
import NewsIcon from '@material-ui/icons/NewReleasesOutlined';
import NotesIcon from '@material-ui/icons/NoteOutlined';
import AboutIcon from '@material-ui/icons/InfoOutlined';

import { constants } from '../../../../core/constants/index';

import { withPageHelper } from '../../HOK/withPageHelper';

const styles = () => ({
  root: {
    width: '100%',
    height: '100%',
  },
});

@compose(
  withPageHelper,
  withStyles(styles),
)
class Menu extends Component {
  static propTypes = {
    classes: PropTypes.object,
    getPageTitle: PropTypes.func,
    onClickProfile: PropTypes.func,
    onClickMessages: PropTypes.func,
    onClickNotifications: PropTypes.func,
    onClickUsers: PropTypes.func,
    onClickObject: PropTypes.func,
    onClickOrganizations: PropTypes.func,
    onClickStatistics: PropTypes.func,
    onClickNews: PropTypes.func,
    onClickNotes: PropTypes.func,
    onClickAbout: PropTypes.func,
    location: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      location,
      getPageTitle,
      onClickProfile,
      onClickMessages,
      onClickNotifications,
      onClickUsers,
      onClickObject,
      onClickOrganizations,
      onClickStatistics,
      onClickNews,
      onClickNotes,
      onClickAbout,
    } = this.props;

    const path = location.pathname;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            onClick={onClickProfile}
            selected={path === constants.PATCH_URL_PROFILE}
          >
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
            <ListItemText primary={getPageTitle(constants.PATCH_URL_PROFILE)} />
          </ListItem>

          <ListItem
            button
            onClick={onClickMessages}
            selected={path === constants.PATCH_URL_MESSAGES}
          >
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary={getPageTitle(constants.PATCH_URL_MESSAGES)}
            />
          </ListItem>

          <ListItem
            button
            onClick={onClickNotifications}
            selected={path === constants.PATCH_URL_NOTIFICATIONS}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText
              primary={getPageTitle(constants.PATCH_URL_NOTIFICATIONS)}
            />
          </ListItem>

          <ListItem
            button
            onClick={onClickObject}
            selected={path === constants.PATCH_URL_OBJECT}
          >
            <ListItemIcon>
              <ObjectIcon />
            </ListItemIcon>
            <ListItemText primary={getPageTitle(constants.PATCH_URL_OBJECT)} />
          </ListItem>

          <ListItem
            button
            onClick={onClickUsers}
            selected={path === constants.PATCH_URL_USERS}
          >
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText primary={getPageTitle(constants.PATCH_URL_USERS)} />
          </ListItem>

          <ListItem
            button
            onClick={onClickOrganizations}
            selected={path === constants.PATCH_URL_ORGANIZATIONS}
          >
            <ListItemIcon>
              <OrganizationsIcon />
            </ListItemIcon>
            <ListItemText
              primary={getPageTitle(constants.PATCH_URL_ORGANIZATIONS)}
            />
          </ListItem>

          <ListItem
            button
            onClick={onClickStatistics}
            selected={path === constants.PATCH_URL_STATISTICS}
          >
            <ListItemIcon>
              <StatisticsIcon />
            </ListItemIcon>
            <ListItemText
              primary={getPageTitle(constants.PATCH_URL_STATISTICS)}
            />
          </ListItem>

          <ListItem
            button
            onClick={onClickNotes}
            selected={path === constants.PATCH_URL_NOTES}
          >
            <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
            <ListItemText primary={getPageTitle(constants.PATCH_URL_NOTES)} />
          </ListItem>

          <Divider />

          <ListItem
            button
            onClick={onClickNews}
            selected={path === constants.PATCH_URL_NEWS}
          >
            <ListItemIcon>
              <NewsIcon />
            </ListItemIcon>
            <ListItemText primary={getPageTitle(constants.PATCH_URL_NEWS)} />
          </ListItem>

          <ListItem
            button
            onClick={onClickAbout}
            selected={path === constants.PATCH_URL_ABOUT}
          >
            <ListItemIcon>
              <AboutIcon />
            </ListItemIcon>
            <ListItemText primary={getPageTitle(constants.PATCH_URL_ABOUT)} />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default Menu;

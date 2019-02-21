import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

import { withPageHelper } from '../../../../AppWrapper/HOK/withPageHelper';
import { constants } from '../../../../../core/constants/index';

import SvgProfile from '../../../../SvgImage/Profile';
import SvgMessages from '../../../../SvgImage/Messages';
import SvgNotifications from '../../../../SvgImage/Notifications';
import SvgUsers from '../../../../SvgImage/Users';
import SvgObject from '../../../../SvgImage/Object';
import SvgOrganizations from '../../../../SvgImage/Organizations';
import SvgStatistics from '../../../../SvgImage/Statistics';
import SvgNews from '../../../../SvgImage/News';
import SvgNotes from '../../../../SvgImage/Notes';
import SvgAbout from '../../../../SvgImage/About';

const styles = theme => ({
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: -theme.spacing.unit,
    marginTop: -theme.spacing.unit,
  },
  card: {
    flex: '1 1 19%',
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 31%',
    },
    [theme.breakpoints.down('xs')]: {
      flex: `1 1 44%`,
    },
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    minWidth: 100,
  },
  action: {
    width: '100%',
    height: '100%',
  },
  iconContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 4,
  },
  icon: {
    fill: theme.palette.primary.main,
    width: 80,
    [theme.breakpoints.down('xs')]: {
      width: 60,
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

const keyItems = {
  profile: 'profile',
  messages: 'messages',
  notifications: 'notifications',
  users: 'users',
  object: 'object',
  organizations: 'organizations',
  statistics: 'statistics',
  notes: 'notes',
  about: 'about',
  news: 'news',
};

@compose(
  withPageHelper,
  withStyles(styles),
)
class HomeMenuPanel extends Component {
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
    onClickNotes: PropTypes.func,
    onClickAbout: PropTypes.func,
    onClickNews: PropTypes.func,
  };

  handleClickItem = key => {
    const {
      onClickProfile,
      onClickMessages,
      onClickNotifications,
      onClickUsers,
      onClickObject,
      onClickOrganizations,
      onClickStatistics,
      onClickNotes,
      onClickNews,
      onClickAbout,
    } = this.props;

    switch (key) {
      case keyItems.profile:
        return onClickProfile();
      case keyItems.messages:
        return onClickMessages();
      case keyItems.notifications:
        return onClickNotifications();
      case keyItems.users:
        return onClickUsers();
      case keyItems.object:
        return onClickObject();
      case keyItems.organizations:
        return onClickOrganizations();
      case keyItems.statistics:
        return onClickStatistics();
      case keyItems.notes:
        return onClickNotes();
      case keyItems.about:
        return onClickAbout();
      case keyItems.news:
        return onClickNews();
      default:
        return () => null;
    }
  };

  render() {
    const { classes, getPageTitle } = this.props;

    const cards = [
      {
        id: keyItems.profile,
        title: getPageTitle(constants.PATCH_URL_PROFILE),
      },
      {
        id: keyItems.messages,
        title: getPageTitle(constants.PATCH_URL_MESSAGES),
      },
      {
        id: keyItems.notifications,
        title: getPageTitle(constants.PATCH_URL_NOTIFICATIONS),
      },
      {
        id: keyItems.users,
        title: getPageTitle(constants.PATCH_URL_USERS),
      },
      {
        id: keyItems.object,
        title: getPageTitle(constants.PATCH_URL_OBJECT),
      },
      {
        id: keyItems.organizations,
        title: getPageTitle(constants.PATCH_URL_ORGANIZATIONS),
      },
      {
        id: keyItems.statistics,
        title: getPageTitle(constants.PATCH_URL_STATISTICS),
      },
      {
        id: keyItems.notes,
        title: getPageTitle(constants.PATCH_URL_NOTES),
      },
      {
        id: keyItems.about,
        title: getPageTitle(constants.PATCH_URL_ABOUT),
      },
      {
        id: keyItems.news,
        title: getPageTitle(constants.PATCH_URL_NEWS),
      },
    ];

    const svgIcon = id => {
      switch (id) {
        case keyItems.profile:
          return <SvgProfile className={classes.icon} />;
        case keyItems.messages:
          return <SvgMessages className={classes.icon} />;
        case keyItems.notifications:
          return <SvgNotifications className={classes.icon} />;
        case keyItems.users:
          return <SvgUsers className={classes.icon} />;
        case keyItems.object:
          return <SvgObject className={classes.icon} />;
        case keyItems.organizations:
          return <SvgOrganizations className={classes.icon} />;
        case keyItems.statistics:
          return <SvgStatistics className={classes.icon} />;
        case keyItems.notes:
          return <SvgNotes className={classes.icon} />;
        case keyItems.about:
          return <SvgAbout className={classes.icon} />;
        case keyItems.news:
          return <SvgNews className={classes.icon} />;
        default:
          return () => null;
      }
    };

    return (
      <div className={classes.cards}>
        {cards.map(card => (
          <Paper key={card.title} className={classes.card}>
            <CardActionArea
              className={classes.action}
              onClick={() => this.handleClickItem(card.id)}
            >
              <div className={classes.iconContent}>{svgIcon(card.id)}</div>
              <div className={classes.footer}>
                <Typography variant="button" align="center" noWrap>
                  {card.title}
                </Typography>
              </div>
            </CardActionArea>
          </Paper>
        ))}
      </div>
    );
  }
}

export default HomeMenuPanel;

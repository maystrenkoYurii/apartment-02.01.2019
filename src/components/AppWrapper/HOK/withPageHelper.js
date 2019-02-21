import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isAuthenticatedInterface } from '../../../core/functions/common';
import { constants } from '../../../core/constants/index';

import { uiActions } from '../../../flux-saga/bus/ui/actions';
import { uiActionsAsync } from '../../../flux-saga/bus/ui/saga/asyncActions';

export const withPageHelper = Enchanced => {
  const messages = defineMessages({
    auth: {
      id: 'app.page.auth',
      defaultMessage: 'Аутентифікація',
    },
    termsOfUse: {
      id: 'app.page-dialog.termsOfUse',
      defaultMessage: 'Умови використання',
    },
    privacyPolicy: {
      id: 'app.page-dialog.privacyPolicy',
      defaultMessage: 'Політика конфіденційності',
    },
    profile: {
      id: 'app.page.profile',
      defaultMessage: 'Профіль',
    },
    messages: {
      id: 'app.page.messages',
      defaultMessage: 'Повідомлення',
    },
    notifications: {
      id: 'app.page.notifications',
      defaultMessage: 'Сповіщення',
    },
    users: {
      id: 'app.page.users',
      defaultMessage: 'Користувачі',
    },
    object: {
      id: 'app.page.object',
      defaultMessage: "Об'єкт",
    },
    organizations: {
      id: 'app.page.organizations',
      defaultMessage: 'Організації',
    },
    statistics: {
      id: 'app.page.statistics',
      defaultMessage: 'Статистика',
    },
    news: {
      id: 'app.page.news',
      defaultMessage: 'Новини',
    },
    notes: {
      id: 'app.page.notes',
      defaultMessage: 'notes',
    },
    about: {
      id: 'app.page.about',
      defaultMessage: 'Про систему',
    },
  });

  const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(
        {
          ...uiActions,
          ...uiActionsAsync,
        },
        dispatch,
      ),
    };
  };

  const mapStateToProps = state => {
    return {
      authUser: state.user,
      isOpenDrawer: state.ui.isOpenDrawer,
      isOpenDrawerMobile: state.ui.isOpenDrawerMobile,
    };
  };

  @compose(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
    curryRight(injectIntl),
  )
  class withPageHelper extends Component {
    static propTypes = {
      intl: intlShape,
      authUser: PropTypes.object,
      isOpenDrawer: PropTypes.bool,
      isOpenDrawerMobile: PropTypes.bool,
    };

    getPageTitle = path => {
      const { formatMessage } = this.props.intl;

      switch (path) {
        case constants.PATCH_URL_AUTH:
          return formatMessage(messages.auth);

        case constants.PATCH_URL_PROFILE:
          return formatMessage(messages.profile);

        case constants.PATCH_URL_MESSAGES:
          return formatMessage(messages.messages);

        case constants.PATCH_URL_NOTIFICATIONS:
          return formatMessage(messages.notifications);

        case constants.PATCH_URL_USERS:
          return formatMessage(messages.users);

        case constants.PATCH_URL_OBJECT:
          return formatMessage(messages.object);

        case constants.PATCH_URL_ORGANIZATIONS:
          return formatMessage(messages.organizations);

        case constants.PATCH_URL_STATISTICS:
          return formatMessage(messages.statistics);

        case constants.PATCH_URL_NEWS:
          return formatMessage(messages.news);

        case constants.PATCH_URL_NOTES:
          return formatMessage(messages.notes);

        case constants.PATCH_URL_ABOUT:
          return formatMessage(messages.about);

        case constants.PATCH_URL_TERM_OF_USE:
          return formatMessage(messages.termsOfUse);

        case constants.PATCH_URL_PRIVACY_POLICY:
          return formatMessage(messages.privacyPolicy);

        default:
          return '';
      }
    };

    handleCloseDrawerMobile = () => {
      const { actions, isOpenDrawerMobile } = this.props;
      if (isOpenDrawerMobile) {
        actions.setOpenDrawerMobileState(false);
      }
    };

    handleOnClickProfile = () => {
      const { actions, authUser } = this.props;
      if (isAuthenticatedInterface(authUser)) {
        this.handleCloseDrawerMobile();
        actions.setRouterToLinkAsync(constants.PATCH_URL_PROFILE);
      } else {
        actions.setRouterLinkIntentionsState(constants.PATCH_URL_PROFILE);
        actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
      }
    };

    handleOnClickMessages = () => {
      const { actions, authUser } = this.props;
      if (isAuthenticatedInterface(authUser)) {
        this.handleCloseDrawerMobile();
        actions.setRouterToLinkAsync(constants.PATCH_URL_MESSAGES);
      } else {
        actions.setRouterLinkIntentionsState(constants.PATCH_URL_MESSAGES);
        actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
      }
    };

    handleOnClickNotifications = () => {
      const { actions, authUser } = this.props;
      if (isAuthenticatedInterface(authUser)) {
        this.handleCloseDrawerMobile();
        actions.setRouterToLinkAsync(constants.PATCH_URL_NOTIFICATIONS);
      } else {
        actions.setRouterLinkIntentionsState(constants.PATCH_URL_NOTIFICATIONS);
        actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
      }
    };

    handleOnClickUsers = () => {
      const { actions, authUser } = this.props;
      if (isAuthenticatedInterface(authUser)) {
        this.handleCloseDrawerMobile();
        actions.setRouterToLinkAsync(constants.PATCH_URL_USERS);
      } else {
        actions.setRouterLinkIntentionsState(constants.PATCH_URL_USERS);
        actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
      }
    };

    handleOnClickObject = () => {
      const { actions, authUser } = this.props;
      if (isAuthenticatedInterface(authUser)) {
        this.handleCloseDrawerMobile();
        actions.setRouterToLinkAsync(constants.PATCH_URL_OBJECT);
      } else {
        actions.setRouterLinkIntentionsState(constants.PATCH_URL_OBJECT);
        actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
      }
    };

    handleOnClickOrganizations = () => {
      const { actions, authUser } = this.props;
      if (isAuthenticatedInterface(authUser)) {
        this.handleCloseDrawerMobile();
        actions.setRouterToLinkAsync(constants.PATCH_URL_ORGANIZATIONS);
      } else {
        actions.setRouterLinkIntentionsState(constants.PATCH_URL_ORGANIZATIONS);
        actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
      }
    };

    handleOnClickStatistics = () => {
      const { actions, authUser } = this.props;
      if (isAuthenticatedInterface(authUser)) {
        this.handleCloseDrawerMobile();
        actions.setRouterToLinkAsync(constants.PATCH_URL_STATISTICS);
      } else {
        actions.setRouterLinkIntentionsState(constants.PATCH_URL_STATISTICS);
        actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
      }
    };

    handleOnClickNews = () => {
      const { actions, authUser } = this.props;
      if (isAuthenticatedInterface(authUser)) {
        this.handleCloseDrawerMobile();
        actions.setRouterToLinkAsync(constants.PATCH_URL_NEWS);
      } else {
        actions.setRouterLinkIntentionsState(constants.PATCH_URL_NEWS);
        actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
      }
    };

    handleOnClickNotes = () => {
      const { actions, authUser } = this.props;
      if (isAuthenticatedInterface(authUser)) {
        this.handleCloseDrawerMobile();
        actions.setRouterToLinkAsync(constants.PATCH_URL_NOTES);
      } else {
        actions.setRouterLinkIntentionsState(constants.PATCH_URL_NOTES);
        actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
      }
    };

    handleOnClickHome = () => {
      const { actions } = this.props;
      this.handleCloseDrawerMobile();
      actions.setOpenDrawerState(false);
      actions.setRouterToLinkAsync(constants.PATCH_URL_HOME);
    };

    handleOnClickAbout = () => {
      const { actions } = this.props;
      this.handleCloseDrawerMobile();
      actions.setRouterToLinkAsync(constants.PATCH_URL_ABOUT);
    };

    handleOnClickTermOfUse = () => {
      const { actions } = this.props;
      actions.setRouterToLinkAsync(constants.PATCH_URL_TERM_OF_USE);
    };

    handleOnClickPrivacyPolicy = () => {
      const { actions } = this.props;
      actions.setRouterToLinkAsync(constants.PATCH_URL_PRIVACY_POLICY);
    };

    handleOnClickAuth = () => {
      const { actions } = this.props;
      actions.setRouterToLinkAsync(constants.PATCH_URL_AUTH);
    };

    render() {
      const { authUser } = this.props;

      return (
        <Enchanced
          authUser={authUser}
          getPageTitle={this.getPageTitle}
          onClickProfile={this.handleOnClickProfile}
          onClickMessages={this.handleOnClickMessages}
          onClickNotifications={this.handleOnClickNotifications}
          onClickUsers={this.handleOnClickUsers}
          onClickObject={this.handleOnClickObject}
          onClickOrganizations={this.handleOnClickOrganizations}
          onClickStatistics={this.handleOnClickStatistics}
          onClickNews={this.handleOnClickNews}
          onClickNotes={this.handleOnClickNotes}
          onClickAbout={this.handleOnClickAbout}
          onClickTermOfUse={this.handleOnClickTermOfUse}
          onClickPrivacyPolicy={this.handleOnClickPrivacyPolicy}
          onClickAuth={this.handleOnClickAuth}
          onClickHome={this.handleOnClickHome}
          {...this.props}
        />
      );
    }
  }

  return withPageHelper;
};

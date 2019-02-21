import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loadable from '../../../containers/Pages/Loadable';

import { getStartPrivatePage } from '../../../core/functions/common';
import { constants } from '../../../core/constants/index';

class Private extends Component {
  static propTypes = {
    authUser: PropTypes.object.isRequired,
  };

  render() {
    const { authUser } = this.props;

    const profile = import('../../../containers/Pages/Private/Profile');
    const messages = import('../../../containers/Pages/Private/Messages');
    const notifications = import('../../../containers/Pages/Private/Notifications');
    const users = import('../../../containers/Pages/Private/Users');
    const object = import('../../../containers/Pages/Private/Object');
    const organizations = import('../../../containers/Pages/Private/Organizations');
    const statistics = import('../../../containers/Pages/Private/Statistics');
    const news = import('../../../containers/Pages/Private/News');
    const notes = import('../../../containers/Pages/Private/Notes');
    const about = import('../../../containers/Pages/Public/About');
    const termsOfUse = import('../../../containers/Pages/Public/TermsOfUse/Page');
    const privacyPolicy = import('../../../containers/Pages/Public/PrivacyPolicy/Page');

    return (
      <Switch>
        <Route
          exact
          path={constants.PATCH_URL_PROFILE}
          component={() => <Loadable dynamicImport={profile} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_MESSAGES}
          component={() => <Loadable dynamicImport={messages} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_NOTIFICATIONS}
          component={() => <Loadable dynamicImport={notifications} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_USERS}
          component={() => <Loadable dynamicImport={users} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_OBJECT}
          component={() => <Loadable dynamicImport={object} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_ORGANIZATIONS}
          component={() => <Loadable dynamicImport={organizations} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_STATISTICS}
          component={() => <Loadable dynamicImport={statistics} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_NEWS}
          component={() => <Loadable dynamicImport={news} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_NOTES}
          component={() => <Loadable dynamicImport={notes} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_ABOUT}
          component={() => <Loadable dynamicImport={about} />}
        />

        <Route
          exact
          path={constants.PATCH_URL_TERM_OF_USE}
          component={() => <Loadable dynamicImport={termsOfUse} />}
        />
        <Route
          exact
          path={constants.PATCH_URL_PRIVACY_POLICY}
          component={() => <Loadable dynamicImport={privacyPolicy} />}
        />

        <Redirect to={getStartPrivatePage(authUser)} />
      </Switch>
    );
  }
}

export default Private;

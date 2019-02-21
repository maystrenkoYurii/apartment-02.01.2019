import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loadable from '../../../containers/Pages/Loadable';

import { constants } from '../../../core/constants/index';

class Private extends Component {
  render() {
    const home = import('../../../containers/Pages/Public/Home');
    const auth = import('../../../containers/Pages/Public/Auth');
    const about = import('../../../containers/Pages/Public/About');
    const termsOfUse = import('../../../containers/Pages/Public/TermsOfUse/Page');
    const privacyPolicy = import('../../../containers/Pages/Public/PrivacyPolicy/Page');

    return (
      <Switch>
        <Route
          exact
          path={constants.PATCH_URL_HOME}
          component={() => <Loadable dynamicImport={home} />}
        />

        <Route
          exact
          path={constants.PATCH_URL_AUTH}
          component={() => <Loadable dynamicImport={auth} />}
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

        <Redirect to={constants.PATCH_URL_HOME} />
      </Switch>
    );
  }
}

export default Private;

import React from 'react';
import ReactDOM from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import RedBox from 'redbox-react';

import { MuiThemeProvider } from '@material-ui/core/styles';

import IntlProvider from '../containers/IntlProvider/index';
import App from '../containers/App';

import { getStyleContext } from '../core/theme/index';
import { configureStore } from '../flux-saga/store/index.js';
import { constants } from '../../webpack/common/constants';

const INITIAL_STATE = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const browserHistory = createBrowserHistory();
const styleContext = getStyleContext();
const store = configureStore(browserHistory, INITIAL_STATE);
store.runSagas();

const reactRoot = window.document.getElementById('appMountPoint');

const render = Component => {
  try {
    ReactDOM.hydrate(
      <AppContainer>
        <JssProvider generateClassName={styleContext.generateClassName}>
          <MuiThemeProvider theme={styleContext.theme}>
            <Provider store={store}>
              <IntlProvider>
                <ConnectedRouter history={browserHistory}>
                  <Component />
                </ConnectedRouter>
              </IntlProvider>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </AppContainer>,
      reactRoot,
    );
  } catch (error) {
    ReactDOM.render(<RedBox error={error} />, reactRoot);
  }
};

if (constants.NODE_DEV && module.hot) {
  module.hot.accept('../containers/App/index.js', () => {
    const App = require('../containers/App/index.js').default;
    render(App);
  });
}

render(App);

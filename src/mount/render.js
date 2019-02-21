import Path from 'path';
import Fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MobileDetect from 'mobile-detect';
import CreateMemoryHistory from 'history/createMemoryHistory';
import Serialize from 'serialize-javascript';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import { MuiThemeProvider } from '@material-ui/core/styles';

import IntlProvider from '../containers/IntlProvider/index';
import App from '../containers/App';

import { getStyleContext } from '../core/theme/index';
import { configureStore } from '../flux-saga/store/index.js';
import {
  getUserFromReq,
  getSettingsFromReg,
  extractLanguagesFromReq,
  guessLanguages,
} from '../core/functions';

import { settingsActions } from '../flux-saga/bus/settings/actions';
import { userActions } from '../flux-saga/bus/user/actions';
import { uiActions } from '../flux-saga/bus/ui/actions';
import { constants } from '../core/constants/index';

export default ({ clientStats }) => (req, res) => {
  const device = new MobileDetect(req.headers['user-agent']);
  const settings = getSettingsFromReg(req);
  const userLocales = extractLanguagesFromReq(req, settings);
  const language = guessLanguages(
    constants.SUPPORTED_LANGUAGES,
    userLocales,
    'en',
  );

  const user = getUserFromReq(req, device);
  const domainUrl = 'http://webdev.emerline.com.ua';

  const generateDocument = (
    template,
    { html, helmet, stylesOfJss, css, bundle, initialState },
  ) => {
    template = template.replace(
      '<html>',
      `<html ${helmet.htmlAttributes.toString()}>`,
    );
    template = template.replace(
      '</head>',
      `${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
      ${helmet.noscript.toString()}
      ${helmet.style.toString()}
      <style id="jss-server-side">${stylesOfJss}</style>${css}</head>`,
    );
    template = template.replace(
      '<body>',
      `<body ${helmet.bodyAttributes.toString()}>`,
    );
    template = template.replace(
      '</body>',
      `<div id="appMountPoint">${html}</div><script id="initialState">window.__INITIAL_STATE__=${initialState}</script>${bundle}</body>`,
    );
    return template;
  };

  const styleContext = getStyleContext();

  const memoryHistory = CreateMemoryHistory({
    initialEntries: [req.url],
  });

  const store = configureStore(memoryHistory);
  store.runSagas().then(() => {
    store.dispatch(settingsActions.setSettingsState({ language, ...settings }));
    store.dispatch(userActions.setUserState(user));
    store.dispatch(uiActions.setDomainUrlState(domainUrl));

    let context = {};

    const html = renderToString(
      <JssProvider
        registry={styleContext.sheetsRegistry}
        generateClassName={styleContext.generateClassName}
      >
        <MuiThemeProvider
          theme={styleContext.theme}
          sheetsManager={styleContext.sheetsManager}
        >
          <Provider store={store}>
            <IntlProvider>
              <StaticRouter location={req.url} context={context}>
                <App />
              </StaticRouter>
            </IntlProvider>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>,
    );

    const initialState = Serialize(store.getState());

    store.close();

    const stylesOfJss = styleContext.sheetsRegistry.toString();

    const { styles: css, js: bundle } = flushChunks(clientStats, {
      chunkNames: flushChunkNames(),
    });

    const helmet = Helmet.renderStatic();

    if (context.url) {
      return res.redirect(302, context.url);
    }

    const htmlPath = Path.resolve(__dirname, '../', 'client/html/index.html');
    Fs.readFile(htmlPath, 'utf8', (error, template) => {
      if (error) {
        res.send(error);
      } else {
        res.send(
          generateDocument(template, {
            html,
            helmet,
            stylesOfJss,
            css,
            bundle,
            initialState,
          }),
        );
      }
    });
  });
};

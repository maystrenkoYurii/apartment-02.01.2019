import Path from 'path';
import Http from 'http';
import Https from 'https';
import Fs from 'fs';
import Express from 'express';
import Compression from 'compression';
import BodyParser from 'body-parser';
import CookieParser from 'cookie-parser';
import ApiCache from 'apicache';
import Helmet from 'helmet';
import Chalk from 'chalk';
import OpenBrowser from 'react-dev-utils/openBrowser';
import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import WebpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../../webpack/webpack.config.dev.client.babel';
import configDevServer from '../../webpack/webpack.config.dev.server.babel';
import configProdClient from '../../webpack/webpack.config.prod.client.babel';
import configProdServer from '../../webpack/webpack.config.prod.server.babel';

import { constants as build } from '../../webpack/common/constants';

let openedBrowser = false;

const done = (protocolHttp, protocolHttps, listenerHttp, listenerHttps) => {
  setTimeout(() => {
    if (listenerHttp) {
      const addressHttp = `${protocolHttp}://${
        listenerHttp.address().address
      }:${listenerHttp.address().port}`;
      try {
        const addressHttps = `${protocolHttps}://${
          listenerHttps.address().address
        }:${listenerHttps.address().port}`;
        console.log(
          `Server listening on ${Chalk.inverse.green(
            addressHttp,
          )} and ${Chalk.inverse.green(addressHttps)} in ${Chalk.inverse.red(
            build.NODE_ENV,
          )} mode 🌎...`,
        );
      } catch (error) {
        console.log(
          `Server listening on ${Chalk.inverse.green(
            addressHttp,
          )} in ${Chalk.inverse.red(build.NODE_ENV)} mode 🌎...`,
        );
      }
      if (build.NODE_DEV && build.BUILD_DEV && !openedBrowser) {
        Promise.resolve(OpenBrowser(addressHttp)).then(
          () => (openedBrowser = true),
        );
      }
    }
  }, 1000);
};

const getExpress = protocol => {
  const cache = ApiCache.options({
    enabled: !build.NODE_DEV,
  }).middleware;

  const app = new Express();
  app.disable('x-powered-by');
  app.use(BodyParser.urlencoded({ extended: false }));
  app.use(BodyParser.json());
  app.use(Helmet());
  app.use(Compression());
  app.use(CookieParser());
  app.use(cache('360 days'));
  app.use((req, res, next) => {
    if (req.protocol === 'http' && protocol === 'https') {
      return res.redirect(
        302,
        `${protocol}://${build.HOST}:${build.PORT_HTTPS}${req.url}`,
      );
    }
    return next();
  });
  return app;
};

const developmentRouter = (resolve, reject, protocol) => {
  try {
    const router = Express.Router();
    const compiler = Webpack([configDevClient, configDevServer]);
    const clientCompiler = compiler.compilers.find(
      compiler => compiler.name === 'client',
    );
    const options = {
      hot: true,
      stats: { colors: true },
      publicPath: configDevClient.output.publicPath,
    };
    router.use(WebpackDevMiddleware(compiler, options));
    router.use(WebpackHotMiddleware(clientCompiler));
    router.use(WebpackHotServerMiddleware(compiler));
    const app = getExpress(protocol).use(router);
    compiler.hooks.done.tap('done', () => resolve(app));
  } catch (error) {
    reject(error);
  }
};

const productionRouter = (resolve, reject, protocol) => {
  try {
    const router = Express.Router();
    router.use(Express.static(configProdClient.output.path));
    const compiler = Webpack([configProdClient, configProdServer]);
    compiler.run((err, stats) => {
      const clientStats = stats.toJson().children[0];
      const render = require(Path.join(
        configProdServer.output.path,
        configProdServer.output.filename,
      )).default;
      router.use(render({ clientStats }));
      console.log(stats.toString({ colors: true }));
      const app = getExpress(protocol).use(router);
      resolve(app);
    });
    return router;
  } catch (error) {
    reject(error);
  }
};

const runExpress = (resolve, reject, protocol) => {
  if (build.NODE_DEV) {
    return developmentRouter(resolve, reject, protocol);
  } else {
    return productionRouter(resolve, reject, protocol);
  }
};

const runApp = () => {
  const protocolHttp = 'http';
  const protocolHttps = 'https';

  try {
    const privateKey = Fs.readFileSync(build.SSL_KEY, 'utf8');
    const certificate = Fs.readFileSync(build.SSL_CERT, 'utf8');
    console.log(
      `App will be run on ${Chalk.inverse.green(
        protocolHttp,
      )} and ${Chalk.inverse.green(protocolHttps)} servers...`,
    );
    const promise = new Promise((resolve, reject) => {
      runExpress(resolve, reject, protocolHttps);
    });
    promise.then(
      app => {
        const httpServer = Http.createServer(app);
        const listenerHttp = httpServer.listen(build.PORT_HTTP, build.HOST);
        const credentials = { key: privateKey, cert: certificate };
        const httpsServer = Https.createServer(credentials, app);
        const listenerHttps = httpsServer.listen(build.PORT_HTTPS, build.HOST);
        done(protocolHttp, protocolHttps, listenerHttp, listenerHttps);
      },
      error => {
        console.log(error);
      },
    );
  } catch (error) {
    console.log(
      `App will be run on only ${Chalk.inverse.green(protocolHttp)} server...`,
    );
    const promise = new Promise((resolve, reject) => {
      runExpress(resolve, reject, protocolHttp);
    });
    promise.then(
      app => {
        const httpServer = Http.createServer(app);
        const httpListener = httpServer.listen(build.PORT_HTTP, build.HOST);
        done(protocolHttp, null, httpListener, null);
      },
      error => {
        console.log(error);
      },
    );
  }
};

runApp();

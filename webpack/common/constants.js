import Ip from 'ip';

import { paths } from '../../webpack/common/paths';

const getNodeEnv = () => {
  return process.env.NODE_ENV || 'development';
};

const getBuildEnv = () => {
  return process.env.BUILD_ENV || 'development';
};

const isNodeDev = () => {
  return getNodeEnv() === 'development';
};

const isBuildDev = () => {
  return getBuildEnv() === 'development';
};

const getPortHttp = () => {
  return process.env.PORT_HTTP || 3021;
};

const getPortHttps = () => {
  return process.env.PORT_HTTPS || getPortHttp() + 1000;
};

const getHost = () => {
  return process.env.HOST || Ip.address();
};

const getSslKey = () => {
  return process.env.SSL_KEY || paths.SSL_KEY;
};

const getSslCert = () => {
  return process.env.SSL_CERT || paths.SSL_CERT;
};

export const constants = Object.freeze({
  NODE_ENV: getNodeEnv(),
  BUILD_ENV: getBuildEnv(),
  NODE_DEV: isNodeDev(),
  BUILD_DEV: isBuildDev(),
  HOST: getHost(),
  PORT_HTTP: getPortHttp(),
  PORT_HTTPS: getPortHttps(),
  SSL_KEY: getSslKey(),
  SSL_CERT: getSslCert(),
});

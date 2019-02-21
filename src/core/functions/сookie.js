import Cookies from 'universal-cookie';

import { constants } from '../constants/index';
import { initialState as user } from '../../flux-saga/bus/user/reducers';
import { isClient, isPrivateRoute } from './common';

const cookiesOptions = {
  path: '/',
  maxAge: constants.COOKIE_MAX_AGE,
};

export const setSettings = settings => {
  if (isClient()) {
    const cookies = new Cookies();
    cookies.set(constants.SETTINGS, settings, cookiesOptions);
  }
};

export const getSettingsFromReg = req => {
  const cookies = new Cookies(req.headers.cookie);
  return cookies.get(constants.SETTINGS) || {};
};

export const setUser = user => {
  if (isClient()) {
    const cookies = new Cookies();
    cookies.set(constants.AUTH_USER, user, cookiesOptions);
  }
};

export const getUser = () => {
  if (isClient()) {
    const cookies = new Cookies();
    return cookies.get(constants.AUTH_USER) || {};
  }
  return null;
};

export const removeUser = () => {
  if (isClient()) {
    const cookies = new Cookies();
    cookies.remove(constants.AUTH_USER);
  }
};

export const getUserFromReq = (req, device) => {
  if (!device.is('bot')) {
    const cookies = new Cookies(req.headers.cookie);
    return cookies.get(constants.AUTH_USER) || {};
  } else {
    return isPrivateRoute(req.url) ? user({ token: 'bot' }) : user({});
  }
};

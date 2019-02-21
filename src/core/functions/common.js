import _ from 'lodash';

import { constants } from '../constants/index';
import { types } from '../../flux-saga/bus/user/types';
import { getUser } from './сookie';

export const isClient = () => {
  return typeof window !== 'undefined';
};

export const getToken = () => {
  return _.get(getUser(), constants.AUTH_TOKEN);
};
export const isToken = () => {
  return !!getToken();
};

export const isAuthenticatedUser = authUser => {
  return !!_.get(authUser, constants.AUTH_TOKEN);
};

export const isAuthenticatedInterface = authUser => {
  return isAuthenticatedUser(authUser) || isToken();
};

export const isEmptyProfile = authUser => {
  return _.isEmpty(_.get(authUser, 'profile'));
};

export const getStartPrivatePage = authUser => {
  if (isEmptyProfile(authUser)) {
    return constants.PATCH_URL_PROFILE;
  } else {
    return constants.PATCH_URL_OBJECT;
  }
};

export const isOpenDownload = fetching => {
  return fetching
    ? fetching.isFetching &&
        (fetching.type === types.SET_SIGN_IN_USER_REQUEST ||
          fetching.type === types.SET_SIGN_IN_USER_BY_TOKEN_REQUEST ||
          fetching.type === types.SET_SIGN_UP_USER_REQUEST)
    : false;
};

export const isPrivateRoute = path => {
  return (
    _.includes(path, constants.PATCH_URL_PROFILE) ||
    _.includes(path, constants.PATCH_URL_MESSAGES) ||
    _.includes(path, constants.PATCH_URL_NOTIFICATIONS) ||
    _.includes(path, constants.PATCH_URL_USERS) ||
    _.includes(path, constants.PATCH_URL_OBJECT) ||
    _.includes(path, constants.PATCH_URL_ORGANIZATIONS) ||
    _.includes(path, constants.PATCH_URL_STATISTICS) ||
    _.includes(path, constants.PATCH_URL_NOTES) ||
    _.includes(path, constants.PATCH_URL_STATISTICS)
  );
};

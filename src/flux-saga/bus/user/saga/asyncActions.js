import { isToken } from '../../../../core/functions/common';

import { types } from '../types';
import { asyncTypes } from './asyncTypes';

export const userActionsAsync = Object.freeze({
  setFetchSignUpUserAsync: state => ({
    type: asyncTypes.SET_FETCH_SIGN_UP_USER_ASYNC,
    payload: state,
  }),
  setFetchSignInUserAsync: state => ({
    type: asyncTypes.SET_FETCH_SIGN_IN_USER_ASYNC,
    payload: state,
  }),
  setFetchSignInUserByTokenAsync: state => {
    if (isToken()) {
      return {
        type: asyncTypes.SET_FETCH_SIGN_IN_USER_BY_TOKEN_ASYNC,
        payload: state,
      };
    } else {
      return {
        type: types.SET_SIGN_IN_USER_BY_TOKEN_ERROR,
      };
    }
  },
  setFetchLogoutUserByTokenAsync: () => ({
    type: asyncTypes.SET_FETCH_LOGOUT_USER_BY_TOKEN_ASYNC,
  }),
  setFetchUserChangePasswordAsync: state => ({
    type: asyncTypes.SET_FETCH_CHANGE_USER_PASSWORD_ASYNC,
    payload: state,
  }),
});

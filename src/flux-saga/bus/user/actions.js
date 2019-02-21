import { types } from './types';

export const userActions = Object.freeze({
  setUserState: state => ({
    type: types.SET_USER_STATE,
    payload: state,
  }),

  setSignUpUserRequestState: () => ({
    type: types.SET_SIGN_UP_USER_REQUEST,
  }),
  setSignUpUserSuccessState: () => ({
    type: types.SET_SIGN_UP_USER_SUCCESS,
  }),
  setSignUpUserErrorState: () => ({
    type: types.SET_SIGN_UP_USER_ERROR,
  }),

  setSignInUserRequestState: () => ({
    type: types.SET_SIGN_IN_USER_REQUEST,
  }),
  setSignInUserSuccessState: state => ({
    type: types.SET_SIGN_IN_USER_SUCCESS,
    payload: state,
  }),
  setSignInUserErrorState: () => ({
    type: types.SET_SIGN_IN_USER_ERROR,
  }),

  setSignInUserByTokenRequestState: () => ({
    type: types.SET_SIGN_IN_USER_BY_TOKEN_REQUEST,
  }),
  setSignInUserByTokenSuccessState: state => ({
    type: types.SET_SIGN_IN_USER_BY_TOKEN_SUCCESS,
    payload: state,
  }),
  setSignInUserByTokenErrorState: () => ({
    type: types.SET_SIGN_IN_USER_BY_TOKEN_ERROR,
  }),

  setLogoutUserRequestState: () => ({
    type: types.SET_LOGOUT_USER_REQUEST,
  }),
  setLogoutUserSuccessState: () => ({
    type: types.SET_LOGOUT_USER_SUCCESS,
  }),
  setLogoutUserErrorState: () => ({
    type: types.SET_LOGOUT_USER_ERROR,
  }),

  setProfileUserCreateRequestState: () => ({
    type: types.SET_CREATE_USER_PROFILE_REQUEST,
  }),
  setProfileUserCreateSuccessState: state => ({
    type: types.SET_CREATE_USER_PROFILE_SUCCESS,
    payload: state,
  }),
  setProfileUserCreateErrorState: () => ({
    type: types.SET_CREATE_USER_PROFILE_ERROR,
  }),

  setProfileUserChangeRequestState: () => ({
    type: types.SET_CHANGE_USER_PROFILE_REQUEST,
  }),
  setProfileUserChangeSuccessState: state => ({
    type: types.SET_CHANGE_USER_PROFILE_SUCCESS,
    payload: state,
  }),
  setProfileUserChangeErrorState: () => ({
    type: types.SET_CHANGE_USER_PROFILE_ERROR,
  }),

  setPasswordUserChangeRequestState: () => ({
    type: types.SET_CHANGE_USER_PASSWORD_REQUEST,
  }),
  setPasswordUserChangeSuccessState: state => ({
    type: types.SET_CHANGE_USER_PASSWORD_SUCCESS,
    payload: state,
  }),
  setPasswordUserChangeErrorState: () => ({
    type: types.SET_CHANGE_USER_PASSWORD_ERROR,
  }),
});

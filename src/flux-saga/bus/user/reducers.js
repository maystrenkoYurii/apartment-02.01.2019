import { types } from './types';

export const initialState = ({ token = '', user = {}, profile = {} }) => {
  return {
    token: token,
    user: user,
    profile: profile,
  };
};

export const userReducer = (state = initialState({}), action) => {
  switch (action.type) {
    case types.SET_USER_STATE:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        profile: action.payload.profile,
      };
    case types.SET_SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        profile: action.payload.profile,
      };
    case types.SET_SIGN_IN_USER_BY_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        profile: action.payload.profile,
      };
    case types.SET_LOGOUT_USER_SUCCESS:
      return {
        ...initialState({}),
      };
    case types.SET_LOGOUT_USER_ERROR:
      return {
        ...initialState({}),
      };
    case types.SET_CREATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case types.SET_CHANGE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

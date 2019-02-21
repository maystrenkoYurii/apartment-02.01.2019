import { types } from './types';

export const initialState = {
  domainUrl: '',
  appMessage: {
    message: '',
    type: '',
  },
  fetching: {
    isFetching: false,
    type: '',
  },
  error: {
    type: '',
    error: '',
  },
  isOpenDrawer: true,
  isOpenDrawerMobile: false,
  isOpenLanguage: false,
  isOpenTermsOfUse: false,
  isOpenPrivacyPolicy: false,
  isOpenChangePassword: false,
  authPositionTab: 0,
  isToolbarSearchOpenFilter: false,
  toolbarSearchText: '',
  routerLinkIntentions: '',
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DOMAIN_URL:
      return {
        ...state,
        domainUrl: action.payload,
      };
    case types.SET_APP_MESSAGE_STATE:
      return {
        ...state,
        appMessage: action.payload,
      };
    case types.SET_FETCHING_STATE:
      return {
        ...state,
        fetching: action.payload,
      };
    case types.SET_EMIT_ERROR_STATE:
      return {
        ...state,
        error: action.payload,
      };
    case types.SET_LANGUAGE_DIALOG_STATE:
      return {
        ...state,
        isOpenLanguage: action.payload,
      };
    case types.SET_CHANGE_PASSWORD_DIALOG_STATE:
      return {
        ...state,
        isOpenChangePassword: action.payload,
      };
    case types.SET_OPEN_DRAWER_STATE:
      return {
        ...state,
        isOpenDrawer: action.payload,
      };
    case types.SET_OPEN_DRAWER_MOBILE_STATE:
      return {
        ...state,
        isOpenDrawerMobile: action.payload,
      };
    case types.SET_TOOLBAR_SEARCH_TEXT_STATE:
      return {
        ...state,
        toolbarSearchText: action.payload,
      };
    case types.SET_TOOLBAR_SEARCH_FILTER_STATE:
      return {
        ...state,
        isToolbarSearchOpenFilter: action.payload,
      };
    case types.SET_TERMS_OF_USE_DIALOG_STATE:
      return {
        ...state,
        isOpenTermsOfUse: action.payload,
      };
    case types.SET_PRIVACY_POLICY_DIALOG_STATE:
      return {
        ...state,
        isOpenPrivacyPolicy: action.payload,
      };
    case types.SET_ROUTER_LINK_INTENTIONS_STATE:
      return {
        ...state,
        routerLinkIntentions: action.payload,
      };
    case types.SET_AUTH_POSITION_TAB_STATE:
      return {
        ...state,
        authPositionTab: action.payload,
      };
    default:
      return state;
  }
};

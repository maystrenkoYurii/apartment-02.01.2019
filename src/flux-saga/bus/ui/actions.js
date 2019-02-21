import { types } from './types';

export const uiActions = Object.freeze({
  setDomainUrlState: state => ({
    type: types.SET_DOMAIN_URL,
    payload: state,
  }),
  setAppMessageState: (message = '', type = null) => ({
    type: types.SET_APP_MESSAGE_STATE,
    payload: { message: message, type: type },
  }),
  setEmitErrorState: (error, meta = null) => ({
    type: types.SET_EMIT_ERROR_STATE,
    payload: error,
    error: true,
    meta,
  }),
  setFetchingState: (isFetching = false, type = null) => ({
    type: types.SET_FETCHING_STATE,
    payload: { isFetching: isFetching, type: type },
  }),
  setOpenDrawerState: state => ({
    type: types.SET_OPEN_DRAWER_STATE,
    payload: state,
  }),
  setOpenDrawerMobileState: state => ({
    type: types.SET_OPEN_DRAWER_MOBILE_STATE,
    payload: state,
  }),
  setLanguageDialogState: state => ({
    type: types.SET_LANGUAGE_DIALOG_STATE,
    payload: state,
  }),
  setChangePasswordDialogState: state => ({
    type: types.SET_CHANGE_PASSWORD_DIALOG_STATE,
    payload: state,
  }),
  setToolbarSearchTextState: state => ({
    type: types.SET_TOOLBAR_SEARCH_TEXT_STATE,
    payload: state,
  }),
  setToolbarSearchFilterState: state => ({
    type: types.SET_TOOLBAR_SEARCH_FILTER_STATE,
    payload: state,
  }),
  setTermsOfUseDialogState: state => ({
    type: types.SET_TERMS_OF_USE_DIALOG_STATE,
    payload: state,
  }),
  setPrivacyPolicyDialogState: state => ({
    type: types.SET_PRIVACY_POLICY_DIALOG_STATE,
    payload: state,
  }),
  setRouterLinkIntentionsState: state => ({
    type: types.SET_ROUTER_LINK_INTENTIONS_STATE,
    payload: state,
  }),
  setAuthPositionTabState: state => ({
    type: types.SET_AUTH_POSITION_TAB_STATE,
    payload: state,
  }),
});

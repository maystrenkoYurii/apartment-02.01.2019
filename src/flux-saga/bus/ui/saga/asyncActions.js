import { asyncTypes } from './asyncTypes';

export const uiActionsAsync = Object.freeze({
  setEmitErrorAsync: (error = null, type = null, meta = null) => ({
    type: asyncTypes.SET_EMIT_ERROR_ASYNC,
    payload: { error: error, type: type },
    meta,
  }),
  setRouterToLinkAsync: state => ({
    type: asyncTypes.SET_ROUTER_LINK_STATE_ASYNC,
    payload: state,
  }),
});

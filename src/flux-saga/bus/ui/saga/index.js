import { asyncTypes } from './asyncTypes';
import { callEmitErrorWorker } from './workers/emitError';
import { callRouterLinkWorker } from './workers/routerLink';

import { takeEvery } from 'redux-saga/effects';

export function* uiWatchersSagas() {
  yield takeEvery(asyncTypes.SET_EMIT_ERROR_ASYNC, callEmitErrorWorker);
  yield takeEvery(asyncTypes.SET_ROUTER_LINK_STATE_ASYNC, callRouterLinkWorker);
}

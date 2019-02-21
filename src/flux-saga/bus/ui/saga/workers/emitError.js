import { uiActions } from '../../actions';

import { put } from 'redux-saga/effects';

export function* callEmitErrorWorker({ payload: state, meta: metaData }) {
  yield put(uiActions.setAppMessageState(state.error, state.type));
  yield put(
    uiActions.setEmitErrorState({
      error: state,
      meta: metaData,
    }),
  );
}

import { push } from 'connected-react-router';

import { uiActions } from '../../actions';

import { put, select } from 'redux-saga/effects';

export function* callRouterLinkWorker({ payload: link }) {
  const toolbarSearchText = yield select(state => state.ui.toolbarSearchText);
  if (toolbarSearchText) {
    yield put(uiActions.setToolbarSearchTextState(''));
  }
  yield put(push(link));
}

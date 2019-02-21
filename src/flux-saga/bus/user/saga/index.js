import { asyncTypes } from './asyncTypes';
import { callSignUpUserWorker } from './workers/fetchSignUpUser';
import { callSignInUserWorker } from './workers/fetchSignInUser';
import { callLogoutUserByTokenWorker } from './workers/fetchLogoutUserByToken';
import { callSignInByTokenWorker } from './workers/fetchSignInUserByToken';
import { callChangeUserPasswordWorker } from './workers/fetchChangeUserPassword';

import { takeEvery } from 'redux-saga/effects';

export function* userWatchersSagas() {
  yield takeEvery(
    asyncTypes.SET_FETCH_SIGN_UP_USER_ASYNC,
    callSignUpUserWorker,
  );
  yield takeEvery(
    asyncTypes.SET_FETCH_SIGN_IN_USER_ASYNC,
    callSignInUserWorker,
  );
  yield takeEvery(
    asyncTypes.SET_FETCH_SIGN_IN_USER_BY_TOKEN_ASYNC,
    callSignInByTokenWorker,
  );
  yield takeEvery(
    asyncTypes.SET_FETCH_LOGOUT_USER_BY_TOKEN_ASYNC,
    callLogoutUserByTokenWorker,
  );
  yield takeEvery(
    asyncTypes.SET_FETCH_CHANGE_USER_PASSWORD_ASYNC,
    callChangeUserPasswordWorker,
  );
}

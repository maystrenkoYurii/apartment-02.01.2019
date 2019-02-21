import { actions as actionsForm } from 'react-redux-form';

import { uiActions } from '../../../ui/actions';
import { uiActionsAsync } from '../../../ui/saga/asyncActions';
import { userActions } from '../../actions';
import { types } from '../../types';

import { Api } from '../../../../../core/rest-api/index';

import {
  getFetchErrorMessage,
  getAnotherRequestErrorMessage,
  getSignUpRequestErrorMessage,
} from '../../../../../core/functions';

import { put, call } from 'redux-saga/effects';

export function* callSignUpUserWorker({ payload: signUpUser }) {
  const {
    messages: {
      success,
      failedFetch,
      anotherError,
      busyLogin,
      busyEmail,
      busyLoginEmail,
    },
  } = signUpUser;

  try {
    yield put(userActions.setSignUpUserRequestState());
    yield put(uiActions.setFetchingState(true, types.SET_SIGN_UP_USER_REQUEST));

    const response = yield call(Api.user.signUpUser, signUpUser);

    const data = yield call([response, response.json]);
    const status = response.status;
    if (status !== 200) {
      getSignUpRequestErrorMessage(
        status,
        data,
        busyLogin,
        busyEmail,
        busyLoginEmail,
      );
      getAnotherRequestErrorMessage(status, null, anotherError);
    }

    yield put(actionsForm.reset('forms.signUpForm'));
    yield put(
      uiActions.setAppMessageState(success, types.SET_SIGN_UP_USER_REQUEST),
    );
    yield put(userActions.setSignUpUserSuccessState());
  } catch (error) {
    yield put(userActions.setSignUpUserErrorState());
    yield put(
      uiActionsAsync.setEmitErrorAsync(
        getFetchErrorMessage(error, failedFetch),
        types.SET_SIGN_UP_USER_REQUEST,
      ),
    );
  } finally {
    yield put(
      uiActions.setFetchingState(false, types.SET_SIGN_UP_USER_REQUEST),
    );
  }
}

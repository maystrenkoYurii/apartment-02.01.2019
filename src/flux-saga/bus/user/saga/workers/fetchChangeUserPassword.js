import { actions as actionsForm } from 'react-redux-form';

import { uiActions } from '../../../ui/actions';
import { uiActionsAsync } from '../../../ui/saga/asyncActions';
import { userActions } from '../../actions';
import { types } from '../../types';

import { Api } from '../../../../../core/rest-api/index';

import {
  getFetchErrorMessage,
  getAnotherRequestErrorMessage,
} from '../../../../../core/functions';

import { put, call, select } from 'redux-saga/effects';

export function* callChangeUserPasswordWorker({ payload: passwords }) {
  const {
    messages: {
      success,
      invalidOldPassword,
      authorizationError,
      failedFetch,
      anotherError,
    },
    isDialog,
  } = passwords;

  try {
    yield put(userActions.setPasswordUserChangeRequestState());
    yield put(
      uiActions.setFetchingState(true, types.SET_CHANGE_USER_PASSWORD_REQUEST),
    );

    const token = yield select(state => state.user.token);

    const response = yield call(Api.user.changePassword, passwords, token);

    const status = response.status;
    if (status !== 204) {
      if (status === 400) {
        throw new Error(invalidOldPassword);
      }
      getAnotherRequestErrorMessage(status, authorizationError, anotherError);
    }

    yield put(userActions.setPasswordUserChangeSuccessState());
    yield put(actionsForm.reset('forms.changePasswordForm'));

    yield put(
      uiActions.setAppMessageState(
        success,
        types.SET_CHANGE_USER_PASSWORD_REQUEST,
      ),
    );

    if (isDialog) {
      yield put(uiActions.setChangePasswordDialogState(false));
    }
  } catch (error) {
    yield put(userActions.setPasswordUserChangeErrorState());
    yield put(
      uiActionsAsync.setEmitErrorAsync(
        getFetchErrorMessage(error, failedFetch),
        types.SET_CHANGE_USER_PASSWORD_REQUEST,
      ),
    );
  } finally {
    yield put(
      uiActions.setFetchingState(false, types.SET_CHANGE_USER_PASSWORD_REQUEST),
    );
  }
}

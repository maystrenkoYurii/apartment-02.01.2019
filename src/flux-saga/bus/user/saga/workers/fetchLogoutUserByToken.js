import { uiActions } from '../../../ui/actions';
import { uiActionsAsync } from '../../../ui/saga/asyncActions';
import { userActions } from '../../actions';
import { types } from '../../types';

import { Api } from '../../../../../core/rest-api/index';

import { removeUser } from '../../../../../core/functions';

import { constants } from '../../../../../core/constants/index';

import { initialState } from '../../../ui/reducers';

import { put, call, select } from 'redux-saga/effects';

export function* callLogoutUserByTokenWorker() {
  try {
    yield put(userActions.setLogoutUserRequestState());
    yield put(uiActions.setFetchingState(true, types.SET_LOGOUT_USER_REQUEST));

    const token = yield select(state => state.user.token);

    yield call(Api.user.logoutUserByToken, token);

    yield call(removeUser);
    yield put(userActions.setLogoutUserSuccessState());
    yield put(
      uiActions.setOpenDrawerMobileState(initialState.isOpenDrawerMobile),
    );
    yield put(uiActions.setOpenDrawerState(initialState.isOpenDrawer));
  } catch (error) {
    yield call(removeUser);
    yield put(userActions.setLogoutUserErrorState());
  } finally {
    yield put(uiActions.setFetchingState(false, types.SET_LOGOUT_USER_REQUEST));
    yield put(uiActionsAsync.setRouterToLinkAsync(constants.PATCH_URL_HOME));
  }
}

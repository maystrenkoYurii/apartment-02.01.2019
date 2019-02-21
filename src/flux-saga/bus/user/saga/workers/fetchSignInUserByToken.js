import _ from 'lodash';

import { uiActions } from '../../../ui/actions';
import { uiActionsAsync } from '../../../ui/saga/asyncActions';
import { userActions } from '../../actions';
import { types } from '../../types';

import { Api } from '../../../../../core/rest-api/index';
import { constants } from '../../../../../core/constants/index';

import {
  setUser,
  removeUser,
  getToken,
  getAnotherRequestErrorMessage,
  getFetchErrorMessage,
} from '../../../../../core/functions';

import { put, call, delay, select } from 'redux-saga/effects';

export function* callSignInByTokenWorker({ payload: user }) {
  const {
    messages: { authorizationError, failedFetch, anotherError },
  } = user;
  const changedLanguage = yield select(
    state => state.settings.language.changed,
  );
  if (!changedLanguage) {
    try {
      yield put(userActions.setSignInUserByTokenRequestState());
      yield put(
        uiActions.setFetchingState(
          true,
          types.SET_SIGN_IN_USER_BY_TOKEN_REQUEST,
        ),
      );

      const token = yield call(getToken);

      const responseSignIn = yield call(Api.user.userByToken, token);

      const dataSignIn = yield call([responseSignIn, responseSignIn.json]);
      const statusSignIn = responseSignIn.status;
      if (statusSignIn !== 200) {
        getAnotherRequestErrorMessage(
          statusSignIn,
          authorizationError,
          anotherError,
        );
      }

      const responseProfile = yield call(
        Api.user.profileUserById,
        _.get(dataSignIn, 'id'),
        token,
      );
      const dataProfile = yield call([responseProfile, responseProfile.json]);
      const statusProfile = responseProfile.status;
      if (statusProfile !== 200) {
        getAnotherRequestErrorMessage(
          statusProfile,
          authorizationError,
          anotherError,
        );
      }
      const profile = Array.isArray(dataProfile) ? dataProfile[0] : dataProfile;

      yield delay(300);

      const fullUser = {
        token: token || '',
        user: dataSignIn || {},
        profile: profile || {},
      };
      yield call(setUser, fullUser);
      yield put(userActions.setSignInUserByTokenSuccessState(fullUser));
    } catch (error) {
      yield call(removeUser);
      yield put(uiActionsAsync.setRouterToLinkAsync(constants.PATCH_URL_HOME));
      yield put(userActions.setLogoutUserSuccessState());
      yield put(userActions.setSignInUserByTokenErrorState());
      yield put(
        uiActionsAsync.setEmitErrorAsync(
          getFetchErrorMessage(error, failedFetch),
          types.SET_SIGN_IN_USER_BY_TOKEN_REQUEST,
        ),
      );
    } finally {
      yield put(
        uiActions.setFetchingState(
          false,
          types.SET_SIGN_IN_USER_BY_TOKEN_REQUEST,
        ),
      );
    }
  }
}

import _ from 'lodash';
import { actions as actionsForm } from 'react-redux-form';

import { uiActions } from '../../../ui/actions';
import { uiActionsAsync } from '../../../ui/saga/asyncActions';
import { userActions } from '../../actions';
import { types } from '../../types';

import { Api } from '../../../../../core/rest-api/index';
import {
  setUser,
  getFetchErrorMessage,
  getAnotherRequestErrorMessage,
  getStartPrivatePage,
  isEmptyProfile,
} from '../../../../../core/functions';
import { constants } from '../../../../../core/constants/index';

import { put, call, delay, select } from 'redux-saga/effects';

export function* callSignInUserWorker({ payload: loginUser }) {
  const {
    messages: { invalidUser, authorizationError, failedFetch, anotherError },
  } = loginUser;

  try {
    yield put(userActions.setSignInUserRequestState());
    yield put(uiActions.setFetchingState(true, types.SET_SIGN_IN_USER_REQUEST));

    const responseSignIn = yield call(Api.user.loginUser, loginUser);

    const dataSignIn = yield call([responseSignIn, responseSignIn.json]);
    const statusSignIn = responseSignIn.status;
    if (statusSignIn !== 200) {
      getAnotherRequestErrorMessage(statusSignIn, invalidUser, anotherError);
    }
    const { id: token, user } = dataSignIn;

    const responseProfile = yield call(
      Api.user.profileUserById,
      _.get(user, 'id'),
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
      user: user || {},
      profile: profile || {},
    };

    const remember = loginUser.remember;

    yield call(
      setUser,
      _.merge(fullUser, { token: remember ? token : '' || '' }),
    );
    yield put(
      userActions.setSignInUserSuccessState(
        _.merge(fullUser, { token: token || '' }),
      ),
    );
    yield put(actionsForm.reset('forms.signInForm'));
    const routerLinkIntentions = yield select(
      state => state.ui.routerLinkIntentions,
    );
    if (routerLinkIntentions && !isEmptyProfile(fullUser)) {
      yield put(uiActionsAsync.setRouterToLinkAsync(routerLinkIntentions));
      yield put(uiActions.setRouterLinkIntentionsState(''));
    } else {
      if (getStartPrivatePage(fullUser) === constants.PATCH_URL_PROFILE) {
        yield put(
          uiActionsAsync.setRouterToLinkAsync(constants.PATCH_URL_PROFILE),
        );
      } else {
        yield put(
          uiActionsAsync.setRouterToLinkAsync(constants.PATCH_URL_OBJECT),
        );
      }
    }
  } catch (error) {
    yield put(userActions.setSignInUserErrorState());
    yield put(
      uiActionsAsync.setEmitErrorAsync(
        getFetchErrorMessage(error, failedFetch),
        types.SET_SIGN_IN_USER_REQUEST,
      ),
    );
  } finally {
    yield put(
      uiActions.setFetchingState(false, types.SET_SIGN_IN_USER_REQUEST),
    );
  }
}

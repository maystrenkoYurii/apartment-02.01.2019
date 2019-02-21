import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { uiReducer as ui } from './ui/reducers';
import { settingsReducer as settings } from './settings/reducers';
import { userReducer as user } from './user/reducers';
import { formReducer as forms } from './forms/reducers';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ui,
    user,
    settings,
    forms,
  });

export default rootReducer;

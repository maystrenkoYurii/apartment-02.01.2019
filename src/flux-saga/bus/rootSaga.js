import { uiWatchersSagas } from './ui/saga/index';
import { settingsWatchersSagas } from './settings/saga/index';
import { userWatchersSagas } from './user/saga/index';

export default [uiWatchersSagas, settingsWatchersSagas, userWatchersSagas];

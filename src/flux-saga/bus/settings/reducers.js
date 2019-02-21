import { types } from './types';

const initialState = {
  language: {
    language: 'en',
    changed: false,
  },
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SETTINGS_STATE:
      return {
        ...state,
        language: {
          language: action.payload.language,
          changed: initialState.language.changed,
        },
      };
    case types.SET_SETTINGS_LANGUAGE_STATE:
      return {
        ...state,
        language: {
          language: action.payload,
          changed: true,
        },
      };
    default:
      return state;
  }
};

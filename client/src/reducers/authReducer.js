import {
  SET_CURRENT_USER,
  USER_LOADING,
  PASSWORD_CHECK_STARTED,
  PASSWORD_CHECK_SUCCESS,
  PASSWORD_CHECK_FAILED,
  SET_PASSWORD_STARTED,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILED,
  UPDATE_PASSWORD_STARTED,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED
} from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  isUserAuthenticated: false,
  user: {},
  loading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PASSWORD_CHECK_STARTED:
    case SET_PASSWORD_STARTED:
    case UPDATE_PASSWORD_STARTED:
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_PASSWORD_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {}
      };
    case PASSWORD_CHECK_SUCCESS:
      localStorage.setItem('isUserAuthenticated', true);
      return {
        ...state,
        loading: false,
        errors: {}
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_PASSWORD_FAILED:
    case UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors
      };
    case PASSWORD_CHECK_FAILED:
      localStorage.removeItem('isUserAuthenticated');
      return {
        ...state,
        loading: false,
        errors: action.errors
      };
    default:
      return state;
  }
}

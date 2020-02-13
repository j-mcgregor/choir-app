import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import fileReducer from './fileReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  files: fileReducer,
  posts: postReducer
});

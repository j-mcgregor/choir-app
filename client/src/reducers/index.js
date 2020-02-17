import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import fileReducer from './fileReducer';
import postReducer from './postReducer';
import membersReducer from './membersReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  files: fileReducer,
  posts: postReducer,
  members: membersReducer
});

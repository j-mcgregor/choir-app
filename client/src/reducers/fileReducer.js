import {
  GET_FILES_STARTED,
  GET_FILES_SUCCESS,
  GET_FILES_FAILURE,
  UPLOAD_FILES_STARTED,
  UPLOAD_FILES_SUCCESS,
  UPLOAD_FILES_FAILURE
} from '../actions/types';

const initialState = {
  files: [],
  loading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FILES_STARTED:
    case UPLOAD_FILES_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_FILES_SUCCESS:
      return {
        ...state,
        files: action.payload,
        loading: false
      };
    case UPLOAD_FILES_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GET_FILES_FAILURE:
    case UPLOAD_FILES_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    default:
      return state;
  }
}

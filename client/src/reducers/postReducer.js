import {
  GET_POSTS_STARTED,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POST_STARTED,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  CREATE_POST_STARTED,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_STARTED,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_STARTED,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_STARTED:
    case GET_POST_STARTED:
    case CREATE_POST_STARTED:
    case UPDATE_POST_STARTED:
    case DELETE_POST_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST_SUCCESS:
    case CREATE_POST_SUCCESS:
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case CREATE_POST_FAILURE:
    case GET_POSTS_FAILURE:
    case GET_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    default:
      return state;
  }
}

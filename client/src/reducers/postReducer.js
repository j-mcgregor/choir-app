import {
  GET_POSTS_STARTED,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE
} from '../actions/types';

const initialState = {
  posts: [],
  loading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_STARTED:
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
    case GET_POSTS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    default:
      return state;
  }
}

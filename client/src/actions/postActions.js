import axios from 'axios';
import {
  GET_POSTS_STARTED,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE
} from '../actions/types';

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: GET_POSTS_STARTED });
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: GET_POSTS_SUCCESS, payload: response.data });
    } else {
      throw Error();
    }
  } catch (err) {
    dispatch({
      type: GET_POSTS_FAILURE,
      errors: err
    });
  }
};

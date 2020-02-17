import axios from 'axios';
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

/**
 * @desc fetch all posts
 */

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: GET_POSTS_STARTED });
    const response = await axios.get('/api/posts');

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

/**
 * @desc fetch a single post
 * @param id string
 */

export const getPost = id => async dispatch => {
  try {
    dispatch({ type: GET_POST_STARTED });
    const response = await axios.get(`/api/posts/${id}`);

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: GET_POST_SUCCESS, payload: response.data });
    } else {
      throw Error();
    }
  } catch (err) {
    dispatch({
      type: GET_POST_FAILURE,
      errors: err
    });
  }
};

/**
 * @desc create a post
 * @param post { title: string; body: string; }
 * @param history object (react-router-dom)
 */

export const createPost = (post, history) => async dispatch => {
  try {
    dispatch({ type: CREATE_POST_STARTED });
    let errors = {};
    if (!post.title) errors.title = 'Title field missing';
    if (!post.body) errors.body = 'Body field missing';
    if (Object.keys(errors).length) throw Error(JSON.stringify(errors));

    const response = await axios.post('/api/posts/create', post);

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
      history.push('/posts');
    } else {
      throw Error(JSON.stringify({ message: 'No response' }));
    }
  } catch (err) {
    dispatch({
      type: CREATE_POST_FAILURE,
      errors: JSON.parse(err.message)
    });
  }
};

/**
 * @desc update a post
 * @param id string
 * @param updatedPost { title: string; body: string }
 */

export const updatePost = (id, post, history) => async dispatch => {
  try {
    dispatch({ type: UPDATE_POST_STARTED });
    let errors = {};
    if (!post.title) errors.title = 'Title field missing';
    if (!post.body) errors.body = 'Body field missing';
    if (Object.keys(errors).length) throw Error(JSON.stringify(errors));

    const response = await axios.put(`/api/posts/${id}/update`, post);

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: UPDATE_POST_SUCCESS, payload: response.data });
      history.push('/posts');
    } else {
      throw Error(JSON.stringify({ message: 'No response' }));
    }
  } catch (err) {
    dispatch({
      type: UPDATE_POST_FAILURE,
      errors: JSON.parse(err.message)
    });
  }
};

/**
 * @desc delete a post
 * @param id string
 */

export const deletePost = id => async dispatch => {
  try {
    dispatch({ type: DELETE_POST_STARTED });

    const response = await axios.delete(`/api/posts/${id}`);

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: DELETE_POST_SUCCESS, payload: response.data });
      getPosts();
    } else {
      throw Error(JSON.stringify({ message: 'No response' }));
    }
  } catch (err) {
    dispatch({
      type: DELETE_POST_FAILURE,
      errors: JSON.parse(err.message)
    });
  }
};

import axios from 'axios';
import {
  GET_FILES_STARTED,
  GET_FILES_SUCCESS,
  GET_FILES_FAILURE,
  UPLOAD_FILES_STARTED,
  UPLOAD_FILES_SUCCESS,
  UPLOAD_FILES_FAILURE,
  DELETE_FILE_STARTED,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE
} from '../actions/types';

export const getFiles = () => async dispatch => {
  try {
    dispatch({ type: GET_FILES_STARTED });
    const response = await axios.get('/api/files/all');

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: GET_FILES_SUCCESS, payload: response.data });
    } else {
      throw Error();
    }
  } catch (err) {
    dispatch({
      type: GET_FILES_FAILURE,
      errors: err
    });
  }
};

export const uploadFiles = (formData, headers) => async dispatch => {
  try {
    dispatch({ type: UPLOAD_FILES_STARTED });
    const response = await axios.post('/api/files/upload', formData, {
      headers
    });
    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: UPLOAD_FILES_SUCCESS, payload: response.data });
    } else {
      throw Error();
    }
  } catch (error) {
    dispatch({
      type: UPLOAD_FILES_FAILURE,
      errors: error
    });
  }
};

export const deleteFile = (id, headers, callback) => async dispatch => {
  try {
    dispatch({ type: DELETE_FILE_STARTED });
    const response = await axios.delete(`/api/files/${id}`, {
      headers
    });
    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: DELETE_FILE_SUCCESS, payload: response.data });
      dispatch(callback());
    } else {
      throw Error();
    }
  } catch (error) {
    dispatch({
      type: DELETE_FILE_FAILURE,
      errors: error
    });
  }
};

import axios from 'axios';
import {
  GET_FILES_STARTED,
  GET_FILES_SUCCESS,
  GET_FILES_FAILURE
} from '../actions/types';

export const getFiles = () => async dispatch => {
  try {
    dispatch({ type: GET_FILES_STARTED });
    const response = await axios.get('/api/files/all');
    console.log(response);
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

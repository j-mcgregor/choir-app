import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
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
} from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('token', token.split('Bearer ')[1]);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const createPassword = (password, user) => async dispatch => {
  dispatch({ type: SET_PASSWORD_STARTED });
  try {
    const response = await axios.post('/api/users/setPassword', { password, user });
    if (response.status === 200 && response.data.success) {
      dispatch({ type: SET_PASSWORD_SUCCESS });
    } else {
      throw Error('Something went wrong');
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: SET_PASSWORD_FAILED, errors: error });
  }
};

export const checkPassword = password => async dispatch => {
  dispatch({ type: PASSWORD_CHECK_STARTED });
  try {
    const response = await axios.post('/api/users/checkPassword', { password });
    if (response.data.password) throw Error(response.data.password);
    if (response.status === 200 && response.data.success) {
      dispatch({ type: PASSWORD_CHECK_SUCCESS });
    } else {
      throw Error('Something went wrong');
    }
  } catch (error) {
    dispatch({ type: PASSWORD_CHECK_FAILED, errors: { password: error.message } });
  }
};

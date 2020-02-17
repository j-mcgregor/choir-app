import axios from 'axios';
import {
  GET_MEMBERS_STARTED,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_FAILURE,
  CREATE_MEMBER_STARTED,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_FAILURE,
  UPDATE_MEMBER_STARTED,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILURE,
  DELETE_MEMBER_STARTED,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILURE,
  DELETE_MEMBERS_STARTED,
  DELETE_MEMBERS_SUCCESS,
  DELETE_MEMBERS_FAILURE
} from './types';

export const getMembers = () => async dispatch => {
  try {
    dispatch({ type: GET_MEMBERS_STARTED });
    const response = await axios.get('/api/members');

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: GET_MEMBERS_SUCCESS, payload: response.data });
    } else {
      throw Error();
    }
  } catch (error) {
    dispatch({ type: GET_MEMBERS_FAILURE, errors: error });
  }
};

/**
 * @desc create a member
 * @param member { name: string; email: string; }
 */

export const createMember = (member, location) => async dispatch => {
  try {
    dispatch({ type: CREATE_MEMBER_STARTED });
    let errors = {};
    if (!member.name) errors.name = 'Name field missing';
    if (!member.email) errors.email = 'Email field missing';
    if (Object.keys(errors).length) throw Error(JSON.stringify(errors));

    const response = await axios.post('/api/members/create', member);

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: CREATE_MEMBER_SUCCESS, payload: response.data });
      location.reload();
    } else {
      throw Error(JSON.stringify({ message: 'No response' }));
    }
  } catch (err) {
    dispatch({
      type: CREATE_MEMBER_FAILURE,
      errors: JSON.parse(err.message)
    });
  }
};

/**
 * @desc update a post
 * @param id string
 * @param updatedMember { title: string; body: string }
 */

export const updateMember = (id, member) => async dispatch => {
  try {
    dispatch({ type: UPDATE_MEMBER_STARTED });

    const response = await axios.put(`/api/members/${id}/update`, member);

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: UPDATE_MEMBER_SUCCESS, payload: response.data });
    } else {
      throw Error(JSON.stringify({ message: 'No response' }));
    }
  } catch (err) {
    dispatch({
      type: UPDATE_MEMBER_FAILURE,
      errors: JSON.parse(err.message)
    });
  }
};

/**
 * @desc delete a post
 * @param id string
 */

export const deleteMember = (id, location) => async dispatch => {
  try {
    dispatch({ type: DELETE_MEMBER_STARTED });

    const response = await axios.delete(`/api/members/${id}`);

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: DELETE_MEMBER_SUCCESS, payload: response.data });
      location.reload();
    } else {
      throw Error(JSON.stringify({ message: 'No response' }));
    }
  } catch (err) {
    dispatch({
      type: DELETE_MEMBER_FAILURE,
      errors: JSON.parse(err.message)
    });
  }
};

/**
 * @desc delete many members
 * @param id string
 */

export const deleteManyMembers = (ids, location) => async dispatch => {
  try {
    dispatch({ type: DELETE_MEMBERS_STARTED });

    const response = await axios.post(`/api/members/deleteMany`, { ids });

    if (response.status >= 200 || response.status < 300) {
      dispatch({ type: DELETE_MEMBERS_SUCCESS, payload: response.data });
      location.reload();
    } else {
      throw Error(JSON.stringify({ message: 'No response' }));
    }
  } catch (err) {
    // console.log(err);
    dispatch({
      type: DELETE_MEMBERS_FAILURE,
      errors: JSON.parse(err.message)
    });
  }
};

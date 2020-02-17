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
} from '../actions/types';

const initialState = {
  members: [],
  member: {},
  loading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS_STARTED:
    case CREATE_MEMBER_STARTED:
    case UPDATE_MEMBER_STARTED:
    case DELETE_MEMBER_STARTED:
    case DELETE_MEMBERS_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload,
        loading: false
      };
    case CREATE_MEMBER_SUCCESS:
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        member: action.payload,
        loading: false
      };
    case DELETE_MEMBER_SUCCESS:
    case DELETE_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case CREATE_MEMBER_FAILURE:
    case GET_MEMBERS_FAILURE:
    case UPDATE_MEMBER_FAILURE:
    case DELETE_MEMBER_FAILURE:
    case DELETE_MEMBERS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false
      };
    default:
      return state;
  }
}

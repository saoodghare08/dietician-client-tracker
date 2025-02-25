import {
  ADD_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  LOAD_CLIENTS_SUCCESS,
} from "../actions/clientAction";

// clientReducer.js

const initialState = {
  clients: [], // Ensure this is an empty array at the start
  loading: false,
  error: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLIENTS_SUCCESS:
      return { ...state, clients: action.payload }; // payload should be an array
    case ADD_CLIENT_SUCCESS:
      return { ...state, clients: action.payload };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: action.payload,
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: action.payload,
      };
    default:
      return state;
  }
};

export default clientReducer;

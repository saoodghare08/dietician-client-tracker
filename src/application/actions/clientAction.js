// Client Action Types
export const LOAD_CLIENTS_START = 'LOAD_CLIENTS_START';
export const LOAD_CLIENTS_SUCCESS = 'LOAD_CLIENTS_SUCCESS';
export const LOAD_CLIENTS_FAILURE = 'LOAD_CLIENTS_FAILURE';

export const ADD_CLIENT_START = 'ADD_CLIENT_START';
export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
export const ADD_CLIENT_FAILURE = 'ADD_CLIENT_FAILURE';

export const UPDATE_CLIENT_START = 'UPDATE_CLIENT_START';
export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
export const UPDATE_CLIENT_FAILURE = 'UPDATE_CLIENT_FAILURE';

export const DELETE_CLIENT_START = 'DELETE_CLIENT_START';
export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';
export const DELETE_CLIENT_FAILURE = 'DELETE_CLIENT_FAILURE';

// Load Clients
export const loadClientsStart = () => ({
  type: LOAD_CLIENTS_START,
});

export const loadClientsSuccess = (clients) => ({
  type: LOAD_CLIENTS_SUCCESS,
  payload: clients,
});

export const loadClientsFailure = (error) => ({
  type: LOAD_CLIENTS_FAILURE,
  payload: error,
});

// Add Client
export const addClientStart = (client) => ({
  type: ADD_CLIENT_START,
  payload: client,
});

export const addClientSuccess = (client) => ({
  type: ADD_CLIENT_SUCCESS,
  payload: client,
});

export const addClientFailure = (error) => ({
  type: ADD_CLIENT_FAILURE,
  payload: error,
});

// Update Client
export const updateClientStart = (client) => ({
  type: UPDATE_CLIENT_START,
  payload: client,
});

export const updateClientSuccess = (client) => ({
  type: UPDATE_CLIENT_SUCCESS,
  payload: client,
});

export const updateClientFailure = (error) => ({
  type: UPDATE_CLIENT_FAILURE,
  payload: error,
});

// Delete Client
export const deleteClientStart = (clientId) => ({
  type: DELETE_CLIENT_START,
  payload: clientId,
});

export const deleteClientSuccess = (clientId) => ({
  type: DELETE_CLIENT_SUCCESS,
  payload: clientId,
});

export const deleteClientFailure = (error) => ({
  type: DELETE_CLIENT_FAILURE,
  payload: error,
});

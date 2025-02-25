import {
  LOAD_CLIENTS_START,
  loadClientsSuccess,
  loadClientsFailure,
  ADD_CLIENT_START,
  addClientSuccess,
  addClientFailure,
  UPDATE_CLIENT_START,
  updateClientSuccess,
  updateClientFailure,
  DELETE_CLIENT_START,
  deleteClientSuccess,
  deleteClientFailure,
} from "../actions/clientAction";

const clientMiddleware =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    try {
      if (action.type === LOAD_CLIENTS_START) {
        const clients = await api.clientApi.fetchData();
        dispatch(loadClientsSuccess(clients)); 

      } else if (action.type === ADD_CLIENT_START) {
        debugger
        const newClient = await api.clientApi.insertData(action.payload);
        dispatch(addClientSuccess(newClient));

      } else if (action.type === UPDATE_CLIENT_START) {
        const updatedClient = await api.clientApi.updateData(action.payload);
        dispatch(updateClientSuccess(updatedClient));

      } else if (action.type === DELETE_CLIENT_START) {
        debugger
        const deletedClient = await api.clientApi.deleteData(action.payload);
        dispatch(deleteClientSuccess(deletedClient));

      }
    } catch (error) {
      if (action.type === LOAD_CLIENTS_START) {
        dispatch(loadClientsFailure(error.message));
      } else if (action.type === ADD_CLIENT_START) {
        dispatch(addClientFailure(error.message));
      } else if (action.type === UPDATE_CLIENT_START) {
        dispatch(updateClientFailure(error.message));
      } else if (action.type === DELETE_CLIENT_START) {
        dispatch(deleteClientFailure(error.message));
      }
    }

    return next(action);
  };

export default [clientMiddleware];

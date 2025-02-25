// // Utils for handling client data in local storage

import { supabase } from "../../../supabaseClient";

const fetchData = async () => {
  // debugger
  const { data, error } = await supabase.from('Clients').select('*');
  if (error) console.error(error);
  else {console.log(data)
    return data;
  };
};
const insertData = async (newEntry) => {
  debugger
  const { data, error } = await supabase.from('Clients').insert([newEntry]).select()
  if (error) console.error(error);
  else console.log('Inserted:', data);
  return fetchData();
};
const updateData = async (updatedFields) => {
  debugger
  const { data, error } = await supabase.from('Clients').update(updatedFields).eq('id', updatedFields.id);
  if (error) console.error(error);
  else console.log('Updated:', data);
  return fetchData();
};
const deleteData = async (id) => {
  debugger
  const { data, error } = await supabase.from('Clients').delete().eq('id', id);
  if (error) console.error(error);
  else console.log('Deleted:', data);
  return fetchData();
};
export default {
    fetchData,
    insertData,
    updateData,
    deleteData,
}


// // Get clients from localStorage
// export const getClientsFromLocalStorage = () => {
//     const clients = localStorage.getItem('clients');
//     return clients ? JSON.parse(clients) : []; // Return parsed clients or an empty array if none exist
//   };
  
//   // Save clients to localStorage
//   export const saveClientsToLocalStorage = (clients) => {
//     localStorage.setItem('clients', JSON.stringify(clients)); // Save clients array as a string in localStorage
//   };
  
// // Add a client to localStorage with a generated id
// export const addClientToLocalStorage = (newClient) => {
//   const clients = getClientsFromLocalStorage(); // Get current clients
  
//   // Generate id for new client (last id + 1)
//   const newId = clients.length > 0 ? Math.max(...clients.map(client => client.id)) + 1 : 1;
  
//   // Add the new client to the array with the generated id
//   const clientWithId = { ...newClient, id: newId };
//   clients.push(clientWithId); // Add the new client to the array
  
//   saveClientsToLocalStorage(clients); // Save the updated array back to localStorage
//   return getClientsFromLocalStorage(); // Return updated clients
// };
  
//   // Update a client in localStorage
//   export const updateClientInLocalStorage = (updatedClient) => {
//     debugger
//     const clients = getClientsFromLocalStorage(); // Get current clients
//     const updatedClients = clients.map((client) =>
//       client.id === updatedClient.id ? updatedClient : client
//     ); // Find and update the client with the matching ID
//     saveClientsToLocalStorage(updatedClients); // Save the updated array back to localStorage
//     return getClientsFromLocalStorage(); // Return updated clients
//   };
  
//   // Delete a client from localStorage
// // Delete a client from localStorage and adjust IDs
// export const deleteClientFromLocalStorage = (clientId) => {
//   const clients = getClientsFromLocalStorage(); // Get current clients
//   const updatedClients = clients.filter((client) => client.id !== clientId); // Remove the client with the given ID
  
//   // Adjust the IDs after deletion
//   const clientsWithAdjustedIds = updatedClients.map((client, index) => ({
//     ...client,
//     id: index + 1, // Recalculate the ID starting from 1 again
//   }));

//   saveClientsToLocalStorage(clientsWithAdjustedIds); // Save the updated array back to localStorage
// };
  
//   export default {
//     getClientsFromLocalStorage,
//     saveClientsToLocalStorage,
//     addClientToLocalStorage,
//     updateClientInLocalStorage,
//     deleteClientFromLocalStorage
//   }


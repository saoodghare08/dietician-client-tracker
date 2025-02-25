//HOMEPAGE.JS

// import React, { useEffect, useState } from "react";
// import { Button, Table } from "react-bootstrap";
// import ClientForm from "./ClientForm";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addClientStart,
//   deleteClientStart,
//   loadClientsStart,
//   updateClientStart,
// } from "../application/actions/clientAction";
// import { ClientSelector } from "../application/selectors/clientSelector";

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const clients = useSelector(ClientSelector) || []; // Get clients from the Redux store
//   const [showOffcanvas, setShowOffcanvas] = useState(false);
//   const [expandedClient, setExpandedClient] = useState(null); // Track which client's revision dates are expanded
//   const [clientToUpdate, setClientToUpdate] = useState(null); // Track the client to update

//   // Fetch the clients when the component mounts
//   useEffect(() => {
//     dispatch(loadClientsStart()); // Dispatch action to load clients
//   }, [dispatch]);

//   const handleAddClient = (newClient) => {
//     // Generate a unique ID for each client
//     const clientWithId = { ...newClient, id: Date.now() }; // Use timestamp as a unique id (you can replace this with a more robust method like UUID)
//     dispatch(addClientStart(clientWithId)); // Dispatch action to add a new client
//     setShowOffcanvas(false); // Close the offcanvas form
//   };

//   const handleDeleteClient = (clientId) => {
//     dispatch(deleteClientStart(clientId)); // Dispatch action to delete a client
//   };

//   const handleToggleRevisionDates = (index) => {
//     setExpandedClient(expandedClient === index ? null : index); // Toggle the expanded client
//   };

//   const handleUpdateClient = (updatedClient) => {
//     console.log("Updating client:", updatedClient);
//     dispatch(updateClientStart(updatedClient)); // Dispatch action to update the client
//     setShowOffcanvas(false); // Close the offcanvas form
//   };

//   const handleOpenUpdateForm = (client) => {
//     setClientToUpdate(client); // Set the client data to be updated
//     setShowOffcanvas(true); // Open the offcanvas form
//   };

//   return (
//     <div className="container">
//       <h1 className="my-4">Dietician Client Tracker</h1>
//       <Button variant="primary" onClick={() => setShowOffcanvas(true)}>
//         Add New Client
//       </Button>

//       {/* Table to display clients */}
//       <Table striped bordered hover className="my-4">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Phone Number</th>
//             <th>Age</th>
//             <th>Enrollment Date</th>
//             <th>Package</th>
//             <th>Number of revisions</th>
//             <th>Revision Dates</th>
//             <th>End Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client, index) => {
//             if (!client) {
//               return null; // Skip invalid client entries
//             }
//             return (
//               <tr key={client.id}>
//                 <td>{client.name}</td>
//                 <td>{client.number}</td>
//                 <td>{client.age}</td>
//                 <td>{client.enrollmentDate}</td>
//                 <td>{client.package}</td>
//                 <td>{client.numRevisions}</td>
//                 <td>
//                   <span
//                     style={{ cursor: "pointer" }}
//                     onClick={() => handleToggleRevisionDates(index)}
//                   >
//                     {expandedClient === index
//                       ? client.revisionDates
//                       : `${client.revisionDates.slice(0, 20)}...`}
//                   </span>
//                 </td>
//                 <td>{client.endDate}</td>
//                 <td>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleDeleteClient(client.id)}
//                   >
//                     Delete
//                   </Button>
//                   <Button
//                     variant="warning"
//                     onClick={() => handleOpenUpdateForm(client)}
//                   >
//                     Update
//                   </Button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>

//       {/* Offcanvas Form to Add or Update Client */}
//       <ClientForm
//         show={showOffcanvas}
//         onHide={() => {
//           setShowOffcanvas(false);
//           setClientToUpdate(null); // Reset client to update when closing form
//         }}
//         onAddClient={handleAddClient}
//         onUpdateClient={handleUpdateClient}
//         client={clientToUpdate} // Pass the client data to update
//       />
//     </div>
//   );
// };

// export default HomePage;

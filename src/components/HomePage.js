import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addClientStart,
  deleteClientStart,
  loadClientsStart,
  updateClientStart,
} from "../application/actions/clientAction";
import { ClientSelector } from "../application/selectors/clientSelector";
import AddClientForm from "./AddClientForm";
import UpdateClientForm from "./UpdateClientForm";
import ClientNotification from "./ClientNotification";

const HomePage = () => {
  const dispatch = useDispatch();
  const clients = useSelector(ClientSelector) || [];
  const [expandedClient, setExpandedClient] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [clientToUpdate, setClientToUpdate] = useState(null);

  useEffect(() => {
    dispatch(loadClientsStart());
  }, [dispatch]);

  const handleAddClient = (newClient) => {
    dispatch(addClientStart(newClient));
    setShowAddForm(false);
    dispatch(loadClientsStart());
  };

  const handleDeleteClient = (clientId) => {
    dispatch(deleteClientStart(clientId));
    dispatch(loadClientsStart());
  };

  // Handle toggle logic for expanding/collapsing revision dates
  const handleToggleRevisionDates = (clientId) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };

  const handleUpdateClient = (updatedClient) => {
    dispatch(updateClientStart(updatedClient));
    setShowUpdateForm(false);
    dispatch(loadClientsStart());
  };

  const handleOpenUpdateForm = (client) => {
    setClientToUpdate(client);
    setShowUpdateForm(true);
  };

  return (
    <div className="container">
      <h1 className="my-4">Dietician Client Tracker</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Button variant="primary" className="me-3" onClick={() => setShowAddForm(true)}>
          Add New Client
        </Button >
        <ClientNotification/>
      </div>

      <Table striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Enrollment Date</th>
            <th>Package</th>
            <th>Revisions</th>
            <th>Revision Dates</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.number}</td>
              <td>{client.age}</td>
              <td>{client.enrollmentDate}</td>
              <td>{client.package}</td>
              <td>{client.numRevisions}</td>
              <td>
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => handleToggleRevisionDates(client.id)}
                >
                  {expandedClient === client.id
                    ? client.revisionDates || "No revision dates available" // Show full revision dates when expanded
                    : (client.revisionDates &&
                        client.revisionDates.slice(0, 20)) + "..." ||
                      "No revision dates available"}{" "}
                  {/* Show truncated revision dates */}
                </span>
              </td>
              <td>{client.endDate}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleOpenUpdateForm(client)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddClientForm
        show={showAddForm}
        onHide={() => setShowAddForm(false)}
        onAddClient={handleAddClient}
      />

      <UpdateClientForm
        show={showUpdateForm}
        onHide={() => setShowUpdateForm(false)}
        onUpdateClient={handleUpdateClient}
        client={clientToUpdate}
      />
    </div>
  );
};

export default HomePage;

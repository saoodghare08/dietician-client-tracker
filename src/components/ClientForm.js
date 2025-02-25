import React, { useEffect, useState } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

const ClientForm = ({ show, onHide, onAddClient, onUpdateClient, client }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    age: '',
    enrollmentDate: '',
    package: '1 month',
    numRevisions: 0,
    revisionDates: '',
    endDate: '',
  });

  useEffect(() => {
    if (client) {
      console.log("Client data passed to form:", client);
      setFormData(client); // Populate the form with the client data if updating
    }
  }, [client]);

  const calculateDetails = () => {
    const { enrollmentDate, package: selectedPackage } = formData;
    const enrollDate = new Date(enrollmentDate.split('/').reverse().join('-')); // Convert dd/mm/yyyy to yyyy-mm-dd

    let numRevisions = 0;
    let revisionDates = [];
    let endDate = new Date(enrollDate);

    // Calculate number of revisions, revision dates, and end date based on the selected package
    if (selectedPackage === '1 month') {
      numRevisions = 2; // 1 initial and 1 after 15 days
      revisionDates = [enrollDate];
      revisionDates.push(new Date(enrollDate.getTime() + 15 * 24 * 60 * 60 * 1000)); // add 15 days for 2nd revision
      endDate.setMonth(endDate.getMonth() + 1); // End date after 1 month
    } else if (selectedPackage === '3 months') {
      numRevisions = 6; // 1 initial and 1 every 15 days
      revisionDates = [enrollDate];
      for (let i = 1; i < numRevisions; i++) {
        revisionDates.push(new Date(enrollDate.getTime() + i * 15 * 24 * 60 * 60 * 1000)); // add 15 days interval for each revision
      }
      endDate.setMonth(endDate.getMonth() + 3); // End date after 3 months
    } else if (selectedPackage === '6 months') {
      numRevisions = 12; // 1 initial and 1 every 15 days
      revisionDates = [enrollDate];
      for (let i = 1; i < numRevisions; i++) {
        revisionDates.push(new Date(enrollDate.getTime() + i * 15 * 24 * 60 * 60 * 1000)); // add 15 days interval for each revision
      }
      endDate.setMonth(endDate.getMonth() + 6); // End date after 6 months
    }

    // Format revision dates to dd/mm/yyyy
    revisionDates = revisionDates.map((date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    });

    // Format end date to dd/mm/yyyy
    const endFormatted = `${String(endDate.getDate()).padStart(2, '0')}/${String(endDate.getMonth() + 1).padStart(2, '0')}/${endDate.getFullYear()}`;

    // Return the updated client object with calculated values
    return {
      ...formData,
      numRevisions,
      revisionDates: revisionDates.join(', '),
      endDate: endFormatted,
      id: client ? client.id : Date.now(),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedClient = calculateDetails(); 
    console.log("Form data on submit:", formData);
    if(client){
      onUpdateClient(updatedClient);
    } else {
      onAddClient(updatedClient);
      console.log(updatedClient);
    }
      
    setFormData({
      name: '',
      number: '',
      age: '',
      enrollmentDate: '',
      package: '1 month',
      numRevisions: 0,
      revisionDates: '',
      endDate: '',
    });
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
      <Offcanvas.Title>{client ? "Update Client" : "Add New Client"}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="enrollmentDate">
            <Form.Label>Enrollment Date (dd/mm/yyyy)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter enrollment date"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="package">
            <Form.Label>Package</Form.Label>
            <Form.Control
              as="select"
              name="package"
              value={formData.package}
              onChange={handleChange}
            >
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            {client ? "Update Client" : "Add Client"}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ClientForm;
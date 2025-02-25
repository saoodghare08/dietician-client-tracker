import React, { useState, useEffect } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

const UpdateClientForm = ({ show, onHide, onUpdateClient, client }) => {
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
      setFormData(client);
    }
  }, [client]);

  const calculateDetails = (formData) => {
    const { enrollmentDate, package: selectedPackage } = formData;

    if (!enrollmentDate) return formData;

    const enrollDate = new Date(enrollmentDate.split('/').reverse().join('-'));

    let numRevisions = 0;
    let revisionDates = [];
    let endDate = new Date(enrollDate);

    // Calculate details based on package
    if (selectedPackage === '1 month') {
      numRevisions = 2;
      revisionDates = [enrollDate];
      revisionDates.push(new Date(enrollDate.getTime() + 15 * 24 * 60 * 60 * 1000));
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (selectedPackage === '2 months') {
      numRevisions = 4;
      revisionDates = [enrollDate];
      for (let i = 1; i < numRevisions; i++) {
        revisionDates.push(new Date(enrollDate.getTime() + i * 15 * 24 * 60 * 60 * 1000));
      }
      endDate.setMonth(endDate.getMonth() + 2);
    } else if (selectedPackage === '3 months') {
      numRevisions = 6;
      revisionDates = [enrollDate];
      for (let i = 1; i < numRevisions; i++) {
        revisionDates.push(new Date(enrollDate.getTime() + i * 15 * 24 * 60 * 60 * 1000));
      }
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (selectedPackage === '6 months') {
      numRevisions = 12;
      revisionDates = [enrollDate];
      for (let i = 1; i < numRevisions; i++) {
        revisionDates.push(new Date(enrollDate.getTime() + i * 15 * 24 * 60 * 60 * 1000));
      }
      endDate.setMonth(endDate.getMonth() + 6);
    }

    // Format dates
    revisionDates = revisionDates.map((date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    });

    const endFormatted = `${String(endDate.getDate()).padStart(2, '0')}/${String(endDate.getMonth() + 1).padStart(2, '0')}/${endDate.getFullYear()}`;

    return {
      ...formData,
      numRevisions,
      revisionDates: revisionDates.join(', '),
      endDate: endFormatted,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(calculateDetails(updatedFormData)); // Recalculate details when changes occur
  };

  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Manually update the form data
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateClient(formData);
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Update Client</Offcanvas.Title>
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
              type="date"
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
              <option value="2 months">2 Months</option> {/* Added 2 months option */}
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="numRevisions">
            <Form.Label>Number of Revisions</Form.Label>
            <Form.Control
              type="number"
              name="numRevisions"
              value={formData.numRevisions}
              onChange={handleManualChange} // Allow manual changes
            />
          </Form.Group>

          <Form.Group controlId="revisionDates">
            <Form.Label>Revision Dates</Form.Label>
            <Form.Control
              type="text"
              name="revisionDates"
              value={formData.revisionDates}
              onChange={handleManualChange} // Allow manual changes
            />
          </Form.Group>

          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleManualChange} // Allow manual changes
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Client
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UpdateClientForm;

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import InputAdornment from "@mui/material/InputAdornment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DialpadIcon from "@mui/icons-material/Dialpad";
import EmailIcon from "@mui/icons-material/Email";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ConstructionIcon from "@mui/icons-material/Construction";
const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    email: "",
    carModel: "",
    serviceTypes: "",
    appointmentDateTime: "",
    serviceCenterId: "", // Add serviceCenterId to the state
  });

  const [emailError, setEmailError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = () => {
    if (validateEmail(formData.email)) {
      setEmailError("");
      // Add your create function here
    } else {
      setEmailError("Invalid email format. Please use something@domain.com");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email) && email.endsWith(".com")) {
      return true;
    }
    return false;
  };

  const serviceCenterLocations = [
    "Location 1",
    "Location 2",
    "Location 3",
    "Location 4",
    "Location 5",
  ];

  const containerStyle = {
    padding: "20px",
  };

  const buttonStyle = {
    marginTop: "10px",
  };


  

  return (
    <Box sx={{ display: "flex" }}>
      {/* Include the Sidebar component */}
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "35px" }}>
        <Container style={containerStyle}>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <h6>Customer Name: </h6>
                  </Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person">
                        <GroupAddIcon />
                      </i>{" "}
                      {/* Replace with your desired icon */}
                    </span>
                    <Form.Control
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
              </Col><Col>
                <Form.Group>
                  <Form.Label>
                    <h6>Email: </h6>
                  </Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person">
                        <EmailIcon />
                      </i>{" "}
                      {/* Replace with your desired icon */}
                    </span>
                    <Form.Control
                      name="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={emailError !== ""}
                    />
                    {emailError && (
                      <Form.Control.Feedback type="invalid">
                        {emailError}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <h6>Contact Number: </h6>
                  </Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person">
                        <DialpadIcon />
                      </i>{" "}
                      {/* Replace with your desired icon */}
                    </span>
                    <Form.Control
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <h6>Car Model: </h6>
                  </Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person">
                        <DirectionsCarIcon />
                      </i>{" "}
                      {/* Replace with your desired icon */}
                    </span>
                    <Form.Control
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CurrencyBitcoinIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <h6>Appointment Date: </h6>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="appointmentDateTime"
                    value={formData.appointmentDateTime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <h6>Service Center Location: </h6>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="serviceCenterId"
                    value={formData.serviceCenterId}
                    onChange={handleChange}
                  >
                    <option value="">Select a location</option>
                    {serviceCenterLocations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <h6>Service Types: </h6>
                  </Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person">
                        <ConstructionIcon />
                      </i>{" "}
                      {/* Replace with your desired icon */}
                    </span>
                    <Form.Control
                      name="serviceTypes"
                      value={formData.serviceTypes}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              onClick={handleCreate}
              style={{ backgroundColor: "black", ...buttonStyle }}
            >
              Create
            </Button>
          </Form>
        </Container>
      </Box>
    </Box>
  );
};
export default CreateAppointment;

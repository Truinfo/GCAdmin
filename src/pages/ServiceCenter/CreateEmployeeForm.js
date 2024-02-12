import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { MenuItem } from "@mui/material";

const CreateEmployeeForm = () => {
  const [serviceCenterId, setServiceCenterId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [contactNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [serviceCenters, setServiceCenters] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch service centers when the component mounts
    axios.get(`https://gocarsmithbackend.onrender.com/api/serviceCenter/getServiceCenters`)
      .then(response => {
        setServiceCenters(response.data.serviceCenterDetails);
      })
      .catch(error => {
        console.error("Error fetching service centers:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      serviceCenterId,
      firstName,
      secondName,
      contactNumber,
      email,
      password,
      Address,
    };

    try {
      // Make a POST request to the backend registration endpoint
      const response = await axios.post('https://gocarsmithbackend.onrender.com/api/employee/signup', formData);

      console.log(response.data.message);
      setSuccess(true);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  const handleClose = () => {
    // Reset form fields and close the form
    setServiceCenterId("");
    setFirstName("");
    setSecondName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setAddress("");
    setSuccess(false);
  };
  return (
    <Box sx={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Create Employee
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Service Center ID"
              name="serviceCenterId"
              variant="outlined"
              select
              value={serviceCenterId}
              onChange={(e) => setServiceCenterId(e.target.value)}
              style={{ marginBottom: "20px" }}
            >
              {serviceCenters.map((center) => (
                <MenuItem key={center._id} value={center._id}>
                {center.serviceCenterName}
              </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Second Name"
              name="secondName"
              variant="outlined"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="contactNumber"
              variant="outlined"
              value={contactNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="Address"
              variant="outlined"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <button
            type="submit"
            style={{
              backgroundColor: "blue", // Set your desired button color
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            
          >
            Save
          </button>
          {success && (
            <button
              type="button"
              onClick={handleClose}
              style={{
                marginLeft: "10px",
                backgroundColor: "gray", // Set your desired button color
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          )}
        </Grid>
      </form>
    </Box>
  );
};

export default CreateEmployeeForm;

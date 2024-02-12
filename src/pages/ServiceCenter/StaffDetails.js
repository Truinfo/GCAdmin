import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
const EditEmployeeForm = (props) => {
  const { employee } = props;

  const token = localStorage.getItem("token");
  const [employeeDetails, setEmployeeDetails] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    firstName: firstName,
    secondName: secondName,
    employeeName: employeeName,
    email: email,
    employeeId: employeeId,
    role: role,
  });

  console.log(formData);

  useEffect(() => {
    const getEmployeeDetailsById = () => {
      try {
        axios
          .get(
            `https://gocarsmithbackend.onrender.com/api/employee/getSingleEmplyeDetail/${employee}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )

          .then((response) => {
            setEmployeeDetails(response.data || []);
            setFormData(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getEmployeeDetailsById();

    // const spiteTheData=()=>{
    //   employeeDetails.map((eachInfo)=>
    //      (setFirstName(eachInfo.firstName),
    //           setSecondName(eachInfo.secondName),
    //           setEmployeeName(eachInfo.employeeName),
    //           setEmail(eachInfo.email),
    //           setEmployeeId(eachInfo.employeeId),
    //           setRole(eachInfo.role)
    //   ))
    // }
    // spiteTheData()
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
    axios
      .put(
        `https://gocarsmithbackend.onrender.com/api/updateEmployeeDataById/${employee}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Successfully upDate employee Data");
        setFormData("");
      });
  };

  return (
    <Box sx={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Employee Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              variant="outlined"
              value={formData.firstName}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Second Name"
              name="secondName"
              variant="outlined"
              value={formData.secondName}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Employee Name"
              name="employeeName"
              variant="outlined"
              value={formData.employeeName}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Employee ID"
              name="employeeId"
              variant="outlined"
              value={formData.employeeId}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              variant="outlined"
              value={formData.role}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default EditEmployeeForm;

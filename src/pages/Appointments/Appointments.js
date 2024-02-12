import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Typography,
} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { format } from 'date-fns';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Row, Col } from "react-bootstrap";
import { GrCircleInformation } from "react-icons/gr";


function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [locationFilter, setLocationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing in localStorage");
          return;
        }
        const response = await axios.get(
          "https://gocarsmithbackend.onrender.com/api/admin/getAppointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        // Add error handling, e.g., display an error message to the user
      }
    };
    fetchData();
  }, []);

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleIconClick = (bookingId) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = {
        ...prevExpandedRows,
        [bookingId]: !prevExpandedRows[bookingId],
      };
      console.log("New Expanded Rows:", newExpandedRows);
      return newExpandedRows;
    });
  };

  const generateAdditionalContent = (services) => {
    return (
      <TableCell colSpan={6}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Service Title</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services?.map((service, index) => (
              <TableRow key={service._id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCell>
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const isLocationMatch =
      locationFilter === "All" || appointment.serviceCenter === locationFilter;
    const isStatusMatch =
      statusFilter === "All" || appointment.status === statusFilter;
    return isLocationMatch && isStatusMatch;
  });

  useEffect(() => {
    // Check for token and admin in localStorage
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('admin');

    if (!token && !isAdmin) {
      navigate('/'); // Redirect to login page if no token and admin
    }
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Row style={{ marginBottom: "10px" }}>
            <Col lg={10}>
              <h1>Appointments</h1>
            </Col>
            <Col lg={2}>
              <Box sx={{ marginBottom: "15px" }}>
                <FormControl>
                  <Select
                    labelId="status-filter-label"
                    id="status-filter"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="All">All Status</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Col>
          </Row>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: "rgb(241, 243, 244)",
                    fontWeight: "600",
                  }}
                >
                  <TableCell>
                    <strong>Booking Id</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Customer Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Appointment Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Service Center</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Details</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <React.Fragment key={appointment._id}>
                    <TableRow>
                      <TableCell>{appointment._id}</TableCell>
                      <TableCell>{appointment.customerName}</TableCell>
                      <TableCell>{format(new Date(appointment.appointmentDate), 'yyyy-MM-dd')}</TableCell>
                      <TableCell>{appointment.serviceCenterId}</TableCell>
                      <TableCell onClick={() => handleIconClick(appointment._id)}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography>Info</Typography>
                          <IconButton>
                            <GrCircleInformation />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={appointment.status}
                          color={
                            appointment.status === "Pending"
                              ? "default"
                              : appointment.status === "Completed"
                              ? "success"
                              : "error"
                          }
                        />
                      </TableCell>
                    </TableRow>
                    {expandedRows[appointment._id] && generateAdditionalContent(appointment.listOfServices)}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}

export default Appointments;

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
import Sidebar from "../components/Sidebar/Sidebar";
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
import CreateInvoice from "./Invoice/CreateInvoice";

function UserProfile() {
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

  const handleNewInvoiceClick = (appointment) => {
    console.log("Clicked New Invoice Button");
    setSelectedAppointment(appointment);
    console.log("Selected Appointment:", appointment); // Log the appointment directly
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

  const getDisplayedCustomerName = (appointment) => {
    // Add your condition to determine the displayed name
    if (appointment.status === "Completed") {
      return "Lucky";
    } else {
      return appointment.customerName;
    }
  };

  const displayedAppointments = appointments.slice(0, 10);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Row style={{ marginBottom: "10px" }}>
            <Col lg={10}>
              <h1>UserProfile</h1>
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
                    <strong>Phone Number</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Details</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedAppointments.map((appointment) => (
                  <React.Fragment key={appointment._id}>
                    <TableRow>
                      <TableCell>{appointment._id}</TableCell>
                      <TableCell>{getDisplayedCustomerName(appointment)}</TableCell>
                      <TableCell>{appointment.phoneNumber}</TableCell>
                      <TableCell>{appointment.email}</TableCell>
                      <TableCell onClick={() => handleIconClick(appointment._id)}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography>Info</Typography>
                          <IconButton>
                            <GrCircleInformation />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRows[appointment._id] && generateAdditionalContent(appointment.listOfServices)}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedAppointment && (
            <CreateInvoice appointmentData={selectedAppointment} onClose={true} />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default UserProfile;

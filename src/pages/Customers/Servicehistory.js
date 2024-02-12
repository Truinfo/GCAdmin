import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Box,
} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";


const Servicehistory = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsers] = useState();
  const _id = localStorage.getItem('_id')
  const [listOfServices, setListOfServices] = useState([]);
  const handleRowSelect = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [...selectedRows];
    if (selectedIndex === -1) {
      newSelected = [...newSelected, id];
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setSelectedRows(newSelected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/ServiceCenter/ListOfSevicesBy/${_id}`
        );
        setListOfServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      {/* Include the Sidebar component */}
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "45px" }}>
        <Container>
          <h1> Servicehistory</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      onChange={() => {
                        if (selectedRows.length === users.length) {
                          setSelectedRows([]);
                        } else {
                          setSelectedRows(users.map((user) => user.id));
                        }
                      }}
                      checked={selectedRows.length === users.length}
                    />
                  </TableCell>
                  <TableCell className="fs-6 m-6">Service Id</TableCell>
                  <TableCell className="fs-6 m-6">Service name</TableCell>
                  <TableCell className="fs-6 m-6">Service description</TableCell>
                  <TableCell className="fs-6 m-6"> Location</TableCell>
                  <TableCell className="fs-6 m-6"> Service date</TableCell>
                  <TableCell className="fs-6 m-6"> payment status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfServices.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        onChange={() => handleRowSelect(user.id)}
                        checked={selectedRows.indexOf(user.id) !== -1}
                      />
                    </TableCell>
                    <TableCell >
                        <Grid item>{user.servicename}</Grid>
                    </TableCell>
                    <TableCell>{user.servicedescription}</TableCell>
                    <TableCell style={{ marginBottom: 0 }}>
                      {user.location}
                    </TableCell>
                    <TableCell>
                     
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};
export default Servicehistory;

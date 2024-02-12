import React, { useState, useEffect } from "react";
import {
  Avatar,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  Button,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Customers = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [undoSnackbarOpen, setUndoSnackbarOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [totalOnsiteAppointmnets,setTotalOnsiteAppointmnets]=useState([])
  const navigate = useNavigate();
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
  const handleViewDetails = (userId) => {
    // Store the user ID in local storage
    localStorage.setItem('_id', userId);
    // Navigate to the "/Services" page with email included as a parameter
    navigate('/Admin/Services');
};

const handleOnSiteUserViewDetails=(_id)=>{
  localStorage.setItem('onSiteUserId', _id );

  navigate('/Admin/onsiteService');
}

  const token = localStorage.getItem("token");
  useEffect(() => {
  if (!token) {
    console.error("Token is missing in localStorage");
    return;
  }
    const getUserDetailsForAdmin = () => {
      axios.get("https://gocarsmithbackend.onrender.com/api/admin/getCustomers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).
      then((response) => {
        setUserDetails(response.data);
      });
    };
    getUserDetailsForAdmin();


    const fetchTotalOnsiteAppointment = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/TotalAllAppointments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalOnsiteAppointmnets(response.data);
        console.log(response.data)
      } catch (error) {

        console.error("Error fetching appointments:", error);
      }
    };

    fetchTotalOnsiteAppointment();
  }, []);
  const handleDeleteUser = (_id) => {
    setDeleteUserId(_id);
    setDeleteDialogOpen(true)
  };
  const handleConfirmDelete = async () => {
    if (!deleteUserId) {
      console.error('No user ID to delete.');
      return;
    }
  if (!token) {
    console.error("Token is missing in localStorage");
    return;
  }
    try {
      const response = await axios.delete(`https://gocarsmithbackend.onrender.com/api/deleteUserByUsing/${deleteUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },});
      if (response.status === 200) {
        setDeleteDialogOpen(false);
         axios.get("https://gocarsmithbackend.onrender.com/api/admin/getCustomers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserDetails(response.data);
      })
        // Update the state or perform other actions after successful deletion
      } else {
        console.error('Failed to delete user:', response.data.error);
        // Handle the error or provide user feedback
      }
    } catch (error) {
      console.error('Error while deleting user:', error);
      // Handle network error or other issues
    }
  }
  const getAvatarIcon = (gender) => {
    if (gender === "male") {
      return (
        <Avatar>
          <MaleIcon />
        </Avatar>
      );
    } else if (gender === "female") {
      return (
        <Avatar>
          <FemaleIcon />
        </Avatar>
      );
    } else {
      return <Avatar />;
    }
  };




  // onsite user
  const [deleteOnSiteDialogOpen, setDeleteOnSiteDialogOpen] = useState(false);
  const [deleteOnSiteUserId, setDeleteOnSiteUserId] = useState(null);




  const handleOnSiteUserDeleteUser=(_id)=>{
    setDeleteOnSiteUserId(_id);
    setDeleteOnSiteDialogOpen(true)
  }



  const handleOnSiteConfirmDelete = async () => {
    if (!deleteOnSiteUserId) {
      
      return;
    }
  if (!token) {
    console.error("Token is missing in localStorage");
    return;
  }
    try {
      const response = await axios.delete(`https://gocarsmithbackend.onrender.com/api/admin/deleteOnsitEAppointmnetBy/${deleteOnSiteUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },}); 
      if (response.status === 200) {
        setDeleteOnSiteDialogOpen(false);
        try {
          const response = await axios.get(
            `https://gocarsmithbackend.onrender.com/api/admin/TotalAllAppointments`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }

          );
          setTotalOnsiteAppointmnets(response.data);
          console.log(response.data)
        } catch (error) {
  
          console.error("Error fetching appointments:", error);
        }
        // Update the state or perform other actions after successful deletion
      } else {
        console.error('Failed to delete user:', response.data.error);
        // Handle the error or provide user feedback
      }
    } catch (error) {
      console.error('Error while deleting user:', error);
      // Handle network error or other issues
    }
  }



  return (
    <Box sx={{ display: "flex" }}>
      {/* Include the Sidebar component */}
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Container>
          <h1> Customers</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                 
                  <TableCell className="fs-5 m-6">Name</TableCell>
                  <TableCell className="fs-5 m-6">Email ID</TableCell>
                  <TableCell className="fs-5 m-6">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>Services</Grid>
                      {selectedRows.length > 0 && (
                        <IconButton
                          onClick={handleDeleteUser}
                          color="error"
                          style={{ marginLeft: "130px" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userDetails.map((user) => (
                  <TableRow key={user._id}>
                   
                    <TableCell>
                      <Grid container spacing={2} alignItems="center">
                        {/* <Grid item>{getAvatarIcon(user.gender)}</Grid> */}
                        <Grid item>
                          {user.firstName} {user.secondName}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell style={{ marginBottom: 0 }}>
                      {user.email}
                    </TableCell>
                  
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item>
                        <Button onClick={() => handleViewDetails(user._id)}>
                            View Details
                          </Button>
                        </Grid>
                        <Grid item style={{ marginLeft: "80px" }}>
                          <IconButton
                            onClick={() => handleDeleteUser(user._id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}





                {totalOnsiteAppointmnets.map((user) => (
                  <TableRow key={user._id}>
                   
                    <TableCell>
                      <Grid container spacing={2} alignItems="center">
                        {/* <Grid item>{getAvatarIcon(user.gender)}</Grid> */}
                        <Grid item>
                          {user.customerName}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell style={{ marginBottom: 0 }}>
                      {user.email}
                    </TableCell>
                    
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item>
                        <Button onClick={() => handleOnSiteUserViewDetails(user._id)}>
                            View Details
                          </Button>
                        </Grid>
                        <Grid item style={{ marginLeft: "80px" }}>
                          <IconButton
                            onClick={() => handleOnSiteUserDeleteUser(user._id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>


            </Table>
          </TableContainer>
          <Snackbar
            open={undoSnackbarOpen}
            style={{ marginLeft: "930px" }}
            action={
              <Alert severity="info">
                Item deleted
                <Button
                  color="secondary"
                  size="small"
                // onClick={handleUndoDelete}
                >
                  UNDO
                </Button>
              </Alert>
            }
          />
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setDeleteDialogOpen(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>


          {/**onsite */}

          <Dialog
            open={deleteOnSiteDialogOpen}
            onClose={() => setDeleteOnSiteDialogOpen(false)}
          >
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setDeleteOnSiteDialogOpen(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={handleOnSiteConfirmDelete} color="primary" autoFocus>
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>

        </Container>
      </Box>
    </Box>
  );
};
export default Customers;
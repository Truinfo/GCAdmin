import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const token = localStorage.getItem('token')
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);


  const handleApprove = (orderId) => {
    handleApproveOrReject(orderId, 'Granted');
  };
  const handleReject = (orderId) => {
    handleApproveOrReject(orderId, 'Rejected');
  };


  const handleApproveOrReject = async (orderId, status) => {
    try {
      
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.patch(
        `https://gocarsmithbackend.onrender.com/api/admin/editStatusAfterAcceptedOrRejected/${orderId}`,
        { status }, // Send the status (either 'Granted' or 'Rejected')
        { headers }
      );
      // Fetch updated data after approval or rejection
      const response = await axios.get(
        `https://gocarsmithbackend.onrender.com/api/admin/getInventoryRequest/${serviceCenterId}`,
        { headers },
        
      );
      setRequests(response.data);
      console.log(`Order ${orderId} ${status} successfully`);
    } catch (error) {
      console.error(`Error ${status.toLowerCase()}ing order ${orderId}:`, error);
    }
  };



  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`https://gocarsmithbackend.onrender.com/api/admin/deleteRequestById/${selectedRequestId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response && response.data) {


        const updatedResponse = await axios.get(`https://gocarsmithbackend.onrender.com/api/admin/getInventoryRequest/${serviceCenterId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (updatedResponse && updatedResponse.data) {
          console.log('Data fetched successfully after status update:', updatedResponse.data);
          setRequests(updatedResponse.data);
          setSnackbarOpen(true);
          setDeleteDialogOpen(false);
        }
      }
    } catch (error) {
      console.error('Error updating or fetching data:', error);
    }



  };

  const handleCancel = () => {
    setSelectedRequestId(null);
    setOpenApproveDialog(false);
    setOpenRejectDialog(false);
    setEditDialogOpen(false);
  };

  const serviceCenterId = localStorage.getItem('ServiceCenterId');


  const handleDelete = (id) => {
    setSelectedRequestId(id);
    setDeleteDialogOpen(true);
  };


  const handleUndo = () => {
    if (deletedItem) {
      setRequests((prevRequests) => [...prevRequests, deletedItem]);
      setDeletedItem(null);
      setSnackbarOpen(false);
    }
  };
  

  useEffect(() => {

    const getInventoryRequestDetails = async () => {
      const response = await axios.get(`https://gocarsmithbackend.onrender.com/api/admin/getInventoryRequest/${serviceCenterId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response) {
        setRequests(response.data)
      }
    };

    getInventoryRequestDetails();

  }, []);

  return (
    <Container>
      <h2>Inventory Requests</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell> Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>

          </TableHead>

          <TableBody>

            {requests.map((request) => (

              <TableRow key={request._id}>

                <TableCell>{request._id}</TableCell>

                <TableCell>
                  {request.items.map((ite) => (

                    <>

                      <li key={ite._id}>{ite.name}</li>

                    </>
                  ))}
                </TableCell>
                <TableCell>
                  {request.items.map((ite) => (
                    <>

                      <li key={ite._id} style={{ listStyleType: "none" }}>{ite.quantity}</li>
                    </>
                  ))}
                </TableCell>




                <TableCell>{request.status}</TableCell>

                <TableCell>

                  <>
                    {request.status === "Pending" ? (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{
                            borderRadius: 50,
                            marginRight: 1,
                            padding: '6px 12px', // Adjust padding as needed
                          }}
                          onClick={() => {
                            handleApprove(request._id);
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{
                            borderRadius: 50,
                            marginRight: 1,
                            padding: '6px 12px', // Adjust padding as needed
                          }}
                          onClick={() => {
                            handleReject(request._id);
                          }}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span
                        style={{
                          color:
                            request.status === "Granted" ? "green" : "red",
                        }}
                      >
                        {request.status}
                      </span>
                    )}

                    <IconButton
                      color="error"
                      onClick={() => {
                        handleDelete(request._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Snackbar for Undo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="info">
          Item deleted
          <Button color="secondary" size="small" onClick={handleUndo}>
            UNDO
          </Button>
        </Alert>
      </Snackbar>
      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Approve Dialog */}
      <Dialog open={openApproveDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Approve</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApproveOrReject} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Reject Dialog */}
      <Dialog open={openRejectDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Reject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reject this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApproveOrReject} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}

    </Container>
  );
};
export default Request;
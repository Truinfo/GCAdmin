import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import Sidebar from '../../components/Sidebar/Sidebar';

  const RequestsList = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://gocarsmithbackend.onrender.com/api/admin/getAllRequests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleAction = (id, approved) => {
      setSelectedRequestId(id);
      setActionType(approved ? 'approve' : 'reject');
      setConfirmationDialogOpen(true);
    };
  
  const confirmAction = async () => {
    try {
      const token = localStorage.getItem('token');
      const actionUrl = actionType === 'approve'
        ? 'https://gocarsmithbackend.onrender.com/api/admin/approveRequest'
        : 'https://gocarsmithbackend.onrender.com/api/admin/deleteRequest';

      await axios.post(
        actionUrl,
        { id: selectedRequestId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Fetch updated data after the action is performed
      fetchData();
      setConfirmationDialogOpen(false);
      setSelectedRequestId(null);
      setActionType(null);
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
    setSelectedRequestId(null);
    setActionType(null);
  };

  return ( <Box sx={{ display: 'flex' }}>
  <Sidebar />
  <Box
    component="main"
    sx={{ flexGrow: 1, p: 3, marginTop: '45px', marginBottom: '45px' }}
  >
    <div style={{ margin: 'auto', width: '100%' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>All Requests</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'center' }}>
        {requests.map((request) => (
          <div
            key={request._id}
            style={{
              width: 'calc(40% - 10px)',
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <p>
              <strong>Name:</strong> {request.name}
            </p>
            <p>
              <strong>Email:</strong> {request.email}
            </p>
            <p>
              <strong>Locality:</strong> {request.locality}
            </p>
            <p>
              <strong>Workshop Details:</strong> {request.workshopDetails}
            </p>
            <p>
              <strong>Approved:</strong>{' '}
              {request.approvalStatus === 'approved'
                ? '✔️'
                : request.approvalStatus === 'declined'
                ? '❌'
                : 'Pending'}
             <Button
                  variant="outlined"
                  style={{ marginLeft: '100px' }}
                  onClick={() => handleAction(request._id, true)}
                >
                 ✔️
                </Button>
                <Button
                  variant="outlined"
                  style={{ marginLeft: '5px' }}
                  onClick={() => handleAction(request._id, false)}
                >
                 ❌
                </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
    <Dialog open={confirmationDialogOpen} onClose={closeConfirmationDialog}>
        <DialogTitle>{actionType === 'approve' ? 'Approve' : 'Reject'} Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {actionType === 'approve' ? 'approve' : 'reject'} this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmAction} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Box>
  );
};

export default RequestsList;

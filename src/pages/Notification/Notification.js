import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Notification.css';

const Notification = () => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [acceptedMessages, setAcceptedMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const navigate = useNavigate();

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmAccept = () => {
    setAcceptedMessages((prevAcceptedMessages) => [...prevAcceptedMessages, selectedMessageId]);
    console.log(`Accepted message with ID ${selectedMessageId}`);
    setConfirmationDialogOpen(false);
  };

  const handleTabClick = (tabName) => {
    // Implement the logic for handling tab clicks
    console.log(`Clicked on tab: ${tabName}`);

    // Add navigation logic based on the tab clicked
    if (tabName === 'Orders') {
      navigate('/Orders');
    } else if (tabName === 'Requests') {
      navigate('/Requests');
    }
  };

  const renderMessages = () => {
    // Your implementation of renderMessages goes here
    // Return JSX based on selectedTab, acceptedMessages, declinedMessages, etc.
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '35px',
        }}
      >
        <div>
          <div className="tab-container">
            {/* Removed the "Email" tab */}
            <Button onClick={() => handleTabClick('Orders')}>Orders</Button>
            <Button onClick={() => handleTabClick('Requests')}>Requests</Button>
          </div>
          <div className="messages-container">{renderMessages()}</div>
        </div>
   
      </Box>
    </Box>
  );
};

export default Notification;
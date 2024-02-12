import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const NotificationSender = ({onClose}) => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSendNotification = async () => {
    try {
      if (token) { // Check if token exists
        const response= await axios.post(
          'https://gocarsmithbackend.onrender.com/api/admin/sendNotificationToAll',
          { message }, // Pass message here
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(response){
          console.log('Notification sent successfully');
          onClose()
        }

        
      } else {
        console.error('Authorization token not found in localStorage');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', margin: '20px' }}>
      <TextField
        label="Enter notification message"
        fullWidth
        multiline
        rows={4}
        value={message} // Bind value to message state
        onChange={handleMessageChange} // Add onChange handler
        sx={{ marginBottom: 2 }}
        // Add more styles as needed
      />
      <Button
        onClick={handleSendNotification}
        variant="contained"
        className="create_button">
        Send Notification
      </Button>
    </Box>
  );
};

export default NotificationSender;
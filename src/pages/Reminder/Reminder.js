import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Grid,  // Import Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Sidebar from "../../components/Sidebar/Sidebar";
import CreateReminder from './CreateReminder';

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get('https://gocarsmithbackend.onrender.com/api/admin/getAllReminders', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setReminders(response.data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, [token]);

  const handleDeleteReminder = async (id) => {
    try {
      await axios.delete(`https://gocarsmithbackend.onrender.com/api/admin/deleteReminder/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setReminders(reminders.filter(reminder => reminder._id !== id));
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const handleCreateButtonClick = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = async () => {
    setOpenCreateDialog(false);
    // Refetch reminders
    try {
      const response = await axios.get('https://gocarsmithbackend.onrender.com/api/admin/getAllReminders', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4">Reminders</Typography>
          <button
            variant="contained"
            className="create_button"
            style={{ padding: "10px", width: '120px' }}
            onClick={handleCreateButtonClick}
          >
            Create
          </button>
        </Box>

        <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
          <DialogTitle>
            Create Reminder
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseCreateDialog}
              aria-label="close"
              className="create_button"
              style={{ marginLeft: '350px', }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <CreateReminder />
          </DialogContent>
        </Dialog>

        <Grid container spacing={2}>
          {reminders.map((reminder, index) => (
            <Grid item key={reminder._id} xs={12} md={6}>
              <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '2px solid #ccc',
                borderRadius: '8px',
                height: '80%',  // Set a fixed height for the Card
                position: 'relative',
                marginTop: '50px',
                marginBottom: index < reminders.length - 1 ? '20px' : '0',
              }}>
                <CardContent sx={{ height: '80px', marginBottom: "20px" }}>
                  <Typography variant="h6"><b>Title:</b> {reminder.title}</Typography>
                  <Typography variant="body1"><b>Description:</b> {reminder.description}</Typography>
                </CardContent>
                {reminder.imageFilename && (
                  <img
                    alt={reminder.title}
                    src={`https://gocarsmithbackend.onrender.com${reminder.imageFilename}`}
                    style={{
                      margin:"30px",
                    }}
                  />
                )}
                {reminder.videoFilename && (
                  <video width="100%" height={250} controls style={{ maxWidth: '100%' }}>
                    <source src={`https://gocarsmithbackend.onrender.com${reminder.videoFilename}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <CardContent sx={{ height: '200px', marginBottom: "10px" }}>
                  <Typography variant="body1">
                    <b>Start Time:</b> {new Date(reminder.startTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body1">
                    <b>End Time:</b> {new Date(reminder.endTime).toLocaleString()}
                  </Typography>
                </CardContent>
                <button
                  variant="contained"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                  }}
                  onClick={() => handleDeleteReminder(reminder._id)}
                  className="create_button"
                >
                  Delete
                </button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ReminderList;
import React, { useState, useEffect } from "react";
import "./Centers.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Button,Dialog,DialogTitle,DialogContent,DialogActions } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from 'axios';
import NotificationSender from "./sendNotifications";
function Locations() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const closeCard = () => {
    setSelectedLocation(null);
  };
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const token = localStorage.getItem('token')


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://gocarsmithbackend.onrender.com/api/admin/getLocations',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setLocations(response.data.locationList);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Failed to retrieve locations');
      }
    };

    fetchLocations();
  }, []);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (

    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "40px" }}>
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",margin:"20px", }}>
            <h1>Service Locations</h1>
            <button
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
              className="create_button"
              style={{ padding: "10px", marginTop: "10px" }}>
              Send Notifications
            </button>
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogTitle style={{paddingLeft:"50px"}}>Notification Sender</DialogTitle>
              <DialogContent>
                <NotificationSender onClose={handleDialogClose} />
              </DialogContent>
              <DialogActions>
                <button onClick={handleDialogClose}
                  className="create_button">
                  Cancel
                </button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="location-list">
            {locations.map((location, index) => (
              <div className="location-card" key={index}>
                <Link to={`/Admin/Servicecenter/${location._id}`} className="image-link">
                  <div className="image-circle" >
                    <img src={`https://gocarsmithbackend.onrender.com${location.image}`} alt={location.name} />
                  </div>
                </Link>
                <h4>{location.name}</h4>
              </div>
            ))}
          </div>

          {selectedLocation && (
            <div className="image-card">
              <div className="image-card-close" onClick={closeCard}>
                &#x2715; Close
              </div>
              <img src={selectedLocation.image} alt={selectedLocation.name} />
              <h3>{selectedLocation.name}</h3>
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
}

export default Locations;
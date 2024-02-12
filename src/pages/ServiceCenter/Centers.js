import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Card, CardContent, CardHeader, Grid,
  Dialog,
  DialogTitle,
  DialogContent, Button, TextField, IconButton,
  DialogActions,
} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
function Centers() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleCreateServiceCenter = () => {
    alert("Service center created!");
    handleCloseDialog();
  };
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("https://gocarsmithbackend.onrender.com/api/admin/getLocations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;
          setLocations(data.locationList);
        } else {
          console.error("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  console.log(_id)

  useEffect(() => {
    const fetchServiceCenters = async () => {
      try {
        const response = await axios.get(`https://gocarsmithbackend.onrender.com/api/getServicesCenterByLocation/${_id}`);
        if (response.status === 200) {
          setServiceCenters(response.data);
        } else {
          console.error("Failed to fetch service centers");
        }
      } catch (error) {
        console.error("Error fetching service centers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceCenters();
  }, [_id]);



  console.log("Locations:", locations);
  console.log("_id:", _id);

  const selectedLocation = locations.find((loc) => loc._id === _id);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or indicator
  }

  if (!selectedLocation) {
    // Log the values for debugging
    console.log("Location not found. _id:", _id, "Locations:", locations);

    // Handle invalid location or show a 404 page
    return <div>Location not found</div>;
  }

  console.log("Selected Location:", selectedLocation);
  console.log("Service Centers:", selectedLocation.serviceCenters);

  // Rest of your code...

  const handleCardClick = (serviceCenterId) => {
    // Store the service center ID in local storage
    localStorage.setItem("ServiceCenterId", serviceCenterId);

    // Navigate to the "Details" page or any other page
    navigate("/Admin/Details");
  };


  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <IconButton
              sx={{
                border: "1px solid #000",
                borderRadius: "50%",
                backgroundColor: "#fff", marginRight: "20px"
              }}
              onClick={() => navigate("/Admin/ServiceLocations")}
            >
              <BiArrowBack />
            </IconButton>
            <h2>Services for {selectedLocation.name}</h2>
          </div>
        </div>
        <div>

          <Grid container spacing={2} marginTop="20px">
            {serviceCenters.map((service, index) => (
              <Grid item xs={12} sm={6} key={service._id}>
                <Card sx={{ marginBottom: 2, cursor: "pointer" }} onClick={() => handleCardClick(service._id)}>
                  <CardHeader title={service.serviceCenterName} />
                  <CardContent>{service.description}</CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
    </Box>
  );
}

export default Centers;
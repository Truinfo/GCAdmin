import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip"; // Import Chip
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
const CreateBrand = ({ onClose, handleSnackbarOpen }) => {
  const [formData, setFormData] = useState({
    brandName: "",
    brandImage: "",
    locations: "",
  });
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);  
  const token = localStorage.getItem("token");
  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://gocarsmithbackend.onrender.com/api/admin/getLocations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }

        );
        if (response.ok) {
          const { locationList } = await response.json();
          setLocationOptions(locationList);
        } else {
          console.error("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "locations") {
      // Update selectedLocations based on the type of selection
      const updatedLocations = Array.isArray(value) ? value : [value];
      setSelectedLocations(updatedLocations);

      // Always update the form data with the raw value
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRemoveLocation = (location) => {
    const updatedLocations = selectedLocations.filter(
      (loc) => loc !== location
    );
    setSelectedLocations(updatedLocations);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file);
    setSelectedFile(file);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const { brandName, locations } = formData;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("brandName", brandName);
      formDataToSend.append("brandImage", selectedFile);

      // Ensure locations is an array of strings
      locations.forEach((location) => {
        formDataToSend.append("locations", location);
      });

      const response = await fetch(
        "https://gocarsmithbackend.onrender.com/api/admin/addBrands",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (response.ok) {
        console.log("Brand added successfully");
        // Optionally, you can reset the form or perform other actions after a successful brand addition

        onClose();

        handleSnackbarOpen();
      } else {
        console.error("Failed to add brand");
      }
    } catch (error) {
      console.error("Error adding brand:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              Brand
            </Typography>
            <TextField
              fullWidth
              label="Brand Name"
              name="brandName"
              variant="outlined"
              value={formData.brandName}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Select Locations
        </Typography>
        <Select
          fullWidth
          label="Location"
          name="locations"
          multiple // Allow multiple selections
          variant="outlined"
          value={selectedLocations}
          onChange={handleChange}
          style={{ marginBottom: "20px" }}
        >
          {locationOptions.map((option) => (
            <MenuItem key={option._id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {selectedLocations.map((location, index) => (
          <Chip
            key={index}
            label={location}
            onDelete={() => handleRemoveLocation(location)}
            style={{ margin: "4px" }}
          />
        ))}
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Upload Image
        </Typography>
        <input
          type="file"
          accept="image/*"
          name="brandImage"
          onChange={handleFileChange}
          style={{ marginBottom: "20px" }}
        />
        <button type="submit" className="create_button">
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateBrand;

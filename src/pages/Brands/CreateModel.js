import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
const CreateModel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    BrandId: localStorage.getItem('BrandId') || '', // Set initial value from localStorage
    model: '',
    fuelType: [],
    locations: [],
  });
  const [brands, setBrands] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("https://gocarsmithbackend.onrender.com/api/admin/getBrands", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBrands(data);
        } else {
          console.error("Failed to fetch brands");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is completed
      }
    };
    fetchBrands();
  }, []);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://gocarsmithbackend.onrender.com/api/admin/getLocations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const { locationList } = await response.json();
          setLocationOptions(locationList);
        } else {
          console.error("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is completed
      }
    };
    fetchLocations();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'locations' || name === 'fuelType') {
      // If the value is an array, use it directly; otherwise, create an array
      const updatedValues = Array.isArray(value) ? value : [value];
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValues,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleRemoveLocation = (location) => {
    setFormData((prevData) => ({
      ...prevData,
      locations: prevData.locations.filter((loc) => loc !== location),
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected File:', file);
    setSelectedFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { model, fuelType, locations } = formData;
    const token = localStorage.getItem('token');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('BrandId', formData.BrandId); // Use formData.BrandId
      formDataToSend.append('model', model);
      fuelType.forEach((fuelType) => {
        formDataToSend.append('fuelType', fuelType);
      });
      locations.forEach((location) => {
        formDataToSend.append('locations', location);
      });
      if (selectedFile) {
        formDataToSend.append('modelImage', selectedFile);
      }
      const response = await fetch('https://gocarsmithbackend.onrender.com/api/admin/addModel', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      if (response.ok) {
        console.log('Model added successfully');
        alert('Model added successfully');
        // Close the dialog box after successful submission
        onClose(); // Call the onClose function
      } else {
        console.error('Failed to add model');
        alert('Failed to add model');
      }
    } catch (error) {
      console.error('Error adding model:', error);
      alert('Error adding model');
    }
  };
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Brand Name
              </Typography>
              <TextField
                fullWidth
                label="BrandId"
                name="BrandId"
                variant="outlined"
                value={formData.BrandId}
                onChange={handleChange}
                style={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Model
              </Typography>
              <TextField
                fullWidth
                label="Model Name"
                name="model"
                variant="outlined"
                value={formData.model}
                onChange={handleChange}
                style={{ marginBottom: '20px' }}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Fuel Type
          </Typography>
          <Select
            fullWidth
            name="fuelType"
            multiple
            variant="outlined"
            value={formData.fuelType}
            onChange={handleChange}
            style={{ marginBottom: '20px' }}
          >
            <MenuItem value="Petrol">Petrol</MenuItem>
            <MenuItem value="CNG">CNG</MenuItem>
            <MenuItem value="Diesel">Diesel</MenuItem>
            <MenuItem value="Electric">Electric</MenuItem>
          </Select>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Locations
          </Typography>
          <Select
            fullWidth
            name="locations"
            multiple
            variant="outlined"
            value={formData.locations}
            onChange={handleChange}
            style={{ marginBottom: '20px' }}
          >
            {locationOptions.map((option) => (
              <MenuItem key={option._id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {formData.locations.map((location, index) => (
            <Chip
              key={index}
              label={location}
              onDelete={() => handleRemoveLocation(location)}
              style={{ margin: '4px' }}
            />
          ))}
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Upload Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            name="modelImage"
            onChange={handleFileChange}
            style={{ marginBottom: '20px' }}
          />
          <button type="submit" className="create_button">Submit</button>
        </form>
      )}
    </div>
  );
};
export default CreateModel;
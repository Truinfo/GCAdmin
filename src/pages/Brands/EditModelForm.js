import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, MenuItem, Select, InputLabel } from '@mui/material';
const EditModelForm = ({ model, onUpdate, onClose }) => {
  useEffect(() => {
    setEditedModel({ ...model });
  }, [model]);
  console.log("selected model", model.fuelType)
  const [editedModel, setEditedModel] = useState({ ...model });
  const [selectedFile, setSelectedFile] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fuelType') {
      // Check if any fuel types are selected
      const selectedFuelTypes = Array.isArray(value) ? value : [value];
      if (selectedFuelTypes.length > 0) {
        // If fuel types are selected, update the fuelType field
        setEditedModel((currentModel) => ({
          ...currentModel,
          fuelType: selectedFuelTypes, // Set the selected fuel types
        }));
      } else {
        // If no fuel types are selected, set fuelType to an empty array
        setEditedModel((currentModel) => ({
          ...currentModel,
          fuelType: [],
        }));
      }
    } else {
      setEditedModel((currentModel) => ({
        ...currentModel,
        [name]: name === 'locations' ? value.split(',') : value,
      }));
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const token = localStorage.getItem('token');
  const handleUpdateModel = async () => {
    try {
      const formData = new FormData();
      Object.entries(editedModel).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (selectedFile) {
        formData.append('modelImage', selectedFile);
      }
      const response = await axios.put(
        `https://gocarsmithbackend.onrender.com/api/admin/updateModel/${editedModel._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert('Model updated successfully');
        onUpdate();
        onClose();
      } else {
        console.error('Failed to update model:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Brand ID"
          id="BrandId"
          name="BrandId"
          value={editedModel.BrandId}
          onChange={handleInputChange}
          sx={{ marginTop: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Model Name"
          id="model"
          name="model"
          value={editedModel.model}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Fuel Type</InputLabel>
        <Select
          fullWidth
          label="Fuel Type"
          id="fuelType"
          name="fuelType"
          value={editedModel.fuelType}
          onChange={handleInputChange}
        >
          {Array.isArray(editedModel.fuelType) && editedModel.fuelType.map((fuel, index) => (
            <MenuItem key={index} value={fuel}>{fuel}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Locations"
          id="locations"
          name="locations"
          value={editedModel.locations}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <input type="file" id="modelImage" name="modelImage" onChange={handleFileChange} />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" className='create_button' onClick={handleUpdateModel}>
          Update Model
        </Button>
      </Grid>
    </Grid>
  );
};
export default EditModelForm;
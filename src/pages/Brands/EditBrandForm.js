import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EditBrandForm = ({ brand, onUpdate, onClose }) => {
  // Use useEffect to create a deep copy when the brand prop changes
  useEffect(() => {
    setEditedBrand({ ...brand });
  }, [brand]);

  const [editedBrand, setEditedBrand] = useState({ ...brand });
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem('token');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBrand((currentBrand) => ({
      ...currentBrand,
      [name]: value,
    }));
  };

  const handleUpdateBrand = async () => {
    try {
      const formData = new FormData();
      formData.append("brandName", editedBrand.brandName);
      formData.append("brandImage", selectedFile);

      const response = await axios.put(
        `https://gocarsmithbackend.onrender.com/api/admin/brands/${editedBrand._id}`,
        formData,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        window.alert('Brand updated successfully'); // Show alert on success
        onClose();
      } else {
        console.error("Failed to update brand");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <div>
      <TextField
        fullWidth
        label="Name"
        id="brandName"
        name="brandName"
        value={editedBrand.brandName}
        onChange={handleInputChange}
        sx={{ marginBottom: 2, marginTop: 3 }}
      />

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

      <button
        variant="contained"
        color="primary"
        onClick={handleUpdateBrand}
        sx={{ marginRight: 2, marginTop: 2 }}
        className="create_button"
      >
        Update Brand
      </button>
      {/* Snackbar for showing update success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Brand updated successfully
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default EditBrandForm;

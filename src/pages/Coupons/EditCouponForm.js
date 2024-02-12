import React, { useState, useEffect } from "react";
import { TextField, Button, Grid ,Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const EditCouponForm = ({ coupon, onUpdate, onClose }) => {
  // Use useEffect to create a deep copy when the coupon prop changes
  useEffect(() => {
    setEditedCoupon({ ...coupon });
  }, [coupon]);

  const [editedCoupon, setEditedCoupon] = useState({ ...coupon });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCoupon((currentCoupon) => ({
      ...currentCoupon,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleUpdateCoupon = async () => {
    try {
      const response = await axios.put(
        `https://gocarsmithbackend.onrender.com/api/admin/updateCoupon/${editedCoupon._id}`,
        {
          ...editedCoupon,
          discountValue: parseInt(editedCoupon.discountValue),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        alert("Coupon updated successfully");
        onUpdate();
        onClose()
      } else {
        console.error("Failed to update coupon:", response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    onClose(); // Close the form when cancel is clicked
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
      <Grid item xs={6} sx={{ marginTop: "10px" }}>
        <TextField
          label="Coupon Title"
          variant="outlined"
          fullWidth
          name="Title"
          value={editedCoupon.Title}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} sx={{ marginTop: "10px" }}>
        <TextField
          label="Coupon Code"
          variant="outlined"
          fullWidth
          name="code"
          value={editedCoupon.code}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          value={editedCoupon.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="discountType">Discount Type</InputLabel>
          <Select
            label="Discount Type"
            fullWidth
            name="discountType"
            value={editedCoupon.discountType}
            onChange={handleInputChange}
          >
            <MenuItem value="percentage">Percentage</MenuItem>
            <MenuItem value="fixed">Fixed</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Discount Value"
          variant="outlined"
          fullWidth
          type="number"
          name="discountValue"
          value={editedCoupon.discountValue}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Start Date"
          variant="outlined"
          fullWidth
          type="date"
          name="Date"
          value={editedCoupon.Date}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Expiry Date"
          variant="outlined"
          fullWidth
          type="date"
          name="expiryDate"
          value={editedCoupon.expiryDate}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Is Active"
          variant="outlined"
          fullWidth
          name="isActive"
          value={editedCoupon.isActive}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <button
          variant="contained"
          color="primary"
          className="create_button"
          onClick={handleUpdateCoupon}
        >
          Update Coupon
        </button>

      </Grid>
    </Grid>
  );
};

export default EditCouponForm;

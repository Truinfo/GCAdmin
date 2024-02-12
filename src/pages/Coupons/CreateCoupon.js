import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const CreateCoupon = ({ onClose ,fetchCoupons}) => {
  const [formData, setFormData] = useState({
    Title: "",
    code: "",
    description: "",
    discountType: "",
    Date: "",
    discountValue: "",
    expiryDate: "",
    isActive: "",
  });

  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      Title,
      code,
      description,
      discountType,
      Date,
      discountValue,
      expiryDate,
      isActive,
    } = formData;

    try {
      const response = await fetch("https://gocarsmithbackend.onrender.com/api/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Title,
          code,
          description,
          discountType,
          Date,
          discountValue,
          expiryDate,
          isActive,
        }),
      });
      if (response.ok) {
        console.log("Coupon created successfully");
        setErrors({});
        // Close the dialog after successfully creating the coupon
        onClose();
        // Optionally, you can reset the form or perform other actions after a successful coupon creation
        window.alert("Coupon created successfully!");
        fetchCoupons();
 
      } else {
        const errorData = await response.json();
        setErrors(errorData);
        console.error("Failed to create coupon:", errorData);
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Coupon Title"
              name="Title"
              variant="outlined"
              value={formData.Title}
              onChange={handleChange}
              error={errors.Title !== undefined}
              helperText={errors.Title}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Coupon Code"
              name="code"
              variant="outlined"
              value={formData.code}
              onChange={handleChange}
              error={errors.code !== undefined}
              helperText={errors.code}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              error={errors.description !== undefined}
              helperText={errors.description}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="discountType">Discount Type</InputLabel>
              <Select
                label="Discount Type"
                fullWidth
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Discount Value"
              name="discountValue"
              variant="outlined"
              value={formData.discountValue}
              onChange={handleChange}
              error={errors.discountValue !== undefined}
              helperText={errors.discountValue}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              variant="outlined"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={errors.Date !== undefined}
              helperText={errors.Date}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              type="date"
              variant="outlined"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={errors.expiryDate !== undefined}
              helperText={errors.expiryDate}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Is Active"
              name="isActive"
              variant="outlined"
              value={formData.isActive}
              onChange={handleChange}
              error={errors.isActive !== undefined}
              helperText={errors.isActive}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
        </Grid>

        <button type="submit" className="create_button">
          Create Coupon
        </button>
      </form>
    </div>
  );
};

export default CreateCoupon;

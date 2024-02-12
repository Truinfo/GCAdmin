import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
const CreateInvoice = ({ appointmentData, onClose }) => {
  const [isClose, setIsClose] = useState(true)
  const [invoiceData, setInvoiceData] = useState({
    ...appointmentData,
    items: [],
    bookingId: appointmentData._id || null,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(appointmentData)
  const handleItemChange = (index, field, value) => {
    setInvoiceData((prevData) => {
      const updatedItems = [...prevData.items];
      updatedItems[index][field] = value;
      // const totalAmount = updatedItems.reduce(
      //   (total, item) => total + item.quantity * item.unitPrice,
      //   0
      // );
      return {
        ...prevData,
        items: updatedItems,
      };
    });
  };
  const handleAddItem = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { description: "", quantity: 1, unitPrice: 0 },
      ],
    }));
  };
  const handleRemoveItem = (index) => {
    setInvoiceData((prevData) => {
      const updatedItems = [...prevData.items];
      updatedItems.splice(index, 1);
      // const totalAmount = updatedItems.reduce(
      //   (total, item) => total + item.quantity * item.unitPrice,
      //   0
      // );
      return {
        ...prevData,
        items: updatedItems,
      };
    });
  };
  const ItemsTotalPrice = invoiceData.items.reduce((accumulator, currentValue) => {
    return (accumulator + (parseInt(currentValue.unitPrice) * parseInt(currentValue.quantity)) | 0);
  }, 0)
  const totalOfLstOfItems = invoiceData.listOfServices.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0)

  const totalTax = parseFloat((parseInt(invoiceData.service_Charges) + totalOfLstOfItems + ItemsTotalPrice) * 0.15)


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!invoiceData.bookingId) {
      console.error("BookingId is required");
      return;
    } else {
      console.log("bookingId Is there")
    }
    console.log(invoiceData)
    try {
      const invoiceDataToSend = {
        customerName: invoiceData.customerName,
        contactNumber: invoiceData.contactNumber,
        fuelType: invoiceData.fuelType,
        carModel: invoiceData.carModel,
        listOfServices: invoiceData.listOfServices,
        email: invoiceData.email,
        serviceCenterId: invoiceData.serviceCenterId,
        status: invoiceData.status,
        serviceCenterLocation: invoiceData.serviceCenterLocation,
        bookingId: invoiceData.bookingId,
        serviceDate: invoiceData.ServiceDate,
        tax: parseInt(totalTax),
        labourCharges: invoiceData.labourCharges,
        discounts: invoiceData.discounts,
        service_Charges: invoiceData.service_Charges,
        customerLocation: invoiceData.customerLocation,
        items: invoiceData.items,
        total: parseInt((totalTax + parseInt(invoiceData.service_Charges) + totalOfLstOfItems + ItemsTotalPrice) - parseInt(invoiceData.discounts))
      };
      console.log("Invoice Data:", invoiceData);
      const response = await axios.post(
        "https://gocarsmithbackend.onrender.com/api/invoiceGenerate",
        invoiceDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        handleClose();
      }
      
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };
  const handleClose = () => {
    setIsClose(false);
    onClose();
  };
  return (
    <Dialog open={isClose} onClose={handleClose} >
      <DialogTitle>Create Invoice</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              name="bookingId"
              value={invoiceData.bookingId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="userId"
              value={invoiceData.userId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="customerName"
              value={invoiceData.customerName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="contactNumber"
              value={invoiceData.contactNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="email"
              value={invoiceData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="carModel"
              value={invoiceData.carModel}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />  <TextField
              name="status"
              value={invoiceData.status}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="service Center Location"
              name="serviceCenterLocation"
              value={invoiceData.serviceCenterLocation}
              onChange={handleChange}
              fullWidth
              type="text"
              margin="normal"
              required
            />
            <TextField
              name="ServiceDate"
              value={invoiceData.ServiceDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              type="Date"
            />

            <TextField
              label="labourCharges"
              name="labourCharges"
              value={invoiceData.labourCharges}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              required
            />
            <TextField
              label="discounts"
              name="discounts"
              value={invoiceData.discounts}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              required
            />
            <TextField
              label="service_Charges"
              name="service_Charges"
              value={invoiceData.service_Charges}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              required
            />
            <TextField
              label="customerLocation"
              name="customerLocation"
              value={invoiceData.customerLocation}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            {invoiceData.items.map((item, index) => (
              <Box key={index} display="flex" alignItems="center">
                <TextField
                  label="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, "description", e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  type="number"
                  margin="normal"
                />
                <TextField
                  label="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                  type="number"
                  margin="normal"
                />
                <Button type="button" onClick={() => handleRemoveItem(index)}>
                  Remove
                </Button>
              </Box>
            ))}
            <Button type="button" onClick={() => handleAddItem()}>
              Add Items
            </Button>
            {/* <Typography variant="h6" >Total Amount: {invoiceData.total}</Typography> */}
            <Button type="submit" variant="contained" color="primary">
              Save Invoice
            </Button>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose} color="secondary">
          Cancel
        </Button> */}
        {/* <Button type="submit" onClick={handleClose} color="primary">
          Save Invoice
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};
export default CreateInvoice;
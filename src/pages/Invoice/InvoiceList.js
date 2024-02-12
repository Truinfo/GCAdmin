import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdCurrencyRupee } from "react-icons/md";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Row, Col, Container } from "react-bootstrap";
import EditInvoice from './EditInvoice';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deletedInvoices, setDeletedInvoices] = useState([]);
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showUndoSnackbar, setShowUndoSnackbar] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const token = localStorage.getItem('token');

  const getPdfs=()=>{
    axios.get('https://gocarsmithbackend.onrender.com/api/admin/getGeneratedInvoice',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setInvoices(response.data))
      .catch(error => console.error('Error fetching invoices:', error));
  }
  useEffect(() => {
    // Fetch the list of invoices when the component mounts
  
    getPdfs()
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditMode(true);
    getPdfs()
  };

  const handleUndo = () => {
    if (deletedInvoices.length > 0) {
      const lastDeletedInvoice = deletedInvoices[deletedInvoices.length - 1];
      // Create a copy of the invoices array and add the last deleted item
      const updatedInvoices = [...invoices, lastDeletedInvoice];
      // Update the state with the modified array
      setInvoices(updatedInvoices);
      // Remove the last item from the deletedInvoices array
      setDeletedInvoices((prevDeletedInvoices) =>
        prevDeletedInvoices.slice(0, prevDeletedInvoices.length - 1)
      );
      // Hide the Undo button after performing undo
      setShowUndoSnackbar(false);
    }
  };

  const handleLocationFilter = (event) => {
    setFilterLocation(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setFilterStatus(event.target.value);
  };

  const downloadPdf = async (invoiceId, token) => {
    try {
      // Make the Axios request to fetch the PDF file
      const response = await axios.get(
        `https://gocarsmithbackend.onrender.com/api/admin/getPdf/${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
  
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });
  
      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);
  
      // Create a link element and trigger a click event to start the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${invoiceId}.pdf`;
      document.body.appendChild(link); // Append the link to the document body
      link.click();
  
      // Remove the link from the document body
      document.body.removeChild(link);
  
      // Release the allocated resources
      URL.revokeObjectURL(url);
  
      // Display a success message to the user
      window.alert("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };
  

  const deleteInvoice = (_id) => {
    setDeleteDialogOpen(true)
    setInvoiceId(_id)
    console.log('Delete invoice:', invoiceId);
  };



  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `https://gocarsmithbackend.onrender.com/api/admin/deleteInvoice/${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        axios.get('https://gocarsmithbackend.onrender.com/api/admin/getGeneratedInvoice',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => setInvoices(response.data || []),
            setDeleteDialogOpen(false))
          .catch(error => console.error('Error fetching invoices:', error));
      } else {
        console.error("Invalid response format:", response.data);
      }
      setShowUndoSnackbar(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Container>
          <Row>
            <Col md={8}>
              <h2>Invoice List</h2>
            </Col>
            <Col md={2}>
            </Col>
            <Col md={2}>
              <FormControl>
                <Select value={filterStatus} onChange={handleStatusFilter}>
                  <MenuItem value="All">All Status</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Col>
          </Row>
        </Container>
      </Box>
      <TableContainer responsive component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "rgb(241, 243, 244)", fontWeight: "600" }}>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Service Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>PDF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={invoice._id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell>{format(new Date(invoice.invoiceDate), 'yyyy-MM-dd')}</TableCell>
                <TableCell>{format(new Date(invoice.serviceDate), 'yyyy-MM-dd')}</TableCell>
                <TableCell>{invoice.serviceCenterLocation}</TableCell>
                <TableCell><MdCurrencyRupee />{invoice.total}</TableCell>
                <TableCell>
                  <Chip
                    label={invoice.status}
                    color={
                      invoice.status === "Completed"
                        ? "primary"
                        : invoice.status === "Pending"
                          ? "warning"
                          : "default"
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteInvoice(invoice._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => downloadPdf(invoice._id)}
                  >
                    Download PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Undo Snackbar */}
      <Snackbar
        open={showUndoSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowUndoSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="info">
          Item deleted
          <Button color="secondary" size="small" onClick={handleUndo}>
            UNDO
          </Button>
        </Alert>
      </Snackbar>
      {editMode ? (
        <EditInvoice
          invoiceData={invoices[editIndex]}
          onClose={() => setEditMode(false)}
        />
      ) : null}
    </div>
  );
};

export default InvoiceList;
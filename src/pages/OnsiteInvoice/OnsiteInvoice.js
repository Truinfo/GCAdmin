import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
} from "@mui/material";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import EditOnsiteInvoice from "./EditOnsiteInvoice";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
const OnsiteInvoice = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [InvoiceId, setInvoiceId] = useState(null);
  // Sample data, replace this with your actual data

  const [invoices, setInvoices] = useState([]);

  // const invoices = [
  //   {
  //     id: 1,
  //     invoiceNumber: "INV001",
  //     customerName: "John Doe",
  //     invoiceDate: "2023-01-01",
  //     location: "Location A",
  //     amount: 500,
  //     status: "Paid",
  //   },

  //   // Add more invoice data as needed
  // ];

  const handleEditClick = (_id, index) => {
    setEditIndex(index);
    setIsEdit(true);
    setEditMode(true);
    setInvoiceId(_id);
  };

  useEffect(() => {
    const fetchOnSiteInvoices = async () => {
      try {
        // Make a GET request to fetch all on-site invoices
        const response = await axios.get(
          "https://gocarsmithbackend.onrender.com/api/getAllOnSiteInvoices"
        );

        // Update the state with the fetched invoices
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching on-site invoices:", error);
      }
    };

    // Call the function to fetch on-site invoices
    fetchOnSiteInvoices();
  }, []);

  const deleteInvoice = (_id) => {
    setInvoiceId(_id);
    setDeleteDialogOpen(true);
  };
  // const editInvoice = (invoice) => {
  //   setEditDialogOpen(true);
  //   setSelectedInvoice(invoice);
  // }
  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    setSelectedInvoice(null); // Reset selected invoice when closing edit dialog
  };
  const handleConfirmDelete = () => {
    // Make a DELETE request to delete the invoice
    fetch(`https://gocarsmithbackend.onrender.com/api/deleteOnSiteInvoices/${InvoiceId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Invoice deleted successfully:", data);
        setDeleteDialogOpen(false);
        // setEditDialogOpen(false);
        // Update the state to remove the deleted invoice
        setInvoices((prevInvoices) =>
          prevInvoices.filter((invoice) => invoice._id !== InvoiceId)
        );
      })
      .catch((error) => console.error("Error deleting invoice:", error));
  };
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "45px" }}>
        <Container>
          <Row style={{ marginBottom: "10px" }}>
            <Col lg={10}>
              <h1>Onsite Invoice</h1>
            </Col>
            <Col lg={2}>
              {/* <button
                className="create_button"
                onClick={() => navigate("/NewInvoice")}
              >
                + New Invoice
              </button> */}
            </Col>
          </Row>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice Number</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow key={invoice._id}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.invoiceDate}</TableCell>
                  <TableCell>{invoice.customLocation}</TableCell>
                  <TableCell>{invoice.total}</TableCell>
                  <TableCell>
                    <Chip
                      label={invoice.status}
                      color={invoice.status === "Paid" ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    {/* Add actions buttons with icons */}
                    <IconButton
                      onClick={() => handleEditClick(invoice._id, index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteInvoice(invoice._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {editMode ? (
            <EditOnsiteInvoice
              invoiceData={invoices[editIndex]}
              onClose={() => setEditMode(false)}
              InvoiceId={InvoiceId}
            />
          ) : null}
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
          <Dialog open={editDialogOpen} onClose={handleCancelEdit}>
            <DialogActions>
              <Button onClick={handleCancelEdit} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};
export default OnsiteInvoice;

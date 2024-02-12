import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditEmployeeForm from "./EditEmployeeForm";
import CloseIcon from "@mui/icons-material/Close";

const StaffList = () => {
  const token = localStorage.getItem("token");

  const [employeesDetails, setEmployeesDetails] = useState([]);
  const serviceCenterId = localStorage.getItem('ServiceCenterId')
  const [selectedRows, setSelectedRows] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleRowSelect = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [...selectedRows];
    if (selectedIndex === -1) {
      newSelected = [...newSelected, id];
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setSelectedRows(newSelected);
  };
  
  const handleUndoDelete = () => {
    if (deletedEmployees.length > 0) {
      const lastDeletedEmployee = deletedEmployees[deletedEmployees.length - 1];
      setEmployees([...employees, lastDeletedEmployee]);
      setDeletedEmployees(deletedEmployees.slice(0, -1));
      setSnackbarOpen(false);
    }
  };

  const handleClearSelectedEmployee = async () => {
    setSelectedEmployee(null);
    try {
      const response = await axios.get(
        `https://gocarsmithbackend.onrender.com/api/admin/getEmployees/${serviceCenterId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

        // Add headers if needed
      );
      if (response) {
        setEmployeesDetails([response.data]);
      }
    } catch (error) {
      console.error("Error updating or fetching data:", error);
    }
  };
  
 
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };
 
  const handleOpenConfirmDialog = (employeeId) => {
    setConfirmDialogOpen(true);
    setDeletingEmployeeId(employeeId);
  };
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setDeletingEmployeeId(null);
  };
  const handleDeleteEmployeeWithConfirmation = (employeeId) => {
    handleCloseConfirmDialog();
    handleDeleteEmployee(employeeId);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    
    if (!confirmed) {
      // If not confirmed, do nothing
      return;
    }
  
    try {
      const response = await axios.delete(
        `https://gocarsmithbackend.onrender.com/api/admin/deleteEmployee/${employeeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

      );
  
      if (response && response.data) {
        const updatedResponse = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/getEmployees/${serviceCenterId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (updatedResponse && updatedResponse.data) {
          console.log(
            "Data fetched successfully after status update:",
            updatedResponse.data
          );
          setEmployeesDetails([updatedResponse.data]);
        }
      }
    } catch (error) {
      console.error("Error updating or fetching data:", error);
    }
  };
  useEffect(() => {
    const getEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/getEmployees/${serviceCenterId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        if (response) {
          setEmployeesDetails([response.data]);
        }
      } catch (error) {
        console.error("Error updating or fetching data:", error);
      }
    };
    getEmployeeDetails();
  }, [serviceCenterId]);

  return (
    <Container>
      {selectedEmployee ? (
        <Dialog
          open={Boolean(selectedEmployee)}
          onClose={handleClearSelectedEmployee}
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "50px", // Adjust the font size as needed
            }}
          >
            Edit Employee
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClearSelectedEmployee}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {/* Pass the entire employee details instead of just the ID */}
            <EditEmployeeForm
              employee={selectedEmployee}
              onFormSubmit={handleClearSelectedEmployee}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <div>
          <Typography variant="h5">Employee List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeesDetails.map((employeeAllDetail) =>
                  employeeAllDetail.employeeDetails.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.employeeName.split(' ').map((namePart) => (
                      namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase()
                    )).join(' ')}</TableCell>
                      <TableCell>{employee.employeeId}</TableCell>
                      <TableCell>{employee.contactNumber}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>
                        <IconButton>
                          <EditIcon
                            onClick={() => handleEmployeeClick(employee)}
                          />
                        </IconButton>
                      </TableCell>

                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteEmployee(employee.employeeId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert severity="info">
              Item deleted
              <Button color="secondary" size="small" onClick={handleUndoDelete}>
                UNDO
              </Button>
            </Alert>
          </Snackbar>
          {/* Delete Dialog */}
          <Dialog
            open={confirmDialogOpen}
            onClose={() => handleCloseConfirmDialog(false)}
          >
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {selectedEmployee
                  ? `Are you sure you want to delete ${selectedEmployee[0].employeeName}?`
                  : "Are you sure you want to delete this item?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleCloseConfirmDialog(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  handleDeleteEmployeeWithConfirmation(deletingEmployeeId)
                }
                color="primary"
                autoFocus
              >
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Container>
  );
};
export default StaffList;

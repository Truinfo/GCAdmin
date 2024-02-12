import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EditableTable = ({ selectedCategory, categories }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ Toolname: "", quantity: 0 });
  const [isFormVisible, setFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  //get
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    const fetchInventoryByCategory = async () => {
      try {
        const response = await fetch(
          `https://gocarsmithbackend.onrender.com/api/admin/inventory/${selectedCategory?._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const inventoryData = await response.json();
          setItems(inventoryData);
        } else {
          console.error("Failed to fetch inventory data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // Call the function to fetch inventory data
    if (selectedCategory) {
      fetchInventoryByCategory();
    }
  }, [selectedCategory]);
  //Add new item
  const handleAddRow = async () => {
    try {
      if (newItem.Toolname && newItem.quantity > 0 && newItem.category) {
        // Prepare the data for the request
        const formData = new FormData();
        formData.append("image", newItem.image); // Assuming you have an image field in your newItem object
        formData.append("category", newItem.category);
        formData.append("name", newItem.Toolname);
        formData.append("quantity", newItem.quantity);
        // You may want to send a request to the server to add the new item
        const response = await fetch("https://gocarsmithbackend.onrender.com/api/admin/addInventory", 
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (response.ok) {
          console.log("Item added successfully");
          // Now, you may want to fetch the updated inventory data after addition
          const newItemData = await response.json();
          setItems([...items, newItemData]);
          setNewItem({ Toolname: "", quantity: 0, category: "", image: null });
          setFormVisible(false);
          setAddFormVisible(false)
       
          setSnackbarMessage("Tool added successfully");
          setSnackbarOpen(true);
        } else {
          console.error("Failed to add item");
        }
      } else {
        console.error("Please fill out all the required fields");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const [deletedItem, setDeletedItem] = useState(null);
  // Delete
  const handleDeleteRow = async (itemId) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this tool?"
    );

    // If the user confirms, proceed with the deletion
    if (isConfirmed) {
      try {
        // You may want to send a request to the server to delete the item
        const response = await fetch(
          `https://gocarsmithbackend.onrender.com/api/admin/delete/${itemId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          console.log(`Item with ID ${itemId} deleted successfully`);
          // Now, you may want to fetch the updated inventory data after deletion
          const updatedItems = items.filter((item) => item._id !== itemId);
          setItems(updatedItems);

          // Store the deleted item
          const deletedItem = items.find((item) => item._id === itemId);
          setDeletedItem(deletedItem);

          // Show Snackbar for deletion success
          setSnackbarMessage("Tool deleted successfully");
          setSnackbarOpen(true);
        } else {
          console.error(`Failed to delete item with ID ${itemId}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  //Edit
  const handleEditRow = (index) => {
    // Set the edit index and populate the form with the existing values
    setEditIndex(index);
    setNewItem({
      Toolname: items[index].name,
      quantity: items[index].quantity,
      category: items[index].category, // Set the category from the selected item
    });
    setFormVisible(true);
  };
  const handleCloseForm = () => {
    setFormVisible(false);
    setEditIndex(null);
  };
  const handleSaveEdit = async () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to update this tool?"
    );

    // If the user confirms, proceed with the update
    if (isConfirmed) {
      try {
        // You may want to send a request to the server to update the item
        const response = await fetch(
          `https://gocarsmithbackend.onrender.com/api/admin/update/${items[editIndex]._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: newItem.Toolname,
              quantity: newItem.quantity,
              category: newItem.category, // Include the selected category in the request
              // Add other fields if necessary
            }),
          }
        );
        if (response.ok) {
          console.log(`Item updated successfully`);
          // Now, you may want to fetch the updated inventory data after editing
          const updatedItems = [...items];
          updatedItems[editIndex].name = newItem.Toolname;
          updatedItems[editIndex].quantity = newItem.quantity;
          updatedItems[editIndex].category = newItem.category; // Update the category in the local state
          setItems(updatedItems);
          setFormVisible(false);
          setEditIndex(null);

          // Show Snackbar for update success
          setSnackbarMessage("Tool updated successfully");
          setSnackbarOpen(true);
        } else {
          console.error(`Failed to update item`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  // Function to handle the click of the "Add" button
  const handleAddButtonClick = () => {
    setNewItem({ Toolname: "", quantity: 0, category: "" }); // Reset form fields
    setAddFormVisible(true); // Show the dialog
  
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const handleUndoDelete = () => {
    if (deletedItem) {
      // Undo the delete by adding the deleted item back to the list
      setItems((prevItems) => [...prevItems, deletedItem]);
      setDeletedItem(null);
      setSnackbarOpen(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "12px",
        }}
      >
        {/* Add button to the right end */}
        <button className="create_button" onClick={handleAddButtonClick}>
          Add
        </button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tool Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditRow(index)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteRow(item._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>{" "}
      {/* Dialog for adding a new item */}
      <Dialog open={isAddFormVisible} onClose={() => setAddFormVisible(false)}>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add New Item
          <button
            onClick={() => setAddFormVisible(false)}
            className="close_button"
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: 0,
              margin: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CloseRoundedIcon style={{ fontSize: 24, color: "#000" }} />
          </button>
        </DialogTitle>

        <DialogContent>
          <TextField
            type="text"
            label="Toolname"
            sx={{ marginTop: "10px", marginRight: "8px" }}
            required
            value={newItem.Toolname}
            onChange={(e) =>
              setNewItem({ ...newItem, Toolname: e.target.value })
            }
          />
          <TextField
            type="number"
            required
            label="Quantity"
            sx={{ marginTop: "10px" }}
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
            }
          />
          <div>
      <InputLabel id="category-label" style={{marginTop:"10px"}}>Category</InputLabel>
      <Select
        labelId="category-label"
        id="category"
        required
        value={newItem.category}
        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        style={{ width: '200px', marginTop: '10px' }}
        displayEmpty // Show the selected option without a text field
      >
        <MenuItem value="" disabled>
          Select category
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleAddRow} className="create_button">
            Add
          </button>
        </DialogActions>
      </Dialog>
      <Dialog open={isFormVisible} onClose={handleCloseForm}>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Edit Item
          <button
            onClick={handleCloseForm}
            className="close_button"
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: 0,
              margin: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CloseRoundedIcon style={{ fontSize: 24, color: "#000" }} />
          </button>
        </DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Toolname"
            sx={{ marginTop: "10px", marginRight: "8px" }}
            required
            value={newItem.Toolname}
            onChange={(e) =>
              setNewItem({ ...newItem, Toolname: e.target.value })
            }
          />
          <TextField
            type="number"
            required
            label="Quantity"
            sx={{ marginTop: "10px" }}
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
            }
          />
          <InputLabel id="category-label" sx={{ marginTop: "10px" }}>
            Category
          </InputLabel>
          <Select
            labelId="category-label"
            id="category"
            required
            value={newItem.category || ""}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <button onClick={handleSaveEdit} className="create_button">
            Save
          </button>
        </DialogActions>
      </Dialog>
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
          action={
            deletedItem && (
              <Button color="inherit" size="small" onClick={handleUndoDelete}>
                UNDO
              </Button>
            )
          }
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
export default EditableTable;

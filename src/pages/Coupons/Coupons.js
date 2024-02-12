import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Collapse,
  Container,
  Grid,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { Row, Col } from "react-bootstrap";
import CreateCoupon from "./CreateCoupon";
import EditCouponForm from "./EditCouponForm";
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from "@mui/material/Alert";

const Coupons = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [deletedCoupon, setDeletedCoupon] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);


  const token = localStorage.getItem("token");
  const fetchCoupons = async () => {
    try {
      const response = await axios.get("https://gocarsmithbackend.onrender.com/api/admin/getCoupons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setCoupons(response.data);
      } else {
        console.error("Failed to fetch coupons");
      }
    } catch (error) {
      console.error("Error while fetching coupons:", error);
    }
  };
  useEffect(() => {
   
    fetchCoupons();
  }, []);

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedCoupon(null);
    fetchCoupons();
  };

  const toggleShowMore = (index) => {
    setExpandedCard((prev) => (prev === index ? null : index));
  };

  const handleMoreOptionsClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedCard(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCard(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleEditClick = (event) => {
    if (selectedCard !== null) {
      setSelectedCoupon(coupons[selectedCard]);
      setOpenDialog(true);
      handleMenuClose();
    }
  };
  const handleDeleteClick = async () => {
    if (selectedCard !== null) {
      setConfirmationDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedCard !== null) {
      try {
        const couponId = coupons[selectedCard]._id;
        const response = await axios.delete(
          `https://gocarsmithbackend.onrender.com/api/admin/coupons/${couponId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setDeletedCoupon(coupons[selectedCard]);

          const updatedCoupons = [...coupons];
          updatedCoupons.splice(selectedCard, 1);
          setCoupons(updatedCoupons);

          handleSnackbarOpen('Coupon deleted successfully.', handleUndoDelete);
        } else {
          console.error("Failed to delete coupon");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        handleMenuClose();
        setConfirmationDialogOpen(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message, action) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleUndoDelete = () => {
    if (deletedCoupon) {
      setCoupons((prevCoupons) => [deletedCoupon, ...prevCoupons]);
      setDeletedCoupon(null);

      handleSnackbarClose();
    }
  };

  const handleExited = () => {
    handleSnackbarOpen('Coupon created successfully!');
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "45px" }}>
        <div style={{ marginBottom: "20px", display:"flex", justifyContent:"space-between", alignItems:"center",margin:"10px" }}>
          
            <h1>Coupons</h1>
          
            <button
              variant="contained"
              onClick={handleOpenDialog}
              className="create_button"
              style={{marginLeft:'40px', marginTop:'20px', padding:'10px'}}
            >
              + Create Coupon
            </button>
        </div>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {coupons.map((coupon, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">{coupon.Title}</Typography>
                      <Button
                        onClick={(event) =>
                          handleMoreOptionsClick(event, index)
                        }
                        style={{
                          backgroundColor: "transparent",
                          color: "#FF3D00",
                          cursor: "pointer",
                          padding: "0",
                        }}
                      >
                        <MoreHorizIcon />
                      </Button>
                    </div>
                    <Typography variant="subtitle1" paragraph>
                      {coupon.description}
                    </Typography>

                    <Collapse in={expandedCard === index}>
                      <Typography variant="body2" paragraph>
                        Offer Available From:{" "}
                        {new Date(coupon.Date).toLocaleDateString()}
                        <br />
                        Expiry Date:
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                        <br />
                        Applicable For Both New And Existing Users.
                      </Typography>
                    </Collapse>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => toggleShowMore(index)}
                      style={{
                        backgroundColor:
                          expandedCard === index ? "#D03C00" : "#FF5733",
                        color: "white",
                        transition: "background-color 0.10s",
                      }}
                    >
                      {expandedCard === index ? "Show Less" : "See More"}
                    </Button>
                    <Button sx={{marginLeft: 5 ,fontSize: "16px", fontWeight: 600 ,color:"#FF5733"}}> {coupon.code}</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEditClick} >
                <EditIcon />
                &nbsp;Edit
              </MenuItem>
              <MenuItem onClick={handleDeleteClick} >
                <DeleteIcon />
                &nbsp;Delete
              </MenuItem>
            </Menu>
          </Grid>
        </Container>
      </Box>
      <Dialog open={openDialog} onClose={closeDialog} onExited={handleExited}>
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {selectedCoupon ? 'Edit Coupon' : 'Create Coupon'}
            <IconButton onClick={closeDialog} sx={{color:"black"}}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedCoupon !== null ? (
            <EditCouponForm coupon={selectedCoupon} onClose={closeDialog} />
          ) : (
            <CreateCoupon onClose={closeDialog}  />
          )}
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this coupon?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Coupons;

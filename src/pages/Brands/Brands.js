import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Dropdown from "react-bootstrap/Dropdown";
import CreateBrand from "./CreateBrand";
import EditBrandForm from "./EditBrandForm";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Box, Dialog, DialogTitle, Button, DialogContent } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Brands.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Brands = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastDeletedBrand, setLastDeletedBrand] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [brands, setBrands] = useState([]);

  const token = localStorage.getItem('token');

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const handleCardClick = (brandId) => {
    // Store the brand ID in local storage
    localStorage.setItem("BrandId", brandId);
  };
  const handleIsSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleIsSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch("https://gocarsmithbackend.onrender.com/api/admin/getBrands",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBrands(); // Fetch data when the component mounts
  }, []);

  // Back-End Get locations

  const handleDeleteBrand = async (brandId) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this brand?"
    );

    if (confirmDeletion) {
      try {
        const response = await axios.delete(
          `https://gocarsmithbackend.onrender.com/api/admin/brands/${brandId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }

        );

        if (response.status === 200) {
          const deletedBrandIndex = brands.findIndex(
            (brand) => brand._id === brandId
          );

          // Save the deleted brand before removing it
          const deletedBrand = brands[deletedBrandIndex];
          setLastDeletedBrand(deletedBrand);

          // Remove the brand from the brands array
          const updatedBrands = [...brands];
          updatedBrands.splice(deletedBrandIndex, 1);
          setBrands(updatedBrands);

          // Display Snackbar
          handleIsSnackbarOpen("Brand deleted successfully.");
        } else {
          console.error("Failed to delete brand");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };



  const handleUndoDelete = () => {
    if (lastDeletedBrand) {
      // Re-add the last deleted brand to the brands array
      setBrands((prevBrands) => [...prevBrands, lastDeletedBrand]);
      setLastDeletedBrand(null);
      handleSnackbarOpen("Brand deletion undone.");
    }
  };


  const [anchorElMap, setAnchorElMap] = useState({});

  const handleMenuClick = (event, brandId) => {
    setAnchorElMap({
      ...anchorElMap,
      [brandId]: event.currentTarget,
    });
  };

  const handleCloseMenu = (brandId) => {
    setAnchorElMap((prevAnchorElMap) => ({
      ...prevAnchorElMap,
      [brandId]: null,
    }));
  };

  const open = (brandId) => Boolean(anchorElMap[brandId]);
  const id = (brandId) =>
    open(brandId) ? `simple-popover-${brandId}` : undefined;

  const handleEditBrand = (brand) => {
    setSelectedBrand(brand);
    setDialogOpen(true);
  };

  const handleCreateBrand = () => {
    setSelectedBrand(null); // Clear selectedBrand when creating a new brand
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    fetchBrands(); // Fetch brands after closing the dialog (for updates)
  };

  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "45px" }}>
          <Container>
            <Row style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ marginLeft: "20px" }}>Brands</h1>

                <button onClick={handleCreateBrand} className="create_button">
                  + Create Brand
                </button>
              </div>
            </Row>
          </Container>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity="success"
            >
              Brand created successfully!
            </MuiAlert>
          </Snackbar>
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={3000}
            onClose={handleIsSnackbarClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleIsSnackbarClose}
              severity="success"
              action={
                <React.Fragment>
                  {lastDeletedBrand && (
                    <Button
                      color="inherit"
                      size="small"
                      onClick={handleUndoDelete}
                    >
                      UNDO
                    </Button>
                  )}
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleSnackbarClose}
                  >
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
          <Container>
            <Row xs={1} md={2} lg={3} xl={5} className="g-3">
              {brands.map((brand) => (
                <Col key={brand._id}>
                  <Card
                    key={brand._id}
                    style={{
                      width: "12rem",
                      height: "12rem",
                      position: "relative",
                    }}
                    className="brandcard"
                    onClick={() => handleCardClick(brand._id)}
                  >
                    <Link to={`/Admin/models/${brand._id}`}>
                      <Image
                        src={`https://gocarsmithbackend.onrender.com${brand.brandImage}`}
                        alt="Image Title"
                        style={{
                          height: "150px",
                          width: "100%",
                          padding: 20,
                        }}
                      />
                    </Link>
                    <IconButton
                      aria-describedby={id(brand._id)}
                      onClick={(event) => handleMenuClick(event, brand._id)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: "15px",
                      }}
                    >
                      <BsThreeDotsVertical />
                    </IconButton>
                    <Card.Body
                      className="brandbody"
                      style={{ padding: "0", marginLeft: "10px" }}
                    >
                      <div className="brandname">
                        <Card.Title>{brand.brandName}</Card.Title>
                      </div>
                      <Popover
                        id={id(brand._id)}
                        open={open(brand._id)}
                        anchorEl={anchorElMap[brand._id]}
                        onClose={() => handleCloseMenu(brand._id)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuItem
                          onClick={() => navigate(`/Admin/models/${brand._id}`)}
                        >
                          <RemoveRedEyeIcon />
                          &nbsp;View
                        </MenuItem>
                        <MenuItem onClick={() => handleEditBrand(brand)}>
                          <EditIcon />
                          &nbsp;Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteBrand(brand._id)}>
                          <DeleteIcon />
                          &nbsp;Delete
                        </MenuItem>
                      </Popover>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {selectedBrand ? "Edit Brand" : "Create Brand"}
          <button
            onClick={closeDialog}
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
          {selectedBrand !== null ? (
            <EditBrandForm brand={selectedBrand} onClose={closeDialog} />
          ) : (
            <CreateBrand
              onClose={closeDialog}
              handleSnackbarOpen={handleSnackbarOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Brands;

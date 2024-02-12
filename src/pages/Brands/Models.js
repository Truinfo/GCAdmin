import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import Sidebar from "../../components/Sidebar/Sidebar";
import { BiArrowBack } from "react-icons/bi";
import CreateModel from "./CreateModel"; // Import your CreateModel component
import "./Brands.css";
import { Row, Container, Col } from "react-bootstrap";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import EditModelForm from "./EditModelForm";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BsThreeDotsVertical } from "react-icons/bs";
function Models() {
  const { BrandId } = useParams();
  const [isCreateModelOpen, setCreateModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [Models, setModels] = useState([]);
  const openCreateModelDialog = () => {
    setSelectedModel(null); // Reset selectedModel to null when opening the create form
    setCreateModelOpen(true);
  };

  const handleEditModel = (model) => {
    setSelectedModel(model);
    setCreateModelOpen(true);
  };
  const handleCardClick = (modelId) => {
    // Store the brand ID in local storage
    localStorage.setItem("modelId", modelId);
  };
  const token = localStorage.getItem('token');
  const handleDeleteModel = async (modelId) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this model?"
    );
    if (confirmDeletion) {
      try {
        const response = await axios.delete(`https://gocarsmithbackend.onrender.com/api/admin/deleteModel/${modelId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
         
          const res=(`https://gocarsmithbackend.onrender.com/api/admin/getModel/${BrandId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
  }
          )
          if(res)  {
           
          }setModels(res.data);
          
        } else {
          console.error('Failed to delete car model');
          // Handle the error
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error
      }
    }
  };
  const handleCreateModel = () => {
    setSelectedModel(null); // Clear selectedBrand when creating a new brand
    setCreateModelOpen(true);
  };
  //backEnd Fetching
  // Initialize with an empty array
  useEffect(() => {
    fetch(`https://gocarsmithbackend.onrender.com/api/admin/getModel/${BrandId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
})
      .then((response) => {
        if (!response.ok) {
          console.log("Error");
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setModels(data);
      })
      .catch((error) => {
        console.error('Error fetching car models:', error);
      });
  }, [BrandId]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState({});
  const open = (modelId) => Boolean(anchorEl[modelId]);
  const id = (modelId) =>
    open[modelId] ? `simple-popover-${modelId}` : undefined;
  const handleMenuClick = (event, model) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [model._id]: event.currentTarget,
    }));
    setSelectedModel(model);
  };
  const handleCloseMenu = (modelId) => {
    setAnchorEl({ ...anchorEl, [modelId]: null });
  };

  const closeCreateModelDialog = async () => {
    setCreateModelOpen(false);
  
    // Fetch the updated list of models
    try {
      const response = await fetch(`https://gocarsmithbackend.onrender.com/api/admin/getModel/${BrandId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        console.log("Error fetching models");
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error('Error fetching car models:', error);
    }
  };
  



  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {/* Include the Sidebar component */}
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "45px" }}>
          <Container>
            <Row>
              <Col lg={1}>
                <IconButton
                  sx={{ border: "1px solid #000", borderRadius: "50%", backgroundColor: "#fff", }}
                  onClick={() => navigate("/Admin/Brands")}
                >
                  <BiArrowBack />
                </IconButton>
              </Col>
              <Col lg={9}>
                <h1 style={{ marginBottom: "17px" }}> Models</h1>
              </Col>
              <Col lg={2}>
                <button
                  onClick={openCreateModelDialog}
                  className="create_button"
                >
                  + Create Model
                </button>
              </Col>
            </Row>
          </Container>
          <div className="model-cards">
            {Models.map((model) => (
<Card key={model._id} className="model-card" onClick={() => handleCardClick(model._id)}>
                <Link to={`/Admin/detail/${model._id}`} >
                  <Card.Img
                    variant="top"
                    sx={{ cursor: "pointer" }}
                    src={`https://gocarsmithbackend.onrender.com${model.modelImage}`}
                  /></Link>
                <Card.Body>
                  <Card.Title className="card-title">{model.model}</Card.Title>
                </Card.Body>
                <IconButton
                  aria-describedby={model.id}
                  onClick={(event) => handleMenuClick(event, model)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    fontSize: "15px",
                  }}
                >
                  <BsThreeDotsVertical />
                </IconButton>
                <Popover
                  id={id(model._id)}
                  open={open(model._id)}
                  anchorEl={anchorEl[model._id]}
                  onClose={() => handleCloseMenu(model._id)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={() => navigate(`/Admin/detail/${model._id}`)}>
                    <RemoveRedEyeIcon />
                    &nbsp;View
                  </MenuItem>
                  <MenuItem onClick={() => handleEditModel(model)}>
                    <EditIcon />
                    &nbsp;Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteModel(model._id)}>
                    <DeleteIcon />
                    &nbsp;Delete
                  </MenuItem>
                  <MenuItem >
                    <Link to={`/Admin/${model.BrandId}/${model._id}/addService`} style={{ color: "black", textDecoration: "none" }}>
                      <AddIcon />
                      &nbsp;Add Services</Link>
                  </MenuItem>
                </Popover>
                <Card.Body>
                  <Card.Title className="card-title">{model.name}</Card.Title>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Box>
      </Box>
      <Dialog open={isCreateModelOpen} onClose={closeCreateModelDialog}>
        <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>
            {selectedModel ? "Edit Model" : "Create Model"}
          </span>
          <IconButton onClick={closeCreateModelDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedModel !== null ? (
            <EditModelForm model={selectedModel} onClose={closeCreateModelDialog} />
          ) : (
            <CreateModel onClose={closeCreateModelDialog} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default Models;
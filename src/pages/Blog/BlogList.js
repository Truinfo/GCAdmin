import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { format } from "date-fns";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import EditBlogForm from "./EditBlogForm";

const BlogList = () => {
  const [blogData, setBlogData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarDuration] = useState(10000); // 10 seconds
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBlogForEdit, setSelectedBlogForEdit] = useState(null);
  const [reload, setReload] = useState(false);

  const handleOpenDeleteDialog = (blogId) => {
    setSelectedBlogId(blogId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedBlogId(null);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const handleOpenEditDialog = (blog) => {
    setSelectedBlogForEdit(blog);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedBlogForEdit(null);
    setEditDialogOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://gocarsmithbackend.onrender.com/api/admin/blog/posts",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setBlogData(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const response = await axios.delete(
        `https://gocarsmithbackend.onrender.com/api/admin/blog/deletepost/${selectedBlogId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setSnackbarOpen(true);
      handleCloseDeleteDialog();

      // Refetch the blog data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const navigate = useNavigate();

  const navigateToBlogDetails = (blogId) => {
    navigate(`/Admin/BlogDetails/${blogId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "35px" }}>
          <Container>
            <Row style={{ marginBottom: "10px" }}>
              <Col lg={10}>
                <h1><b>Blog</b></h1>
              </Col>
              <Col lg={2}>
                <Link to="/Admin/CreateBlog">
                  <button className="create_button">+ Create Blog</button>
                </Link>
              </Col>
            </Row>
          </Container>
          <div>
            <Grid container spacing={2}>
              {blogData.map((blog) => (
                <Grid item key={blog.id} xs={12} sm={6} md={6} lg={6}>
                  <Card
                    sx={{
                      display: "flex",
                      margin: 2,
                      boxShadow: 10,
                      borderRadius: 4,
                      width: "90%",
                      height: "90%",
                    }}

                  >
                    <Grid container sx={{cursor: "pointer"}}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <CardMedia
                          component="img"
                          alt="Card Image"
                          image={`https://gocarsmithbackend.onrender.com${blog.cover[0].img}`}
                          sx={{
                            borderRadius:1,
                            margin: 2,
                            width: "85%",
                            height: "85%",
                          }}
                          onClick={() => navigateToBlogDetails(blog._id)}
                        />
                      </Grid>



                      <Grid item xs={12} sm={6} md={6} lg={6} sx={{ cursor: "pointer" }}>
                        <CardContent onClick={() => navigateToBlogDetails(blog._id)} >
                          <Typography variant="h6" sx={{ marginTop: 2 }}>
                            {blog.posttitle}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {blog.author}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {format(new Date(blog.createdAt), "yyyy-MM-dd")}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => navigateToBlogDetails(blog._id)} sx={{ color: "#007BFF" }}>
                            <RemoveRedEyeIcon />
                          </IconButton>
                          <IconButton onClick={() => handleOpenEditDialog(blog)} sx={{ color: "#28A745" }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleOpenDeleteDialog(blog._id)} sx={{ color: "#DC3545" }}>
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Grid>


                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
      </Box>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteBlog} color="primary" autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message="Blog deleted."
      />
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Edit Blog
          <IconButton onClick={handleCloseEditDialog} sx={{ color: "black" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <EditBlogForm
            blog={selectedBlogForEdit}
            fetchData={fetchData}
            onClose={handleCloseEditDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogList;

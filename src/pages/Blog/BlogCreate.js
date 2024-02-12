import React, { useState } from "react";
import {
  TextField,
  Typography,
  Container,
  Grid,
  Switch,
  IconButton,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BlogCreate() {
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState({
    title: "",
    description: "",
    content: "",
    tags: [],
    author: "",
    enableComments: false,
    coverImages: [],
    category: "", // New field for category
    subcategory: "", // New field for subcategory
  });

  const categories = [
    "Auto News",
    "Featured Articles",
    "Car Accessories",
  ];

  const subcategories = {
    "Auto News": [
      "Latest Car News",
      "Latest Spy Shot",
      "Electric Car News",
    ],
    "Featured Articles": [
      "Basics",
      "Fun Reads",
      "Infomation Articles",
    ],
    "Car Accessories": [], // Add subcategories for Car Accessories if needed
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBlogPost({ ...blogPost, [name]: name === "tags" ? value.split(',') : value });
  };

  const handleEnableCommentsChange = (event) => {
    const { name, checked } = event.target;
    setBlogPost({ ...blogPost, [name]: checked });
  };

  // const handleContentChange = (value) => {
  //   // Remove <p> tags added by default
  //   const contentWithoutPTags = value.replace(/<\/?p>/g, "");

  //   setBlogPost({ ...blogPost, content: contentWithoutPTags });
  // };

  const handleContentChange = (value) => {
    setBlogPost({ ...blogPost, content: value });
  };


  const handleCoverImagesChange = (event) => {
    const files = event.target.files;
    setBlogPost({ ...blogPost, coverImages: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("posttitle", blogPost.title);
      formData.append("description", blogPost.description);
      formData.append("content", blogPost.content);
      formData.append("tags", blogPost.tags.join(","));
      formData.append("author", blogPost.author);
      formData.append("comments", blogPost.enableComments);
      formData.append("category", blogPost.category);
      formData.append("subCategories", blogPost.subcategory);

      for (let i = 0; i < blogPost.coverImages.length; i++) {
        formData.append("cover", blogPost.coverImages[i]);
      }
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://gocarsmithbackend.onrender.com/api/admin/blog/addposts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post added successfully:", response.data);

      // Navigate to the blog page
      navigate("/Admin/blog");
      // Display success alert
      window.alert("Post created successfully!");
    } catch (error) {
      console.error("Error adding post:", error.response.data);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      {/* Include the Sidebar component */}
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Container>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
                sx={{ border: "1px solid #000", borderRadius: "50%", backgroundColor: "#fff", marginRight: "50px", }}
                onClick={() => navigate("/Admin/Blog")}
              >
                <BiArrowBack />
              </IconButton>
              <Typography variant="h4" gutterBottom>
                Create a New Post
              </Typography>
            </div>
              <Typography variant="body1" gutterBottom>
                Details
              </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="category"
                  options={categories}
                  value={blogPost.category}
                  onChange={(event, newValue) =>
                    setBlogPost({ ...blogPost, category: newValue, subcategory: "" })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Category" fullWidth />
                  )}
                />
              </Grid>
              {blogPost.category && blogPost.category !== "Car Accessories" && (
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="subcategory"
                    options={subcategories[blogPost.category] || []}
                    value={blogPost.subcategory}
                    onChange={(event, newValue) =>
                      setBlogPost({ ...blogPost, subcategory: newValue })
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Subcategory" fullWidth />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  name="title"
                  value={blogPost.title}
                  fullWidth
                  required
                  placeholder="Enter the title"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Description"
                  name="description"
                  value={blogPost.description}
                  fullWidth
                  required
                  placeholder="Enter the description"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Content
                </Typography>
                <ReactQuill
                  value={blogPost.content}
                  onChange={handleContentChange}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike", "overline"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["image"],
                      ["header", { header: [1, 2, 3, 4, 5, 6] }],
                    ],
                  }}
                  placeholder="Write your content here"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginTop: "25px" }}
                >
                  Cover Images
                </Typography>
                {/* Update the file input to accept multiple files */}
                <input
                  type="file"
                  name="cover"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleCoverImagesChange}
                  multiple
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tags"
                  name="tags"
                  value={blogPost.tags}
                  fullWidth
                  placeholder="Enter tags (comma-separated)"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Author"
                  name="author"
                  value={blogPost.author}
                  fullWidth
                  required
                  placeholder="Enter the author's name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Switch
                  name="enableComments"
                  checked={blogPost.enableComments}
                  onChange={handleEnableCommentsChange}
                />
                <Typography variant="body1" gutterBottom>
                  Enable Comments
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button className="create_button" type="submit">
                  Create Post
                </button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Box>
  );
}
export default BlogCreate;
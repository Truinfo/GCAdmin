import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const EditBlogForm = ({ blog, fetchData, onClose }) => {
  const [editedBlog, setEditedBlog] = useState({ ...blog });
  const [selectedCoverImages, setSelectedCoverImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const categories = ['Auto News', 'Featured Articles', 'Car Accessories'];
  const subCategoriesMap = {
    'Auto News': ['Latest Car News', 'Latest Spy Shot', 'Electric Car News'],
    'Featured Articles': ['Basics', 'Fun Reads', 'Infomation Articles'],
    'Car Accessories': ['Accessories Category A', 'Accessories Category B', 'Accessories Category C'],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((currentBlog) => ({
      ...currentBlog,
      [name]: value,
    }));
  };


  const handleUpdateBlog = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authorization token not found");
        return;
      }

      const formData = new FormData();
      console.log(formData)
      formData.append("posttitle", editedBlog.posttitle);
      formData.append("description", editedBlog.description);
      formData.append("content", editedBlog.content);
      formData.append("tags", editedBlog.tags);
      formData.append("author", editedBlog.author);
      formData.append("enableComments", editedBlog.enableComments);
      formData.append("category", selectedCategory);
      formData.append("subCategories", selectedSubCategory);

      for (let i = 0; i < selectedCoverImages.length; i++) {
        formData.append("cover", selectedCoverImages[i]);
      }

      console.log("Sending data:", Object.fromEntries(formData.entries()));
      const response = await axios.put(
        `https://gocarsmithbackend.onrender.com/api/admin/blog/updatepost/${editedBlog._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Blog updated successfully");
        fetchData()
        onClose()

      } else {
        console.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    // Reset subcategory when category changes
    setSelectedSubCategory('');
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setSelectedSubCategory(selectedSubCategory);
  };

  const handleCoverImagesChange = (e) => {
    const files = e.target.files;
    setSelectedCoverImages(files);
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Title"
        id="title"
        name="posttitle"
        value={editedBlog.posttitle}
        onChange={handleInputChange}
        sx={{ marginBottom: 2, marginTop: 3 }}
      />

      <TextField
        fullWidth
        label="Description"
        id="description"
        name="description"
        value={editedBlog.description}
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        label="Content"
        id="content"
        name="content"
        multiline
        rows={10}
        value={editedBlog.content}
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
      />

      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Cover Images
      </Typography>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        name="coverImages"
        onChange={handleCoverImagesChange}
        multiple
        style={{ marginBottom: "20px" }}
      />

      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Tags
      </Typography>
      <TextField
        fullWidth
        label="Tags"
        id="tags"
        name="tags"
        value={editedBlog.tags}
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
      />

      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Author
      </Typography>
      <TextField
        fullWidth
        label="Author"
        id="author"
        name="author"
        value={editedBlog.author}
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
      />

<Typography variant="h6" style={{ marginBottom: "10px" }}>
        category
      </Typography>
      <TextField
        fullWidth
        label="Category"
        id="category"
        name="category"
        value={editedBlog.category}
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
      />

<Typography variant="h6" style={{ marginBottom: "10px" }}>
        Category
      </Typography>
      <Select
        fullWidth
        label="Category"
        id="category"
        name="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        sx={{ marginBottom: 2 }}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>

      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Sub Category
      </Typography>
      <Select
        fullWidth
        label="Sub Category"
        id="subCategory"
        name="subCategory"
        value={selectedSubCategory}
        onChange={handleSubCategoryChange}
        sx={{ marginBottom: 2 }}
      >
        {subCategoriesMap[selectedCategory] &&
          subCategoriesMap[selectedCategory].map((subCategory) => (
            <MenuItem key={subCategory} value={subCategory}>
              {subCategory}
            </MenuItem>
          ))}
      </Select>

      <Button
        variant="contained"
        color="primary"
        className="create_button"
        onClick={handleUpdateBlog}
        sx={{ marginRight: 2, marginTop: 2 }}
      >
        Update Blog
      </Button>
    </div>
  );
};

export default EditBlogForm;

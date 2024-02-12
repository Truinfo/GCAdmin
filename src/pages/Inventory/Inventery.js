import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import EditableTable from './EditableTable';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Inventory.css';
function Inventory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const token = localStorage.getItem('token')
  console.log(token)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://gocarsmithbackend.onrender.com/api/admin/getcategories/get", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.ok) {
          const categories = await response.json();
          setCategories(categories);
          // Assuming the first category is selected by default
          if (categories.length > 0) {
            setSelectedCategory(categories[0]);
          }
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // Call the function to fetch categories
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch(`https://gocarsmithbackend.onrender.com/api/admin/inventory/${selectedCategory?._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setInventoryData(data);
        } else {
          console.error("Failed to fetch inventory data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // Fetch inventory data when selected category changes
    if (selectedCategory) {
      fetchInventoryData();
    }
  }, [selectedCategory]);
  
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        {/* Include the Sidebar component */}
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '60px' }}>
          <h1 style={{marginLeft:"20px"}}>Inventories</h1>
          <div>
            <div className="top-navbar">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className={`category-tab ${
                    selectedCategory?._id === category._id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name}
                </div>
              ))}
            </div>
            {selectedCategory && (
              <div style={{marginTop:"10px"  }}>
                <h2>{selectedCategory.name}</h2>
                {/* Pass 'categories' prop to EditableTable component */}
                <EditableTable categories={categories} selectedCategory={selectedCategory} />
              </div>
            )}
          </div>
        </Box>
      </Box>
    </div>
  );
}
export default Inventory;
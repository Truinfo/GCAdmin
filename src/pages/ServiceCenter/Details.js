import React, { useState } from 'react';
import { Box, Tab, Tabs, IconButton } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import InventoryList from './InventoryList';
import ReviewsPage from './ReviewsPage';
import Request from './Request';
import StaffList from './StaffList';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
function Details() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '35px' }}>
        <IconButton style={{ border: "1px solid #ccc", borderRadius: '20px', marginTop:'20px' }} onClick={() => navigate("/Admin/ServiceLocations")}>
          <BiArrowBack />
        </IconButton>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Staff Details" style={{ color: "#FF5733", fontWeight: "600", fontSize: "16px" }} />
         
          <Tab label="Inventory" style={{ color: "#FF5733", fontWeight: "600", fontSize: "16px" }} />
          <Tab label="Reviews and Ratings" style={{ color: "#FF5733", fontWeight: "600", fontSize: "16px" }} />
          <Tab label="Requests" style={{ color: "#FF5733", fontWeight: "600", fontSize: "16px" }} />
        </Tabs>
        <Box sx={{ marginTop: 2 }}>
          {value === 0 && <StaffList />}
          {value === 1 && <InventoryList />}
          {value === 2 && <ReviewsPage />}
          {value === 3 && <Request />}
        </Box>
      </Box>
    </Box>
  );
}

export default Details;

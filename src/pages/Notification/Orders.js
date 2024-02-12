import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Sidebar from "../../components/Sidebar/Sidebar";

const Orders = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        let statusFilter = "";
        if (filter !== "All") {
          statusFilter = `?status=${filter}`;
        }
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/getAllOrders${statusFilter}`,
          { headers }
        );
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleApproveOrReject = async (orderId, status) => {
    try {
      const authToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      await axios.patch(
        `https://gocarsmithbackend.onrender.com/api/admin/editStatusAfterAcceptedOrRejected/${orderId}`,
        { status },
        { headers }
      );
      const response = await axios.get(
        "https://gocarsmithbackend.onrender.com/api/admin/getAllOrders",
        { headers }
      );
      setRequests(response.data);
      console.log(`Order ${orderId} ${status} successfully`);
    } catch (error) {
      console.error(`Error ${status.toLowerCase()}ing order ${orderId}:`, error);
    }
  };

  const handleApprove = (orderId) => {
    handleApproveOrReject(orderId, 'Approved');
  };

  const handleReject = (orderId) => {
    handleApproveOrReject(orderId, 'Rejected');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredRequests = requests.filter(request => {
    if (filter === 'All') {
      return true;
    }
    return request.status === filter;
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "45px",
        }}
      >
        <div>
          <h1 className="text-center">Inventory Orders</h1>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2, marginRight: 5 }}>
            <FormControl>
              <InputLabel htmlFor="filter">Filter</InputLabel>
              <Select
                value={filter}
                onChange={handleFilterChange}
                label="Filter"
              >
                <MenuItem value="All"><b>All</b></MenuItem>
                <MenuItem value="Approved"><b>Approved</b></MenuItem>
                <MenuItem value="Rejected"><b>Rejected</b></MenuItem>
                <MenuItem value="Pending"><b>Pending</b></MenuItem>
              </Select>
            </FormControl>
          </Box>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {filteredRequests.map((request) => (
              <Card
                key={request._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  margin: "10px",
                  width: "300px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6" component="div">
                    Service Center ID: {request.serviceCenterId}
                  </Typography>
                  <ul>
                    {request.items.map((item) => (
                      <li key={item._id}>
                        <Typography>
                          <strong>Item:</strong> {item.name},{" "}
                          <strong>Quantity:</strong> {item.quantity}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <Typography
                    variant="body2"
                    style={{
                      marginTop: "10px",
                      color: request.status === "Approved" ? "green" : (request.status === "Rejected" ? "red" : "orange"),
                    }}
                  >
                    Status: {request.status}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{
                      borderRadius: 50,
                      marginRight: 1,
                      padding: "6px 12px",
                      "&:hover": {
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      },
                    }}
                    onClick={() => handleApprove(request._id)}
                    startIcon={<CheckIcon />}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      borderRadius: 50,
                      marginRight: 1,
                      padding: "6px 12px",
                      "&:hover": {
                        backgroundColor: "#F44336",
                        color: "#FFFFFF",
                      },
                    }}
                    onClick={() => handleReject(request._id)}
                    startIcon={<ClearIcon />}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Orders;

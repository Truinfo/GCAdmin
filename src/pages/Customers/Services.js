import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar, Box, IconButton } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import CardMedia from "@mui/material/CardMedia";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Services = () => {
  const [openUsers, setOpenUsers] = useState({});
  const toggleUser = (index) => {
    setOpenUsers((prevOpenUsers) => ({
      ...prevOpenUsers,
      [index]: !prevOpenUsers[index],
    }));
  };
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('_id')
  const [listOfServices, setListOfServices] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getUserDetailsForAdmin = () => {
      axios.get("https://gocarsmithbackend.onrender.com/api/admin/getCustomers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        // Filter user details based on the provided _id
        const filteredUserDetails = response.data.filter(user => user._id === userId);
        setUserDetails(filteredUserDetails);
      });
    };
    getUserDetailsForAdmin();
  }, [token, userId]);
  console.log(userDetails);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/ServiceCenter/ListOfSevicesBy/${userId}`
        );
        console.log("Service data:", response.data); // Add this line
        setListOfServices(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, [userId]);
  return (
    <Box sx={{ display: "flex" }}>
      {/* Include the Sidebar component */}
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center"
        }}>
          <IconButton>
            <BiArrowBack onClick={() => navigate("/Admin/Customers")} />
          </IconButton>
          <h1>Customer details</h1>
        </div>
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            maxWidth: "1600px",
          }}
        >
          <Card
            style={{
              maxWidth: "700px",
              height: "100%",
              marginRight: "30px",
              boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex" }}>
              <CardMedia
                component="img"
                alt="User Profile"
                image={
                  userDetails.length > 0 && userDetails[0].profilePicture
                    ? `https://gocarsmithbackend.onrender.com${userDetails[0].profilePicture}`
                    : "data:image/jpeg;base64,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"
                }
                style={{ maxWidth: "330px", maxHeight: "400px" }}
              />

              <CardContent style={{marginTop:"45px"}}>
                <ul style={{ textAlign: "left" }}>
                  {userDetails.map((Bio, index) => (
                    <div key={index}>
                      <strong style={{ color: "#FF5733", fontSize: "20px" }}>
                        Name:
                      </strong>{" "}
                      {Bio.firstName} {Bio.secondName}
                      <br />
                      <strong style={{ color: "#FF5733", fontSize: "20px" }}>
                        User ID:
                      </strong>{" "}
                      {Bio._id}
                      <br />
                      <strong style={{ color: "#FF5733", fontSize: "20px" }}>
                        Email:
                      </strong>{" "}
                      {Bio.email}
                      <br />
                      <strong style={{ color: "#FF5733", fontSize: "20px" }}>
                        PhoneNumber:
                      </strong>{" "}
                      {Bio.contactNumber}
                      <br />
                      {/* <strong style={{ color: "#FF5733", fontSize: "20px" }}>
                        Location:
                      </strong>{" "}
                      {Bio.Location} */}
                      <br />
                      {/* <strong style={{ color: "#FF5733", fontSize: "20px" }}>
                        Address:
                      </strong>{" "}
                      {Bio.address} */}
                      <br />
                    </div>
                  ))}
                </ul>
              </CardContent>
            </div>
          </Card>
          <div
            style={{
              maxWidth: "800px",
              boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3 style={{ color: "#FF5733", margin: "8px" }}>
              Service Details History
            </h3>
            {listOfServices.length === 0 ? (
              <p>No service history available for this user.</p>
            ) : (
              <List style={{ maxWidth: "600px" }}>
                {listOfServices.map((listOf, index) => (
                  listOf.listOfServices.map((service) => (
                    <div key={index}>
                      <ListItem
                        button
                        onClick={() => toggleUser(index)}
                        style={{ color: "#FF5733", fontWeight: "bold" }}
                      >
                        <ListItemText primary={service.name} />
                        {openUsers[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItem>
                      <Collapse in={openUsers[index]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItem>
                            <ListItemText
                              primary={`Service Type: ${service.name}`}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary={`Service Price: ${service.price}`}
                            />
                          </ListItem>
                          {/* <ListItem>
                        <ListItemText
                          primary={`Service Completed: ${service.serviceCompleted}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`Payment Status: ${service.paymentStatus}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Location: ${service.Location}`} />
                      </ListItem> */}
                        </List>
                      </Collapse>
                    </div>
                  ))
                ))}
              </List>
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
};
export default Services;
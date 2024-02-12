import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, IconButton } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import CardMedia from "@mui/material/CardMedia";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const BioList = [
  {
    name: "John Doe",
    userId: "12345",
    phoneNumber: "555-555-5555",
    address: "123 street, maduruwada, car shed, visakhapatnam",
    pinCode: "12345",
    Location: "Vizag",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D", // Add your profile image URL here
  },
  // Add more user data as needed
];
const OnsiteService = () => {
    
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


  const onsiteAppointmentId=localStorage.getItem("onSiteUserId")
  const [listOfServices, setListOfServices] = useState([]);
  const token = localStorage.getItem("token");
 
  useEffect(() => {
     
    const fetchOnsiteServiceData = async () => {

      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/onsite/getOnsiteAppointmentsById/${onsiteAppointmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setListOfServices(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchOnsiteServiceData(); // Call the fetchData function
  }, [userId,onsiteAppointmentId]);
  return (
    <Box sx={{ display: "flex" }}>
      {/* Include the Sidebar component */}
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "45px" }}>
        <IconButton>
          <BiArrowBack onClick={() => navigate("/Admin/Customers")} />
        </IconButton>
        <h1>Customer details</h1>
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
                //image={BioList[0].profileImage}
                image={listOfServices.length > 0 ? `https://gocarsmithbackend.onrender.com${listOfServices[0].imagePath}` : ""}
                style={{ maxWidth: "330px", maxHeight: "400px" }}
              />
              <CardContent>
                <ul style={{ textAlign: "left" }}>
                  {listOfServices.map((Bio, index) => (
                    <div key={index}>
                      <strong style={{ color: "#FF5733", fontSize: "20px" }}>
                        Name:
                      </strong>{" "}
                      {Bio.customerName}
                      <br />
                      <strong style={{ color: "#FF5733", fontSize: "20px"}}>
                        User ID:
                      </strong>{" "}
                      {Bio.userId}
                      <br />
                      <strong style={{ color: "#FF5733", fontSize: "20px"}}>
                        Email:
                      </strong>{" "}
                      {Bio.email}
                      <br />
                      <strong style={{ color: "#FF5733", fontSize: "20px" }}>
                        PhoneNumber:
                      </strong>{" "}
                      {Bio.contactNumber
}
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
              {listOfServices.map((listOf,index) => (
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
export default OnsiteService;
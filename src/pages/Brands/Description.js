import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Box, IconButton } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Serviceslist from "./Serviceslist";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import { useNavigate, useParams, Link } from "react-router-dom";
const Description = () => {
  // const [selectedFuel, setSelectedFuel] = useState("Petrol"); // Default selected fuel
  // const handleFuelChange = (event) => {
  //   setSelectedFuel(event.target.value);
  // };
  const [selectedLocation, setSelectedLocation] = useState('');
  const [fuelType, setFuelType] = useState("");
  const brandId = localStorage.getItem('BrandId');
  const [fuelTypes, setFuelTypes] = useState([]);
  const { modelId } = useParams();
  const [carData, setCarData] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getCarDetailsById = () => {
      axios
        .get(`https://gocarsmithbackend.onrender.com/api/admin/getCarModel/${modelId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response) {
            setCarData([response.data] || []);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getCarDetailsById();


    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://gocarsmithbackend.onrender.com/api/admin/getLocations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const { locationList } = await response.json();
          setLocationOptions(locationList);
        } else {
          console.error("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLocations();
  }, []);

  const onClickLocationSelection = (e) => {
    setSelectedLocation(e.target.value)
  }
  const handleToSelctFuelType = (e) => {
    setFuelType(e.target.value)
  }
  useEffect(() => {
    const fetchFuelTypes = async () => {
      try {
        const response = await fetch(
          `https://gocarsmithbackend.onrender.com/api/admin/getFuelTypesByBrandAndModel/${brandId}/${modelId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
  }
  
        );
        if (response.ok) {
          const data = await response.json();
          setFuelTypes(data.fuelTypes);
          console.log(data.fuelTypes)
        } else {
          console.error("Failed to fetch fuel types");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFuelTypes();
  }, [brandId, modelId]);


  const isSelectionComplete = selectedLocation && fuelType;
  console.log(selectedLocation, modelId, fuelType);
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "45px" }}>
        <Container style={{ marginTop: "15px" }}><Row>
          <Col lg={1}>
            <IconButton
              sx={{
                border: "1px solid #000",
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
              onClick={() => navigate("/Admin/Brands")}
            >
              <BiArrowBack />
            </IconButton>
          </Col>
          <Col lg={9}>
            <h1 style={{ marginBottom: "17px" }}> Description</h1>
          </Col>
          <Col lg={2}>
            {isSelectionComplete && (
              <button className="create_button">
                <Link
                  to={`/Admin/editService/${selectedLocation}/${modelId}/${fuelType}`}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Edit Service
                </Link>
              </button>
            )}
          </Col>
        </Row>
          {carData.map((car) => (
            <Row key={car._id} style={{ marginBottom: "30px" }}>
              <Col lg={5}>
                <Card
                  className="shadow"
                  style={{ height: "250px", borderRadius: "10px" }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://gocarsmithbackend.onrender.com${car.modelImage}`}
                    style={{ height: "250px", borderRadius: "10px" }}
                  />
                </Card>
              </Col>
              <Col lg={6}>
                <Card
                  className="shadow"
                  style={{ height: "250px", borderRadius: "10px" }}
                >
                  <Card.Body>
                    <Row style={{ marginTop: "5px" }}>
                      <h5><b>Brand:</b> {car.BrandId}</h5>
                    </Row>
                    <Row style={{ marginTop: "5px" }}>
                      <h5><b>Model:</b> {car.model}</h5>
                    </Row>
                    <Row
                      className="align-items-center"
                      style={{ marginTop: "5px" }}
                    >
                      {/* <Col xs={2}>
                        <Card.Title>
                          <h5>Fuel:</h5>
                        </Card.Title>
                      </Col>
                      <Col xs={9}>
                        <Form.Control
                          as="input"
                          type="text"
                          value={car.fuelType.join(", ")} // Join fuel types into a comma-separated string
                          readOnly
                        />
                      </Col> */}
                      <Col lg={5}>
                        <Form.Group controlId="fuelType" style={{ display: 'flex', alignItems: 'center' }}>
                          <Form.Label style={{ marginRight: '10px' }}><h5><b>Fuel Type:</b></h5></Form.Label>
                          <Select
                            labelId="category-label"
                            id="category"
                            required
                            value={fuelType}
                            style={{ width: '50%', marginLeft: '5px' }}
                            onChange={handleToSelctFuelType}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>
                              Select
                            </MenuItem>
                            {fuelTypes.map((fuelType) => (
                              <MenuItem key={fuelType} value={fuelType}>
                                {fuelType}
                              </MenuItem>
                            ))}
                          </Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                      <Col xs={5}>
                        <h5><b>Locations Available:</b> </h5>
                      </Col>
                      <Col xs={5}>
                        <Select
                          fullWidth
                          value={selectedLocation}
                          onChange={onClickLocationSelection}
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            Select
                          </MenuItem>
                          {locationOptions.map((option) => (
                            <MenuItem key={option._id} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
          <Row>
            <Serviceslist />
          </Row>
        </Container>
      </Box>
    </Box>
  );
};
export default Description;
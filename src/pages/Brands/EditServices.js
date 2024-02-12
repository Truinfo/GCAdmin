import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const ServiceList = () => {
  const { locations, modelId, fuelType } = useParams();
  const [editModel, setEditMode] = useState(false);
  const [sampleData, setSampleData] = useState([]);
  const token =localStorage.getItem('token');
  const [formData, setFormData] = useState({
    locations: [],
    fuelType: "",
    modelId: "",
    model: " ",
    PeriodicServices: {
      BASIC_SERVICE: {
        name: "",
        price: "",
      },
      STANDARD_SERVICE: {
        name: "",
        price: "",
      },
      COMPREHENSIVE_SERVICE: {
        name: "",
        price: "",
      },
      FRONT_BRAKE_PADS: {
        name: "",
        price: "",
      },
      REAR_BRAKE_PADS: {
        name: "",
        price: "",
      },
      FRONT_BRAKE_DISCS: {
        name: "",
        price: "",
      },
      CALIPER_PIN_REPLACEMENT: {
        name: "",
        price: "",
      },
      DISC_TURNNING: {
        name: "",
        price: "",
      },
      HANDBRAKE_WIRE_REPLACEMENT: {
        name: "",
        price: "",
      },
      BRAKE_DRUMSTURNING: {
        name: "",
        price: "",
      },
      WHEEL_CYLINDER_REPLACEMENT: {
        name: "",
        price: "",
      },
    },
    AcServices: {
      REGULAR_AC_SERVICE: {
        name: "",
        price: "",
      },
      HIGH_PERFORMANCE_AC_SERVICE: {
        name: "",
        price: "",
      },
      COOLING_COIL_REPLACEMENT: {
        name: "",
        price: "",
      },
      CONDENSER_REPLACEMNT: {
        name: "",
        price: "",
      },
      COMPRESSOR_REPLACEMNT: {
        name: "",
        price: "",
      },
      HEATING_COIL_REPLACEMNT: {
        name: "",
        price: "",
      },
      V_BELT_REPLACEMNT: {
        name: "",
        price: "",
      },
      AC_BLOWER_MOTOR_REPLACEMNT: {
        name: "",
        price: "",
      },
      RADIATOR_REPLACEMNT: {
        name: "",
        price: "",
      },
      RADIATOR_FAN_MOTOR_REPLACEMNT: {
        name: "",
        price: "",
      },
      RADIATOR_FLUSH_AND_CLEAN: {
        name: "",
        price: "",
      },
    },
    BatteriesService: {
      AMARON_44_MONTHS_WARRANTY: {
        name: "",
        price: "",
      },
      AMARON_55_MONTHS_WARRANTY: {
        name: "",
        price: "",
      },
      AMARON_66_MONTHS_WARRANTY: {
        name: "",
        price: "",
      },
      EXIDE_44_MONTHS_WARRANTY: {
        name: "",
        price: "",
      },
      EXIDE_55_MONTHS_WARRANTY: {
        name: "",
        price: "",
      },
      EXIDE_66_MONTHS_WARRANTY: {
        name: "",
        price: "",
      },
      LIVGUARD_60_MONTHS_WARRANTY: {
        name: "",
        price: "",
      },
      LIVGUARD_72_MONTHS_WARRANTY: {
        name: "",
        price: "",
      },
      Alternator_Replacement: {
        name: "",
        price: "",
      },
      Alternator_Repair: {
        name: "",
        price: "",
      },
    },
    TyresAndWheelsCare: {
      APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H: {
        name: "",
        price: "",
      },
      APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T: {
        name: "",
        price: "",
      },
      MRF_ZVTS_Size_155_80_R13_79TL: {
        name: "",
        price: "",
      },
      MRF_ZLX_SIZE_165_80_R14_TL: {
        name: "",
        price: "",
      },
      MRF_SIZE_165_80_R14_85TL: {
        name: "",
        price: "",
      },
      MRF_ZVTY_SIZE_185_65_R15_88TL: {
        name: "",
        price: "",
      },
      JK_UX_ROYALE_SIZE_165_80_R14: {
        name: "",
        price: "",
      },
      BRIDGESTONE_B290_SIZE_165_80_R14_81S: {
        name: "",
        price: "",
      },
      BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V: {
        name: "",
        price: "",
      },
      BRIDGESTONE_B290_Size_155_80_R13_79S: {
        name: "",
        price: "",
      },
      CEAT_MILAZE_SIZE_165_80_R14_85S: {
        name: "",
        price: "",
      },
      CEAT_MILAZE_X3__SIZE_165_65_R15: {
        name: "",
        price: "",
      },
      CEAT_MILAZE_Size_155_80_R13: {
        name: "",
        price: "",
      },
      YOKOHAMA_Earth_1E400: {
        name: "",
        price: "",
      },
      COMPLETE_WHEEL_CARE: {
        name: "",
        price: "",
      },
      MUD_FLAPS: {
        name: "",
        price: "",
      },
    },
    DentingAndPainting: {
      FRONT_BUMBER_PAINT: {
        name: "",
        price: "",
      },
      BONNET_PAINT: {
        name: "",
        price: "",
      },
      REAR_BUMBER_PAINT: {
        name: "",
        price: "",
      },
      BOOT_PAINT: {
        name: "",
        price: "",
      },
      FULL_BODY_DENT_PAINT: {
        name: "",
        price: "",
      },
      ALLOY_PAINT: {
        name: "",
        price: "",
      },
      LEFT_FENDER_PAINT: {
        name: "",
        price: "",
      },
      LEFT_FRONT_DOOR_PAINT: {
        name: "",
        price: "",
      },
      LEFT_REAR_DOOR_PAINT: {
        name: "",
        price: "",
      },
      LEFT_QUARTER_PANEL_PAINT: {
        name: "",
        price: "",
      },
      LEFT_RUNNING_BOARD_PAINT: {
        name: "",
        price: "",
      },
      RIGHT_FENDER_PAINT: {
        name: "",
        price: "",
      },
      RIGHT_FRONT_DOOR_PAINT: {
        name: "",
        price: "",
      },
      RIGHT_REAR_DOOR_PAINT: {
        name: "",
        price: "",
      },
      RIGHT_QUARTER_PANEL_PAINT: {
        name: "",
        price: "",
      },
      RIGHT_RUNNING_BOARD_PAINT: {
        name: "",
        price: "",
      },
    },
    DetailsServicing: {
      _3M_CAR_RUBBING_POLISHING: {
        name: "",
        price: "",
      },
      CERAMIC_COATING: {
        name: "",
        price: "",
      },
      MEGUIARS_CERAMIC_COATING: {
        name: "",
        price: "",
      },
      MEGUIARS_TEFLON_COATING: {
        name: "",
        price: "",
      },
      _3M_TEFLON_COATING: {
        name: "",
        price: "",
      },
      PPF_PAINT_PROTECTION_FILM: {
        name: "",
        price: "",
      },
      ANTI_RUST_UNDERBODY_COATING: {
        name: "",
        price: "",
      },
      SILENCER_COATING: {
        name: "",
        price: "",
      },
    },
    CarSpaCleaning: {
      FESTIVAL_360_DEEP_CLEANING: {
        name: "",
        price: "",
      },
      CAR_INTERIOR_SPA: {
        name: "",
        price: "",
      },
      DEEP_ALL_ROUND_SPA: {
        name: "",
        price: "",
      },
      PREMIUM_TOP_WASH: {
        name: "",
        price: "",
      },
      CAR_RUBBING_POLISHING: {
        name: "",
        price: "",
      },
      RAT_PEST_REPELLENT_TREATMENT: {
        name: "",
        price: "",
      },
      CAR_INSPECTION_DIAGNOSTICS: {
        name: "",
        price: "",
      },
      SUNROOF_SERVICE: {
        name: "",
        price: "",
      },
    },
    CarInspections: {
      SECOND_HAND_CAR_INSPECTION: {
        name: "",
        price: "",
      },
      ROAD_TRIP_INSPECTION: {
        name: "",
        price: "",
      },
      ENGINE_SCANNING: {
        name: "",
        price: "",
      },
      COMPLETE_SUSPENSION_INSPECTION: {
        name: "",
        price: "",
      },
      CAR_FLUIDS_CHECK: {
        name: "",
        price: "",
      },
      RADIATOR_REPLACEMENT: {
        name: "",
        price: "",
      },
      RADIATOR_FAN_MOTOR_REPLACEMENT: {
        name: "",
        price: "",
      },
      RADIATOR_FLUSH_CLEAN: {
        name: "",
        price: "",
      },
      CAR_WATERLOG_ASSISTANCE: {
        name: "",
        price: "",
      },
      CAR_ENGINE_ISSUES: {
        name: "",
        price: "",
      },
      PROBLEM_WITH_CAR_BRAKES_WHEELS: {
        name: "",
        price: "",
      },
      DAMAGED_CAR_BODY_INTERIORS: {
        name: "",
        price: "",
      },
      Insurance_Claim_Inspection: {
        name: "",
        price: "",
      },
    },
    WindshielsLight: {
      FRONT_WINDSHIELD_REPLACEMENT: {
        name: "",
        price: "",
      },
      REAR_WINDSHIELD_REPLACEMENT: {
        name: "",
        price: "",
      },
      DOOR_GLASS_REPLACEMENT: {
        name: "",
        price: "",
      },
      FRONT_HEADLIGHT: {
        name: "",
        price: "",
      },
      REAR_TAILLIGHT: {
        name: "",
        price: "",
      },
      FOG_LIGHT: {
        name: "",
        price: "",
      },
      SIDE_MIRROR_REPLACEMENT: {
        name: "",
        price: "",
      },
    },
    SuspensionAndFitness: {
      ESP_MODULE_REPAIR: {
        name: "",
        price: "",
      },
      STEERING_RACK_REPAIR: {
        name: "",
        price: "",
      },
      FRONT_SHOCK_ABSORBER_REPLACEMENT: {
        name: "",
        price: "",
      },
      REAR_SHOCK_ABSORBER_REPLACEMENT: {
        name: "",
        price: "",
      },
      SUSPENSION_LOWER_ARM_REPLACEMENT: {
        name: "",
        price: "",
      },
      LINK_ROD_REPLACEMENT: {
        name: "",
        price: "",
      },
      TIE_ROAD_END_REPLACEMENT: {
        name: "",
        price: "",
      },
      COMPLETE_SUSPENSION_INSPECTION: {
        name: "",
        price: "",
      },
      FRONT_SHOCKER_MOUNT_REPLACEMENT: {
        name: "",
        price: "",
      },
      FRONT_AXLE_REPAIR: {
        name: "",
        price: "",
      },
      SILENCER_REPAIR: {
        name: "",
        price: "",
      },
      RADIATOR_REPLACEMENT: {
        name: "",
        price: "",
      },
      ENGINE_MOUNTING_REPLACEMENT: {
        name: "",
        price: "",
      },
      GEAR_BOX_MOUNTING_REPLACEMENT: {
        name: "",
        price: "",
      },
      FUEL_PUMP_REPLACEMENT: {
        name: "",
        price: "",
      },
      RADIATOR_FAN_MOTOR_REPLACEMENT: {
        name: "",
        price: "",
      },
      WATER_PUMP_REPLACEMENT: {
        name: "",
        price: "",
      },
      ECM_REPAIR: {
        name: "",
        price: "",
      },
      PREMIUM_TOP_WASH: {
        name: "",
        price: "",
      },
      DICKEY_SHOCKER_REPLACEMENT: {
        name: "",
        price: "",
      },
      START_MOTOR_REPAIR: {
        name: "",
        price: "",
      },
      MUD_FLAPS: {
        name: "",
        price: "",
      },
      DOOR_LATCH_REPLACEMENT: {
        name: "",
        price: "",
      },
      POWER_WINDOW_REPAIR: {
        name: "",
        price: "",
      },
      NOISES_WITH_CAR_SUSPENSION_STEERING: {
        name: "",
        price: "",
      },
      FAULTY_ELECTRICALS: {
        name: "",
        price: "",
      },
    },
    ClutchBodyParts: {
      CLUTCH_SET_REPLACEMENT: {
        name: "",
        price: "",
      },
      FLYWHEEL_REPLACEMENT: {
        name: "",
        price: "",
      },
      CLUTCH_BEARING_REPLACEMENT: {
        name: "",
        price: "",
      },
      FLYWHEEL_TURNING: {
        name: "",
        price: "",
      },
      CLUTCH_OVERHAUL: {
        name: "",
        price: "",
      },
      FRONT_BUMBER_REPLACEMENT: {
        name: "",
        price: "",
      },
      REAR_BUMPER_REPLACEMENT: {
        name: "",
        price: "",
      },
      RIGHT_FRONT_DOOR_REPLACEMENT: {
        name: "",
        price: "",
      },
      RIGHT_REAR_DOOR_REPLACEMENT: {
        name: "",
        price: "",
      },
      FENDER_REPLACEMENT: {
        name: "",
        price: "",
      },
      BOOT_REPLACEMENT: {
        name: "",
        price: "",
      },
      BONNET_REPLACEMENT: {
        name: "",
        price: "",
      },
      LEFT_FRONT_DOOR_REPLACEMENT: {
        name: "",
        price: "",
      },
      LEFT_REAR_DOOR_REPLACEMENT: {
        name: "",
        price: "",
      },
      CLUTCH_TRANSMISSION_TROUBLES: {
        name: "",
        price: "",
      },
      ABS_ISSUE: {
        name: "",
        price: "",
      },
      SONY_GO_ECO_ASX_A410BT: {
        name: "",
        price: "",
      },
      SONY_GO_X_XAV_1500: {
        name: "",
        price: "",
      },
      SONY_GO_PLAY_XAV_ASX5500: {
        name: "",
        price: "",
      },
      SONY_GO_PLAY_XAV_AX7000: {
        name: "",
        price: "",
      },
    },
    InsuranceAndClaims: {
      KNOW_YOUR_POLICY: {
        name: "",
        price: "",
      },
      ACCIDENTAL_DENTING_PAINTING_INSURANCE: {
        name: "",
        price: "",
      },
      CAR_FLOOD_DAMAGE_INSURANCE: {
        name: "",
        price: "",
      },
      FIRE_DAMAGE_ASSISTANCE_INSURANCE: {
        name: "",
        price: "",
      },
      WINDSHIELD_REPLACEMENT_INSURANCE: {
        name: "",
        price: "",
      },
      KEY_REPLACEMENT_INSURANCE: {
        name: "",
        price: "",
      },
      TYRES_WHEEL_REPLACEMENT_INSURANCE: {
        name: "",
        price: "",
      },
      BATTERY_REPLACEMENT_INSURANCE: {
        name: "",
        price: "",
      },
      CAR_THEFT_CLAIM_INSURANCE: {
        name: "",
        price: "",
      },
      ECM_REPLACEMENT_INSURANCE: {
        name: "",
        price: "",
      },
      DOORSTEP_ACCIDENT_INSPECTION: {
        name: "",
        price: "",
      },
      TOWING_INSURANCE: {
        name: "",
        price: "",
      },
      INSURANCE_CLAIM_INSPECTION: {
        name: "",
        price: "",
      },
    },
    SOS_Services: {
      BATTERY_JUMPSTART: {
        name: "",
        price: "",
      },
      CAR_FLUID_LEAKAGE: {
        name: "",
        price: "",
      },
      CAR_ENGINE_SCANNING: {
        name: "",
        price: "",
      },
      WHEEL_LIFT_TOW_20_KMS: {
        name: "",
        price: "",
      },
      CAR_SELF_STARTER_ISSUE: {
        name: "",
        price: "",
      },
      FLAT_BED_TOW_20KM: {
        name: "",
        price: "",
      },
      CLUTCH_BREAKDOWN: {
        name: "",
        price: "",
      },
      INSURANCE_ACCIDENT: {
        name: "",
        price: "",
      },
      CAR_FLOODING: {
        name: "",
        price: "",
      },
      BRAKE_FAILURE: {
        name: "",
        price: "",
      },
      CRITICAL_DASHBOARD_LIGHT: {
        name: "",
        price: "",
      },
      WRONG_FUEL_EMERGENCY: {
        name: "",
        price: "",
      },
    },
  });
  const [locationOptions, setLocationOptions] = useState([]);
  const handleRemoveLocation = (location) => {
    setFormData((prevData) => ({
      ...prevData,
      locations: prevData.locations.filter((loc) => loc !== location),
    }));
  };
  const handleInputChange = (e, section, subSection) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (section && subSection) {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [subSection]: {
              ...prevData[section][subSection],
              [name]: value,
            },
          },
        };
      } else {
        const updatedName = section === "modelName" ? "model" : name;
        return {
          ...prevData,
          [updatedName]: value,
        };
      }
    });
  };
  useEffect(() => {
    const getServiceByModelId = () => {
      axios
        .get(
          `https://gocarsmithbackend.onrender.com/api/admin/getServicesByModelIdAndFuelType/${locations}/${modelId}/${fuelType}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          response.data.map((echMap) => setFormData(echMap));
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching car models:", error);
        });
    };
    getServiceByModelId();
  }, [modelId, locations, fuelType]);
  const onClickChanges = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://gocarsmithbackend.onrender.com/api/admin/updateCarServiceByUsingModelIdAndLocationsAndFuelType/${locations}/${modelId}/${fuelType}`,
        formData,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setEditMode(false);
        if (response) {
          axios
            .get(
              `https://gocarsmithbackend.onrender.com/api/admin/getServicesByModelIdAndFuelType/${locations}/${modelId}/${fuelType}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              response.data.map(
                (echMap) => (setFormData(echMap), console.log(echMap))
              );
              console.log(response.data);
            })
            .catch((error) => {
              console.error("Error fetching car models:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error updating service:", error);
      });
  };
//   const closeForm = () => {
//     // Implement your close form logic here
//     console.log("Form closed");
//   };
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "45px" }}>
        <Container>
          <h1>To Add Models</h1>
          <Form onSubmit={onClickChanges}>
            <Row className="mb-3">
              <Col lg={4}>
                <Form.Group
                  as={Row}
                  controlId="modelId"
                  style={{ marginBottom: "4px" }}
                >
                  <Col lg={4}>
                    <Form.Label>Model ID:</Form.Label>
                  </Col>
                  <Col lg={8}>
                    <Form.Control
                      name="modelId"
                      value={formData.modelId._id}
                      onChange={(e) => handleInputChange(e, "modelId")}
                      type="text"
                      placeholder="Enter Model ID"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group
                  as={Row}
                  controlId="model"
                  style={{ marginBottom: "4px" }}
                >
                  <Col lg={4}>
                    <Form.Label>Model Name:</Form.Label>
                  </Col>
                  <Col lg={8}>
                    <Form.Control
                      name="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange(e, "model")}
                      type="text"
                      placeholder="Enter Model Name"
                    />
                  </Col>
                </Form.Group>
              </Col>

              
              <Col lg={4}>
  <Form.Group
    as={Row}
    controlId="fuelType"
    style={{ marginBottom: "4px" }}
  >
    <Col lg={4}>
      <Form.Label>Fuel Type:</Form.Label>
    </Col>
    <Col lg={8}>
      <Form.Control
        value={formData.fuelType}
        name="fuelType"
        onChange={handleInputChange}
         readOnly
      />
    </Col>
  </Form.Group>
</Col>
<Col lg={4}>
                <Form.Group as={Row} controlId="location" className="mb-3">
                  <Col lg={4}>
                    <Form.Label className="mb-2" style={{ fontWeight: "bold" }}>
                      Location:
                    </Form.Label>
                  </Col>
                  <Col lg={8}>
                    <Select
                      fullWidth
                      label="Location"
                      name="locations"
                      multiple
                      variant="outlined"
                      style={{
                        width: "70%",
                        display: "inline-block",
                        marginLeft: "5px",
                      }}
                      value={formData.locations}
                      onChange={handleInputChange}
                    >
                      {locationOptions.map((option) => (
                        <MenuItem key={option._id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>

                    {formData.locations.map((location, index) => (
                      <Chip
                        key={index}
                        label={location}
                        onDelete={() => handleRemoveLocation(location)}
                        style={{ margin: "4px" }}
                      />
                    ))}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <h2>PERIODIC SERVICES</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <h5>Scheduled Packages</h5>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "BASIC_SERVICE"
                          )
                        }
                        type="text"
                        placeholder="BASIC_SERVICE"
                        name="name"
                        value={formData.PeriodicServices.BASIC_SERVICE.name}
                      />
                    </Col>
                    <Col lg={4}>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "BASIC_SERVICE"
                          )
                        }
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.PeriodicServices.BASIC_SERVICE.price}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "STANDARD_SERVICE"
                          )
                        }
                        type="text"
                        name="name"
                        placeholder="STANDARD_SERVICE"
                        value={formData.PeriodicServices.STANDARD_SERVICE.name}
                      />
                    </Col>

                    <Col lg={4}>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "STANDARD_SERVICE"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={formData.PeriodicServices.STANDARD_SERVICE.price}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "COMPREHENSIVE_SERVICE"
                          )
                        }
                        type="text"
                        placeholder="COMPREHENSIVE_SERVICE"
                        value={
                          formData.PeriodicServices.COMPREHENSIVE_SERVICE.name
                        }
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "COMPREHENSIVE_SERVICE"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.PeriodicServices.COMPREHENSIVE_SERVICE.price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <h5>BRAKE MAINTENANCE</h5>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "FRONT_BRAKE_PADS"
                          )
                        }
                        type="text"
                        placeholder="FRONT_BRAKE_PADS"
                        value={formData.PeriodicServices.FRONT_BRAKE_PADS.name}
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "FRONT_BRAKE_PADS"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={formData.PeriodicServices.FRONT_BRAKE_PADS.price}
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "REAR_BRAKE_PADS"
                          )
                        }
                        type="text"
                        placeholder="REAR_BRAKE_PADS"
                        value={formData.PeriodicServices.REAR_BRAKE_PADS.name}
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "REAR_BRAKE_PADS"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={formData.PeriodicServices.REAR_BRAKE_PADS.price}
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "FRONT_BRAKE_DISCS"
                          )
                        }
                        type="text"
                        placeholder="FRONT_BRAKE_DISCS"
                        value={formData.PeriodicServices.FRONT_BRAKE_DISCS.name}
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "FRONT_BRAKE_DISCS"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.PeriodicServices.FRONT_BRAKE_DISCS.price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "CALIPER_PIN_REPLACEMENT"
                          )
                        }
                        type="text"
                        placeholder="CALIPER_PIN_REPLACEMENT"
                        value={
                          formData.PeriodicServices.CALIPER_PIN_REPLACEMENT.name
                        }
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "CALIPER_PIN_REPLACEMENT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.PeriodicServices.CALIPER_PIN_REPLACEMENT
                            .price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "DISC_TURNNING"
                          )
                        }
                        type="text"
                        placeholder="DISC_TURNNING"
                        value={formData.PeriodicServices.DISC_TURNNING.name}
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "DISC_TURNNING"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={formData.PeriodicServices.DISC_TURNNING.price}
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "HANDBRAKE_WIRE_REPLACEMENT"
                          )
                        }
                        type="text"
                        placeholder="HANDBRAKE_WIRE_REPLACEMENT"
                        value={
                          formData.PeriodicServices.HANDBRAKE_WIRE_REPLACEMENT
                            .name
                        }
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "HANDBRAKE_WIRE_REPLACEMENT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.PeriodicServices.HANDBRAKE_WIRE_REPLACEMENT
                            .price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "BRAKE_DRUMSTURNING"
                          )
                        }
                        type="text"
                        placeholder="BRAKE_DRUMSTURNING"
                        value={
                          formData.PeriodicServices.BRAKE_DRUMSTURNING.name
                        }
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "BRAKE_DRUMSTURNING"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.PeriodicServices.BRAKE_DRUMSTURNING.price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "WHEEL_CYLINDER_REPLACEMENT"
                          )
                        }
                        type="text"
                        placeholder="WHEEL_CYLINDER_REPLACEMENT"
                        value={
                          formData.PeriodicServices.WHEEL_CYLINDER_REPLACEMENT
                            .name
                        }
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "PeriodicServices",
                            "WHEEL_CYLINDER_REPLACEMENT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.PeriodicServices.WHEEL_CYLINDER_REPLACEMENT
                            .price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Row>
            <Row className="mb-3">
              <h2>AC SERVICES</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <h5>Service Package</h5>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "REGULAR_AC_SERVICE"
                          )
                        }
                        type="text"
                        placeholder="REGULAR_AC_SERVICE"
                        name="name"
                        value={formData.AcServices.REGULAR_AC_SERVICE.name}
                      />
                    </Col>
                    <Col lg={4}>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "REGULAR_AC_SERVICE"
                          )
                        }
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.AcServices.REGULAR_AC_SERVICE.price}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "HIGH_PERFORMANCE_AC_SERVICE"
                          )
                        }
                        type="text"
                        name="name"
                        placeholder="HIGH_PERFORMANCE_AC_SERVICE"
                        value={
                          formData.AcServices.HIGH_PERFORMANCE_AC_SERVICE.name
                        }
                      />
                    </Col>

                    <Col lg={4}>
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "HIGH_PERFORMANCE_AC_SERVICE"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={
                          formData.AcServices.HIGH_PERFORMANCE_AC_SERVICE.price
                        }
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "COOLING_COIL_REPLACEMENT"
                          )
                        }
                        type="text"
                        placeholder="COOLING_COIL_REPLACEMENT"
                        value={
                          formData.AcServices.COOLING_COIL_REPLACEMENT.name
                        }
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "COOLING_COIL_REPLACEMENT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.AcServices.COOLING_COIL_REPLACEMENT.price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <h5>AC FITMENTS</h5>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "CONDENSER_REPLACEMNT"
                          )
                        }
                        type="text"
                        placeholder="CONDENSER_REPLACEMNT"
                        value={formData.AcServices.CONDENSER_REPLACEMNT.name}
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "CONDENSER_REPLACEMNT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={formData.AcServices.CONDENSER_REPLACEMNT.price}
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "COMPRESSOR_REPLACEMNT"
                          )
                        }
                        type="text"
                        placeholder="COMPRESSOR_REPLACEMNT"
                        value={formData.AcServices.COMPRESSOR_REPLACEMNT.name}
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "COMPRESSOR_REPLACEMNT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={formData.AcServices.COMPRESSOR_REPLACEMNT.price}
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "HEATING_COIL_REPLACEMNT"
                          )
                        }
                        type="text"
                        placeholder="FRONT_BRAKEHEATING_COIL_REPLACEMNT_DISCS"
                        value={formData.AcServices.HEATING_COIL_REPLACEMNT.name}
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "HEATING_COIL_REPLACEMNT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.AcServices.HEATING_COIL_REPLACEMNT.price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "V_BELT_REPLACEMNT"
                          )
                        }
                        type="text"
                        placeholder="V_BELT_REPLACEMNT"
                        value={formData.AcServices.V_BELT_REPLACEMNT.name}
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "V_BELT_REPLACEMNT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={formData.AcServices.V_BELT_REPLACEMNT.price}
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "AC_BLOWER_MOTOR_REPLACEMNT"
                          )
                        }
                        type="text"
                        placeholder="AC_BLOWER_MOTOR_REPLACEMNT"
                        value={
                          formData.AcServices.AC_BLOWER_MOTOR_REPLACEMNT.name
                        }
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "AC_BLOWER_MOTOR_REPLACEMNT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.AcServices.AC_BLOWER_MOTOR_REPLACEMNT.price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "RADIATOR_REPLACEMNT"
                          )
                        }
                        type="text"
                        placeholder="RADIATOR_REPLACEMNT"
                        value={formData.AcServices.RADIATOR_REPLACEMNT.name}
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "RADIATOR_REPLACEMNT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={formData.AcServices.RADIATOR_REPLACEMNT.price}
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "RADIATOR_FAN_MOTOR_REPLACEMNT"
                          )
                        }
                        type="text"
                        placeholder="RADIATOR_FAN_MOTOR_REPLACEMNT"
                        value={
                          formData.AcServices.RADIATOR_FAN_MOTOR_REPLACEMNT.name
                        }
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "RADIATOR_FAN_MOTOR_REPLACEMNT"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.AcServices.RADIATOR_FAN_MOTOR_REPLACEMNT
                            .price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                    <Col lg={8}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "RADIATOR_FLUSH_AND_CLEAN"
                          )
                        }
                        type="text"
                        placeholder="RADIATOR_FLUSH_AND_CLEAN"
                        value={
                          formData.AcServices.RADIATOR_FLUSH_AND_CLEAN.name
                        }
                        name="name"
                      />
                    </Col>
                    <Col lg={4}>
                      {" "}
                      <Form.Control
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "AcServices",
                            "RADIATOR_FLUSH_AND_CLEAN"
                          )
                        }
                        type="number"
                        placeholder="Price"
                        value={
                          formData.AcServices.RADIATOR_FLUSH_AND_CLEAN.price
                        }
                        name="price"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Row>
            <Row className="mb-3">
              <h2>BATTERIES</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <Row className="mb-3">
                  <h5>AMARON</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "AMARON_44_MONTHS_WARRANTY"
                            )
                          }
                          type="text"
                          placeholder="AMARON_44_MONTHS_WARRANTY"
                          value={
                            formData.BatteriesService.AMARON_44_MONTHS_WARRANTY
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "AMARON_44_MONTHS_WARRANTY"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService.AMARON_44_MONTHS_WARRANTY
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "AMARON_55_MONTHS_WARRANTY"
                            )
                          }
                          type="text"
                          placeholder="AMARON_55_MONTHS_WARRANTY"
                          value={
                            formData.BatteriesService.AMARON_55_MONTHS_WARRANTY
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "AMARON_55_MONTHS_WARRANTY"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService.AMARON_55_MONTHS_WARRANTY
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "AMARON_66_MONTHS_WARRANTY"
                            )
                          }
                          type="text"
                          placeholder="AMARON_66_MONTHS_WARRANTY"
                          value={
                            formData.BatteriesService.AMARON_66_MONTHS_WARRANTY
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "AMARON_66_MONTHS_WARRANTY"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService.AMARON_66_MONTHS_WARRANTY
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>EXIDE</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "EXIDE_44_MONTHS_WARRANTY"
                            )
                          }
                          type="text"
                          placeholder="EXIDE_44_MONTHS_WARRANTY"
                          value={
                            formData.BatteriesService.EXIDE_44_MONTHS_WARRANTY
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "EXIDE_44_MONTHS_WARRANTY"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService.EXIDE_44_MONTHS_WARRANTY
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "EXIDE_55_MONTHS_WARRANTY"
                            )
                          }
                          type="text"
                          placeholder="EXIDE_55_MONTHS_WARRANTY"
                          value={
                            formData.BatteriesService.EXIDE_55_MONTHS_WARRANTY
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "EXIDE_55_MONTHS_WARRANTY"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService.EXIDE_55_MONTHS_WARRANTY
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "EXIDE_66_MONTHS_WARRANTY"
                            )
                          }
                          type="text"
                          placeholder="EXIDE_66_MONTHS_WARRANTY"
                          value={
                            formData.BatteriesService.EXIDE_66_MONTHS_WARRANTY
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "EXIDE_66_MONTHS_WARRANTY"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService.EXIDE_66_MONTHS_WARRANTY
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>LIVGUARD</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "LIVGUARD_60_MONTHS_WARRANTY"
                            )
                          }
                          type="text"
                          placeholder="LIVGUARD_60_MONTHS_WARRANTY"
                          value={
                            formData.BatteriesService
                              .LIVGUARD_60_MONTHS_WARRANTY.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "LIVGUARD_60_MONTHS_WARRANTY"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService
                              .LIVGUARD_60_MONTHS_WARRANTY.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "LIVGUARD_72_MONTHS_WARRANTY"
                            )
                          }
                          type="text"
                          placeholder="LIVGUARD_72_MONTHS_WARRANTY"
                          value={
                            formData.BatteriesService
                              .LIVGUARD_72_MONTHS_WARRANTY.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "LIVGUARD_72_MONTHS_WARRANTY"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService
                              .LIVGUARD_72_MONTHS_WARRANTY.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>ALTERNATOR</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "Alternator_Replacement"
                            )
                          }
                          type="text"
                          placeholder="Alternator_Replacement"
                          value={
                            formData.BatteriesService.Alternator_Replacement
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "Alternator_Replacement"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService.Alternator_Replacement
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "Alternator_Repair"
                            )
                          }
                          type="text"
                          placeholder="Alternator_Repair"
                          value={
                            formData.BatteriesService.Alternator_Repair.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "BatteriesService",
                              "Alternator_Repair"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.BatteriesService.Alternator_Repair.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            </Row>
            <Row className="mb-3">
              <h2>TYRES & WHEEL CARE</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <Row className="mb-3">
                  <h5>APOLLO</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H"
                            )
                          }
                          type="text"
                          placeholder="APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H"
                          value={
                            formData.TyresAndWheelsCare
                              .APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare
                              .APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T"
                            )
                          }
                          type="text"
                          placeholder="AMARON_44_MONTHS_WARRAAPOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88TNTY"
                          value={
                            formData.TyresAndWheelsCare
                              .APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare
                              .APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>MRF</h5>
                  {/* <Col lg={4}><Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={8}>  <Form.Control
                                        onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "MRF_ZVTS_Size_155_80_R13_79TL")}
                                        type="text"
                                        placeholder="MRF_ZVTS_Size_155_80_R13_79TL"
                                        value={formData.TyresAndWheelsCare.MRF_ZVTS_Size_155_80_R13_79TL.name}
                                        name='name'
                                    /></Col>
                                    <Col lg={4}> <Form.Control
                                        onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "MRF_ZVTS_Size_155_80_R13_79TL")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.MRF_ZVTS_Size_155_80_R13_79TL.price}
                                        name='price'
                                    /></Col>
                                </Form.Group></Col> */}
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "MRF_ZLX_SIZE_165_80_R14_TL"
                            )
                          }
                          type="text"
                          placeholder="MRF_ZLX_SIZE_165_80_R14_TL"
                          value={
                            formData.TyresAndWheelsCare
                              .MRF_ZLX_SIZE_165_80_R14_TL.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "MRF_ZLX_SIZE_165_80_R14_TL"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare
                              .MRF_ZLX_SIZE_165_80_R14_TL.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "MRF_SIZE_165_80_R14_85TL"
                            )
                          }
                          type="text"
                          placeholder="MRF_SIZE_165_80_R14_85TL"
                          value={
                            formData.TyresAndWheelsCare.MRF_SIZE_165_80_R14_85TL
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "MRF_SIZE_165_80_R14_85TL"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare.MRF_SIZE_165_80_R14_85TL
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "MRF_ZVTY_SIZE_185_65_R15_88TL"
                            )
                          }
                          type="text"
                          placeholder="MRF_ZVTY_SIZE_185_65_R15_88TL"
                          value={
                            formData.TyresAndWheelsCare
                              .MRF_ZVTY_SIZE_185_65_R15_88TL.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "MRF_ZVTY_SIZE_185_65_R15_88TL"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare
                              .MRF_ZVTY_SIZE_185_65_R15_88TL.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>JK</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "JK_UX_ROYALE_SIZE_165_80_R14"
                            )
                          }
                          type="text"
                          placeholder="JK_UX_ROYALE_SIZE_165_80_R14"
                          value={
                            formData.TyresAndWheelsCare
                              .JK_UX_ROYALE_SIZE_165_80_R14.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "JK_UX_ROYALE_SIZE_165_80_R14"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare
                              .JK_UX_ROYALE_SIZE_165_80_R14.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>BRIDGESTONE</h5>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "BRIDGESTONE_B290_SIZE_165_80_R14_81S"
                            )
                          }
                          type="text"
                          placeholder="BRIDGESTONE_B290_SIZE_165_80_R14_81S"
                          value={
                            formData.TyresAndWheelsCare
                              .BRIDGESTONE_B290_SIZE_165_80_R14_81S.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "BRIDGESTONE_B290_SIZE_165_80_R14_81S"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare
                              .BRIDGESTONE_B290_SIZE_165_80_R14_81S.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V"
                            )
                          }
                          type="text"
                          placeholder="BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V"
                          value={
                            formData.TyresAndWheelsCare
                              .BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare
                              .BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  {/* <Col lg={4}><Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={8}>  <Form.Control
                                        onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "BRIDGESTONE_B290_Size_155_80_R13_79S")}
                                        type="text"
                                        placeholder="BRIDGESTONE_B290_Size_155_80_R13_79S"
                                        value={formData.TyresAndWheelsCare.BRIDGESTONE_B290_Size_155_80_R13_79S.name}
                                        name='name'
                                    /></Col>
                                    <Col lg={4}> <Form.Control
                                        onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "BRIDGESTONE_B290_Size_155_80_R13_79S")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.BRIDGESTONE_B290_Size_155_80_R13_79S.price}
                                        name='price'
                                    /></Col>
                                </Form.Group></Col> */}
                </Row>
                <Row className="mb-3">
                  <h5>CEAT</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "CEAT_MILAZE_SIZE_165_80_R14_85S"
                            )
                          }
                          type="text"
                          placeholder="CEAT_MILAZE_SIZE_165_80_R14_85S"
                          value={
                            formData.TyresAndWheelsCare
                              .CEAT_MILAZE_SIZE_165_80_R14_85S.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "CEAT_MILAZE_SIZE_165_80_R14_85S"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare
                              .CEAT_MILAZE_SIZE_165_80_R14_85S.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "CEAT_MILAZE_X3__SIZE_165_65_R15"
                            )
                          }
                          type="text"
                          placeholder="CEAT_MILAZE_X3__SIZE_165_65_R15"
                          value={
                            formData.TyresAndWheelsCare
                              .CEAT_MILAZE_X3__SIZE_165_65_R15.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "CEAT_MILAZE_X3__SIZE_165_65_R15"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare
                              .CEAT_MILAZE_X3__SIZE_165_65_R15.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  {/* <Col lg={4}><Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={8}>  <Form.Control
                                        onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "CEAT_MILAZE_Size_155_80_R13")}
                                        type="text"
                                        placeholder="CEAT_MILAZE_Size_155_80_R13"
                                        value={formData.TyresAndWheelsCare.CEAT_MILAZE_Size_155_80_R13.name}
                                        name='name'
                                    /></Col>
                                    <Col lg={4}> <Form.Control
                                        onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "CEAT_MILAZE_Size_155_80_R13")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.CEAT_MILAZE_Size_155_80_R13.price}
                                        name='price'
                                    /></Col>
                                </Form.Group></Col> */}
                </Row>
                <Row className="mb-3">
                  <h5>YOKOHAMA</h5>
                  {/* <Col lg={4}><Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={8}>  <Form.Control
                                        onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "YOKOHAMA_Earth_1E400")}
                                        type="text"
                                        placeholder="YOKOHAMA_Earth_1E400"
                                        value={formData.TyresAndWheelsCare.YOKOHAMA_Earth_1E400.name}
                                        name='name'
                                    /></Col>
                                    <Col lg={4}> <Form.Control
                                        onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "YOKOHAMA_Earth_1E400")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.YOKOHAMA_Earth_1E400.price}
                                        name='price'
                                    /></Col>
                                </Form.Group></Col> */}
                </Row>
                <Row className="mb-3">
                  <h5>WHEEL CARE SERVICES</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "COMPLETE_WHEEL_CARE"
                            )
                          }
                          type="text"
                          placeholder="COMPLETE_WHEEL_CARE"
                          value={
                            formData.TyresAndWheelsCare.COMPLETE_WHEEL_CARE.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "COMPLETE_WHEEL_CARE"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.TyresAndWheelsCare.COMPLETE_WHEEL_CARE
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "MUD_FLAPS"
                            )
                          }
                          type="text"
                          placeholder="MUD_FLAPS"
                          value={formData.TyresAndWheelsCare.MUD_FLAPS.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "TyresAndWheelsCare",
                              "MUD_FLAPS"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.TyresAndWheelsCare.MUD_FLAPS.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            </Row>
            <Row className="mb-3">
              <h2>DENTING & PAINTING</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <Row className="mb-3">
                  <h5>FRONT SIDE</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "FRONT_BUMBER_PAINT"
                            )
                          }
                          type="text"
                          placeholder="FRONT_BUMBER_PAINT"
                          value={
                            formData.DentingAndPainting.FRONT_BUMBER_PAINT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "FRONT_BUMBER_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.FRONT_BUMBER_PAINT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "BONNET_PAINT"
                            )
                          }
                          type="text"
                          placeholder="BONNET_PAINT"
                          value={formData.DentingAndPainting.BONNET_PAINT.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "BONNET_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.DentingAndPainting.BONNET_PAINT.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>REAR SIDE</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "REAR_BUMBER_PAINT"
                            )
                          }
                          type="text"
                          placeholder="REAR_BUMBER_PAINT"
                          value={
                            formData.DentingAndPainting.REAR_BUMBER_PAINT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "REAR_BUMBER_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.REAR_BUMBER_PAINT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "BOOT_PAINT"
                            )
                          }
                          type="text"
                          placeholder="BOOT_PAINT"
                          value={formData.DentingAndPainting.BOOT_PAINT.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "BOOT_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.DentingAndPainting.BOOT_PAINT.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>WHOLE BODY</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "FULL_BODY_DENT_PAINT"
                            )
                          }
                          type="text"
                          placeholder="FULL_BODY_DENT_PAINT"
                          value={
                            formData.DentingAndPainting.FULL_BODY_DENT_PAINT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "FULL_BODY_DENT_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.FULL_BODY_DENT_PAINT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "ALLOY_PAINT"
                            )
                          }
                          type="text"
                          placeholder="ALLOY_PAINT"
                          value={formData.DentingAndPainting.ALLOY_PAINT.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "ALLOY_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.DentingAndPainting.ALLOY_PAINT.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>LEFT SIDE</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_FENDER_PAINT"
                            )
                          }
                          type="text"
                          placeholder="LEFT_FENDER_PAINT"
                          value={
                            formData.DentingAndPainting.LEFT_FENDER_PAINT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_FENDER_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.LEFT_FENDER_PAINT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_FRONT_DOOR_PAINT"
                            )
                          }
                          type="text"
                          placeholder="LEFT_FRONT_DOOR_PAINT"
                          value={
                            formData.DentingAndPainting.LEFT_FRONT_DOOR_PAINT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_FRONT_DOOR_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.LEFT_FRONT_DOOR_PAINT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_REAR_DOOR_PAINT"
                            )
                          }
                          type="text"
                          placeholder="LEFT_REAR_DOOR_PAINT"
                          value={
                            formData.DentingAndPainting.LEFT_REAR_DOOR_PAINT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_REAR_DOOR_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.LEFT_REAR_DOOR_PAINT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_QUARTER_PANEL_PAINT"
                            )
                          }
                          type="text"
                          placeholder="LEFT_QUARTER_PANEL_PAINT"
                          value={
                            formData.DentingAndPainting.LEFT_QUARTER_PANEL_PAINT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_QUARTER_PANEL_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.LEFT_QUARTER_PANEL_PAINT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_RUNNING_BOARD_PAINT"
                            )
                          }
                          type="text"
                          placeholder="LEFT_RUNNING_BOARD_PAINT"
                          value={
                            formData.DentingAndPainting.LEFT_RUNNING_BOARD_PAINT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "LEFT_RUNNING_BOARD_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.LEFT_RUNNING_BOARD_PAINT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>RIGHT SIDE</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_FENDER_PAINT"
                            )
                          }
                          type="text"
                          placeholder="RIGHT_FENDER_PAINT"
                          value={
                            formData.DentingAndPainting.RIGHT_FENDER_PAINT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_FENDER_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.RIGHT_FENDER_PAINT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_FRONT_DOOR_PAINT"
                            )
                          }
                          type="text"
                          placeholder="RIGHT_FRONT_DOOR_PAINT"
                          value={
                            formData.DentingAndPainting.RIGHT_FRONT_DOOR_PAINT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_FRONT_DOOR_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.RIGHT_FRONT_DOOR_PAINT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_REAR_DOOR_PAINT"
                            )
                          }
                          type="text"
                          placeholder="RIGHT_REAR_DOOR_PAINT"
                          value={
                            formData.DentingAndPainting.RIGHT_REAR_DOOR_PAINT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_REAR_DOOR_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting.RIGHT_REAR_DOOR_PAINT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_QUARTER_PANEL_PAINT"
                            )
                          }
                          type="text"
                          placeholder="RIGHT_QUARTER_PANEL_PAINT"
                          value={
                            formData.DentingAndPainting
                              .RIGHT_QUARTER_PANEL_PAINT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_QUARTER_PANEL_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting
                              .RIGHT_QUARTER_PANEL_PAINT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_RUNNING_BOARD_PAINT"
                            )
                          }
                          type="text"
                          placeholder="RIGHT_RUNNING_BOARD_PAINT"
                          value={
                            formData.DentingAndPainting
                              .RIGHT_RUNNING_BOARD_PAINT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DentingAndPainting",
                              "RIGHT_RUNNING_BOARD_PAINT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DentingAndPainting
                              .RIGHT_RUNNING_BOARD_PAINT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            </Row>
            <Row className="mb-3">
              <h2>DETAILING SERVICES</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <Row className="mb-3">
                  <h5>POLISING</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "_3M_CAR_RUBBING_POLISHING"
                            )
                          }
                          type="text"
                          placeholder="_3M_CAR_RUBBING_POLISHING"
                          value={
                            formData.DetailsServicing._3M_CAR_RUBBING_POLISHING
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "_3M_CAR_RUBBING_POLISHING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DetailsServicing._3M_CAR_RUBBING_POLISHING
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <h5>CERAMIC COATING</h5>
                <Row className="mb-3">
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "CERAMIC_COATING"
                            )
                          }
                          type="text"
                          placeholder="CERAMIC_COATING"
                          value={formData.DetailsServicing.CERAMIC_COATING.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "CERAMIC_COATING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DetailsServicing.CERAMIC_COATING.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "MEGUIARS_CERAMIC_COATING"
                            )
                          }
                          type="text"
                          placeholder="MEGUIARS_CERAMIC_COATING"
                          value={
                            formData.DetailsServicing.MEGUIARS_CERAMIC_COATING
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "MEGUIARS_CERAMIC_COATING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DetailsServicing.MEGUIARS_CERAMIC_COATING
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>TEFLON COATING</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "MEGUIARS_TEFLON_COATING"
                            )
                          }
                          type="text"
                          placeholder="MEGUIARS_TEFLON_COATING"
                          value={
                            formData.DetailsServicing.MEGUIARS_TEFLON_COATING
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "MEGUIARS_TEFLON_COATING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DetailsServicing.MEGUIARS_TEFLON_COATING
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "_3M_TEFLON_COATING"
                            )
                          }
                          type="text"
                          placeholder="_3M_TEFLON_COATING"
                          value={
                            formData.DetailsServicing._3M_TEFLON_COATING.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "_3M_TEFLON_COATING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DetailsServicing._3M_TEFLON_COATING.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>PPF</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "PPF_PAINT_PROTECTION_FILM"
                            )
                          }
                          type="text"
                          placeholder="PPF_PAINT_PROTECTION_FILM"
                          value={
                            formData.DetailsServicing.PPF_PAINT_PROTECTION_FILM
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "PPF_PAINT_PROTECTION_FILM"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DetailsServicing.PPF_PAINT_PROTECTION_FILM
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>ANTI RUST COATING</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      {formData.DetailsServicing
                        .ANTI_RUST_UNDERBODY_COATING && ( // Check if details are present
                        <>
                          <Col lg={8}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "DetailsServicing",
                                  "ANTI_RUST_UNDERBODY_COATING",
                                  "name"
                                )
                              }
                              type="text"
                              placeholder="ANTI_RUST_UNDERBODY_COATING"
                              value={
                                formData.DetailsServicing
                                  .ANTI_RUST_UNDERBODY_COATING.name
                              }
                              name="name"
                            />
                          </Col>
                          <Col lg={4}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "DetailsServicing",
                                  "ANTI_RUST_UNDERBODY_COATING",
                                  "price"
                                )
                              }
                              type="number"
                              placeholder="Price"
                              value={
                                formData.DetailsServicing
                                  .ANTI_RUST_UNDERBODY_COATING.price
                              }
                              name="price"
                            />
                          </Col>
                        </>
                      )}
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "SILENCER_COATING"
                            )
                          }
                          type="text"
                          placeholder="SILENCER_COATING"
                          value={
                            formData.DetailsServicing.SILENCER_COATING.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "DetailsServicing",
                              "SILENCER_COATING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.DetailsServicing.SILENCER_COATING.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            </Row>
            <Row className="mb-3">
              <h2>CAR SPA & CLEANING</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <Row className="mb-3">
                  <h5>FESTIVAL SPECIAL</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "FESTIVAL_360_DEEP_CLEANING"
                            )
                          }
                          type="text"
                          placeholder="FESTIVAL_360_DEEP_CLEANING"
                          value={
                            formData.CarSpaCleaning.FESTIVAL_360_DEEP_CLEANING
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "FESTIVAL_360_DEEP_CLEANING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarSpaCleaning.FESTIVAL_360_DEEP_CLEANING
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>SPA</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "CAR_INTERIOR_SPA"
                            )
                          }
                          type="text"
                          placeholder="CAR_INTERIOR_SPA"
                          value={formData.CarSpaCleaning.CAR_INTERIOR_SPA.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "CAR_INTERIOR_SPA"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.CarSpaCleaning.CAR_INTERIOR_SPA.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "DEEP_ALL_ROUND_SPA"
                            )
                          }
                          type="text"
                          placeholder="DEEP_ALL_ROUND_SPA"
                          value={
                            formData.CarSpaCleaning.DEEP_ALL_ROUND_SPA.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "DEEP_ALL_ROUND_SPA"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarSpaCleaning.DEEP_ALL_ROUND_SPA.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "PREMIUM_TOP_WASH"
                            )
                          }
                          type="text"
                          placeholder="PREMIUM_TOP_WASH"
                          value={formData.CarSpaCleaning.PREMIUM_TOP_WASH.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "PREMIUM_TOP_WASH"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.CarSpaCleaning.PREMIUM_TOP_WASH.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "CAR_RUBBING_POLISHING"
                            )
                          }
                          type="text"
                          placeholder="CAR_RUBBING_POLISHING"
                          value={
                            formData.CarSpaCleaning.CAR_RUBBING_POLISHING.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "CAR_RUBBING_POLISHING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarSpaCleaning.CAR_RUBBING_POLISHING.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "RAT_PEST_REPELLENT_TREATMENT"
                            )
                          }
                          type="text"
                          placeholder="RAT_PEST_REPELLENT_TREATMENT"
                          value={
                            formData.CarSpaCleaning.RAT_PEST_REPELLENT_TREATMENT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "RAT_PEST_REPELLENT_TREATMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarSpaCleaning.RAT_PEST_REPELLENT_TREATMENT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>INSPECTION</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "CAR_INSPECTION_DIAGNOSTICS"
                            )
                          }
                          type="text"
                          placeholder="CAR_INSPECTION_DIAGNOSTICS"
                          value={
                            formData.CarSpaCleaning.CAR_INSPECTION_DIAGNOSTICS
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "CAR_INSPECTION_DIAGNOSTICS"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarSpaCleaning.CAR_INSPECTION_DIAGNOSTICS
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>SUNROOF</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "SUNROOF_SERVICE"
                            )
                          }
                          type="text"
                          placeholder="SUNROOF_SERVICE"
                          value={formData.CarSpaCleaning.SUNROOF_SERVICE.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarSpaCleaning",
                              "SUNROOF_SERVICE"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.CarSpaCleaning.SUNROOF_SERVICE.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            </Row>
            <Row className="mb-3">
              <h2>CAR INSPECTIONS</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <Row className="mb-3">
                  <h5>USED CAR</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "SECOND_HAND_CAR_INSPECTION"
                            )
                          }
                          type="text"
                          placeholder="SECOND_HAND_CAR_INSPECTION"
                          value={
                            formData.CarInspections.SECOND_HAND_CAR_INSPECTION
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "SECOND_HAND_CAR_INSPECTION"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarInspections.SECOND_HAND_CAR_INSPECTION
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>INSPECTON</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "ROAD_TRIP_INSPECTION"
                            )
                          }
                          type="text"
                          placeholder="ROAD_TRIP_INSPECTION"
                          value={
                            formData.CarInspections.ROAD_TRIP_INSPECTION.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "ROAD_TRIP_INSPECTION"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarInspections.ROAD_TRIP_INSPECTION.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "ENGINE_SCANNING"
                            )
                          }
                          type="text"
                          placeholder="ENGINE_SCANNING"
                          value={formData.CarInspections.ENGINE_SCANNING.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "ENGINE_SCANNING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.CarInspections.ENGINE_SCANNING.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  {/* <Col lg={4}><Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={8}>  <Form.Control
                                        onChange={(e) => handleInputChange(e, "CarInspections", "Insurance_Claim_Inspection")}
                                        type="text"
                                        placeholder="Insurance_Claim_Inspection"
                                        value={formData.CarInspections.Insurance_Claim_Inspection.name}
                                        name='name'
                                    /></Col>
                                    <Col lg={4}> <Form.Control
                                        onChange={(e) => handleInputChange(e, "CarInspections", "Insurance_Claim_Inspection")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.Insurance_Claim_Inspection.price}
                                        name='price'
                                    /></Col>
                                </Form.Group></Col> */}

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "COMPLETE_SUSPENSION_INSPECTION"
                            )
                          }
                          type="text"
                          placeholder="COMPLETE_SUSPENSION_INSPECTION"
                          value={
                            formData.CarInspections
                              .COMPLETE_SUSPENSION_INSPECTION.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "COMPLETE_SUSPENSION_INSPECTION"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarInspections
                              .COMPLETE_SUSPENSION_INSPECTION.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "CAR_FLUIDS_CHECK"
                            )
                          }
                          type="text"
                          placeholder="CAR_FLUIDS_CHECK"
                          value={formData.CarInspections.CAR_FLUIDS_CHECK.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "CAR_FLUIDS_CHECK"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.CarInspections.CAR_FLUIDS_CHECK.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>RADIATOR</h5>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "RADIATOR_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="RADIATOR_REPLACEMENT"
                          value={
                            formData.CarInspections.RADIATOR_REPLACEMENT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "RADIATOR_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarInspections.RADIATOR_REPLACEMENT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "RADIATOR_FAN_MOTOR_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="RADIATOR_FAN_MOTOR_REPLACEMENT"
                          value={
                            formData.CarInspections
                              .RADIATOR_FAN_MOTOR_REPLACEMENT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "RADIATOR_FAN_MOTOR_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarInspections
                              .RADIATOR_FAN_MOTOR_REPLACEMENT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  {/* <Col lg={4}><Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={8}>  <Form.Control
                                        onChange={(e) => handleInputChange(e, "CarInspections", "RADIATOR_FLUSH_CLEAN")}
                                        type="text"
                                        placeholder="RADIATOR_FLUSH_CLEAN"
                                        value={formData.CarInspections.RADIATOR_FLUSH_CLEAN.name}
                                        name='name'
                                    /></Col>
                                    <Col lg={4}> <Form.Control
                                        onChange={(e) => handleInputChange(e, "CarInspections", "RADIATOR_FLUSH_CLEAN")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.RADIATOR_FLUSH_CLEAN.price}
                                        name='price'
                                    /></Col>
                                </Form.Group></Col> */}
                </Row>
                <Row className="mb-3">
                  <h5>CUSTOM ISSUES</h5>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "CAR_WATERLOG_ASSISTANCE"
                            )
                          }
                          type="text"
                          placeholder="CAR_WATERLOG_ASSISTANCE"
                          value={
                            formData.CarInspections.CAR_WATERLOG_ASSISTANCE.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "CAR_WATERLOG_ASSISTANCE"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarInspections.CAR_WATERLOG_ASSISTANCE
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "CAR_ENGINE_ISSUES"
                            )
                          }
                          type="text"
                          placeholder="CAR_ENGINE_ISSUES"
                          value={formData.CarInspections.CAR_ENGINE_ISSUES.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "CAR_ENGINE_ISSUES"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarInspections.CAR_ENGINE_ISSUES.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "PROBLEM_WITH_CAR_BRAKES_WHEELS"
                            )
                          }
                          type="text"
                          placeholder="PROBLEM_WITH_CAR_BRAKES_WHEELS"
                          value={
                            formData.CarInspections
                              .PROBLEM_WITH_CAR_BRAKES_WHEELS.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "PROBLEM_WITH_CAR_BRAKES_WHEELS"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarInspections
                              .PROBLEM_WITH_CAR_BRAKES_WHEELS.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "DAMAGED_CAR_BODY_INTERIORS"
                            )
                          }
                          type="text"
                          placeholder="DAMAGED_CAR_BODY_INTERIORS"
                          value={
                            formData.CarInspections.DAMAGED_CAR_BODY_INTERIORS
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "CarInspections",
                              "DAMAGED_CAR_BODY_INTERIORS"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.CarInspections.DAMAGED_CAR_BODY_INTERIORS
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
              <Row className="mb-3">
                <h2>WINDSHIELDS & LIGHTS</h2>
                <Row
                  className="mb-3 pb-3 pt-3"
                  style={{ border: "1px solid grey" }}
                >
                  <Row className="mb-3">
                    <h5>WINDSHIELDS</h5>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "FRONT_WINDSHIELD_REPLACEMENT"
                              )
                            }
                            type="text"
                            placeholder="FRONT_WINDSHIELD_REPLACEMENT"
                            value={
                              formData.WindshielsLight
                                .FRONT_WINDSHIELD_REPLACEMENT.name
                            }
                            name="name"
                          />
                        </Col>
                        <Col lg={4}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "FRONT_WINDSHIELD_REPLACEMENT"
                              )
                            }
                            type="number"
                            placeholder="Price"
                            value={
                              formData.WindshielsLight
                                .FRONT_WINDSHIELD_REPLACEMENT.price
                            }
                            name="price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "REAR_WINDSHIELD_REPLACEMENT"
                              )
                            }
                            type="text"
                            placeholder="REAR_WINDSHIELD_REPLACEMENT"
                            value={
                              formData.WindshielsLight
                                .REAR_WINDSHIELD_REPLACEMENT.name
                            }
                            name="name"
                          />
                        </Col>
                        <Col lg={4}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "REAR_WINDSHIELD_REPLACEMENT"
                              )
                            }
                            type="number"
                            placeholder="Price"
                            value={
                              formData.WindshielsLight
                                .REAR_WINDSHIELD_REPLACEMENT.price
                            }
                            name="price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <h5>GLASSES</h5>

                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "DOOR_GLASS_REPLACEMENT"
                              )
                            }
                            type="text"
                            placeholder="DOOR_GLASS_REPLACEMENT"
                            value={
                              formData.WindshielsLight.DOOR_GLASS_REPLACEMENT
                                .name
                            }
                            name="name"
                          />
                        </Col>
                        <Col lg={4}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "DOOR_GLASS_REPLACEMENT"
                              )
                            }
                            type="number"
                            placeholder="Price"
                            value={
                              formData.WindshielsLight.DOOR_GLASS_REPLACEMENT
                                .price
                            }
                            name="price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <h5>LIGHTS</h5>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "FRONT_HEADLIGHT"
                              )
                            }
                            type="text"
                            placeholder="FRONT_HEADLIGHT"
                            value={
                              formData.WindshielsLight.FRONT_HEADLIGHT.name
                            }
                            name="name"
                          />
                        </Col>
                        <Col lg={4}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "FRONT_HEADLIGHT"
                              )
                            }
                            type="number"
                            placeholder="Price"
                            value={
                              formData.WindshielsLight.FRONT_HEADLIGHT.price
                            }
                            name="price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "REAR_TAILLIGHT"
                              )
                            }
                            type="text"
                            placeholder="REAR_TAILLIGHT"
                            value={formData.WindshielsLight.REAR_TAILLIGHT.name}
                            name="name"
                          />
                        </Col>
                        <Col lg={4}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "REAR_TAILLIGHT"
                              )
                            }
                            type="number"
                            placeholder="Price"
                            value={
                              formData.WindshielsLight.REAR_TAILLIGHT.price
                            }
                            name="price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "FOG_LIGHT"
                              )
                            }
                            type="text"
                            placeholder="FOG_LIGHT"
                            value={formData.WindshielsLight.FOG_LIGHT.name}
                            name="name"
                          />
                        </Col>
                        <Col lg={4}>
                          {" "}
                          <Form.Control
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "WindshielsLight",
                                "FOG_LIGHT"
                              )
                            }
                            type="number"
                            placeholder="Price"
                            value={formData.WindshielsLight.FOG_LIGHT.price}
                            name="price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <h5>SIDE MIRROR</h5>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        {formData.WindshielsLight.SIDE_MIRROR_REPLACEMENT && ( // Check if details are present
                          <>
                            <Col lg={8}>
                              <Form.Control
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "WindshielsLight",
                                    "SIDE_MIRROR_REPLACEMENT",
                                    "name"
                                  )
                                }
                                type="text"
                                placeholder="SIDE_MIRROR_REPLACEMENT"
                                value={
                                  formData.WindshielsLight
                                    .SIDE_MIRROR_REPLACEMENT.name
                                }
                                name="name"
                              />
                            </Col>
                            <Col lg={4}>
                              <Form.Control
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "WindshielsLight",
                                    "SIDE_MIRROR_REPLACEMENT",
                                    "price"
                                  )
                                }
                                type="number"
                                placeholder="Price"
                                value={
                                  formData.WindshielsLight
                                    .SIDE_MIRROR_REPLACEMENT.price
                                }
                                name="price"
                              />
                            </Col>
                          </>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
              </Row>
            </Row>
            <Row className="mb-3">
              <h2>SUSPENSION and FITNESS</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <Row className="mb-3">
                  <h5>STEERING</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "ESP_MODULE_REPAIR"
                            )
                          }
                          type="text"
                          placeholder="ESP_MODULE_REPAIR"
                          value={
                            formData.SuspensionAndFitness.ESP_MODULE_REPAIR.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "ESP_MODULE_REPAIR"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.ESP_MODULE_REPAIR
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "STEERING_RACK_REPAIR"
                            )
                          }
                          type="text"
                          placeholder="STEERING_RACK_REPAIR"
                          value={
                            formData.SuspensionAndFitness.STEERING_RACK_REPAIR
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "STEERING_RACK_REPAIR"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.STEERING_RACK_REPAIR
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>SUSPENSION</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FRONT_SHOCK_ABSORBER_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="FRONT_SHOCK_ABSORBER_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness
                              .FRONT_SHOCK_ABSORBER_REPLACEMENT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FRONT_SHOCK_ABSORBER_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness
                              .FRONT_SHOCK_ABSORBER_REPLACEMENT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "REAR_SHOCK_ABSORBER_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="REAR_SHOCK_ABSORBER_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness
                              .REAR_SHOCK_ABSORBER_REPLACEMENT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "REAR_SHOCK_ABSORBER_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness
                              .REAR_SHOCK_ABSORBER_REPLACEMENT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      {formData.SuspensionAndFitness
                        .SUSPENSION_LOWER_ARM_REPLACEMENT && ( // Check if details are present
                        <>
                          <Col lg={8}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SuspensionAndFitness",
                                  "SUSPENSION_LOWER_ARM_REPLACEMENT",
                                  "name"
                                )
                              }
                              type="text"
                              placeholder="SUSPENSION_LOWER_ARM_REPLACEMENT"
                              value={
                                formData.SuspensionAndFitness
                                  .SUSPENSION_LOWER_ARM_REPLACEMENT.name
                              }
                              name="name"
                            />
                          </Col>
                          <Col lg={4}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SuspensionAndFitness",
                                  "SUSPENSION_LOWER_ARM_REPLACEMENT",
                                  "price"
                                )
                              }
                              type="number"
                              placeholder="Price"
                              value={
                                formData.SuspensionAndFitness
                                  .SUSPENSION_LOWER_ARM_REPLACEMENT.price
                              }
                              name="price"
                            />
                          </Col>
                        </>
                      )}
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "LINK_ROD_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="LINK_ROD_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness.LINK_ROD_REPLACEMENT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "LINK_ROD_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.LINK_ROD_REPLACEMENT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      {formData.SuspensionAndFitness
                        .TIE_ROAD_END_REPLACEMENT && ( // Check if details are present
                        <>
                          <Col lg={8}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SuspensionAndFitness",
                                  "TIE_ROAD_END_REPLACEMENT",
                                  "name"
                                )
                              }
                              type="text"
                              placeholder="TIE_ROAD_END_REPLACEMENT"
                              value={
                                formData.SuspensionAndFitness
                                  .TIE_ROAD_END_REPLACEMENT.name
                              }
                              name="name"
                            />
                          </Col>
                          <Col lg={4}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SuspensionAndFitness",
                                  "TIE_ROAD_END_REPLACEMENT",
                                  "price"
                                )
                              }
                              type="number"
                              placeholder="Price"
                              value={
                                formData.SuspensionAndFitness
                                  .TIE_ROAD_END_REPLACEMENT.price
                              }
                              name="price"
                            />
                          </Col>
                        </>
                      )}
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "COMPLETE_SUSPENSION_INSPECTION"
                            )
                          }
                          type="text"
                          placeholder="COMPLETE_SUSPENSION_INSPECTION"
                          value={
                            formData.SuspensionAndFitness
                              .COMPLETE_SUSPENSION_INSPECTION.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "COMPLETE_SUSPENSION_INSPECTION"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness
                              .COMPLETE_SUSPENSION_INSPECTION.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FRONT_SHOCKER_MOUNT_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="FRONT_SHOCKER_MOUNT_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness
                              .FRONT_SHOCKER_MOUNT_REPLACEMENT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FRONT_SHOCKER_MOUNT_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness
                              .FRONT_SHOCKER_MOUNT_REPLACEMENT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FRONT_AXLE_REPAIR"
                            )
                          }
                          type="text"
                          placeholder="FRONT_AXLE_REPAIR"
                          value={
                            formData.SuspensionAndFitness.FRONT_AXLE_REPAIR.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FRONT_AXLE_REPAIR"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.FRONT_AXLE_REPAIR
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>FITMENTS</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      {formData.SuspensionAndFitness.SILENCER_REPAIR && ( // Check if details are present
                        <>
                          <Col lg={8}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SuspensionAndFitness",
                                  "SILENCER_REPAIR",
                                  "name"
                                )
                              }
                              type="text"
                              placeholder="SILENCER_REPAIR"
                              value={
                                formData.SuspensionAndFitness.SILENCER_REPAIR
                                  .name
                              }
                              name="name"
                            />
                          </Col>
                          <Col lg={4}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SuspensionAndFitness",
                                  "SILENCER_REPAIR",
                                  "price"
                                )
                              }
                              type="number"
                              placeholder="Price"
                              value={
                                formData.SuspensionAndFitness.SILENCER_REPAIR
                                  .price
                              }
                              name="price"
                            />
                          </Col>
                        </>
                      )}
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "RADIATOR_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="RADIATOR_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness.RADIATOR_REPLACEMENT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "RADIATOR_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.RADIATOR_REPLACEMENT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "ENGINE_MOUNTING_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="ENGINE_MOUNTING_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness
                              .ENGINE_MOUNTING_REPLACEMENT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "ENGINE_MOUNTING_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness
                              .ENGINE_MOUNTING_REPLACEMENT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "GEAR_BOX_MOUNTING_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="GEAR_BOX_MOUNTING_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness
                              .GEAR_BOX_MOUNTING_REPLACEMENT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "GEAR_BOX_MOUNTING_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness
                              .GEAR_BOX_MOUNTING_REPLACEMENT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FUEL_PUMP_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="FUEL_PUMP_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness.FUEL_PUMP_REPLACEMENT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FUEL_PUMP_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.FUEL_PUMP_REPLACEMENT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "RADIATOR_FAN_MOTOR_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="RADIATOR_FAN_MOTOR_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness
                              .RADIATOR_FAN_MOTOR_REPLACEMENT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "RADIATOR_FAN_MOTOR_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness
                              .RADIATOR_FAN_MOTOR_REPLACEMENT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "WATER_PUMP_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="WATER_PUMP_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness.WATER_PUMP_REPLACEMENT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "WATER_PUMP_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.WATER_PUMP_REPLACEMENT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "ECM_REPAIR"
                            )
                          }
                          type="text"
                          placeholder="ECM_REPAIR"
                          value={formData.SuspensionAndFitness.ECM_REPAIR.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "ECM_REPAIR"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.SuspensionAndFitness.ECM_REPAIR.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "PREMIUM_TOP_WASH"
                            )
                          }
                          type="text"
                          placeholder="PREMIUM_TOP_WASH"
                          value={
                            formData.SuspensionAndFitness.PREMIUM_TOP_WASH.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "PREMIUM_TOP_WASH"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.PREMIUM_TOP_WASH.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "DICKEY_SHOCKER_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="DICKEY_SHOCKER_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness
                              .DICKEY_SHOCKER_REPLACEMENT.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "DICKEY_SHOCKER_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness
                              .DICKEY_SHOCKER_REPLACEMENT.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      {formData.SuspensionAndFitness.START_MOTOR_REPAIR && ( // Check if details are present
                        <>
                          <Col lg={8}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SuspensionAndFitness",
                                  "START_MOTOR_REPAIR",
                                  "name"
                                )
                              }
                              type="text"
                              placeholder="START_MOTOR_REPAIR"
                              value={
                                formData.SuspensionAndFitness.START_MOTOR_REPAIR
                                  .name
                              }
                              name="name"
                            />
                          </Col>
                          <Col lg={4}>
                            <Form.Control
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SuspensionAndFitness",
                                  "START_MOTOR_REPAIR",
                                  "price"
                                )
                              }
                              type="number"
                              placeholder="Price"
                              value={
                                formData.SuspensionAndFitness.START_MOTOR_REPAIR
                                  .price
                              }
                              name="price"
                            />
                          </Col>
                        </>
                      )}
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "MUD_FLAPS"
                            )
                          }
                          type="text"
                          placeholder="MUD_FLAPS"
                          value={formData.SuspensionAndFitness.MUD_FLAPS.name}
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "MUD_FLAPS"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={formData.SuspensionAndFitness.MUD_FLAPS.price}
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "DOOR_LATCH_REPLACEMENT"
                            )
                          }
                          type="text"
                          placeholder="DOOR_LATCH_REPLACEMENT"
                          value={
                            formData.SuspensionAndFitness.DOOR_LATCH_REPLACEMENT
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "DOOR_LATCH_REPLACEMENT"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.DOOR_LATCH_REPLACEMENT
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "POWER_WINDOW_REPAIR"
                            )
                          }
                          type="text"
                          placeholder="POWER_WINDOW_REPAIR"
                          value={
                            formData.SuspensionAndFitness.POWER_WINDOW_REPAIR
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "POWER_WINDOW_REPAIR"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.POWER_WINDOW_REPAIR
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>CUSTOM ISSUES</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "NOISES_WITH_CAR_SUSPENSION_STEERING"
                            )
                          }
                          type="text"
                          placeholder="NOISES_WITH_CAR_SUSPENSION_STEERING"
                          value={
                            formData.SuspensionAndFitness
                              .NOISES_WITH_CAR_SUSPENSION_STEERING.name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "NOISES_WITH_CAR_SUSPENSION_STEERING"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness
                              .NOISES_WITH_CAR_SUSPENSION_STEERING.price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FAULTY_ELECTRICALS"
                            )
                          }
                          type="text"
                          placeholder="FAULTY_ELECTRICALS"
                          value={
                            formData.SuspensionAndFitness.FAULTY_ELECTRICALS
                              .name
                          }
                          name="name"
                        />
                      </Col>
                      <Col lg={4}>
                        {" "}
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SuspensionAndFitness",
                              "FAULTY_ELECTRICALS"
                            )
                          }
                          type="number"
                          placeholder="Price"
                          value={
                            formData.SuspensionAndFitness.FAULTY_ELECTRICALS
                              .price
                          }
                          name="price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            </Row>
            <Row className="mb-3">
              <h2>CLUTCH & BODY PARTS</h2>
              <Row
                className="mb-3 pb-3 pt-3"
                style={{ border: "1px solid grey" }}
              >
                <Row className="mb-3">
                  <h5>CLUTCH</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "CLUTCH_SET_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.CLUTCH_SET_REPLACEMENT.name
                          }
                          name="name"
                          placeholder="Clutch_Set_Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "CLUTCH_SET_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.CLUTCH_SET_REPLACEMENT
                              .price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "FLYWHEEL_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.FLYWHEEL_REPLACEMENT.name
                          }
                          name="name"
                          placeholder="Clutch Bearing Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "FLYWHEEL_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.FLYWHEEL_REPLACEMENT.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "CLUTCH_BEARING_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.CLUTCH_BEARING_REPLACEMENT
                              .name
                          }
                          name="name"
                          placeholder="Flywheel Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "CLUTCH_BEARING_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.CLUTCH_BEARING_REPLACEMENT
                              .price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "FLYWHEEL_TURNING"
                            )
                          }
                          value={formData.ClutchBodyParts.FLYWHEEL_TURNING.name}
                          name="name"
                          placeholder="Flywheel Turning"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "FLYWHEEL_TURNING"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.FLYWHEEL_TURNING.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "CLUTCH_OVERHAUL"
                            )
                          }
                          value={formData.ClutchBodyParts.CLUTCH_OVERHAUL.name}
                          name="name"
                          placeholder="Clutch Overhaul"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "CLUTCH_OVERHAUL"
                            )
                          }
                          value={formData.ClutchBodyParts.CLUTCH_OVERHAUL.price}
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>BODY PARTS</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "FRONT_BUMBER_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.FRONT_BUMBER_REPLACEMENT
                              .name
                          }
                          name="name"
                          placeholder="Front Bumber Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "FRONT_BUMBER_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.FRONT_BUMBER_REPLACEMENT
                              .price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      {formData.ClutchBodyParts.REAR_BUMPER_REPLACEMENT && ( // Check if details are present
                        <>
                          <Col lg={8}>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "ClutchBodyParts",
                                  "REAR_BUMPER_REPLACEMENT",
                                  "name"
                                )
                              }
                              value={
                                formData.ClutchBodyParts.REAR_BUMPER_REPLACEMENT
                                  .name
                              }
                              name="name"
                              placeholder="Rear Bumper Replacement"
                            />
                          </Col>
                          <Col lg={4}>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "ClutchBodyParts",
                                  "REAR_BUMPER_REPLACEMENT",
                                  "price"
                                )
                              }
                              value={
                                formData.ClutchBodyParts.REAR_BUMPER_REPLACEMENT
                                  .price
                              }
                              name="price"
                              placeholder="Price"
                            />
                          </Col>
                        </>
                      )}
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "RIGHT_FRONT_DOOR_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts
                              .RIGHT_FRONT_DOOR_REPLACEMENT.name
                          }
                          name="name"
                          placeholder="Bonnet Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "RIGHT_FRONT_DOOR_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts
                              .RIGHT_FRONT_DOOR_REPLACEMENT.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "RIGHT_REAR_DOOR_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.RIGHT_REAR_DOOR_REPLACEMENT
                              .name
                          }
                          name="name"
                          placeholder="Boot Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "RIGHT_REAR_DOOR_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.RIGHT_REAR_DOOR_REPLACEMENT
                              .price
                          }
                          name="price"
                          type="text"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          value={
                            formData.ClutchBodyParts.FENDER_REPLACEMENT.name
                          }
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "FENDER_REPLACEMENT"
                            )
                          }
                          name="name"
                          placeholder="Fender Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "FENDER_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.FENDER_REPLACEMENT.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "BOOT_REPLACEMENT"
                            )
                          }
                          type="text"
                          value={formData.ClutchBodyParts.BOOT_REPLACEMENT.name}
                          name="name"
                          placeholder="Right Front Door Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "BOOT_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.BOOT_REPLACEMENT.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "BONNET_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.BONNET_REPLACEMENT.name
                          }
                          name="name"
                          placeholder="Right Rear Door Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "BONNET_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.BONNET_REPLACEMENT.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "LEFT_FRONT_DOOR_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.LEFT_FRONT_DOOR_REPLACEMENT
                              .name
                          }
                          name="name"
                          placeholder="Left Front Door Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "LEFT_FRONT_DOOR_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.LEFT_FRONT_DOOR_REPLACEMENT
                              .price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group
                      as={Row}
                      style={{
                        marginBottom: "4px",
                      }}
                    >
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "LEFT_REAR_DOOR_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.LEFT_REAR_DOOR_REPLACEMENT
                              .name
                          }
                          name="name"
                          placeholder="Left Rear Door Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "LEFT_REAR_DOOR_REPLACEMENT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.LEFT_REAR_DOOR_REPLACEMENT
                              .price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>Stereos</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "SONY_GO_ECO_ASX_A410BT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.SONY_GO_ECO_ASX_A410BT.name
                          }
                          name="name"
                          placeholder="Front Bumber Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "SONY_GO_ECO_ASX_A410BT"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.SONY_GO_ECO_ASX_A410BT
                              .price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "SONY_GO_X_XAV_1500"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.SONY_GO_X_XAV_1500.name
                          }
                          name="name"
                          placeholder="Rear Bumber Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "SONY_GO_X_XAV_1500"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.SONY_GO_X_XAV_1500.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "SONY_GO_PLAY_XAV_ASX5500"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.SONY_GO_PLAY_XAV_ASX5500
                              .name
                          }
                          name="name"
                          placeholder="Bonnet Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "SONY_GO_PLAY_XAV_ASX5500"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.SONY_GO_PLAY_XAV_ASX5500
                              .price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "SONY_GO_PLAY_XAV_AX7000"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.SONY_GO_PLAY_XAV_AX7000
                              .name
                          }
                          name="name"
                          placeholder="Boot Replacement"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "SONY_GO_PLAY_XAV_AX7000"
                            )
                          }
                          value={
                            formData.ClutchBodyParts.SONY_GO_PLAY_XAV_AX7000
                              .price
                          }
                          name="price"
                          type="text"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <h5>CUSTOM ISSUES</h5>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "CLUTCH_TRANSMISSION_TROUBLES"
                            )
                          }
                          value={
                            formData.ClutchBodyParts
                              .CLUTCH_TRANSMISSION_TROUBLES.name
                          }
                          name="name"
                          placeholder="Clutch & Transmission Troblems"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "ClutchBodyParts",
                              "CLUTCH_TRANSMISSION_TROUBLES"
                            )
                          }
                          value={
                            formData.ClutchBodyParts
                              .CLUTCH_TRANSMISSION_TROUBLES.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(e, "ClutchBodyParts", "ABS_ISSUE")
                          }
                          value={formData.ClutchBodyParts.ABS_ISSUE.name}
                          name="name"
                          placeholder="ABS Issue"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(e, "ClutchBodyParts", "ABS_ISSUE")
                          }
                          value={formData.ClutchBodyParts.ABS_ISSUE.price}
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
              <Row className="mb-3">
                <h2>ISURANCE CLAIMS</h2>
                <Row
                  className="mb-3 pb-3 pt-3"
                  style={{ border: "1px solid grey" }}
                >
                  <Row className="mb-3">
                    <h5>KNOW YOUR POLICY</h5>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "KNOW_YOUR_POLICY"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims.KNOW_YOUR_POLICY.name
                            }
                            name="name"
                            placeholder="KNOW_YOUR_POLICY"
                          />
                        </Col>
                        <Col lg={4}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "KNOW_YOUR_POLICY"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims.KNOW_YOUR_POLICY.price
                            }
                            name="price"
                            placeholder="Price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <h5>ACCIDENTAL REPAIRS</h5>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        {formData.InsuranceAndClaims
                          .ACCIDENTAL_DENTING_PAINTING_INSURANCE && ( // Check if details are present
                          <>
                            <Col lg={8}>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "InsuranceAndClaims",
                                    "ACCIDENTAL_DENTING_PAINTING_INSURANCE",
                                    "name"
                                  )
                                }
                                value={
                                  formData.InsuranceAndClaims
                                    .ACCIDENTAL_DENTING_PAINTING_INSURANCE.name
                                }
                                name="name"
                                placeholder="ACCIDENTAL_DENTING_PAINTING_INSURANCE"
                              />
                            </Col>
                            <Col lg={4}>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "InsuranceAndClaims",
                                    "ACCIDENTAL_DENTING_PAINTING_INSURANCE",
                                    "price"
                                  )
                                }
                                value={
                                  formData.InsuranceAndClaims
                                    .ACCIDENTAL_DENTING_PAINTING_INSURANCE.price
                                }
                                name="price"
                                placeholder="Price"
                              />
                            </Col>
                          </>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "CAR_FLOOD_DAMAGE_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .CAR_FLOOD_DAMAGE_INSURANCE.name
                            }
                            name="name"
                            placeholder="CAR_FLOOD_DAMAGE_INSURANCE"
                          />
                        </Col>
                        <Col lg={4}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "CAR_FLOOD_DAMAGE_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .CAR_FLOOD_DAMAGE_INSURANCE.price
                            }
                            name="price"
                            placeholder="Price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "FIRE_DAMAGE_ASSISTANCE_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .FIRE_DAMAGE_ASSISTANCE_INSURANCE.name
                            }
                            name="name"
                            placeholder="FIRE_DAMAGE_ASSISTANCE_INSURANCE"
                          />
                        </Col>
                        <Col lg={4}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "FIRE_DAMAGE_ASSISTANCE_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .FIRE_DAMAGE_ASSISTANCE_INSURANCE.price
                            }
                            name="price"
                            placeholder="Price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "WINDSHIELD_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .WINDSHIELD_REPLACEMENT_INSURANCE.name
                            }
                            name="name"
                            placeholder="WINDSHIELD_REPLACEMENT_INSURANCE"
                          />
                        </Col>
                        <Col lg={4}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "WINDSHIELD_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .WINDSHIELD_REPLACEMENT_INSURANCE.price
                            }
                            name="price"
                            placeholder="Price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <h5>THEFT/LOST</h5>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "KEY_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .KEY_REPLACEMENT_INSURANCE.name
                            }
                            name="name"
                            placeholder="KEY_REPLACEMENT_INSURANCE"
                          />
                        </Col>
                        <Col lg={4}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "KEY_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .KEY_REPLACEMENT_INSURANCE.price
                            }
                            name="price"
                            placeholder="Price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "TYRES_WHEEL_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .TYRES_WHEEL_REPLACEMENT_INSURANCE.name
                            }
                            name="name"
                            placeholder="TYRES_WHEEL_REPLACEMENT_INSURANCE"
                          />
                        </Col>
                        <Col lg={4}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "TYRES_WHEEL_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .TYRES_WHEEL_REPLACEMENT_INSURANCE.price
                            }
                            name="price"
                            placeholder="Price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "BATTERY_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .BATTERY_REPLACEMENT_INSURANCE.name
                            }
                            name="name"
                            placeholder="BATTERY_REPLACEMENT_INSURANCE"
                          />
                        </Col>
                        <Col lg={4}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "BATTERY_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .BATTERY_REPLACEMENT_INSURANCE.price
                            }
                            name="price"
                            placeholder="Price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "CAR_THEFT_CLAIM_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .CAR_THEFT_CLAIM_INSURANCE.name
                            }
                            name="name"
                            placeholder="CAR_THEFT_CLAIM_INSURANCE"
                          />
                        </Col>
                        <Col lg={4}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "CAR_THEFT_CLAIM_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .CAR_THEFT_CLAIM_INSURANCE.price
                            }
                            name="price"
                            placeholder="Price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        <Col lg={8}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "ECM_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .ECM_REPLACEMENT_INSURANCE.name
                            }
                            name="name"
                            placeholder="ECM_REPLACEMENT_INSURANCE"
                          />
                        </Col>
                        <Col lg={4}>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "InsuranceAndClaims",
                                "ECM_REPLACEMENT_INSURANCE"
                              )
                            }
                            value={
                              formData.InsuranceAndClaims
                                .ECM_REPLACEMENT_INSURANCE.price
                            }
                            name="price"
                            placeholder="Price"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <h5>INSPECTION</h5>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        {formData.InsuranceAndClaims
                          .DOORSTEP_ACCIDENT_INSPECTION && ( // Check if details are present
                          <>
                            <Col lg={8}>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "InsuranceAndClaims",
                                    "DOORSTEP_ACCIDENT_INSPECTION",
                                    "name"
                                  )
                                }
                                value={
                                  formData.InsuranceAndClaims
                                    .DOORSTEP_ACCIDENT_INSPECTION.name
                                }
                                name="name"
                                placeholder="DOORSTEP_ACCIDENT_INSPECTION"
                              />
                            </Col>
                            <Col lg={4}>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "InsuranceAndClaims",
                                    "DOORSTEP_ACCIDENT_INSPECTION",
                                    "price"
                                  )
                                }
                                value={
                                  formData.InsuranceAndClaims
                                    .DOORSTEP_ACCIDENT_INSPECTION.price
                                }
                                name="price"
                                placeholder="Price"
                              />
                            </Col>
                          </>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        {formData.InsuranceAndClaims.TOWING_INSURANCE && ( // Check if details are present
                          <>
                            <Col lg={8}>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "InsuranceAndClaims",
                                    "TOWING_INSURANCE",
                                    "name"
                                  )
                                }
                                value={
                                  formData.InsuranceAndClaims.TOWING_INSURANCE
                                    .name
                                }
                                name="name"
                                placeholder="TOWING_INSURANCE"
                              />
                            </Col>
                            <Col lg={4}>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "InsuranceAndClaims",
                                    "TOWING_INSURANCE",
                                    "price"
                                  )
                                }
                                value={
                                  formData.InsuranceAndClaims.TOWING_INSURANCE
                                    .price
                                }
                                name="price"
                                placeholder="Price"
                              />
                            </Col>
                          </>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                        {formData.InsuranceAndClaims
                          .INSURANCE_CLAIM_INSPECTION && ( // Check if details are present
                          <>
                            <Col lg={8}>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "InsuranceAndClaims",
                                    "INSURANCE_CLAIM_INSPECTION",
                                    "name"
                                  )
                                }
                                value={
                                  formData.InsuranceAndClaims
                                    .INSURANCE_CLAIM_INSPECTION.name
                                }
                                name="name"
                                placeholder="INSURANCE_CLAIM_INSPECTION"
                              />
                            </Col>
                            <Col lg={4}>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "InsuranceAndClaims",
                                    "INSURANCE_CLAIM_INSPECTION",
                                    "price"
                                  )
                                }
                                value={
                                  formData.InsuranceAndClaims
                                    .INSURANCE_CLAIM_INSPECTION.price
                                }
                                name="price"
                                placeholder="Price"
                              />
                            </Col>
                          </>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
              </Row>
              <Row className="mb-3">
                <h2>SOS Service</h2>
                <Row
                  className="mb-3 pb-3 pt-3"
                  style={{ border: "1px solid grey" }}
                >
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "BATTERY_JUMPSTART"
                            )
                          }
                          value={formData.SOS_Services.BATTERY_JUMPSTART.name}
                          name="name"
                          placeholder="BATTERY_JUMPSTART"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "BATTERY_JUMPSTART"
                            )
                          }
                          value={formData.SOS_Services.BATTERY_JUMPSTART.price}
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CAR_FLUID_LEAKAGE"
                            )
                          }
                          value={formData.SOS_Services.CAR_FLUID_LEAKAGE.name}
                          name="name"
                          placeholder="CAR_FLUID_LEAKAGE"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CAR_FLUID_LEAKAGE"
                            )
                          }
                          value={formData.SOS_Services.CAR_FLUID_LEAKAGE.price}
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CAR_ENGINE_SCANNING"
                            )
                          }
                          value={formData.SOS_Services.CAR_ENGINE_SCANNING.name}
                          name="name"
                          placeholder="CAR_ENGINE_SCANNING"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CAR_ENGINE_SCANNING"
                            )
                          }
                          value={
                            formData.SOS_Services.CAR_ENGINE_SCANNING.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "WHEEL_LIFT_TOW_20_KMS"
                            )
                          }
                          value={
                            formData.SOS_Services.WHEEL_LIFT_TOW_20_KMS.name
                          }
                          name="name"
                          placeholder="WHEEL_LIFT_TOW_20_KMS"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "WHEEL_LIFT_TOW_20_KMS"
                            )
                          }
                          value={
                            formData.SOS_Services.WHEEL_LIFT_TOW_20_KMS.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CAR_SELF_STARTER_ISSUE"
                            )
                          }
                          value={
                            formData.SOS_Services.CAR_SELF_STARTER_ISSUE.name
                          }
                          name="name"
                          placeholder="CAR_SELF_STARTER_ISSUE"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CAR_SELF_STARTER_ISSUE"
                            )
                          }
                          value={
                            formData.SOS_Services.CAR_SELF_STARTER_ISSUE.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "FLAT_BED_TOW_20KM"
                            )
                          }
                          value={formData.SOS_Services.FLAT_BED_TOW_20KM.name}
                          name="name"
                          placeholder="FLAT_BED_TOW_20KM"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "FLAT_BED_TOW_20KM"
                            )
                          }
                          value={formData.SOS_Services.FLAT_BED_TOW_20KM.price}
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CLUTCH_BREAKDOWN"
                            )
                          }
                          value={formData.SOS_Services.CLUTCH_BREAKDOWN.name}
                          name="name"
                          placeholder="CLUTCH_BREAKDOWN"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CLUTCH_BREAKDOWN"
                            )
                          }
                          value={formData.SOS_Services.CLUTCH_BREAKDOWN.price}
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      {formData.SOS_Services.INSURANCE_ACCIDENT && ( // Check if details are present
                        <>
                          <Col lg={8}>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SOS_Services",
                                  "INSURANCE_ACCIDENT",
                                  "name"
                                )
                              }
                              value={
                                formData.SOS_Services.INSURANCE_ACCIDENT.name
                              }
                              name="name"
                              placeholder="INSURANCE_ACCIDENT"
                            />
                          </Col>
                          <Col lg={4}>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "SOS_Services",
                                  "INSURANCE_ACCIDENT",
                                  "price"
                                )
                              }
                              value={
                                formData.SOS_Services.INSURANCE_ACCIDENT.price
                              }
                              name="price"
                              placeholder="Price"
                            />
                          </Col>
                        </>
                      )}
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(e, "SOS_Services", "CAR_FLOODING")
                          }
                          value={formData.SOS_Services.CAR_FLOODING.name}
                          name="name"
                          placeholder="CAR_FLOODING"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(e, "SOS_Services", "CAR_FLOODING")
                          }
                          value={formData.SOS_Services.CAR_FLOODING.price}
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "BRAKE_FAILURE"
                            )
                          }
                          value={formData.SOS_Services.BRAKE_FAILURE.name}
                          name="name"
                          placeholder="BRAKE_FAILURE"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "BRAKE_FAILURE"
                            )
                          }
                          value={formData.SOS_Services.BRAKE_FAILURE.price}
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CRITICAL_DASHBOARD_LIGHT"
                            )
                          }
                          value={
                            formData.SOS_Services.CRITICAL_DASHBOARD_LIGHT.name
                          }
                          name="name"
                          placeholder="CRITICAL_DASHBOARD_LIGHT"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "CRITICAL_DASHBOARD_LIGHT"
                            )
                          }
                          value={
                            formData.SOS_Services.CRITICAL_DASHBOARD_LIGHT.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group as={Row} style={{ marginBottom: "4px" }}>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "WRONG_FUEL_EMERGENCY"
                            )
                          }
                          value={
                            formData.SOS_Services.WRONG_FUEL_EMERGENCY.name
                          }
                          name="name"
                          placeholder="WRONG_FUEL_EMERGENCY"
                        />
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "SOS_Services",
                              "WRONG_FUEL_EMERGENCY"
                            )
                          }
                          value={
                            formData.SOS_Services.WRONG_FUEL_EMERGENCY.price
                          }
                          name="price"
                          placeholder="Price"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <input
                  type="submit"
                  name="Submit"
                  className="btn btn-primary"
                />
              </Form.Group>
              {/* <Form.Group as={Col}>
                <input type="Close" name="Submit" className="btn btn-primary" />
              </Form.Group> */}
              
            </Row>
          </Form>
        </Container>
      </Box>
    </Box>
  );
};
export default ServiceList;
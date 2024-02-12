import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { Box } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
const Service = () => {
    const [model, setModel] = useState('');
    const { BrandId, modelId } = useParams();
    const [locationOptions, setLocationOptions] = useState([]);
    const token = localStorage.getItem('token');
    const handleRemoveLocation = (location) => {
        setFormData((prevData) => ({
            ...prevData,
            locations: prevData.locations.filter((loc) => loc !== location),
        }));
    };

    const [formData, setFormData] = useState({

        locations: [
        ],
        fuelType: "",
        modelId: modelId,
        model: "",

        PeriodicServices: {

            BASIC_SERVICE: {
                name: "Basic Service",
                price: ""
            },
            STANDARD_SERVICE: {
                name: "Standard Service",
                price: ""
            },
            COMPREHENSIVE_SERVICE: {
                name: "Comprehensive Service",
                price: ""
            },
            FRONT_BRAKE_PADS: {
                name: "Front Brake Pads",
                price: ""
            },
            REAR_BRAKE_PADS: {
                name: "Rear Brake Pads",
                price: ""
            },
            FRONT_BRAKE_DISCS: {
                name: "Front Brake Discs",
                price: ""
            },
            CALIPER_PIN_REPLACEMENT: {
                name: "Caliper Pin Replacement",
                price: ""
            },
            DISC_TURNNING: {
                name: "Disc Turning",
                price: ""
            },
            HANDBRAKE_WIRE_REPLACEMENT: {
                name: "Handbrake Wire Replacement",
                price: ""
            },
            BRAKE_DRUMSTURNING: {
                name: "Brake Drums Turning",
                price: ""
            },
            WHEEL_CYLINDER_REPLACEMENT: {
                name: "Wheel Cylinder Replacement",
                price: ""
            },
        },
        AcServices: {
            REGULAR_AC_SERVICE: {
                name: "Regular AC Service",
                price: ""
            },
            HIGH_PERFORMANCE_AC_SERVICE: {
                name: "High-Performance AC Service",
                price: ""
            },
            COOLING_COIL_REPLACEMENT: {
                name: "Cooling Coil Replacement",
                price: ""
            },
            CONDENSER_REPLACEMNT: {
                name: "Condenser Replacement",
                price: ""
            },
            COMPRESSOR_REPLACEMNT: {
                name: "Compressor Replacement",
                price: ""
            },
            HEATING_COIL_REPLACEMNT: {
                name: "Heating Coil Replacement",
                price: ""
            },
            V_BELT_REPLACEMNT: {
                name: "V Belt Replacement",
                price: ""
            },
            AC_BLOWER_MOTOR_REPLACEMNT: {
                name: "AC Blower Motor Replacement",
                price: ""
            },
            RADIATOR_REPLACEMNT: {
                name: "Radiator Replacement",
                price: ""
            },
            RADIATOR_FAN_MOTOR_REPLACEMNT: {
                name: "Radiator Fan Motor Replacement",
                price: ""
            },
            RADIATOR_FLUSH_AND_CLEAN: {
                name: "Radiator Flush and Clean",
                price: ""
            }
        },
        BatteriesService: {
            AMARON_44_MONTHS_WARRANTY: {
                name: "Amaron 44 Months Warranty",
                price: ""
            },
        
            AMARON_55_MONTHS_WARRANTY: {
                name: "Amaron 55 Months Warranty",
                price: ""
            },
        
            AMARON_66_MONTHS_WARRANTY: {
                name: "Amaron 66 Months Warranty",
                price: ""
            },
        
            EXIDE_44_MONTHS_WARRANTY: {
                name: "Exide 44 Months Warranty",
                price: ""
            },
        
            EXIDE_55_MONTHS_WARRANTY: {
                name: "Exide 55 Months Warranty",
                price: ""
            },
        
            EXIDE_66_MONTHS_WARRANTY: {
                name: "Exide 66 Months Warranty",
                price: ""
            },
        
            LIVGUARD_60_MONTHS_WARRANTY: {
                name: "Livguard 60 Months Warranty",
                price: ""
            },
        
            LIVGUARD_72_MONTHS_WARRANTY: {
                name: "Livguard 72 Months Warranty",
                price: ""
            },
        
            Alternator_Replacement: {
                name: "Alternator Replacement",
                price: ""
            },
        
            Alternator_Repair: {
                name: "Alternator Repair",
                price: ""
            },
        },
        TyresAndWheelsCare: {
            APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H: {
                name: "Apollo Alnac 4GS Size 185/65 R15 88H",
                price: ""
            },
        
            APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T: {
                name: "Apollo Amazer 4G Life Size 185/65 R15 88T",
                price: ""
            },
        
            MRF_ZVTS_Size_155_80_R13_79TL: {
                name: "MRF ZVTS Size 155/80 R13 79TL",
                price: ""
            },
        
            MRF_ZLX_SIZE_165_80_R14_TL: {
                name: "MRF ZLX Size 165/80 R14 TL",
                price: ""
            },
        
            MRF_SIZE_165_80_R14_85TL: {
                name: "MRF Size 165/80 R14 85TL",
                price: ""
            },
        
            MRF_ZVTY_SIZE_185_65_R15_88TL: {
                name: "MRF ZVTY Size 185/65 R15 88TL",
                price: ""
            },
        
            JK_UX_ROYALE_SIZE_165_80_R14: {
                name: "JK UX Royale Size 165/80 R14",
                price: ""
            },
        
            BRIDGESTONE_B290_SIZE_165_80_R14_81S: {
                name: "Bridgestone B290 Size 165/80 R14 81S",
                price: ""
            },
        
            BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V: {
                name: "Bridgestone Ecopia EP150 Size 165/65 R14 88V",
                price: ""
            },
        
            BRIDGESTONE_B290_Size_155_80_R13_79S: {
                name: "Bridgestone B290 Size 155/80 R13 79S",
                price: ""
            },
        
            CEAT_MILAZE_SIZE_165_80_R14_85S: {
                name: "CEAT Milaze Size 165/80 R14 85S",
                price: ""
            },
        
            CEAT_MILAZE_X3__SIZE_165_65_R15: {
                name: "CEAT Milaze X3 Size 165/65 R15",
                price: ""
            },
        
            CEAT_MILAZE_Size_155_80_R13: {
                name: "CEAT Milaze Size 155/80 R13",
                price: ""
            },
        
            YOKOHAMA_Earth_1E400: {
                name: "Yokohama Earth-1 E400",
                price: ""
            },
        
            COMPLETE_WHEEL_CARE: {
                name: "Complete Wheel Care",
                price: ""
            },
        
            MUD_FLAPS: {
                name: "Mud Flaps",
                price: ""
            }
        },
        DentingAndPainting: {
            FRONT_BUMBER_PAINT: {
                name: "Front Bumper Paint",
                price: ""
            },
        
            BONNET_PAINT: {
                name: "Bonnet Paint",
                price: ""
            },
        
            REAR_BUMBER_PAINT: {
                name: "Rear Bumper Paint",
                price: ""
            },
        
            BOOT_PAINT: {
                name: "Boot Paint",
                price: ""
            },
        
            FULL_BODY_DENT_PAINT: {
                name: "Full Body Dent Paint",
                price: ""
            },
        
            ALLOY_PAINT: {
                name: "Alloy Paint",
                price: ""
            },
        
            LEFT_FENDER_PAINT: {
                name: "Left Fender Paint",
                price: ""
            },
        
            LEFT_FRONT_DOOR_PAINT: {
                name: "Left Front Door Paint",
                price: ""
            },
        
            LEFT_REAR_DOOR_PAINT: {
                name: "Left Rear Door Paint",
                price: ""
            },
        
            LEFT_QUARTER_PANEL_PAINT: {
                name: "Left Quarter Panel Paint",
                price: ""
            },
        
            LEFT_RUNNING_BOARD_PAINT: {
                name: "Left Running Board Paint",
                price: ""
            },
        
            RIGHT_FENDER_PAINT: {
                name: "Right Fender Paint",
                price: ""
            },
        
            RIGHT_FRONT_DOOR_PAINT: {
                name: "Right Front Door Paint",
                price: ""
            },
        
            RIGHT_REAR_DOOR_PAINT: {
                name: "Right Rear Door Paint",
                price: ""
            },
        
            RIGHT_QUARTER_PANEL_PAINT: {
                name: "Right Quarter Panel Paint",
                price: ""
            },
        
            RIGHT_RUNNING_BOARD_PAINT: {
                name: "Right Running Board Paint",
                price: ""
            }
        },
        DetailsServicing: {
            _3M_CAR_RUBBING_POLISHING: {
                name: "3M Car Rubbing Polishing",
                price: ""
            },
        
            CERAMIC_COATING: {
                name: "Ceramic Coating",
                price: ""
            },
        
            MEGUIARS_CERAMIC_COATING: {
                name: "Meguiar's Ceramic Coating",
                price: ""
            },
        
            MEGUIARS_TEFLON_COATING: {
                name: "Meguiar's Teflon Coating",
                price: ""
            },
        
            _3M_TEFLON_COATING: {
                name: "3M Teflon Coating",
                price: ""
            },

        
            PPF_PAINT_PROTECTION_FILM: {
                name: "PPF Paint Protection Film",
                price: ""
            },
        
            ANTI_RUST_UNDERBODY_COATING: {
                name: "ANTI RUST UNDERBODY COATING",
                price: ""
            },
        
            SILENCER_COATING: {
                name: "Silencer Coating",
                price: ""
            },
        },     
        CarSpaCleaning: {
            FESTIVAL_360_DEEP_CLEANING: {
                name: "Festival 360 Deep Cleaning",
                price: ""
            },
        
            CAR_INTERIOR_SPA: {
                name: "Car Interior Spa",
                price: ""
            },
        
            DEEP_ALL_ROUND_SPA: {
                name: "Deep All Round Spa",
                price: ""
            },
        
            PREMIUM_TOP_WASH: {
                name: "Premium Top Wash",
                price: ""
            },
        
            CAR_RUBBING_POLISHING: {
                name: "Car Rubbing Polishing",
                price: ""
            },
        
            RAT_PEST_REPELLENT_TREATMENT: {
                name: "Rat Pest Repellent Treatment",
                price: ""
            },
        
            CAR_INSPECTION_DIAGNOSTICS: {
                name: "Car Inspection & Diagnostics",
                price: ""
            },
        
            SUNROOF_SERVICE: {
                name: "Sunroof Service",
                price: ""
            }
        },
        CarInspections: {
            SECOND_HAND_CAR_INSPECTION: {
                name: "Second-hand Car Inspection",
                price: ""
            },
        
            ROAD_TRIP_INSPECTION: {
                name: "Road Trip Inspection",
                price: ""
            },
        
            ENGINE_SCANNING: {
                name: "Engine Scanning",
                price: ""
            },
        
            COMPLETE_SUSPENSION_INSPECTION: {
                name: "Complete Suspension Inspection",
                price: ""
            },
        
            CAR_FLUIDS_CHECK: {
                name: "Car Fluids Check",
                price: ""
            },
        
            RADIATOR_REPLACEMENT: {
                name: "Radiator Replacement",
                price: ""
            },
        
            RADIATOR_FAN_MOTOR_REPLACEMENT: {
                name: "Radiator Fan Motor Replacement",
                price: ""
            },
        
            RADIATOR_FLUSH_CLEAN: {
                name: "Radiator Flush and Clean",
                price: ""
            },
        
            CAR_WATERLOG_ASSISTANCE: {
                name: "Car Waterlog Assistance",
                price: ""
            },
        
            CAR_ENGINE_ISSUES: {
                name: "Car Engine Issues Inspection",
                price: ""
            },
        
            PROBLEM_WITH_CAR_BRAKES_WHEELS: {
                name: "Problem with Car Brakes and Wheels Inspection",
                price: ""
            },
        
            DAMAGED_CAR_BODY_INTERIORS: {
                name: "Damaged Car Body and Interiors Inspection",
                price: ""
            },
        
            Insurance_Claim_Inspection: {
                name: "Insurance Claim Inspection",
                price: ""
            },
        },
        WindshielsLight: {
            FRONT_WINDSHIELD_REPLACEMENT: {
                name: "Front Windshield Replacement",
                price: ""
            },
        
            REAR_WINDSHIELD_REPLACEMENT: {
                name: "Rear Windshield Replacement",
                price: ""
            },
        
            DOOR_GLASS_REPLACEMENT: {
                name: "Door Glass Replacement",
                price: ""
            },
        
            FRONT_HEADLIGHT: {
                name: "Front Headlight Replacement",
                price: ""
            },
        
            REAR_TAILLIGHT: {
                name: "Rear Taillight Replacement",
                price: ""
            },
        
            FOG_LIGHT: {
                name: "Fog Light Replacement",
                price: ""
            },
        
            SIDE_MIRROR_REPLACEMENT: {
                name: "Side Mirror Replacement",
                price: ""
            }
        },
        SuspensionAndFitness: {
            ESP_MODULE_REPAIR: {
                name: "ESP Module Repair",
                price: ""
            },
        
            STEERING_RACK_REPAIR: {
                name: "Steering Rack Repair",
                price: ""
            },
        
            FRONT_SHOCK_ABSORBER_REPLACEMENT: {
                name: "Front Shock Absorber Replacement",
                price: ""
            },
        
            REAR_SHOCK_ABSORBER_REPLACEMENT: {
                name: "Rear Shock Absorber Replacement",
                price: ""
            },
           
            SUSPENSION_LOWER_ARM_REPLACEMENT: {
                name: "Suspension Lower Arm Replacement",
                price: ""
            },
        
            LINK_ROD_REPLACEMENT: {
                name: "Link Rod Replacement",
                price: ""
            },
        
            TIE_ROAD_END_REPLACEMENT: {
                name: "Tie Road End Replacement",
                price: ""
            },
        
            COMPLETE_SUSPENSION_INSPECTION: {
                name: "Complete Suspension Inspection",
                price: ""
            },
        
            FRONT_SHOCKER_MOUNT_REPLACEMENT: {
                name: "Front Shocker Mount Replacement",
                price: ""
            },
        
            FRONT_AXLE_REPAIR: {
                name: "Front Axle Repair",
                price: ""
            },
        
            SILENCER_REPAIR: {
                name: "Silencer Repair",
                price: ""
            },
        
            RADIATOR_REPLACEMENT: {
                name: "Radiator Replacement",
                price: ""
            },
        
            ENGINE_MOUNTING_REPLACEMENT: {
                name: "Engine Mounting Replacement",
                price: ""
            },
        
            GEAR_BOX_MOUNTING_REPLACEMENT: {
                name: "Gear Box Mounting Replacement",
                price: ""
            },
        
            FUEL_PUMP_REPLACEMENT: {
                name: "Fuel Pump Replacement",
                price: ""
            },
        
            RADIATOR_FAN_MOTOR_REPLACEMENT: {
                name: "Radiator Fan Motor Replacement",
                price: ""
            },
        
            WATER_PUMP_REPLACEMENT: {
                name: "Water Pump Replacement",
                price: ""
            },
        
            ECM_REPAIR: {
                name: "ECM Repair",
                price: ""
            },
        
            PREMIUM_TOP_WASH: {
                name: "Premium Top Wash",
                price: ""
            },
        
            DICKEY_SHOCKER_REPLACEMENT: {
                name: "Dickey Shocker Replacement",
                price: ""
            },
        
            START_MOTOR_REPAIR: {
                name: "Start Motor Repair",
                price: ""
            },
        
            MUD_FLAPS: {
                name: "Mud Flaps",
                price: ""
            },
        
            DOOR_LATCH_REPLACEMENT: {
                name: "Door Latch Replacement",
                price: ""
            },
        
            POWER_WINDOW_REPAIR: {
                name: "Power Window Repair",
                price: ""
            },
        
            NOISES_WITH_CAR_SUSPENSION_STEERING: {
                name: "Noises with Car Suspension Steering",
                price: ""
            },
        
            FAULTY_ELECTRICALS: {
                name: "Faulty Electricals",
                price: ""
            },
        },
        
        // ClutchBodyParts
ClutchBodyParts: {
    CLUTCH_SET_REPLACEMENT: {
        name: "Clutch Set Replacement",
        price: ""
    },

    FLYWHEEL_REPLACEMENT: {
        name: "Flywheel Replacement",
        price: ""
    },

    CLUTCH_BEARING_REPLACEMENT: {
        name: "Clutch Bearing Replacement",
        price: ""
    },

    FLYWHEEL_TURNING: {
        name: "Flywheel Turning",
        price: ""
    },

    CLUTCH_OVERHAUL: {
        name: "Clutch Overhaul",
        price: ""
    },

    FRONT_BUMBER_REPLACEMENT: {
        name: "Front Bumper Replacement",
        price: ""
    },

    REAR_BUMPER_REPLACEMENT: {
        name: "Rear Bumper Replacement",
        price: ""
    },

    RIGHT_FRONT_DOOR_REPLACEMENT: {
        name: "Right Front Door Replacement",
        price: ""
    },

    RIGHT_REAR_DOOR_REPLACEMENT: {
        name: "Right Rear Door Replacement",
        price: ""
    },

    FENDER_REPLACEMENT: {
        name: "Fender Replacement",
        price: ""
    },

    BOOT_REPLACEMENT: {
        name: "Boot Replacement",
        price: ""
    },

    BONNET_REPLACEMENT: {
        name: "Bonnet Replacement",
        price: ""
    },

    LEFT_FRONT_DOOR_REPLACEMENT: {
        name: "Left Front Door Replacement",
        price: ""
    },

    LEFT_REAR_DOOR_REPLACEMENT: {
        name: "Left Rear Door Replacement",
        price: ""
    },

    CLUTCH_TRANSMISSION_TROUBLES: {
        name: "Clutch Transmission Troubles",
        price: ""
    },

    ABS_ISSUE: {
        name: "ABS Issue",
        price: ""
    },

    SONY_GO_ECO_ASX_A410BT: {
        name: "Sony GO Eco ASX A410BT",
        price: ""
    },

    SONY_GO_X_XAV_1500: {
        name: "Sony GO X XAV 1500",
        price: ""
    },

    SONY_GO_PLAY_XAV_ASX5500: {
        name: "Sony GO Play XAV ASX5500",
        price: ""
    },

    SONY_GO_PLAY_XAV_AX7000: {
        name: "Sony GO Play XAV AX7000",
        price: ""
    }
},

// InsuranceAndClaims
InsuranceAndClaims: {
    KNOW_YOUR_POLICY: {
        name: "Know Your Policy",
        price: ""
    },

    ACCIDENTAL_DENTING_PAINTING_INSURANCE: {
        name: "Accidental Denting Painting Insurance",
        price: ""
    },

    CAR_FLOOD_DAMAGE_INSURANCE: {
        name: "Car Flood Damage Insurance",
        price: ""
    },

    FIRE_DAMAGE_ASSISTANCE_INSURANCE: {
        name: "Fire Damage Assistance Insurance",
        price: ""
    },

    WINDSHIELD_REPLACEMENT_INSURANCE: {
        name: "Windshield Replacement Insurance",
        price: ""
    },

    KEY_REPLACEMENT_INSURANCE: {
        name: "Key Replacement Insurance",
        price: ""
    },

    TYRES_WHEEL_REPLACEMENT_INSURANCE: {
        name: "Tyres Wheel Replacement Insurance",
        price: ""
    },

    BATTERY_REPLACEMENT_INSURANCE: {
        name: "Battery Replacement Insurance",
        price: ""
    },

    CAR_THEFT_CLAIM_INSURANCE: {
        name: "Car Theft Claim Insurance",
        price: ""
    },

    ECM_REPLACEMENT_INSURANCE: {
        name: "ECM Replacement Insurance",
        price: ""
    },

    DOORSTEP_ACCIDENT_INSPECTION: {
        name: "Doorstep Accident Inspection",
        price: ""
    },

    TOWING_INSURANCE: {
        name: "Towing Insurance",
        price: ""
    },

    INSURANCE_CLAIM_INSPECTION: {
        name: "Insurance Claim Inspection",
        price: ""
    }
},

// SOS_Services
SOS_Services: {
    BATTERY_JUMPSTART: {
        name: "Battery Jumpstart",
        price: ""
    },

    CAR_FLUID_LEAKAGE: {
        name: "Car Fluid Leakage",
        price: ""
    },

    CAR_ENGINE_SCANNING: {
        name: "Car Engine Scanning",
        price: ""
    },

    WHEEL_LIFT_TOW_20_KMS: {
        name: "Wheel Lift Tow 20 KMS",
        price: ""
    },

    CAR_SELF_STARTER_ISSUE: {
        name: "Car Self Starter Issue",
        price: ""
    },

    FLAT_BED_TOW_20KM: {
        name: "Flat Bed Tow 20KM",
        price: ""
    },

    CLUTCH_BREAKDOWN: {
        name: "Clutch Breakdown",
        price: ""
    },

    INSURANCE_ACCIDENT: {
        name: "Insurance Accident",
        price: ""
    },

    CAR_FLOODING: {
        name: "Car Flooding",
        price: ""
    },

    BRAKE_FAILURE: {
        name: "Brake Failure",
        price: ""
    },

    CRITICAL_DASHBOARD_LIGHT: {
        name: "Critical Dashboard Light",
        price: ""
    },

    WRONG_FUEL_EMERGENCY: {
        name: "Wrong Fuel Emergency",
        price: ""
    }
},

    });

    useEffect(() => {
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
    const handleInputChange = (e, section, subSection) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            if (section && subSection) {
                console.log("section:", section);
                console.log("subSection:", subSection);
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
                console.log("section is empty");
                // Update the following line to use consistent naming
                const updatedName = section === "modelName" ? "model" : name;
                return {
                    ...prevData,
                    [updatedName]: value,
                    model:model.model,
                };
            }
        });
    };


    useEffect(() => {
        const getCarModelByBrandIdAndModelId = () => {
            axios
                .get(`https://gocarsmithbackend.onrender.com/api/getCarModel/${modelId}`,
                {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
          }
          )
                .then((response) => {
                    // Log the response data to the console
                    //console.log('Car Models:', response.data.model);

                    // Assuming setModel is a state updater function
                    // Here, we are only updating the state with the first model from the response
                    setModel(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching car models:', error);
                });
        };

        getCarModelByBrandIdAndModelId();
    }, [BrandId, modelId]);




    const onClickSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,

        };
        axios.post('https://gocarsmithbackend.onrender.com/api/addService', 
        updatedFormData,
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
  }
  
        ).then((response) => {
            console.log(response);
        });
    };
    return (<Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "45px" }}>
            <Container>
                <h1>To Add Services</h1>
                <Form onSubmit={onClickSubmit}>
                    <Row className="mb-3">
                        <Col lg={4}>
                            <Form.Group as={Row} controlId="modelId" className="mb-3">
                                <Col lg={4}>
                                    <Form.Label className="mb-2" style={{ fontWeight: 'bold' }}>Model ID:</Form.Label>
                                </Col>
                                <Col lg={8}>
                                    <div className="mb-2" style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', width: '100%' }}>
                                        {formData.modelId}
                                    </div>
                                </Col>
                            </Form.Group>
                        </Col>

                        <Col lg={4}>
                            <Form.Group as={Row} controlId="model" className="mb-1">
                                <Col lg={4}>
                                    <Form.Label className="mb-1" style={{ fontWeight: 'bold' }}>Model Name:</Form.Label>
                                </Col>
                                <Col lg={8}>
                                    <div className="mb-2" style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', width: '100%' }}>
                                        {model.model}
                                    </div>
                                </Col>
                            </Form.Group>
                        </Col>

                        <Col lg={4}>
                            <Form.Group as={Row} controlId="location" className="mb-3">
                                <Col lg={4}>
                                    <Form.Label className="mb-2" style={{ fontWeight: 'bold' }}>Location:</Form.Label>
                                </Col>
                                <Col lg={8}>
                                    <Select
                                        fullWidth
                                        label="Location"
                                        name="locations"
                                        multiple
                                        variant="outlined"
                                        style={{ width: '70%', display: 'inline-block', marginLeft: '5px' }}
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
                                            style={{ margin: '4px' }}
                                        />
                                    ))}
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col lg={4}><Form.Group as={Row} controlId="fuelType" style={{ marginBottom: '4px' }}>
                            <Col lg={4}><Form.Label>Fuel Type:</Form.Label></Col>
                            <Col lg={8}><Form.Control style={{ width: '70%', display: 'inline-block', marginLeft: '5px' }}
                                value={formData.fuelType} name="fuelType" onChange={handleInputChange} as="select">
                                <option value=""></option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="CNG">CNG</option>
                                <option value="Electric">Electric</option>
                            </Form.Control></Col>
                        </Form.Group></Col>
                    </Row>
                    <Row className="mb-3">
                        <h2>PERIODIC SERVICES</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <h5>Scheduled Packages</h5>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                BASIC_SERVICE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "BASIC_SERVICE")}
                                            type="number"
                                            name='price'
                                            placeholder="Price"
                                            style={{ width: '70%', display: 'inline-block', marginLeft: '5px' }}
                                            value={formData.PeriodicServices.BASIC_SERVICE.price}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                STANDARD_SERVICE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "STANDARD_SERVICE")}
                                            type="number"

                                            placeholder="Price"
                                            name='price'
                                            value={formData.PeriodicServices.STANDARD_SERVICE.price}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                COMPREHENSIVE_SERVICE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "COMPREHENSIVE_SERVICE")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.PeriodicServices.COMPREHENSIVE_SERVICE.price}
                                            name='price' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <h5>BRAKE MAINTENANCE</h5>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FRONT_BRAKE_PADS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "FRONT_BRAKE_PADS")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.PeriodicServices.FRONT_BRAKE_PADS.price}
                                            name='price' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                REAR_BRAKE_PADS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "REAR_BRAKE_PADS")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.PeriodicServices.REAR_BRAKE_PADS.price}
                                            name='price' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FRONT_BRAKE_DISCS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "FRONT_BRAKE_DISCS")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.PeriodicServices.FRONT_BRAKE_DISCS.price}
                                            name='price' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CALIPER_PIN_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "CALIPER_PIN_REPLACEMENT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.PeriodicServices.CALIPER_PIN_REPLACEMENT.price}
                                            name='price' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                DISC_TURNNING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "DISC_TURNNING")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.PeriodicServices.DISC_TURNNING.price}
                                            name='price' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                HANDBRAKE_WIRE_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "HANDBRAKE_WIRE_REPLACEMENT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.PeriodicServices.HANDBRAKE_WIRE_REPLACEMENT.price}
                                            name='price' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                BRAKE_DRUMSTURNING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "BRAKE_DRUMSTURNING")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.PeriodicServices.BRAKE_DRUMSTURNING.price}
                                            name='price' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                WHEEL_CYLINDER_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "PeriodicServices", "WHEEL_CYLINDER_REPLACEMENT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.PeriodicServices.WHEEL_CYLINDER_REPLACEMENT.price}
                                            name='price'
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Row>
                    <Row className="mb-3">
                        <h2>AC SERVICES</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <h5>Scheduled Packages</h5>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                REGULAR_AC_SERVICE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "AcServices", "REGULAR_AC_SERVICE")}
                                        type="number"
                                        name='price'
                                        placeholder="Price"
                                        value={formData.AcServices.REGULAR_AC_SERVICE.price}
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                HIGH_PERFORMANCE_AC_SERVICE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "AcServices", "HIGH_PERFORMANCE_AC_SERVICE")}
                                            type="number"

                                            placeholder="Price"
                                            name='price'
                                            value={formData.AcServices.HIGH_PERFORMANCE_AC_SERVICE.price}

                                        />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                COOLING_COIL_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "AcServices", "COOLING_COIL_REPLACEMENT")}
                                    type="number"
                                    placeholder="Price"
                                    value={formData.AcServices.COOLING_COIL_REPLACEMENT.price}
                                    name='price'
                                />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <h5>BRAKE MAINTENANCE</h5>
                             <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CONDENSER_REPLACEMNT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "AcServices", "CONDENSER_REPLACEMNT")}
                                    type="number"
                                    placeholder="Price"
                                    value={formData.AcServices.CONDENSER_REPLACEMNT.price}
                                    name='price'
                                />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                COMPRESSOR_REPLACEMNT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "AcServices", "COMPRESSOR_REPLACEMNT")}
                                    type="number"
                                    placeholder="Price"
                                    value={formData.AcServices.COMPRESSOR_REPLACEMNT.price}
                                    name='price'
                                />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               FRONT_BRAKEHEATING_COIL_REPLACEMNT_DISCS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "AcServices", "HEATING_COIL_REPLACEMNT")}
                                    type="number"
                                    placeholder="Price"
                                    value={formData.AcServices.HEATING_COIL_REPLACEMNT.price}
                                    name='price'
                                />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                V_BELT_REPLACEMNT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "AcServices", "V_BELT_REPLACEMNT")}
                                    type="number"
                                    placeholder="Price"
                                    value={formData.AcServices.V_BELT_REPLACEMNT.price}
                                    name='price'
                                />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                AC_BLOWER_MOTOR_REPLACEMNT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "AcServices", "AC_BLOWER_MOTOR_REPLACEMNT")}
                                    type="number"
                                    placeholder="Price"
                                    value={formData.AcServices.AC_BLOWER_MOTOR_REPLACEMNT.price}
                                    name='price'
                                />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RADIATOR_REPLACEMNT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "AcServices", "RADIATOR_REPLACEMNT")}
                                    type="number"
                                    placeholder="Price"
                                    value={formData.AcServices.RADIATOR_REPLACEMNT.price}
                                    name='price'
                                />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RADIATOR_FAN_MOTOR_REPLACEMNT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "AcServices", "RADIATOR_FAN_MOTOR_REPLACEMNT")}
                                    type="number"
                                    placeholder="Price"
                                    value={formData.AcServices.RADIATOR_FAN_MOTOR_REPLACEMNT.price}
                                    name='price'
                                />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RADIATOR_FLUSH_AND_CLEAN
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "AcServices", "RADIATOR_FLUSH_AND_CLEAN")}
                                    type="number"
                                    placeholder="Price"
                                    value={formData.AcServices.RADIATOR_FLUSH_AND_CLEAN.price}
                                    name='price'
                                />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            </Row>
                    </Row>
                    <Row className="mb-3">
                        <h2>BATTERIES</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <Row className="mb-3">
                                <h5>AMARON</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                AMARON_44_MONTHS_WARRANTY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "BatteriesService", "AMARON_44_MONTHS_WARRANTY")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.AMARON_44_MONTHS_WARRANTY.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                AMARON_55_MONTHS_WARRANTY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "BatteriesService", "AMARON_55_MONTHS_WARRANTY")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.AMARON_55_MONTHS_WARRANTY.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 

                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                AMARON_66_MONTHS_WARRANTY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "BatteriesService", "AMARON_66_MONTHS_WARRANTY")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.AMARON_66_MONTHS_WARRANTY.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            </Row>
                            <Row className="mb-3">
                                <h5>EXIDE</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                EXIDE_44_MONTHS_WARRANTY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "BatteriesService", "EXIDE_44_MONTHS_WARRANTY")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.EXIDE_44_MONTHS_WARRANTY.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 

                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               EXIDE_55_MONTHS_WARRANTY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "BatteriesService", "EXIDE_55_MONTHS_WARRANTY")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.EXIDE_55_MONTHS_WARRANTY.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                EXIDE_66_MONTHS_WARRANTY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "BatteriesService", "EXIDE_66_MONTHS_WARRANTY")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.EXIDE_66_MONTHS_WARRANTY.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>LIVGUARD</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                LIVGUARD_60_MONTHS_WARRANTY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "BatteriesService", "LIVGUARD_60_MONTHS_WARRANTY")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.LIVGUARD_60_MONTHS_WARRANTY.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                LIVGUARD_72_MONTHS_WARRANTY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "BatteriesService", "LIVGUARD_72_MONTHS_WARRANTY")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.LIVGUARD_72_MONTHS_WARRANTY.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                            <Row className="mb-3">
                                <h5>ALTERNATOR</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Alternator_Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "BatteriesService", "Alternator_Replacement")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.Alternator_Replacement.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Alternator_Repair
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "BatteriesService", "Alternator_Repair")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.BatteriesService.Alternator_Repair.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                        </Row>
                    </Row>
                    <Row className="mb-3">
                        <h2>TYRES & WHEEL CARE</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <Row className="mb-3">
                                <h5>APOLLO</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                AMARON_44_MONTHS_WARRAAPOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88TNTY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>   
                            </Row>
                            <Row className="mb-3">
                                <h5>MRF</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               MRF_ZVTS_Size_155_80_R13_79TL
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "MRF_ZVTS_Size_155_80_R13_79TL")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.MRF_ZVTS_Size_155_80_R13_79TL.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                MRF_ZLX_SIZE_165_80_R14_TL
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "MRF_ZLX_SIZE_165_80_R14_TL")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.MRF_ZLX_SIZE_165_80_R14_TL.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                MRF_SIZE_165_80_R14_85TL
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "MRF_SIZE_165_80_R14_85TL")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.MRF_SIZE_165_80_R14_85TL.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                MRF_ZVTY_SIZE_185_65_R15_88TL
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "MRF_ZVTY_SIZE_185_65_R15_88TL")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.MRF_ZVTY_SIZE_185_65_R15_88TL.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>JK</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                JK_UX_ROYALE_SIZE_165_80_R14
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "JK_UX_ROYALE_SIZE_165_80_R14")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.JK_UX_ROYALE_SIZE_165_80_R14.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                            <Row className="mb-3">
                                <h5>BRIDGESTONE</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                BRIDGESTONE_B290_SIZE_165_80_R14_81S
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "BRIDGESTONE_B290_SIZE_165_80_R14_81S")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.BRIDGESTONE_B290_SIZE_165_80_R14_81S.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                BRIDGESTONE_B290_Size_155_80_R13_79S
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "BRIDGESTONE_B290_Size_155_80_R13_79S")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.BRIDGESTONE_B290_Size_155_80_R13_79S.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            </Row>
                            <Row className="mb-3">
                                <h5>CEAT</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CEAT_MILAZE_SIZE_165_80_R14_85S
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "CEAT_MILAZE_SIZE_165_80_R14_85S")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.CEAT_MILAZE_SIZE_165_80_R14_85S.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               CEAT_MILAZE_X3__SIZE_165_65_R15
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "CEAT_MILAZE_X3__SIZE_165_65_R15")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.CEAT_MILAZE_X3__SIZE_165_65_R15.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CEAT_MILAZE_Size_155_80_R13
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "CEAT_MILAZE_Size_155_80_R13")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.CEAT_MILAZE_Size_155_80_R13.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>YOKOHAMA</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                YOKOHAMA_Earth_1E400
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "YOKOHAMA_Earth_1E400")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.YOKOHAMA_Earth_1E400.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>   
                            </Row>
                            <Row className="mb-3">
                                <h5>WHEEL CARE SERVICES</h5>
                                 <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                COMPLETE_WHEEL_CARE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "COMPLETE_WHEEL_CARE")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.COMPLETE_WHEEL_CARE.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                MUD_FLAPS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "TyresAndWheelsCare", "MUD_FLAPS")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.TyresAndWheelsCare.MUD_FLAPS.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            </Row>
                        </Row>
                    </Row>
                    <Row className="mb-3">
                        <h2>DENTING & PAINTING</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <Row className="mb-3">
                                <h5>FRONT SIDE</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FRONT_BUMBER_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "FRONT_BUMBER_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.FRONT_BUMBER_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                BONNET_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "BONNET_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.BONNET_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>REAR SIDE</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                REAR_BUMBER_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "REAR_BUMBER_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.REAR_BUMBER_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                BOOT_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "BOOT_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.BOOT_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>WHOLE BODY</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FULL_BODY_DENT_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "FULL_BODY_DENT_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.FULL_BODY_DENT_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>   
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                ALLOY_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "ALLOY_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.ALLOY_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>LEFT SIDE</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                LEFT_FENDER_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "LEFT_FENDER_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.LEFT_FENDER_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                LEFT_FRONT_DOOR_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "LEFT_FRONT_DOOR_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.LEFT_FRONT_DOOR_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                LEFT_REAR_DOOR_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "LEFT_REAR_DOOR_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.LEFT_REAR_DOOR_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                LEFT_QUARTER_PANEL_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "LEFT_QUARTER_PANEL_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.LEFT_QUARTER_PANEL_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                LEFT_RUNNING_BOARD_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "LEFT_RUNNING_BOARD_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.LEFT_RUNNING_BOARD_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                             </Row>
                            <Row className="mb-3">
                                <h5>RIGHT SIDE</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RIGHT_FENDER_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "RIGHT_FENDER_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.RIGHT_FENDER_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RIGHT_FRONT_DOOR_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "RIGHT_FRONT_DOOR_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.RIGHT_FRONT_DOOR_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               RIGHT_REAR_DOOR_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "RIGHT_REAR_DOOR_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.RIGHT_REAR_DOOR_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RIGHT_QUARTER_PANEL_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "RIGHT_QUARTER_PANEL_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.RIGHT_QUARTER_PANEL_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RIGHT_RUNNING_BOARD_PAINT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DentingAndPainting", "RIGHT_RUNNING_BOARD_PAINT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DentingAndPainting.RIGHT_RUNNING_BOARD_PAINT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                        </Row>
                    </Row> 
                    <Row className="mb-3">
                        <h2>DETAILING SERVICES</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <Row className="mb-3">
                                <h5>POLISING</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                _3M_CAR_RUBBING_POLISHING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "DetailsServicing", "_3M_CAR_RUBBING_POLISHING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DetailsServicing._3M_CAR_RUBBING_POLISHING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            </Row>
                            <h5>CERAMIC COATING</h5>
                            <Row className="mb-3">
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CERAMIC_COATING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DetailsServicing", "CERAMIC_COATING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DetailsServicing.CERAMIC_COATING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                MEGUIARS_CERAMIC_COATING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DetailsServicing", "MEGUIARS_CERAMIC_COATING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DetailsServicing.MEGUIARS_CERAMIC_COATING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                             </Row>
                            <Row className="mb-3">
                                <h5>TEFLON COATING</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                MEGUIARS_TEFLON_COATING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "DetailsServicing", "MEGUIARS_TEFLON_COATING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DetailsServicing.MEGUIARS_TEFLON_COATING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                _3M_TEFLON_COATING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DetailsServicing", "_3M_TEFLON_COATING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DetailsServicing._3M_TEFLON_COATING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                            <Row className="mb-3">
                                <h5>PPF</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                PPF_PAINT_PROTECTION_FILM
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DetailsServicing", "PPF_PAINT_PROTECTION_FILM")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DetailsServicing.PPF_PAINT_PROTECTION_FILM.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                            <Row className="mb-3">
                                <h5>ANTI RUST COATING</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            ANTI_RUST_UNDERBODY_COATINGANTI_RUST_UNDERBODY_COATING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DetailsServicing", "ANTI_RUST_UNDERBODY_COATING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DetailsServicing.ANTI_RUST_UNDERBODY_COATING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                SILENCER_COATING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "DetailsServicing", "SILENCER_COATING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.DetailsServicing.SILENCER_COATING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                        </Row>
                    </Row>  
                    <Row className="mb-3">
                        <h2>CAR SPA & CLEANING</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <Row className="mb-3">
                                <h5>FESTIVAL SPECIAL</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               FESTIVAL_360_DEEP_CLEANING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarSpaCleaning", "FESTIVAL_360_DEEP_CLEANING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarSpaCleaning.FESTIVAL_360_DEEP_CLEANING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>SPA</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_INTERIOR_SPA
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "CarSpaCleaning", "CAR_INTERIOR_SPA")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarSpaCleaning.CAR_INTERIOR_SPA.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                             <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                DEEP_ALL_ROUND_SPA
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarSpaCleaning", "DEEP_ALL_ROUND_SPA")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarSpaCleaning.DEEP_ALL_ROUND_SPA.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                PREMIUM_TOP_WASH
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarSpaCleaning", "PREMIUM_TOP_WASH")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarSpaCleaning.PREMIUM_TOP_WASH.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_RUBBING_POLISHING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarSpaCleaning", "CAR_RUBBING_POLISHING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarSpaCleaning.CAR_RUBBING_POLISHING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RAT_PEST_REPELLENT_TREATMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarSpaCleaning", "RAT_PEST_REPELLENT_TREATMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarSpaCleaning.RAT_PEST_REPELLENT_TREATMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>INSPECTION</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_INSPECTION_DIAGNOSTICS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarSpaCleaning", "CAR_INSPECTION_DIAGNOSTICS")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarSpaCleaning.CAR_INSPECTION_DIAGNOSTICS.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            </Row>
                            <Row className="mb-3">
                                <h5>SUNROOF</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                SUNROOF_SERVICE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "CarSpaCleaning", "SUNROOF_SERVICE")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarSpaCleaning.SUNROOF_SERVICE.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            </Row>
                        </Row>
                    </Row>                   
                    <Row className="mb-3">
                        <h2>CAR INSPECTIONS</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <Row className="mb-3">
                                <h5>USED CAR</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                SECOND_HAND_CAR_INSPECTION
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarInspections", "SECOND_HAND_CAR_INSPECTION")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.SECOND_HAND_CAR_INSPECTION.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            </Row>
                            <Row className="mb-3">
                                <h5>INSPECTON</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                ROAD_TRIP_INSPECTION
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "CarInspections", "ROAD_TRIP_INSPECTION")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.ROAD_TRIP_INSPECTION.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                ENGINE_SCANNING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarInspections", "ENGINE_SCANNING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.ENGINE_SCANNING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>    
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Insurance_Claim_Inspection
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "CarInspections", "Insurance_Claim_Inspection")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.Insurance_Claim_Inspection.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                COMPLETE_SUSPENSION_INSPECTION
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "CarInspections", "COMPLETE_SUSPENSION_INSPECTION")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.COMPLETE_SUSPENSION_INSPECTION.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_FLUIDS_CHECK
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarInspections", "CAR_FLUIDS_CHECK")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.CAR_FLUIDS_CHECK.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>   
                            </Row>
                            <Row className="mb-3">
                                <h5>RADIATOR</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RADIATOR_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarInspections", "RADIATOR_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.RADIATOR_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>   
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RADIATOR_FAN_MOTOR_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "CarInspections", "RADIATOR_FAN_MOTOR_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.RADIATOR_FAN_MOTOR_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RADIATOR_FLUSH_CLEAN
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarInspections", "RADIATOR_FLUSH_CLEAN")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.RADIATOR_FLUSH_CLEAN.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                              </Row>
                            <Row className="mb-3">
                                <h5>CUSTOM ISSUES</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_WATERLOG_ASSISTANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarInspections", "CAR_WATERLOG_ASSISTANCE")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.CAR_WATERLOG_ASSISTANCE.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_ENGINE_ISSUES
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarInspections", "CAR_ENGINE_ISSUES")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.CAR_ENGINE_ISSUES.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                PROBLEM_WITH_CAR_BRAKES_WHEELS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarInspections", "PROBLEM_WITH_CAR_BRAKES_WHEELS")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.PROBLEM_WITH_CAR_BRAKES_WHEELS.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                DAMAGED_CAR_BODY_INTERIORS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "CarInspections", "DAMAGED_CAR_BODY_INTERIORS")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.CarInspections.DAMAGED_CAR_BODY_INTERIORS.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            </Row>
                        </Row>
                        <Row className='mb-3'>
                            <h2>WINDSHIELDS & LIGHTS</h2>
                            <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                                <Row className="mb-3">
                                    <h5>WINDSHIELDS</h5>
                                    <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FRONT_WINDSHIELD_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "WindshielsLight", "FRONT_WINDSHIELD_REPLACEMENT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.WindshielsLight.FRONT_WINDSHIELD_REPLACEMENT.price}
                                            name='price'
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>  
                             <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                REAR_WINDSHIELD_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "WindshielsLight", "REAR_WINDSHIELD_REPLACEMENT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.WindshielsLight.REAR_WINDSHIELD_REPLACEMENT.price}
                                            name='price'
                                        />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                                <Row className="mb-3">
                                    <h5>GLASSES</h5>
                                    <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                DOOR_GLASS_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "WindshielsLight", "DOOR_GLASS_REPLACEMENT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.WindshielsLight.DOOR_GLASS_REPLACEMENT.price}
                                            name='price'
                                        />
                                    </Col>
                                </Form.Group>
                            </Col> 
                             </Row>
                                <Row className="mb-3">
                                    <h5>LIGHTS</h5>
                                    <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FRONT_HEADLIGHT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "WindshielsLight", "FRONT_HEADLIGHT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.WindshielsLight.FRONT_HEADLIGHT.price}
                                            name='price'
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                REAR_TAILLIGHT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "WindshielsLight", "REAR_TAILLIGHT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.WindshielsLight.REAR_TAILLIGHT.price}
                                            name='price'
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FOG_LIGHT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "WindshielsLight", "FOG_LIGHT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.WindshielsLight.FOG_LIGHT.price}
                                            name='price'
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                                <Row className="mb-3">
                                    <h5>SIDE MIRROR</h5><Col lg={4}> 
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                SIDE_MIRROE_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "WindshielsLight", "SIDE_MIRROR_REPLACEMENT")}
                                            type="number"
                                            placeholder="Price"
                                            value={formData.WindshielsLight.SIDE_MIRROR_REPLACEMENT.price}
                                            name='price'
                                        />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            </Row>
                        </Row>
                    </Row> 
                      
                   



                       <Row className='mb-3'>
                        <h2>SUSPENSION and FITNESS</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <Row className="mb-3">
                                <h5>STEERING</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                ESP_MODULE_REPAIR
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "ESP_MODULE_REPAIR")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.ESP_MODULE_REPAIR.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                STEERING_RACK_REPAIR
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "STEERING_RACK_REPAIR")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.STEERING_RACK_REPAIR.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>SUSPENSION</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FRONT_SHOCK_ABSORBER_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "FRONT_SHOCK_ABSORBER_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.FRONT_SHOCK_ABSORBER_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                REAR_SHOCK_ABSORBER_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "REAR_SHOCK_ABSORBER_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.REAR_SHOCK_ABSORBER_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            SUSPENSION_LOWER_ARM_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "SUSPENSION_LOWER_ARM_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.SUSPENSION_LOWER_ARM_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                LINK_ROD_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "LINK_ROD_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.LINK_ROD_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>     
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            TIE_ROAD_END_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "TIE_ROAD_END_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.TIE_ROAD_END_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                COMPLETE_SUSPENSION_INSPECTION
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "COMPLETE_SUSPENSION_INSPECTION")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.COMPLETE_SUSPENSION_INSPECTION.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>    
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FRONT_SHOCKER_MOUNT_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "FRONT_SHOCKER_MOUNT_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.FRONT_SHOCKER_MOUNT_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FRONT_AXLE_REPAIR
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "FRONT_AXLE_REPAIR")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.FRONT_AXLE_REPAIR.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            <Row className="mb-3">
                                <h5>FITMENTS</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            SILENCER_REPAIR
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "SILENCER_REPAIR")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.SILENCER_REPAIR.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RADIATOR_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "RADIATOR_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.RADIATOR_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               ENGINE_MOUNTING_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "ENGINE_MOUNTING_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.ENGINE_MOUNTING_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                GEAR_BOX_MOUNTING_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "GEAR_BOX_MOUNTING_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.GEAR_BOX_MOUNTING_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FUEL_PUMP_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "FUEL_PUMP_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.FUEL_PUMP_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                RADIATOR_FAN_MOTOR_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "RADIATOR_FAN_MOTOR_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.RADIATOR_FAN_MOTOR_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                WATER_PUMP_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "WATER_PUMP_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.WATER_PUMP_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                ECM_REPAIR
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "ECM_REPAIR")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.ECM_REPAIR.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                             <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                PREMIUM_TOP_WASH
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "PREMIUM_TOP_WASH")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.PREMIUM_TOP_WASH.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                DICKEY_SHOCKER_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "DICKEY_SHOCKER_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.DICKEY_SHOCKER_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                             <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            START_MOTOR_REPAIR
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "START_MOTOR_REPAIR")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.START_MOTOR_REPAIR.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               MUD_FLAPS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "MUD_FLAPS")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.MUD_FLAPS.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                DOOR_LATCH_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "DOOR_LATCH_REPLACEMENT")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.DOOR_LATCH_REPLACEMENT.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                POWER_WINDOW_REPAIR
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "POWER_WINDOW_REPAIR")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.POWER_WINDOW_REPAIR.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                             </Row>
                            <Row className="mb-3">
                                <h5>CUSTOM ISSUES</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                NOISES_WITH_CAR_SUSPENSION_STEERING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "NOISES_WITH_CAR_SUSPENSION_STEERING")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.NOISES_WITH_CAR_SUSPENSION_STEERING.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FAULTY_ELECTRICALS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "SuspensionAndFitness", "FAULTY_ELECTRICALS")}
                                        type="number"
                                        placeholder="Price"
                                        value={formData.SuspensionAndFitness.FAULTY_ELECTRICALS.price}
                                        name='price'
                                    />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                        </Row>
                    </Row>

 <Row className="mb-3">
                        <h2>CLUTCH & BODY PARTS</h2>
                        <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                            <Row className="mb-3">
                                <h5>CLUTCH</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Clutch_Set_Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "CLUTCH_SET_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.CLUTCH_SET_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Clutch Bearing Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "FLYWHEEL_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.FLYWHEEL_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Flywheel Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "CLUTCH_BEARING_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.CLUTCH_BEARING_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                             <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Flywheel Turning
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "ClutchBodyParts", "FLYWHEEL_TURNING")}
                                        value={formData.ClutchBodyParts.FLYWHEEL_TURNING.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Clutch Overhaul
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "CLUTCH_OVERHAUL")}
                                        value={formData.ClutchBodyParts.CLUTCH_OVERHAUL.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                            <Row className="mb-3">
                                <h5>BODY PARTS</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            FRONT_BUMBER_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "ClutchBodyParts", "FRONT_BUMBER_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.FRONT_BUMBER_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            REAR_BUMPER_REPLACEMENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "REAR_BUMPER_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.REAR_BUMPER_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Bonnet Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "RIGHT_FRONT_DOOR_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.RIGHT_FRONT_DOOR_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Boot Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "RIGHT_REAR_DOOR_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.RIGHT_REAR_DOOR_REPLACEMENT.price}
                                        name='price' type="text" placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Fender Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "FENDER_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.FENDER_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Right Front Door Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "ClutchBodyParts", "BOOT_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.BOOT_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                              Right Rear Door Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "ClutchBodyParts", "BONNET_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.BONNET_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Left Front Door Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "ClutchBodyParts", "LEFT_FRONT_DOOR_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.LEFT_FRONT_DOOR_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Left Rear Door Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "LEFT_REAR_DOOR_REPLACEMENT")}
                                        value={formData.ClutchBodyParts.LEFT_REAR_DOOR_REPLACEMENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                            <Row className="mb-3">
                                <h5>Stereos</h5>
                                 <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Front Bumber Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "SONY_GO_ECO_ASX_A410BT")}
                                        value={formData.ClutchBodyParts.SONY_GO_ECO_ASX_A410BT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Rear Bumber Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "SONY_GO_X_XAV_1500")}
                                        value={formData.ClutchBodyParts.SONY_GO_X_XAV_1500.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Bonnet Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "ClutchBodyParts", "SONY_GO_PLAY_XAV_ASX5500")}
                                        value={formData.ClutchBodyParts.SONY_GO_PLAY_XAV_ASX5500.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Boot Replacement
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "SONY_GO_PLAY_XAV_AX7000")}
                                        value={formData.ClutchBodyParts.SONY_GO_PLAY_XAV_AX7000.price}
                                        name='price' type="text" placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                            <Row className="mb-3">
                                <h5>CUSTOM ISSUES</h5>
                                <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                Clutch & Transmission Troblems
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "CLUTCH_TRANSMISSION_TROUBLES")}
                                        value={formData.ClutchBodyParts.CLUTCH_TRANSMISSION_TROUBLES.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                ABS Issue
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "ClutchBodyParts", "ABS_ISSUE")}
                                        value={formData.ClutchBodyParts.ABS_ISSUE.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                        </Row>
                        <Row className="mb-3">
                            <h2>ISURANCE CLAIMS</h2>
                            <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                                <Row className="mb-3">
                                    <h5>KNOW YOUR POLICY</h5>
                                    <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                KNOW_YOUR_POLICY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "KNOW_YOUR_POLICY")}
                                            value={formData.InsuranceAndClaims.KNOW_YOUR_POLICY.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                                <Row className="mb-3">
                                    <h5>ACCIDENTAL REPAIRS</h5>
                                    <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            ACCIDENTAL_DENTING_PAINTING_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "ACCIDENTAL_DENTING_PAINTING_INSURANCE")}
                                            value={formData.InsuranceAndClaims.ACCIDENTAL_DENTING_PAINTING_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_FLOOD_DAMAGE_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                             onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "CAR_FLOOD_DAMAGE_INSURANCE")}
                                            value={formData.InsuranceAndClaims.CAR_FLOOD_DAMAGE_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                FIRE_DAMAGE_ASSISTANCE_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "FIRE_DAMAGE_ASSISTANCE_INSURANCE")}
                                            value={formData.InsuranceAndClaims.FIRE_DAMAGE_ASSISTANCE_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                WINDSHIELD_REPLACEMENT_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "WINDSHIELD_REPLACEMENT_INSURANCE")}
                                            value={formData.InsuranceAndClaims.WINDSHIELD_REPLACEMENT_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            </Row>
                                <Row className="mb-3">
                                    <h5>THEFT/LOST</h5>
                                    <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                KEY_REPLACEMENT_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "KEY_REPLACEMENT_INSURANCE")}
                                            value={formData.InsuranceAndClaims.KEY_REPLACEMENT_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                TYRES_WHEEL_REPLACEMENT_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "TYRES_WHEEL_REPLACEMENT_INSURANCE")}
                                            value={formData.InsuranceAndClaims.TYRES_WHEEL_REPLACEMENT_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                BATTERY_REPLACEMENT_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "BATTERY_REPLACEMENT_INSURANCE")}
                                            value={formData.InsuranceAndClaims.BATTERY_REPLACEMENT_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_THEFT_CLAIM_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "CAR_THEFT_CLAIM_INSURANCE")}
                                            value={formData.InsuranceAndClaims.CAR_THEFT_CLAIM_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                ECM_REPLACEMENT_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "ECM_REPLACEMENT_INSURANCE")}
                                            value={formData.InsuranceAndClaims.ECM_REPLACEMENT_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                                <Row className="mb-3">
                                    <h5>INSPECTION</h5>
                                    <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            DOORSTEP_ACCIDENT_INSPECTION
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "DOORSTEP_ACCIDENT_INSPECTION")}
                                            value={formData.InsuranceAndClaims.DOORSTEP_ACCIDENT_INSPECTION.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            TOWING_INSURANCE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "TOWING_INSURANCE")}
                                            value={formData.InsuranceAndClaims.TOWING_INSURANCE.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                            INSURANCE_CLAIM_INSPECTION
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "InsuranceAndClaims", "INSURANCE_CLAIM_INSPECTION")}
                                            value={formData.InsuranceAndClaims.INSURANCE_CLAIM_INSPECTION.price}
                                            name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                            </Row>
                        </Row>
                        <Row className="mb-3">
                            <h2>SOS Service</h2>
                            <Row className="mb-3 pb-3 pt-3" style={{ border: '1px solid grey' }}>
                             <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               BATTERY_JUMPSTART
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "BATTERY_JUMPSTART")}
                                        value={formData.SOS_Services.BATTERY_JUMPSTART.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_FLUID_LEAKAGE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "CAR_FLUID_LEAKAGE")}
                                        value={formData.SOS_Services.CAR_FLUID_LEAKAGE.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_ENGINE_SCANNING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "CAR_ENGINE_SCANNING")}
                                        value={formData.SOS_Services.CAR_ENGINE_SCANNING.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                                                        <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                WHEEL_LIFT_TOW_20_KMS
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                           onChange={(e) => handleInputChange(e, "SOS_Services", "WHEEL_LIFT_TOW_20_KMS")}
                                        value={formData.SOS_Services.WHEEL_LIFT_TOW_20_KMS.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_SELF_STARTER_ISSUE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "CAR_SELF_STARTER_ISSUE")}
                                        value={formData.SOS_Services.CAR_SELF_STARTER_ISSUE.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                             <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                               FLAT_BED_TOW_20KM
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "FLAT_BED_TOW_20KM")}
                                        value={formData.SOS_Services.FLAT_BED_TOW_20KM.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CLUTCH_BREAKDOWN
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "CLUTCH_BREAKDOWN")}
                                        value={formData.SOS_Services.CLUTCH_BREAKDOWN.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                INSURANCE_ACCIDENT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "INSURANCE_ACCIDENT")}
                                        value={formData.SOS_Services.INSURANCE_ACCIDENT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CAR_FLOODING
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "CAR_FLOODING")}
                                        value={formData.SOS_Services.CAR_FLOODING.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                BRAKE_FAILURE
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            o onChange={(e) => handleInputChange(e, "SOS_Services", "BRAKE_FAILURE")}
                                        value={formData.SOS_Services.BRAKE_FAILURE.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                CRITICAL_DASHBOARD_LIGHT
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "CRITICAL_DASHBOARD_LIGHT")}
                                        value={formData.SOS_Services.CRITICAL_DASHBOARD_LIGHT.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col>  
                            <Col lg={4}>
                                <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                    <Col lg={6}>
                                        <Form.Group as={Row} style={{ marginBottom: '4px' }}>
                                            <Form.Label as={Col} lg={12} style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                                                WRONG_FUEL_EMERGENCY
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control
                                            onChange={(e) => handleInputChange(e, "SOS_Services", "WRONG_FUEL_EMERGENCY")}
                                        value={formData.SOS_Services.WRONG_FUEL_EMERGENCY.price}
                                        name='price' placeholder="Price" />
                                    </Col>
                                </Form.Group>
                            </Col> 
                            </Row>
                        </Row>
                    </Row> 

                    <Row>
                        <Form.Group as={Col}><button type="submit" className="btn btn-primary">Submit</button></Form.Group>
                    </Row>
                </Form>
            </Container>
        </Box>
    </Box>
    );
};
export default Service;
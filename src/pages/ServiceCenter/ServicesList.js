import Accordion from "react-bootstrap/Accordion";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import './Serviceslist.css'
const AllCollapseExample = () => {
  const [services, setServices] = useState([]);
  const { modelId } = useParams();
  console.log(modelId)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    console.log('Model ID:', modelId); // Add this line
    const getServiceByModelId = () => {
      axios
        .get(`https://gocarsmithbackend.onrender.com/api/admin/getServiceByModelId/${modelId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        .then((response) => {
          console.log('API Response:', response);
          if (response) {
            setServices([response.data]);
            setLoading(false);
          } else {
            setServices([]);
          }

        })
        .catch((error) => {
          setError('Error fetching services for the given modelId');
          setLoading(false);
        });
    };

    getServiceByModelId();
  }, [modelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check for error state
  if (error) {
    return <div>{error}</div>;
  }

  // Check if services are found
  if (services.length === 0) {
    return <div>No services found for the given modelId</div>;
  }

  return (
    <Container>
      <Row>
        <h2>SERVICE LIST</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>PERIODIC SERVICES</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul key={eachServices.PeriodicServices._id}>
                          <li>
                            {eachServices.PeriodicServices.BASIC_SERVICE.name}
                          </li>

                          <li>
                            {
                              eachServices.PeriodicServices.STANDARD_SERVICE.name
                            }
                          </li>
                          <li>
                            {
                              eachServices.PeriodicServices
                                .COMPREHENSIVE_SERVICE.name
                            }
                          </li>
                          <li>
                            BRAKE MAINTENANCE
                            <ul>
                              <li>
                                {
                                  eachServices.PeriodicServices.FRONT_BRAKE_PADS
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.PeriodicServices.REAR_BRAKE_PADS
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.PeriodicServices
                                    .FRONT_BRAKE_DISCS.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.PeriodicServices
                                    .CALIPER_PIN_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.PeriodicServices.DISC_TURNNING
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.PeriodicServices
                                    .HANDBRAKE_WIRE_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.PeriodicServices
                                    .BRAKE_DRUMSTURNING.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.PeriodicServices
                                    .WHEEL_CYLINDER_REPLACEMENT.name
                                }
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>AC SERVICE& REPAIR</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            {eachServices.AcServices.REGULAR_AC_SERVICE.name}
                          </li>

                          <li>
                            {
                              eachServices.AcServices
                                .HIGH_PERFORMANCE_AC_SERVICE.name
                            }
                          </li>
                          <li>
                            AC FITMENTS
                            <ul>
                              <li>
                                {
                                  eachServices.AcServices
                                    .COOLING_COIL_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.AcServices.CONDENSER_REPLACEMNT
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.AcServices.COMPRESSOR_REPLACEMNT
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.AcServices
                                    .HEATING_COIL_REPLACEMNT.name
                                }
                              </li>
                              <li>
                                {eachServices.AcServices.V_BELT_REPLACEMNT.name}
                              </li>
                              <li>
                                {
                                  eachServices.AcServices
                                    .AC_BLOWER_MOTOR_REPLACEMNT.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            RADIATOR
                            <ul>
                              <li>
                                {
                                  eachServices.AcServices.RADIATOR_REPLACEMNT
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.AcServices
                                    .RADIATOR_FAN_MOTOR_REPLACEMNT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.AcServices
                                    .RADIATOR_FLUSH_AND_CLEAN.name
                                }
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>BATTERIES</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            AMARON
                            <ul>
                              <li>
                                {
                                  eachServices.BatteriesService
                                    .AMARON_44_MONTHS_WARRANTY.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.BatteriesService
                                    .AMARON_55_MONTHS_WARRANTY.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.BatteriesService
                                    .AMARON_66_MONTHS_WARRANTY.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            EXIDE
                            <ul>
                              <li>
                                {
                                  eachServices.BatteriesService
                                    .EXIDE_44_MONTHS_WARRANTY.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.BatteriesService
                                    .EXIDE_55_MONTHS_WARRANTY.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.BatteriesService
                                    .EXIDE_66_MONTHS_WARRANTY.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            LIVGUARD
                            <ul>
                              <li>
                                {
                                  eachServices.BatteriesService
                                    .LIVGUARD_60_MONTHS_WARRANTY.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.BatteriesService
                                    .LIVGUARD_72_MONTHS_WARRANTY.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            ALTERNATOR
                            <ul>
                              <li>ALTERNATOR REPLACEMENT</li>
                              <li>ALTERNATOR REPAIR</li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>TYRES & WHEEL CARE</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            APOLLO
                            <ul>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T
                                    .name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            MRF{" "}
                            <ul>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .MRF_ZLX_SIZE_165_80_R14_TL.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .MRF_SIZE_165_80_R14_85TL.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .MRF_ZVTY_SIZE_185_65_R15_88TL.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            BRIDGESTONE
                            <ul>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .BRIDGESTONE_B290_SIZE_165_80_R14_81S.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V
                                    .name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            JK
                            <ul>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .JK_UX_ROYALE_SIZE_165_80_R14.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            CEAT
                            <ul>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .CEAT_MILAZE_SIZE_165_80_R14_85S.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .CEAT_MILAZE_X3__SIZE_165_65_R15.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            YOKOHAMA
                            <ul>
                              <li>YOKOHAMA Earth 1E400</li>
                            </ul>
                          </li>
                          <li>
                            WHEEL CARE SERVICES
                            <ul>
                              <li>
                                {
                                  eachServices.TyresAndWheelsCare
                                    .COMPLETE_WHEEL_CARE.name
                                }
                              </li>
                              <li>
                                {eachServices.TyresAndWheelsCare.MUD_FLAPS.name}
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>DENTING & PAINTING</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            FRONT SIDE
                            <ul>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .FRONT_BUMBER_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting.BONNET_PAINT
                                    .name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            REAR SIDE
                            <ul>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .REAR_BUMBER_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting.BOOT_PAINT
                                    .name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            WHOLE BODY
                            <ul>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .FULL_BODY_DENT_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting.ALLOY_PAINT
                                    .name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            LEFT SIDE
                            <ul>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .LEFT_FENDER_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .LEFT_FRONT_DOOR_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .LEFT_REAR_DOOR_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .LEFT_QUARTER_PANEL_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .LEFT_RUNNING_BOARD_PAINT.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            RIGHT SIDE
                            <ul>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .RIGHT_FENDER_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .RIGHT_FRONT_DOOR_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .RIGHT_REAR_DOOR_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .RIGHT_QUARTER_PANEL_PAINT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DentingAndPainting
                                    .RIGHT_RUNNING_BOARD_PAINT.name
                                }
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>DETAILING SERVICES</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            POLISING
                            <ul>
                              <li>
                                {
                                  eachServices.DetailsServicing
                                    ._3M_CAR_RUBBING_POLISHING.name
                                }{" "}
                              </li>
                            </ul>
                          </li>
                          <li>
                            CERAMIC COATING
                            <ul>
                              <li>
                                {
                                  eachServices.DetailsServicing.CERAMIC_COATING
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DetailsServicing
                                    .MEGUIARS_CERAMIC_COATING.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            TEFLIN COATING
                            <ul>
                              <li>
                                {
                                  eachServices.DetailsServicing
                                    .MEGUIARS_TEFLON_COATING.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.DetailsServicing
                                    ._3M_TEFLON_COATING.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            PPF
                            <ul>
                              <li>
                                {
                                  eachServices.DetailsServicing
                                    .PPF_PAINT_PROTECTION_FILM.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            ANTI RUST COATING
                            <ul>

                              <li>
                                {
                                  eachServices.DetailsServicing.SILENCER_COATING
                                    .name
                                }
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>CAR SPA & CLEANING</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            FESTIVAL SPECIAL
                            <ul>
                              <li>
                                {
                                  eachServices.CarSpaCleaning
                                    .FESTIVAL_360_DEEP_CLEANING.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            SPA
                            <ul>
                              <li>
                                {
                                  eachServices.CarSpaCleaning.CAR_INTERIOR_SPA
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarSpaCleaning.DEEP_ALL_ROUND_SPA
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarSpaCleaning.PREMIUM_TOP_WASH
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarSpaCleaning
                                    .CAR_RUBBING_POLISHING.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarSpaCleaning
                                    .RAT_PEST_REPELLENT_TREATMENT.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            INSPECTION
                            <ul>
                              <li>
                                {
                                  eachServices.CarSpaCleaning
                                    .CAR_INSPECTION_DIAGNOSTICS.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            SUNROOF{" "}
                            <ul>
                              <li>
                                {
                                  eachServices.CarSpaCleaning.SUNROOF_SERVICE
                                    .name
                                }
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7">
            <Accordion.Header>CAR INSPECTIONS</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            USED CAR
                            <ul>
                              <li>
                                {
                                  eachServices.CarInspections
                                    .SECOND_HAND_CAR_INSPECTION.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            INSPECTON
                            <ul>
                              <li>
                                {
                                  eachServices.CarInspections
                                    .ROAD_TRIP_INSPECTION.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarInspections.ENGINE_SCANNING
                                    .name
                                }
                              </li>
                              <li>INSURANCE CLAIM INSPECTION</li>
                              <li>
                                {
                                  eachServices.CarInspections
                                    .COMPLETE_SUSPENSION_INSPECTION.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarInspections.CAR_FLUIDS_CHECK
                                    .name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            RADIATOR
                            <ul>
                              <li>
                                {
                                  eachServices.CarInspections
                                    .RADIATOR_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarInspections
                                    .RADIATOR_FAN_MOTOR_REPLACEMENT.name
                                }
                              </li>
                              <li>RADIATOR FLUSH &CLEAN</li>
                            </ul>
                          </li>
                          <li>
                            CUSTOM ISSUES
                            <ul>
                              <li>
                                {
                                  eachServices.CarInspections
                                    .CAR_WATERLOG_ASSISTANCE.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarInspections.CAR_ENGINE_ISSUES
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarInspections
                                    .PROBLEM_WITH_CAR_BRAKES_WHEELS.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.CarInspections
                                    .DAMAGED_CAR_BODY_INTERIORS.name
                                }
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="8">
            <Accordion.Header>WINDSHIELDS & LIGHTS</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            WINDSHIELDS
                            <ul>
                              <li>
                                {
                                  eachServices.WindshielsLight
                                    .FRONT_WINDSHIELD_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.WindshielsLight
                                    .REAR_WINDSHIELD_REPLACEMENT.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            GLASSES
                            <ul>
                              <li>
                                {
                                  eachServices.WindshielsLight
                                    .DOOR_GLASS_REPLACEMENT.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            LIGHTS
                            <ul>
                              <li>
                                {
                                  eachServices.WindshielsLight.FRONT_HEADLIGHT
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.WindshielsLight.REAR_TAILLIGHT
                                    .name
                                }
                              </li>
                              <li>
                                {eachServices.WindshielsLight.FOG_LIGHT.name}
                              </li>
                            </ul>
                          </li>
                          {/* <li>
                            SIDE MIRROR
                            <ul>
                              <li>
                                {
                                  eachServices.WindshielsLight
                                    .SIDE_MIRROE_REPLACEMENT.name
                                }
                              </li>
                            </ul>
                          </li> */}
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="9">
            <Accordion.Header>SUSPENSION AND FITNESS</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            STEERING
                            <ul>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .ESP_MODULE_REPAIR.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .STEERING_RACK_REPAIR.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            SUSPENSION
                            <ul>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .FRONT_SHOCK_ABSORBER_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .REAR_SHOCK_ABSORBER_REPLACEMENT.name
                                }
                              </li>
                              {/* <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .SUSPENSION_LOWER_ARM_REPLACEMNT.name
                                }
                              </li> */}
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .LINK_ROD_REPLACEMENT.name
                                }
                              </li>
                              {/* <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .TIE_ROA_END_REPLACEMENT.name
                                }
                              </li> */}
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .COMPLETE_SUSPENSION_INSPECTION.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .FRONT_SHOCKER_MOUNT_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .FRONT_AXLE_REPAIR.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            FITMENTS
                            <ul>
                              {/* <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .SELENCER_REPAIR.name
                                }
                              </li> */}
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .RADIATOR_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .GEAR_BOX_MOUNTING_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .ENGINE_MOUNTING_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .FUEL_PUMP_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .RADIATOR_FAN_MOTOR_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .WATER_PUMP_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness.ECM_REPAIR
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .PREMIUM_TOP_WASH.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .DICKEY_SHOCKER_REPLACEMENT.name
                                }
                              </li>
                              {/* <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .START_MOTOT_REPAIR.name
                                }
                              </li> */}
                              <li>
                                {
                                  eachServices.SuspensionAndFitness.MUD_FLAPS
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .DOOR_LATCH_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .POWER_WINDOW_REPAIR.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            CUSRTOM ISSUES
                            <ul>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .NOISES_WITH_CAR_SUSPENSION_STEERING.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.SuspensionAndFitness
                                    .FAULTY_ELECTRICALS.name
                                }
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="10">
            <Accordion.Header>CLUTCH & BODY PARTS</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            CLUTCH
                            <ul>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .CLUTCH_SET_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .FLYWHEEL_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .CLUTCH_BEARING_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts.FLYWHEEL_TURNING
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts.CLUTCH_OVERHAUL
                                    .name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            BODY PARTS
                            <ul>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .FRONT_BUMBER_REPLACEMENT.name
                                }
                              </li>
                              {/* <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .REAR_BUMBER_REPLACEMENT.name
                                }
                              </li> */}
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .BONNET_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts.BOOT_REPLACEMENT
                                    .name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .FENDER_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .RIGHT_FRONT_DOOR_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .RIGHT_REAR_DOOR_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .LEFT_FRONT_DOOR_REPLACEMENT.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .LEFT_REAR_DOOR_REPLACEMENT.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            CUSTOM ISSUES
                            <ul>
                              <li>
                                {
                                  eachServices.ClutchBodyParts
                                    .CLUTCH_TRANSMISSION_TROUBLES.name
                                }
                              </li>
                              <li>
                                {eachServices.ClutchBodyParts.ABS_ISSUE.name}
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="11">
            <Accordion.Header>INSURANCE CLAIMS</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            KNOW YOUR POLICY
                            <ul>
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .KNOW_YOUR_POLICY.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            ACCIENDTAL REPAIRS
                            <ul>
                              {/* <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .ACCIENDATAL_DENRTING_PAINTING_INSURANCE
                                    .name
                                }
                              </li> */}
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .CAR_FLOOD_DAMAGE_INSURANCE.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .FIRE_DAMAGE_ASSISTANCE_INSURANCE.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .WINDSHIELD_REPLACEMENT_INSURANCE.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            THEFT/LOST
                            <ul>
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .KEY_REPLACEMENT_INSURANCE.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .TYRES_WHEEL_REPLACEMENT_INSURANCE.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .BATTERY_REPLACEMENT_INSURANCE.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .CAR_THEFT_CLAIM_INSURANCE.name
                                }
                              </li>
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .ECM_REPLACEMENT_INSURANCE.name
                                }
                              </li>
                            </ul>
                          </li>
                          <li>
                            INSPECTION
                            <ul>
                              {/* <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .DOORSTEP_ACCIENDTS_INSPECTION.name
                                }
                              </li> */}
                              {/* <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .TOWLING_ISURANCE.name
                                }
                              </li> 
                              <li>
                                {
                                  eachServices.InsuranceAndClaims
                                    .INSURANCE_CLIAM_INSPECTION.name
                                }
                              </li>*/}
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="12">
            <Accordion.Header>SOS SERVICE</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      {services.map((eachServices) => (
                        <ul>
                          <li>
                            {eachServices.SOS_Services.BATTERY_JUMPSTART.name}
                          </li>
                          <li>
                            {eachServices.SOS_Services.CAR_FLUID_LEAKAGE.name}
                          </li>
                          <li>
                            {eachServices.SOS_Services.CAR_ENGINE_SCANNING.name}
                          </li>
                          <li>
                            {
                              eachServices.SOS_Services.WHEEL_LIFT_TOW_20_KMS
                                .name
                            }
                          </li>
                          <li>
                            {
                              eachServices.SOS_Services.CAR_SELF_STARTER_ISSUE
                                .name
                            }
                          </li>
                          <li>
                            {eachServices.SOS_Services.FLAT_BED_TOW_20KM.name}
                          </li>
                          <li>
                            {eachServices.SOS_Services.CLUTCH_BREAKDOWN.name}
                          </li>
                          {/* <li>
                            {eachServices.SOS_Services.INSURANCE_ACCIENT.name}
                          </li> */}
                          <li>{eachServices.SOS_Services.CAR_FLOODING.name}</li>
                          <li>
                            {eachServices.SOS_Services.BRAKE_FAILURE.name}
                          </li>
                          <li>
                            {
                              eachServices.SOS_Services.CRITICAL_DASHBOARD_LIGHT
                                .name
                            }
                          </li>
                          <li>
                            {
                              eachServices.SOS_Services.WRONG_FUEL_EMERGENCY
                                .name
                            }
                          </li>
                        </ul>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
};

export default AllCollapseExample;
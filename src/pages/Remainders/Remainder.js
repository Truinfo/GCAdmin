
import { Box } from "@mui/material";
import React, { useState } from "react";
import { Container, Row , Col, Button, Modal, Form } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Sidebar from "../../components/Sidebar/Sidebar";

// Setup the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

function Remainders(){
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    subject: "",
    description: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  });
  const handleDateClick = (info) => {
    const clickedDate = moment(info.date).format("YYYY-MM-DD");
  
    setSelectedDate(info.date);
    setIsModalOpen(true);
    setEventData({
      ...eventData,
      startDate: clickedDate,
      endDate: clickedDate,
    });
  };
  
  const addEvent = () => {
    if (eventData.subject.trim() !== "") {
      const newEvent = {
        title: eventData.subject,
        start: new Date(eventData.startDate + "T" + eventData.startTime),
        end: new Date(eventData.endDate + "T" + eventData.endTime),
        description: eventData.description,
        color: selectedColor, // Use the selected color
      };

      // Update events by merging existing events and the new event
      setEvents((prevEvents) => [...prevEvents, newEvent]);

      setIsModalOpen(false);
      setEventData({
        subject: "",
        description: "",
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
      });
    }
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#000";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const eventContent = (info) => {
    return (
      <div
        style={{
          backgroundColor: info.event.color,
          borderRadius: '4px',
          color: '#000',
          height: '100%',
          width: '100%',
        }}
      >
        <b>{info.timeText}</b> {info.event.title}
        {info.event.extendedProps && info.event.extendedProps.description && (
          <p>{info.event.extendedProps.description}</p>
        )}
      </div>
    );
  };
  const colorPalette = [
    "#FF5733",
    "#33FF57",
    "#5733FF",
    "#33FFFF",
    // Add more colors as needed
  ];

  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);

  const sortedEvents = events.sort((a, b) => a.start - b.start);

    return(
        <div> <Box sx={{ display: "flex" }}>
        {/* Include the Sidebar component */}
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "35px" }}>
<h2>Remainders</h2>
<Container>
      <div>
      <Calendar
          localizer={localizer}
          events={sortedEvents}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day"]}
          selectable
          onSelectSlot={handleDateClick}
          style={{ height: 500 }}
          components={{
            event: eventContent,
          }}
          showMultiDayTimes
        />
        <Modal
          show={isModalOpen}
          centered
          size="lg"
          onHide={() => setIsModalOpen(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 style={{ marginLeft: "330px" }}>Add Event</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={eventData.subject}
                  onChange={(e) =>
                    setEventData({ ...eventData, subject: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="textarea"
                  value={eventData.description}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={eventData.startTime}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          startTime: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={eventData.endTime}
                      onChange={(e) =>
                        setEventData({ ...eventData, endTime: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={eventData.startDate}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={eventData.endDate}
                      onChange={(e) =>
                        setEventData({ ...eventData, endDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  {/* Updated Color Palette */}
                  <Form.Group>
                    <Form.Label>Event Color</Form.Label>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        marginTop: "10px",
                      }}
                    >
                      {colorPalette.map((color) => (
                        <Button
                          key={color}
                          style={{
                            backgroundColor: color,
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border:
                              color === selectedColor
                                ? "2px solid #000"
                                : "2px solid transparent",
                          }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={addEvent}>
              Add Event
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
       </Box></Box> </div>
    );
}
export default Remainders
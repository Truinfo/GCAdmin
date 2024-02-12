import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BiErrorAlt } from 'react-icons/bi';

const Error = () => {
  return (
    <Container fluid style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row>
        <Col className="text-center">
          <BiErrorAlt style={{ fontSize: '200px', color: 'red' }} />
          <h1 style={{ marginTop: "10px", color: 'red' }}>
            404: Error
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Error;

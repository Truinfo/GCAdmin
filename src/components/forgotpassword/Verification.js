import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BiCheckCircle } from 'react-icons/bi';

const Verification = () => {
  return (
    <Container fluid style={{ backgroundColor: 'green', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row className="justify-content-center">
        <Col className="text-center">
          <BiCheckCircle style={{ fontSize: '200px', color: 'white' }} />
          <h1 style={{ marginTop: "10px", color: 'white' }}>
            Email Verification
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Verification;

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServiceCenterVirification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resendCountdown, setResendCountdown] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const generateAndSendOTP = async () => {
    try {
      const response = await fetch('https://gocarsmithbackend.onrender.com/api/admin/serviceCenter/generateAndSendServiceCenterOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowEmailInput(false);
        setShowOtpSection(true);
        setResultMessage(data.message);
      } else {
        setResultMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch('https://gocarsmithbackend.onrender.com/api/admin/serviceCenter/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setResultMessage('OTP verified successfully. Registration complete!');
        navigate('/ServiceLocations');
      } else {
        setResultMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resendOTP = async () => {
    try {
      const response = await fetch('https://gocarsmithbackend.onrender.com/api/admin/serviceCenter/generateAndSendServiceCenterOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResultMessage(data.message);
        setResendCountdown(30);
        setShowResendButton(false); // Hide the button after clicking it
      } else {
        setResultMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setResendCountdown((prev) => (prev === 0 ? 0 : prev - 1));
      if (resendCountdown === 1) {
        setShowResendButton(true); // Show the button after the initial countdown
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendCountdown]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" >
      <Box m={2} border={1} borderColor="black" borderRadius={4} p={7}>
        <Typography variant="h5" gutterBottom>
          Service Center Registration
        </Typography>

        {showEmailInput && (
          <>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />

            <Button
              variant="contained"
              color="primary"
              onClick={generateAndSendOTP}
              style={{
                marginTop: '20px', // Adjust the top margin as needed

              }}
            >
              Send OTP
            </Button>
          </>
        )}

        {showOtpSection && (
          <Box mt={2}>
            <TextField
              label="Enter OTP"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
              required
            />

            <Button variant="contained" color="primary" onClick={verifyOTP}>
              Verify OTP
            </Button>

            {showResendButton && (
              <Button variant="contained" color="primary" onClick={resendOTP}>
                Resend OTP
              </Button>
            )}

            {resendCountdown > 0 && (
              <Typography variant="body1" mt={2}>
                Resend OTP in {resendCountdown} seconds
              </Typography>
            )}
          </Box>
        )}

        <Typography variant="body1" mt={2}>
          {resultMessage}
        </Typography>
      </Box>

    </Box>

  );
};

export default ServiceCenterVirification;
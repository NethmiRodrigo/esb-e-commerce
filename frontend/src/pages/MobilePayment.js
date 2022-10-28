import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Collapse, Alert } from '@mui/material';

import './styles/divider.css';
import axios from 'axios';

export function MobilePayment() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otp, setOtp] = useState('');

  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const total = sessionStorage.getItem('total');

  const sendOtp = async () => {
    setShowError(false);
    try {
      const result = await axios.post('http://localhost:5005/payment/send-otp', { mobileNumber });
      if (!result.data) {
        setError('Failed while sending otp');
        setShowError(true);
        return;
      }
      setOtp(result.data);
    } catch (error) {
      setError(error.toString());
      setShowError(true);
    }
  };

  const makePayment = async () => {
    setShowError(false);
    try {
      if (otpInput !== otp) {
        setError('Invalid otp');
        setShowError(true);
        return;
      }
      sessionStorage.removeItem('cart');
      sessionStorage.removeItem('total');
      navigate('/success');
    } catch (error) {
      setError(error.toString());
      setShowError(true);
    }
  };

  return (
    <>
      {showError && (
        <Collapse in={showError}>
          <Alert onClose={() => setShowError(false)} severity="error">
            {error}
          </Alert>
        </Collapse>
      )}
      <div
        style={{
          backgroundColor: '#f2f2f2',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          style={{ height: '75vh', width: '50vw', textAlign: 'center', backgroundColor: 'white' }}
          sx={{ boxShadow: 3, pb: 4, pt: 4 }}
        >
          <Grid container item xs={12} alignItems="center" justifyContent="center">
            <Grid item xs={3}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    pr: 2,
                    width: 200,
                    height: 40,
                  },
                }}
              >
                <Paper elevation={0} sx={{ backgroundColor: '#e8e6e6', pt: 1, pl: 3 }}>
                  Total Fee
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 1,
                    pr: 2,
                    width: 200,
                    height: 40,
                  },
                }}
              >
                <Paper elevation={0} sx={{ backgroundColor: '#e8e6e6', pt: 1, pl: 3 }}>
                  Rs. {total || 0}
                </Paper>
              </Box>
            </Grid>
          </Grid>

          <Grid container item xs={6}>
            <Grid item xs={12} sx={{ mb: 2, textAlign: 'center' }}>
              <h3>Payment Details</h3>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Mobile phone number"
                variant="outlined"
                sx={{ width: '280px', mb: 2 }}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </Grid>

            {otp && (
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="OTP"
                  variant="outlined"
                  sx={{ width: '280px', mb: 2 }}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ width: '280px', height: '40px' }}
                onClick={otp ? makePayment : sendOtp}
                disabled={otp ? !otpInput : !mobileNumber}
              >
                {otp ? 'Make payment' : 'Send OTP'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

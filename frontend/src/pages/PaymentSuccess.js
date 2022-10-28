import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Collapse, Alert, Typography } from '@mui/material';
import Iconify from '../components/Iconify';

import './styles/divider.css';
import axios from 'axios';

export function PaymentSuccess() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
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
        <Grid item xs={12}>
          <Typography style={{ fontSize: '3rem', fontWeight: 'bold' }}>Payment Successfull</Typography>
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: 30, marginBottom: 30 }}>
          <img src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png" />
        </Grid>

        <Button variant="contained" sx={{ width: '280px', height: '40px' }} onClick={handleGoHome}>
          Go Back Home
        </Button>
      </Grid>
    </div>
  );
}

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import dayjs from 'dayjs';
import './styles/divider.css';
import axios from 'axios';

export function CardPayment() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');

  const [makePayment, setakePayment] = useState(true);

  const navigate = useNavigate();

  // have to pass item IDs
  const orderPlaced = async () => {
    try {
      const payload = {
        cardName: text1,
        cardNumber: text2,
        ExpDate: text3,
        CVN: text4,
      };
      const result = await axios.post('http://localhost:5001/buyer-items', payload);

      localStorage.setItem('buyer-data', JSON.stringify(payload));

      navigate('/');
    } catch (error) {
      console.error(error);
    }
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
                Rs. 15000
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Grid container item xs={6}>
          <Grid item xs={12} sx={{ mb: 2, textAlign: 'center' }}>
            <h3>Card Details</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Card Name"
              variant="outlined"
              sx={{ width: '280px', mb: 2 }}
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Card Number"
              variant="outlined"
              sx={{ width: '280px', mb: 2 }}
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="date"
              label="Expiry date"
              type="date"
              sx={{ width: 280, mb: 2 }}
              value={text3}
              onChange={(e) => setText3(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="CVN"
              variant="outlined"
              sx={{ width: '280px', mb: 2 }}
              value={text4}
              onChange={(e) => setText4(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" sx={{ width: '280px', height: '40px' }} onClick={makePayment}>
              Make payment
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

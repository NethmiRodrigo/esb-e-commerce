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

import './styles/divider.css';

import axios from 'axios';

function Checkout() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('');

  const [subTot, setSubTot] = useState();
  const [deliveryFee, setDeliveryFee] = useState();
  const [tooFee, setTooFee] = useState();

  const [saveClicked, setSaveClicked] = useState(true);
  const [paymentSelected, setPaymentSelected] = useState(true);

  const navigate = useNavigate();

  const proceedToCheckout = () => {};

  const checkSave = async () => {
    if (text1 !== '' && text2 !== '' && text3 !== '') {
      try {
        const result = await axios.get('http://localhost:5000/delivery-items');
        console.log(result.data);
        setDeliveryFee(result.data.deliveryPrice);

        setSaveClicked(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // have to pass item IDs
  const orderPlaced = async () => {
    try {
      const payload = {
        customerFirstName: text1,
        customerLastName: text2,
        address: text3,
        deliveryPrice: deliveryFee,
        totalFee: 1500,
        items: [1, 2, 3],
      };
      const result = await axios.post('http://localhost:5001/buyer-items', payload);

      localStorage.setItem('buyer-data', JSON.stringify(payload));

      if (paymentMethod === 'card') {
        navigate('/card-payment');
      } else {
        navigate('/mobile-payment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <h3>Delivery Details</h3>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              sx={{ width: '280px' }}
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              sx={{ width: '280px' }}
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              sx={{ width: '590px' }}
              value={text3}
              onChange={(e) => setText3(e.target.value)}
              required
            />
          </Grid>

          <Button variant="contained" sx={{ width: '100px', height: '40px' }} onClick={checkSave}>
            Save
          </Button>
        </Grid>

        {/* <Divider sx={{ mt: 2, mb: 2 }} orientation="vertical" /> */}
        <Divider orientation="vertical" flexItem sx={{ ml: 2 }} />

        <Grid container item xs={4} sx={{ ml: 5 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <h3>Fee Details</h3>
          </Grid>
          {/* <Divider sx={{ mt: 2, mb: 2, color: 'red' }} /> */}

          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 300,
                  height: 40,
                },
              }}
            >
              <Paper elevation={0} sx={{ backgroundColor: '#e8e6e6', pt: 1, pl: 3 }}>
                Sub total
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 200,
                  height: 40,
                },
              }}
            >
              <Paper elevation={0} sx={{ backgroundColor: '#e8e6e6', pt: 1, pl: 3 }}>
                {}
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 300,
                  height: 40,
                },
              }}
            >
              <Paper elevation={0} sx={{ backgroundColor: '#e8e6e6', pt: 1, pl: 3 }}>
                Delivery Fee
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 200,
                  height: 40,
                },
              }}
            >
              <Paper elevation={0} sx={{ backgroundColor: '#e8e6e6', pt: 1, pl: 3 }}>
                {deliveryFee}
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 300,
                  height: 40,
                },
              }}
            >
              <Paper elevation={0} sx={{ backgroundColor: '#e8e6e6', pt: 1, pl: 3 }}>
                Total fee
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 200,
                  height: 40,
                },
              }}
            >
              <Paper elevation={0} sx={{ backgroundColor: '#e8e6e6', pt: 1, pl: 3 }}>
                {deliveryFee}
              </Paper>
            </Box>
          </Grid>

          <Button
            variant="contained"
            sx={{ width: '335px', mt: 3 }}
            disabled={saveClicked || paymentSelected}
            onClick={orderPlaced}
          >
            Place Order
          </Button>
        </Grid>

        <Grid item xs={6} sx={{ mt: 5 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <h3>Payment Method</h3>
          </Grid>

          <FormControl>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
              <FormControlLabel
                value="card"
                onChange={() => {
                  setPaymentMethod('card');
                  setPaymentSelected(false);
                }}
                control={<Radio />}
                label="Pay with card"
              />
              <FormControlLabel
                value="mobile"
                onChange={() => {
                  setPaymentMethod('mobile');
                  setPaymentSelected(false);
                }}
                control={<Radio />}
                label="Pay by mobile"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;

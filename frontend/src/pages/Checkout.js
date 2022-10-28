import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Divider,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import './styles/divider.css';
import { fCurrency } from 'src/utils/formatNumber';

function Checkout() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryFee, setDeliveryFee] = useState();

  const [saveClicked, setSaveClicked] = useState(true);
  const [paymentSelected, setPaymentSelected] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let cart = sessionStorage.getItem('cart');
    if (cart) {
      cart = JSON.parse(cart);
      let total = 0;
      cart.forEach((product) => (total = total + parseInt(product.price)));
      setSubTotal(total);
      setProducts(cart);
    }
  }, []);

  const checkSave = async () => {
    if (text1 !== '' && text2 !== '' && text3 !== '') {
      try {
        const result = await axios.get('http://localhost:5003/delivery-items');
        setDeliveryFee(result.data.deliveryPrice);
        setTotal(parseInt(subTotal) + parseInt(result.data.deliveryPrice));
        setSaveClicked(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // have to pass item IDs
  const orderPlaced = async () => {
    try {
      let productIds = products.map((product) => product.id);
      const payload = {
        customerFirstName: text1,
        customerLastName: text2,
        address: text3,
        deliveryPrice: deliveryFee,
        totalFee: subTotal,
        items: productIds,
      };
      await axios.post('http://localhost:5002/buyer-items', payload);

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

  const removeItem = (product) => {
    let cart = [...products];
    cart.splice(
      cart.findIndex((item) => item.id === product.id),
      1
    );
    setProducts(cart);
    setSubTotal(parseInt(subTotal) - parseInt(product.price));
    if (total > 0) setTotal(parseInt(total) - parseInt(product.price));
    sessionStorage.setItem('cart', cart);
  };

  return (
    <div>
      <Grid container>
        <Grid container item xs={6}>
          {products.length > 0 && (
            <>
              <h3>Your Cart</h3>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right"></TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Avatar
                            alt={product.imgURI}
                            src={product.imgURI}
                            sx={{ width: 100, height: 100 }}
                            variant="rounded"
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{fCurrency(product.price)}</TableCell>
                        <TableCell>
                          <Button variant="outlined" color="error" onClick={() => removeItem(product)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '10px' }}>
            <h3>Delivery Details</h3>
          </Grid>
          <Grid item xs={6} style={{ marginTop: '10px' }}>
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
              style={{ marginTop: '10px' }}
              required
            />
          </Grid>

          <Button
            variant="contained"
            sx={{ width: '100px', height: '40px' }}
            onClick={checkSave}
            disabled={products.length == 0}
            style={{ marginTop: '10px' }}
          >
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
                {fCurrency(subTotal)}
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
                {fCurrency(deliveryFee)}
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
                {fCurrency(total)}
              </Paper>
            </Box>
          </Grid>

          <Button
            variant="contained"
            sx={{ width: '335px', height: '50px' }}
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

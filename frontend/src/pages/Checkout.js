import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

function Checkout() {
  return (
    <div>
      <Grid container>
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <h3>Delivery Details</h3>
          </Grid>
          <Grid item xs={6}>
            <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{ width: '280px', mb: 3 }} />
          </Grid>

          <Grid item xs={6}>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ width: '280px', mb: 3 }} />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ width: '590px', mb: 3 }} />
          </Grid>

          <Button variant="contained" sx={{ width: '100px', height: '40px' }}>
            Save
          </Button>
        </Grid>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <Grid item xs={4} sx={{ ml: 5 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <h3>Fee Details</h3>
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />

          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Sub total" variant="outlined" sx={{ width: '440px', mb: 3 }} />
          </Grid>

          <Grid item xs={6}>
            <TextField id="outlined-basic" label="Delivery charges" variant="outlined" sx={{ width: '440px', mb: 3 }} />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Total fee" variant="outlined" sx={{ width: '440px', mb: 3 }} />
          </Grid>

          <Button variant="contained" sx={{ width: '440px' }}>
            Place Order
          </Button>
        </Grid>

        <Grid item xs={6} sx={{ mt: 5 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <h3>Payment Method</h3>
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Sub total" variant="outlined" sx={{ width: '440px', mb: 3 }} />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Delivery charges" variant="outlined" sx={{ width: '440px', mb: 3 }} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;

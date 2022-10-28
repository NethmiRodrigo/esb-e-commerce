import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// material
import { Box, Card, Link, Typography, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// utils
import { fCurrency } from '../../../utils/formatNumber';
// components

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
  setCartValue: PropTypes.any,
  cartValue: PropTypes.number,
};

export default function ShopProductCard({ setCartValue, cartValue, product, addToCart }) {
  const { name, imgURI, price, quantity } = product;
  console.log(product);

  const [buttonState, setButtonState] = useState(true);
  const [buttonText, setButtonText] = useState(true);

  const changeBtnState = () => {
    if (buttonState) {
      setCartValue(cartValue + 1);
      addToCart(product, 'add');
    } else {
      setCartValue(cartValue - 1);
      addToCart(product, 'remove');
    }
    setButtonState(!buttonState);
    setButtonText(!buttonText);
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={imgURI} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>
          {quantity == 0 && <Chip label="Out of Stock" color="error" />}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            &nbsp;
            {fCurrency(price)}
          </Typography>

          <Button variant={buttonState ? 'outlined' : 'contained'} onClick={changeBtnState} disabled={quantity == 0}>
            {buttonState ? 'Add to cart' : 'Remove '}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductList, ProductCartWidget } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const result = await axios.get('http://localhost:5004/products');
      setProducts(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [cartValue, setCartValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let cart = sessionStorage.getItem('cart');
    if (cart) {
      cart = JSON.parse(cart);
      setCartValue(cart.length);
    }
    fetchProducts();
  }, []);

  const addToCart = (product, mode = 'add') => {
    let cart = sessionStorage.getItem('cart');
    if (cart) {
      cart = JSON.parse(cart);
    } else cart = [];
    if (mode === 'add') cart.push(product);
    else {
      if (cart.length > 0) {
        cart.splice(
          cart.findIndex((e) => e.id === product.id),
          1
        );
      }
    }
    cart = JSON.stringify(cart);
    sessionStorage.setItem('cart', cart);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Page title="Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <ProductList setCartValue={setCartValue} cartValue={cartValue} products={products} addToCart={addToCart} />
        <ProductCartWidget cartValue={cartValue} proceedToCheckout={proceedToCheckout} />
      </Container>
    </Page>
  );
}

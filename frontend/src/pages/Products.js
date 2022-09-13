import { useEffect, useState } from 'react';
import axios from 'axios';
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
      const result = await axios.get('http://localhost:5000/products');
      setProducts(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [cartValue, setCartValue] = useState(0);

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <ProductList setCartValue={setCartValue} cartValue={cartValue} products={products} />
        <ProductCartWidget cartValue={cartValue} />
      </Container>
    </Page>
  );
}

import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import PropTypes from 'prop-types';

// material
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Typography, Button, Grid, Card, Box, Link } from '@mui/material';
// components
import { styled } from '@mui/material/styles';

import { FormProvider, RHFTextField } from '../components/hook-form';
import Page from '../components/Page';

// mock
import PRODUCTS from '../_mock/products';

// utils
import { fCurrency } from '../utils/formatNumber';

export default function MyItem() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Page title="Dashboard: Products">
      <Container>
        <BasicModal open={open} handleClose={handleClose} type={2} />

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Products
          </Typography>

          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            <Button variant="contained" onClick={handleOpen}>
              + Add New Product
            </Button>
          </Stack>
        </Stack>

        <MyProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}

MyProductList.propTypes = {
  products: PropTypes.array.isRequired,
  setCartValue: PropTypes.any,
  cartValue: PropTypes.number,
};

function MyProductList({ setCartValue, cartValue, products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <MyShopProductCard product={product} setCartValue={setCartValue} cartValue={cartValue} />
        </Grid>
      ))}
    </Grid>
  );
}

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

MyShopProductCard.propTypes = {
  product: PropTypes.object,
  setCartValue: PropTypes.any,
  cartValue: PropTypes.number,
};

function MyShopProductCard({ setCartValue, cartValue, product }) {
  const { name, cover, price } = product;

  const [buttonState, setButtonState] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card>
      <BasicModal open={open} handleClose={handleClose} type={1} />
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            &nbsp;
            {fCurrency(price)}
          </Typography>
          <Button variant={buttonState ? 'outlined' : 'contained'} onClick={handleOpen}>
            Edit
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  bgcolor: 'background.paper',
  borderRadius: '2%',
};

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 880,
  margin: 'auto',
  minHeight: '65vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

BasicModal.propTypes = {
  type: PropTypes.number,
  open: PropTypes.bool,
  handleClose: PropTypes.any,
  objArr: PropTypes.any,
};

function BasicModal({ type, open, handleClose, objArr }) {
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    Item_name: '',
    Item_price: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container maxWidth="sm">
            <ContentStyle>
              <Typography variant="h4" gutterBottom>
                {type === 2 ? 'Add new product' : 'Edit product'}
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>

              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ mb: 4 }}>
                  <RHFTextField name="Item_name" label="Item name" />
                  <RHFTextField name="Item_price" label="Item price" />
                  <Button variant="outlined" component="label">
                    upload item image
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  {type === 2 ? 'Add product' : 'Edit product'}
                </LoadingButton>
              </FormProvider>
            </ContentStyle>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

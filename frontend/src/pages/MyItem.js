import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';

import PropTypes from 'prop-types';

// material
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Typography, Button, Grid, Card, Box, Link, Alert, Collapse } from '@mui/material';
// components
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { ConfirmModal } from '../components/Confirm';
import Iconify from '../components/Iconify';

import { FormProvider, RHFTextField } from '../components/hook-form';
import Page from '../components/Page';

// utils
import { fCurrency } from '../utils/formatNumber';

// constants
import { UPLOAD_PRESET, CLOUD_NAME, CLOUD_URL, API_URL, DUMMY_USER_ID, JWT_TOKEN } from '../utils/constants';

export default function MyItem() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token = localStorage.getItem('Token');
  const userId = token ? jwtDecode(token, JWT_TOKEN).user.id : 0;

  const fetchProducts = useCallback(async () => {
    try {
      const result = await axios.get(`${API_URL}/products/${userId}`);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onClickDelete = (id) => {
    if (!id) return;
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const onDeleteConfirm = async () => {
    setShowError(false);
    if (!selectedId) return;
    try {
      await axios.delete(`${API_URL}/products/${selectedId}`);
      fetchProducts();
    } catch (error) {
      setError(error.toString());
      setShowError(true);
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <Page title="Dashboard: Products">
      {showError && (
        <Collapse in={showError}>
          <Alert onClose={() => setShowError(false)} severity="error">
            {error}
          </Alert>
        </Collapse>
      )}
      <Container>
        <BasicModal open={open} handleClose={handleClose} type={2} handleRefetch={fetchProducts} />

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

        <MyProductList products={products} onClickDelete={onClickDelete} />
      </Container>
      <ConfirmModal
        open={confirmOpen}
        handleClose={() => setConfirmOpen(false)}
        title="Delete product"
        description="Are you sure you want to delete this product?"
        onOk={onDeleteConfirm}
      />
    </Page>
  );
}

MyProductList.propTypes = {
  products: PropTypes.array.isRequired,
  setCartValue: PropTypes.any,
  cartValue: PropTypes.number,
  onClickDelete: PropTypes.any,
};

function MyProductList({ products, onClickDelete, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <MyShopProductCard product={product} onClickDelete={onClickDelete} />
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
};

function MyShopProductCard({ product, onClickDelete }) {
  const { name, imgURI, price } = product;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card>
      <BasicModal open={open} handleClose={handleClose} type={1} />
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={imgURI} />
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
          <Button variant="outlined" onClick={handleOpen}>
            Edit
          </Button>
          <Button
            startIcon={<Iconify icon={'eva:trash-2-outline'} />}
            color="error"
            variant="outlined"
            onClick={() => onClickDelete(product.id)}
          >
            Delete
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
  handleRefetch: PropTypes.any,
  objArr: PropTypes.any,
};

function BasicModal({ type, open, handleClose, handleRefetch, objArr }) {
  const navigate = useNavigate();
  const Schema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    price: Yup.number().required('Price is required'),
    quantity: Yup.number().required('Quanity is required'),
  });

  const defaultValues = {
    Item_name: '',
    Item_price: '',
    remember: true,
  };

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const done = () => {
    methods.reset();
    setImage(null);
    handleClose();
    handleRefetch();
    navigate('/my-item', { replace: true });
  };

  const onSubmit = async (item) => {
    setShowError(false);
    if (!image) {
      setError('Image cannot be null');
      setShowError(true);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('cloud_name', CLOUD_NAME);
      const imageResult = await axios.post(`${CLOUD_URL}/image/upload`, formData);
      const uploadUrl = imageResult?.data?.url;
      if (!uploadUrl) {
        setError('Image cannot be null');
        setShowError(true);
        return;
      }
      await axios.post(`${API_URL}/products`, {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        imgURI: uploadUrl,
        userId: DUMMY_USER_ID,
      });

      done();
    } catch (error) {
      setError(error.toString());
      setShowError(true);
    }
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

              <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter product details below.</Typography>

              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ mb: 4 }}>
                  {showError && (
                    <Collapse in={showError}>
                      <Alert onClose={() => setShowError(false)} severity="error">
                        {error}
                      </Alert>
                    </Collapse>
                  )}
                  <RHFTextField name="name" label="Item name" />
                  <RHFTextField name="price" label="Item price" />
                  <RHFTextField name="quantity" label="Quantity" />
                  <Button
                    variant={`${image ? 'contained' : 'outlined'}`}
                    component="label"
                    startIcon={image && <Iconify icon={'eva:checkmark-circle-2-fill'} />}
                    color={image ? 'error' : 'info'}
                  >
                    {image ? 'Image uploaded' : 'Upload image'}
                    <input hidden accept="image/*" type="file" onChange={(event) => setImage(event.target.files[0])} />
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

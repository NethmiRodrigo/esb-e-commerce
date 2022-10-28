import { useEffect, useState, useCallback, useMemo } from 'react';
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
import { UPLOAD_PRESET, CLOUD_NAME, CLOUD_URL, API_URL, JWT_TOKEN } from '../utils/constants';

const token = localStorage.getItem('Token');
const userId = token ? jwtDecode(token, JWT_TOKEN).user.id : 0;

export default function MyItem() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selectedProduct = useMemo(() => {
    if (!(selectedId && products.length)) return null;
    return products.find((e) => +e.id === +selectedId);
  }, [selectedId, products]);

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

  const onClickEdit = (id) => {
    if (!id) return;
    setSelectedId(id);
    setEditOpen(true);
  };

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

        <MyProductList products={products} onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
      </Container>
      <ConfirmModal
        open={confirmOpen}
        handleClose={() => setConfirmOpen(false)}
        title="Delete product"
        description="Are you sure you want to delete this product?"
        onOk={onDeleteConfirm}
      />
      <BasicModal
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        existingItem={selectedProduct}
        handleRefetch={fetchProducts}
        type={1}
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

function MyProductList({ products, onClickDelete, onClickEdit, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <MyShopProductCard product={product} onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
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

function MyShopProductCard({ product, onClickDelete, onClickEdit }) {
  const { name, imgURI, price } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={imgURI} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="subtitle1">
            &nbsp;
            {fCurrency(price)}
          </Typography>
          <Button variant="outlined" onClick={() => onClickEdit(product.id)}>
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
  existingItem: PropTypes.any,
};

function BasicModal({ type, open, handleClose, handleRefetch, existingItem }) {
  const navigate = useNavigate();
  const Schema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    price: Yup.number().required('Price is required'),
    quantity: Yup.number().required('Quanity is required'),
  });

  const defaultValues = {
    name: '',
    price: 0,
    quantity: 0,
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

  useEffect(() => {
    if (!existingItem || !methods) return;
    methods.setValue('name', existingItem.name);
    methods.setValue('price', existingItem.price);
    methods.setValue('quantity', existingItem.quantity);
  }, [existingItem, methods]);

  const onSubmitAdd = async (item) => {
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
        userId: userId,
      });

      done();
    } catch (error) {
      setError(error.toString());
      setShowError(true);
    }
  };

  const onSubmitEdit = async (item) => {
    if (!existingItem) return;
    setShowError(false);
    let { imgURI } = existingItem;
    try {
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('cloud_name', CLOUD_NAME);
        const imageResult = await axios.post(`${CLOUD_URL}/image/upload`, formData);
        imgURI = imageResult?.data?.url;
        if (!imgURI) {
          setError('Image cannot be null');
          setShowError(true);
          return;
        }
      }
      await axios.put(`${API_URL}/products/${existingItem.id}`, {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        imgURI,
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

              <FormProvider methods={methods} onSubmit={handleSubmit(type === 2 ? onSubmitAdd : onSubmitEdit)}>
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

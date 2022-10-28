import PropTypes from 'prop-types';

// material
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import { Container, Typography, Button, Box } from '@mui/material';
// components
import { styled } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: '2%',
};

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 880,
  margin: 'auto',
  padding: 80,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.any,
  onOk: PropTypes.any,
  isLoading: PropTypes.bool,
  description: PropTypes.string,
  title: PropTypes.string,
};

export function ConfirmModal({ open, handleClose, onOk, isLoading, description, title }) {
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
                {title}
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 5 }}>{description}</Typography>
              <Button variant="outlined" component="label" sx={{ mb: 2 }} onClick={handleClose}>
                Cancel
              </Button>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                onClick={onOk}
              >
                Confirm
              </LoadingButton>
            </ContentStyle>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

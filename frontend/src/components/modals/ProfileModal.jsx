import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";

const ProfileModal = ({ open, onClose, user }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleUpdate = () => {
    setOpenUpdateModal(true);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Profile Details
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1">
              <strong>Name:</strong> {user?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {user?.phoneNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {user?.gender}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {user?.role}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update Profile
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      <UpdateProfileModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        user={user}
      />

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        type="account"
      />
    </>
  );
};

export default ProfileModal;

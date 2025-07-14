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
import useUserProfile from "../../hooks/useUserProfile";

const ProfileModal = ({ open, onClose, user, onEditProfile, onDeleteUser }) => {
  // const [openUpdateModal, setOpenUpdateModal] = useState(false);
  // const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // const { loading, deleteAccount } = useUserProfile();
  // const handleDelete = () => {
  //   setOpenDeleteDialog(true);
  // };

  // const handleUpdate = () => {
  //   setOpenUpdateModal(true);
  // };

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
          <Button onClick={onEditProfile} variant="contained" color="primary">
            Update Profile
          </Button>
          <Button onClick={onDeleteUser} color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* <UpdateProfileModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        user={user}
      />

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={deleteAccount}
        title="Delete Account"
        content="Are you sure you want to delete your account and all associated data?"
        loading={loading}
      /> */}
    </>
  );
};

export default ProfileModal;

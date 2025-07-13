import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { genderOptions } from "../../constants/formOptions.js";
import useUserProfile from "../../hooks/useUserProfile.js";

const UpdateProfileModal = ({ open, onClose, userData }) => {
  const { updateUserProfile, loading } = useUserProfile();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      phoneNumber: userData?.phoneNumber || "",
      gender: userData?.gender || "",
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    const result = await updateUserProfile(data);
    if (result.success) {
      onClose();
    } else {
      setError(result.message || "Update failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Update Profile</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            label="Gender"
            select
            fullWidth
            margin="normal"
            {...register("gender", { required: "Gender is required" })}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {error && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateProfileModal;

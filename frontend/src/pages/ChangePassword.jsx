import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useChangePassword from "../hooks/useChangePassword";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const newPassword = watch("newPassword");
  const { changePassword, loading } = useChangePassword();
  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const result = await changePassword(data.currentPassword, data.newPassword);
    if (result.success) {
      navigate("/user/dashboard");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(90deg, #2d3748, #4a5568)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(224, 231, 255, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          mb={3}
          sx={{
            fontWeight: "700",
            color: "#e0e7ff",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          Change Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Current Password */}
          <TextField
            label="Current Password"
            type={showPasswords.current ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("current")}
                    edge="end"
                    sx={{ color: "#a0aec0", "&:hover": { color: "#e0e7ff" } }}
                  >
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          {/* New Password */}
          <TextField
            label="New Password"
            type={showPasswords.new ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("new")}
                    edge="end"
                    sx={{ color: "#a0aec0", "&:hover": { color: "#e0e7ff" } }}
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          {/* Confirm Password */}
          <TextField
            label="Confirm New Password"
            type={showPasswords.confirm ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("confirm")}
                    edge="end"
                    sx={{ color: "#a0aec0", "&:hover": { color: "#e0e7ff" } }}
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
              sx={{
                background: "linear-gradient(45deg, #4c51bf, #6b7280)",
                color: "#ffffff",
                "&:hover": {
                  background: "linear-gradient(45deg, #5a67d8, #9ca3af)",
                  boxShadow: "0 4px 12px rgba(90, 103, 216, 0.4)",
                },
                transition: "all 0.3s ease",
                padding: "8px 16px",
                borderRadius: 1,
                textTransform: "none",
                fontWeight: "600",
              }}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

const inputStyles = {
  "& .MuiInputBase-root": {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#e0e7ff",
    borderRadius: 1,
  },
  "& .MuiInputLabel-root": {
    color: "#a0aec0",
    "&.Mui-focused": {
      color: "#e0e7ff",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(224, 231, 255, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: "#a0aec0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e0e7ff",
    },
  },
};

export default ChangePassword;

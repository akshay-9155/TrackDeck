// src/pages/ResetPassword.jsx
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
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import useResetPassword from "../hooks/useResetPassword";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, loading } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    const result = await resetPassword(
      token,
      data.password,
      data.confirmPassword
    );

    if (result.success) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
    toast.success("Now you can login with your new password.");
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
          }}
        >
          Reset Your Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* Password */}
          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{
                      color: "#a0aec0",
                      "&:hover": { color: "#e0e7ff" },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") ||
                "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
                  background:
                    "linear-gradient(45deg, #5a67d8, #9ca3af)",
                },
                textTransform: "none",
                fontWeight: "600",
              }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </Box>
        </form>

        <Box mt={3} textAlign="center">
          <Typography
            variant="body2"
            sx={{
              color: "#a0aec0",
              "& a": {
                color: "#e0e7ff",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            }}
          >
            Back to <Link to="/login">Login</Link>
          </Typography>
        </Box>
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

export default ResetPassword;
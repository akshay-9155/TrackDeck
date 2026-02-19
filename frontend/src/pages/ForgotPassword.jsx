import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { forgotPassword, loading } = useForgotPassword();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    const result = await forgotPassword(data.email);

    if (result.success) {
      setSubmitted(true);
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
          }}
        >
          Forgot Password
        </Typography>

        {!submitted ? (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Enter your registered email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
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
              }}
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
                  },
                  textTransform: "none",
                  fontWeight: "600",
                }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </Box>
          </form>
        ) : (
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: "#e0e7ff", mt: 2 }}
          >
            If the email exists in our system, a password reset link has been
            sent.
          </Typography>
        )}

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
            Remember your password? <Link to="/login">Back to Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
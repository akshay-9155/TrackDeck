// src/pages/Login.jsx
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
import { useNavigate, useLocation, Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, loading } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/user/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success("Login successful");
      navigate(from, { replace: true });
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
            animation: "fadeIn 1s ease-in",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          Login to Your Account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            defaultValue={import.meta.env.VITE_USERNAME || ""}
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
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            defaultValue={import.meta.env.VITE_PASSWORD || ""}
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
                    sx={{ color: "#a0aec0", "&:hover": { color: "#e0e7ff" } }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
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
                  boxShadow: "0 4px 12px rgba(90, 103, 216, 0.4)",
                },
                transition: "all 0.3s ease",
                padding: "8px 16px",
                borderRadius: 1,
                textTransform: "none",
                fontWeight: "600",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </form>

        <Box mt={2} textAlign="center">
          <Typography
            variant="body2"
            sx={{
              color: "#a0aec0",
              "& a": {
                color: "#e0e7ff",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                  color: "#ffffff",
                },
              },
            }}
          >
            Don&apos;t have an account? <Link to="/signup">Signup</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

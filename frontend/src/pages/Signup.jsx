import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  MenuItem,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { toast } from "react-hot-toast";
import { useState } from "react";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { signup, loading } = useSignup();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { confirmPassword, ...formData } = data;
    const result = await signup(formData);
    if (result.success) {
      toast.success("Signup successful");
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
            animation: "fadeIn 1s ease-in",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          Create a New Account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
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
            label="Email"
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
            label="Phone Number"
            fullWidth
            margin="normal"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Must be a valid 10-digit number",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
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

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.gender}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "rgba(255, 255, 255, 0.05)",
                color: "#e0e7ff",
                borderRadius: 1,
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
              "& .MuiInputLabel-root": {
                color: "#a0aec0",
                "&.Mui-focused": {
                  color: "#e0e7ff",
                },
              },
              "& .MuiSelect-icon": {
                color: "#a0aec0",
              },
            }}
          >
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              defaultValue=""
              label="Gender"
              {...register("gender", { required: "Gender is required" })}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: "linear-gradient(90deg, #374151, #4b5563)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                    border: "1px solid rgba(224, 231, 255, 0.1)",
                  },
                },
                MenuListProps: {
                  disablePadding: true,
                },
              }}
            >
              {genderOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    color: "#e0e7ff",
                    backgroundColor: "#374151",
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#4c51bf",
                      color: "#ffffff",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#5a67d8",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#4c51bf",
                      },
                    },
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>

          <TextField
            label="Password"
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
                    onClick={() => setShowPassword((prev) => !prev)}
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

          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                    sx={{ color: "#a0aec0", "&:hover": { color: "#e0e7ff" } }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              By signing up, you agree to our{" "}
              <Link to="/terms" state={{ from: "/signup" }}>
                Terms of Service
              </Link>
            </Typography>
          </Box>

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
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
              {loading ? "Signing up..." : "Signup"}
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
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
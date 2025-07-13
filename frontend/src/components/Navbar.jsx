// src/components/Navbar.jsx
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, loading } = useLogout();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="fixed" color="default" elevation={2}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          px: { xs: 2, sm: 4 },
          py: 1,
        }}
      >
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          TrackDeck
        </Typography>

        <Box display="flex" gap={2} alignItems="center">
          <Button
            onClick={() => navigate("/about")}
            sx={{
              borderBottom: isActive("/about") ? "2px solid #1976d2" : "none",
            }}
          >
            About
          </Button>
          <Button
            onClick={() => navigate("/terms")}
            sx={{
              borderBottom: isActive("/terms") ? "2px solid #1976d2" : "none",
            }}
          >
            Terms
          </Button>

          {user && (
            <Button
              variant="outlined"
              onClick={() =>
                navigate(
                  user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
                )
              }
              sx={{
                borderBottom: isActive(
                  user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
                )
                  ? "2px solid #1976d2"
                  : "none",
              }}
            >
              {user.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </Button>
          )}

          {user ? (
            <IconButton
              color="error"
              onClick={logout}
              disabled={loading}
              title="Logout"
            >
              <LogoutIcon />
            </IconButton>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  borderBottom: isActive("/login")
                    ? "2px solid #1976d2"
                    : "none",
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                sx={{
                  borderBottom: isActive("/signup")
                    ? "2px solid #1976d2"
                    : "none",
                }}
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

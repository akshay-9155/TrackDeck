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
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #1a2a44, #0d1b2a)",
        borderBottom: "1px solid rgba(16, 48, 46, 0.2)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle, rgba(76, 81, 191, 0.1), transparent 70%)",
          opacity: 0.5,
          zIndex: -1,
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          px: { xs: 2, sm: 4 },
          py: 1.5,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "#e0e7ff",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#bfdbfe",
              textShadow: "0 0 5px rgba(191, 219, 254, 0.5)",
            },
          }}
        >
          TrackDeck
        </Typography>

        <Box display="flex" gap={2} alignItems="center">
          <Button
            onClick={() => navigate("/about")}
            sx={{
              color: "#93c5fd",
              borderBottom: isActive("/about") ? "2px solid #93c5fd" : "none",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#bfdbfe",
                borderBottom: "2px solid #bfdbfe",
                textShadow: "0 0 5px rgba(191, 219, 254, 0.5)",
              },
            }}
          >
            About
          </Button>
          <Button
            onClick={() => navigate("/terms")}
            sx={{
              color: "#93c5fd",
              borderBottom: isActive("/terms") ? "2px solid #93c5fd" : "none",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#bfdbfe",
                borderBottom: "2px solid #bfdbfe",
                textShadow: "0 0 5px rgba(191, 219, 254, 0.5)",
              },
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
                color: "#60a5fa",
                border: "1px solid #60a5fa",
                borderBottom: isActive(
                  user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
                )
                  ? "2px solid #60a5fa"
                  : "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#93c5fd",
                  borderColor: "#93c5fd",
                  borderBottom: "2px solid #93c5fd",
                  backgroundColor: "rgba(147, 197, 253, 0.1)",
                },
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
              sx={{
                color: "#f87171",
                transition: "all 0.3s ease",
                "&:hover": { color: "#ef4444", transform: "scale(1.1)" },
                "&:disabled": { color: "#9ca3af" },
              }}
            >
              <LogoutIcon />
            </IconButton>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: "#93c5fd",
                  borderBottom: isActive("/login")
                    ? "2px solid #93c5fd"
                    : "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#bfdbfe",
                    borderBottom: "2px solid #bfdbfe",
                    textShadow: "0 0 5px rgba(191, 219, 254, 0.5)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#93c5fd",
                  borderBottom: isActive("/signup")
                    ? "2px solid #93c5fd"
                    : "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#bfdbfe",
                    borderBottom: "2px solid #bfdbfe",
                    textShadow: "0 0 5px rgba(191, 219, 254, 0.5)",
                  },
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

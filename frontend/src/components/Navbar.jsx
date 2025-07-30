import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, loading } = useLogout();

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  const isActive = (path) => location.pathname === path;

  // ✅ Common navigation links
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Terms", path: "/terms" },
  ];

  if (user) {
    navLinks.push({
      label: user.role === "admin" ? "Admin Dashboard" : "User Dashboard",
      path: user.role === "admin" ? "/admin/dashboard" : "/user/dashboard",
    });
  }

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1a2a44, #0d1b2a)",
          borderBottom: "1px solid rgba(16, 48, 46, 0.2)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
            py: 1.5,
          }}
        >
          {/* ✅ Logo */}
          <Box
            onClick={() => navigate("/")}
            component="img"
            src="/logo.png"
            alt="TrackDeck Logo"
            sx={{
              width: 120,
              height: 36,
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />

          {/* ✅ Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.path}
                onClick={() => navigate(link.path)}
                sx={{
                  color: "#93c5fd",
                  borderBottom: isActive(link.path)
                    ? "2px solid #93c5fd"
                    : "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#bfdbfe",
                    borderBottom: "2px solid #bfdbfe",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}

            {user ? (
              <IconButton
                onClick={logout}
                disabled={loading}
                title="Logout"
                sx={{
                  color: "#f87171",
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
                  sx={{ color: "#93c5fd" }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  sx={{ color: "#93c5fd" }}
                >
                  Signup
                </Button>
              </>
            )}
          </Box>

          {/* ✅ Mobile Hamburger Menu */}
          <IconButton
            edge="end"
            sx={{ display: { xs: "flex", md: "none" }, color: "#93c5fd" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ✅ Drawer for Mobile Menu */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 270,
            background: "rgba(15, 23, 42, 0.8)", // Navy + glass effect
            backdropFilter: "blur(12px)", // 🌟 Glassmorphism
            color: "#e0e7ff",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* 🌟 Drawer Header with Logo */}
        <Box
          sx={{
            px: 2,
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(135deg, #1a2a44, #0d1b2a)",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: "1px", color: "#f3f4f6" }}
            >
              TrackDeck
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              Manage Orders Smarter
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: "#f3f4f6" }}>
            ✕
          </IconButton>
        </Box>

        {/* 🌟 Navigation Links */}
        <List sx={{ flex: 1, py: 2 }}>
          {navLinks.map((link) => {
            // Choose icons dynamically (optional)
            const icons = {
              Home: "🏠",
              About: "ℹ️",
              Terms: "📜",
              "User Dashboard": "📦",
              "Admin Dashboard": "🛠️",
            };

            return (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(link.path);
                    setMobileOpen(false);
                  }}
                  sx={{
                    py: 1.5,
                    px: 3,
                    mx: 1,
                    my: 0.5,
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                      transform: "translateX(-4px)",
                    },
                  }}
                >
                  <Box component="span" sx={{ mr: 1.5, fontSize: "1.2rem" }}>
                    {icons[link.label] || "✨"}
                  </Box>
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "#e0e7ff",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          {/* 🌟 Auth Actions */}
          {user ? (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                sx={{
                  py: 1.5,
                  px: 3,
                  mx: 1,
                  my: 0.5,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255, 71, 87, 0.1)",
                    transform: "translateX(-4px)",
                  },
                }}
              >
                <LogoutIcon sx={{ mr: 1, color: "#f87171" }} />
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#f87171",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            <>
              {["Login", "Signup"].map((label) => (
                <ListItem key={label} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${label.toLowerCase()}`);
                      setMobileOpen(false);
                    }}
                    sx={{
                      py: 1.5,
                      px: 3,
                      mx: 1,
                      my: 0.5,
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                        transform: "translateX(-4px)",
                      },
                    }}
                  >
                    <Box component="span" sx={{ mr: 1.5, fontSize: "1.2rem" }}>
                      {label === "Login" ? "🔑" : "📝"}
                    </Box>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#e0e7ff",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
        </List>

        {/* 🌟 Footer */}
        <Box
          sx={{
            textAlign: "center",
            py: 2,
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.6)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography variant="body2">✨ TrackDeck v1.0 ✨</Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;

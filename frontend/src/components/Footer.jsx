import { Box, Container, Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "linear-gradient(135deg, #1a2a44, #0d1b2a)",
        borderTop: "1px solid rgba(16, 48, 46, 0.2)",
        py: 3,
        px: 2,
        textAlign: "center",
        zIndex: 1000,
        boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.3)",
        fontFamily: "Inter, sans-serif",
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
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="body2"
            color="#a0aec0"
            sx={{
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
              "& strong": { color: "#e0e7ff", fontWeight: 700 },
            }}
          >
            © {new Date().getFullYear()}{" "}
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              color="#93c5fd"
              fontSize="14px"
              letterSpacing="1px"
              fontWeight="600"
              sx={{
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#bfdbfe",
                  textShadow: "0 0 5px rgba(147, 197, 253, 0.5)",
                },
              }}
            >
              TrackDeck
            </Link>
            . All rights reserved.
          </Typography>

          <Stack direction="row" spacing={4}>
            <Link
              component={RouterLink}
              to="/about"
              underline="hover"
              color="#93c5fd"
              fontSize="14px"
              textTransform="uppercase"
              letterSpacing="1px"
              sx={{
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#bfdbfe",
                  textShadow: "0 0 5px rgba(147, 197, 253, 0.5)",
                },
              }}
            >
              About
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              underline="hover"
              color="#93c5fd"
              fontSize="14px"
              textTransform="uppercase"
              letterSpacing="1px"
              sx={{
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#bfdbfe",
                  textShadow: "0 0 5px rgba(147, 197, 253, 0.5)",
                },
              }}
            >
              Terms
            </Link>
            <Link
              component={RouterLink}
              to="https://github.com"
              target="_blank"
              rel="noopener"
              underline="hover"
              color="#93c5fd"
              fontSize="14px"
              textTransform="uppercase"
              letterSpacing="1px"
              sx={{
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#bfdbfe",
                  textShadow: "0 0 5px rgba(147, 197, 253, 0.5)",
                },
              }}
            >
              GitHub
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

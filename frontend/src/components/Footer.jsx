// src/components/Footer.jsx
import { Box, Container, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
        py: 3,
        px: 2,
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} <strong>TrackDeck</strong>. All
            rights reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link
              href="/about"
              underline="hover"
              color="primary"
              fontSize="14px"
            >
              About
            </Link>
            <Link
              href="/terms"
              underline="hover"
              color="primary"
              fontSize="14px"
            >
              Terms
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener"
              underline="hover"
              color="primary"
              fontSize="14px"
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

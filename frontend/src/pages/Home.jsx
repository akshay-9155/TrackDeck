import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsightsIcon from "@mui/icons-material/Insights";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useSelector } from "react-redux";

const features = [
  {
    icon: <LocalShippingIcon fontSize="large" color="primary" />,
    title: "Track Orders",
    description:
      "Manage your Amazon, Flipkart, and Meesho orders in one place.",
  },
  {
    icon: <InsightsIcon fontSize="large" color="primary" />,
    title: "Smart Insights",
    description:
      "Get order summaries, refund stats, and pending reviews instantly.",
  },
  {
    icon: <VerifiedUserIcon fontSize="large" color="primary" />,
    title: "Secure Dashboard",
    description:
      "Your data is safe. Only you and admins can access your orders.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        mt: 8,
        mb: 10,
        background: "linear-gradient(135deg, #1a2a44, #0d1b2a, #10302E)",
        minHeight: "100vh",
        position: "relative",
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
      <Container>
        {/* Hero Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          textAlign="center"
          sx={{ py: 8, px: 2, position: "relative", zIndex: 1 }}
        >
          <TrackChangesIcon sx={{ fontSize: 80, color: "#e0e7ff", mb: 2 }} />
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
            sx={{
              color: "#e0e7ff",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Welcome to TrackDeck
          </Typography>
          <Typography
            variant="h6"
            color="#a0aec0"
            mb={4}
            sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
          >
            Your one-stop platform to track orders, refunds, and reviews across
            e-commerce platforms.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/signup")}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              background: "linear-gradient(45deg, #4c51bf, #6b7280)",
              color: "#ffffff",
              "&:hover": {
                background: "linear-gradient(45deg, #5a67d8, #9ca3af)",
              },
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Paper
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                elevation={6}
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #2d3748, #4a5568)",
                  border: "1px solid rgba(16, 48, 46, 0.2)",
                  "&:hover": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)" },
                }}
              >
                <Box mb={3}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    color: "#e0e7ff",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  color="#a0aec0"
                  sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box
          mt={10}
          textAlign="center"
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            mb={3}
            sx={{
              color: "#e0e7ff",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Ready to simplify your order tracking?
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => navigate("/about")}
              sx={{
                color: "#93c5fd",
                borderColor: "#93c5fd",
                "&:hover": {
                  color: "#bfdbfe",
                  borderColor: "#bfdbfe",
                  backgroundColor: "rgba(191, 219, 254, 0.1)",
                },
              }}
            >
              Learn More
            </Button>
            {!isAuthenticated && (
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  background: "linear-gradient(45deg, #4c51bf, #6b7280)",
                  color: "#ffffff",
                  "&:hover": {
                    background: "linear-gradient(45deg, #5a67d8, #9ca3af)",
                  },
                }}
              >
                Join Now
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

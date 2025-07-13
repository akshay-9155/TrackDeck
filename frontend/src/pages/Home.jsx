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
    <Box sx={{ mt: 8, mb: 10 }}>
      <Container>
        {/* Hero Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          textAlign="center"
          sx={{ py: 6 }}
        >
          <TrackChangesIcon sx={{ fontSize: 60, color: "primary.main" }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Welcome to TrackDeck
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
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
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                elevation={4}
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  borderRadius: 3,
                }}
              >
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
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
        >
          <Typography variant="h5" fontWeight={600} mb={2}>
            Ready to simplify your order tracking?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" onClick={() => navigate("/about")}>
              Learn More
            </Button>
            {!isAuthenticated && <Button variant="contained" onClick={() => navigate("/signup")}>
              Join Now
            </Button>}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

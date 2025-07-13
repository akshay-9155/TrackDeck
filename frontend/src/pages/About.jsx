import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaClipboardList,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

const aboutVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

const features = [
  {
    icon: <FaUserShield size={30} color="#1976d2" />,
    title: "Secure & Private",
    desc: "Your personal order and refund tracking data is safe and accessible only by you.",
  },
  {
    icon: <FaClipboardList size={30} color="#1976d2" />,
    title: "Streamlined Workflow",
    desc: "Track product links, delivery status, reviews, ratings, and refunds in one place.",
  },
  {
    icon: <FaClock size={30} color="#1976d2" />,
    title: "Never Miss Deadlines",
    desc: "Set and visualize important dates like refund windows and review deadlines.",
  },
  {
    icon: <FaChartLine size={30} color="#1976d2" />,
    title: "Insights & Summary",
    desc: "View summaries of your activity including refunds received, pending tasks, and more.",
  },
];

const About = () => {
  return (
    <Container sx={{ mt: 10, mb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
          About TrackDeck
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" mb={6}>
          A smarter way to manage your online purchases, reviews, and refunds.
        </Typography>
      </motion.div>

      <Grid container spacing={4} columns={{ xs: 1, sm: 2, md: 12 }}>
        {features.map((feature, index) => (
          <Grid
            key={index}
            sx={{ width: { xs: "100%", sm: "48%", md: "48%" } }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{ height: "100%" }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  textAlign: "center",
                  backgroundColor: "#f5f5f5",
                  transition: "0.3s",
                }}
              >
                <Box color="primary.main" mb={1}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Paper
          elevation={6}
          sx={{ mt: 8, p: 4, borderRadius: 4, bgcolor: "#f0f4ff" }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Why TrackDeck?
          </Typography>
          <Typography>
            TrackDeck was built to eliminate the chaos of manual tracking
            spreadsheets. Whether you're ordering products for clients or
            managing personal purchases, it gives you structure, reminders, and
            insights. Say goodbye to missed refunds and unreviewed products —
            and hello to a smoother, more reliable workflow.
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default About;

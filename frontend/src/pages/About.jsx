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
    icon: <FaUserShield size={30} color="#93c5fd" />,
    title: "Secure & Private",
    desc: "Your personal order and refund tracking data is safe and accessible only by you.",
  },
  {
    icon: <FaClipboardList size={30} color="#93c5fd" />,
    title: "Streamlined Workflow",
    desc: "Track product links, delivery status, reviews, ratings, and refunds in one place.",
  },
  {
    icon: <FaClock size={30} color="#93c5fd" />,
    title: "Never Miss Deadlines",
    desc: "Set and visualize important dates like refund windows and review deadlines.",
  },
  {
    icon: <FaChartLine size={30} color="#93c5fd" />,
    title: "Insights & Summary",
    desc: "View summaries of your activity including refunds received, pending tasks, and more.",
  },
];

const About = () => {
  return (
    <Box
      sx={{
        mt: 10,
        mb: 6,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a2a44, #0d1b2a, #10302E)",
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
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            align="center"
            gutterBottom
            sx={{
              color: "#e0e7ff",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            About TrackDeck
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="#a0aec0"
            mb={6}
            sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
          >
            A smarter way to manage your online purchases, reviews, and refunds.
          </Typography>
        </motion.div>

        <Grid container spacing={4} columns={{ xs: 1, sm: 2, md: 12 }}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }}>
              <motion.div
                custom={index}
                variants={aboutVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ height: "100%" }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    height: "100%",
                    textAlign: "center",
                    background: "linear-gradient(135deg, #2d3748, #4a5568)",
                    border: "1px solid rgba(16, 48, 46, 0.2)",
                    "&:hover": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)" },
                  }}
                >
                  <Box color="#93c5fd" mb={3}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "#e0e7ff",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#a0aec0"
                    sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
                  >
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
            sx={{
              mt: 10,
              p: 5,
              borderRadius: 3,
              background: "linear-gradient(135deg, #2d3748, #4a5568)",
              border: "1px solid rgba(16, 48, 46, 0.2)",
              "&:hover": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)" },
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={3}
              sx={{
                color: "#e0e7ff",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Why TrackDeck?
            </Typography>
            <Typography
              color="#a0aec0"
              sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              TrackDeck was built to eliminate the chaos of manual tracking
              spreadsheets. Whether you're ordering products for clients or
              managing personal purchases, it gives you structure, reminders,
              and insights. Say goodbye to missed refunds and unreviewed
              products — and hello to a smoother, more reliable workflow.
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;

import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  useTheme,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const Section = ({ title, children }) => (
  <Box mb={5}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{ color: "#e0e7ff", textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      color="#a0aec0"
      sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
    >
      {children}
    </Typography>
  </Box>
);

const Terms = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const cameFromSignup = location.state?.from === "/signup";

  return (
    <Box
      sx={{
        py: 6,
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
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 5,
              borderRadius: 3,
              background: "linear-gradient(135deg, #2d3748, #4a5568)",
              border: "1px solid rgba(16, 48, 46, 0.2)",
              "&:hover": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)" },
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                color: "#e0e7ff",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Terms & Conditions
            </Typography>
            <Divider
              sx={{
                mb: 5,
                borderColor: "rgba(224, 231, 255, 0.1)",
                background:
                  "linear-gradient(90deg, transparent, #4c51bf, transparent)",
                height: 1,
              }}
            />

            <Section title="1. Acceptance of Terms">
              By accessing or using TrackDeck, you agree to be bound by these
              terms and conditions. If you do not agree with any part of these
              terms, you may not use our service.
            </Section>

            <Section title="2. User Responsibilities">
              Users are responsible for the accuracy of the order and refund
              information they enter. Misuse or manipulation of the platform for
              fraudulent activities is strictly prohibited.
            </Section>

            <Section title="3. Account Security">
              You are responsible for maintaining the confidentiality of your
              account and password. We are not liable for any loss resulting
              from unauthorized access to your account.
            </Section>

            <Section title="4. Intellectual Property">
              All content, trademarks, and branding on TrackDeck are the
              intellectual property of the company and may not be reused without
              permission.
            </Section>

            <Section title="5. Termination">
              We reserve the right to suspend or terminate user access in case
              of violation of any terms, misuse of the platform, or legal
              obligations.
            </Section>

            <Section title="6. Limitation of Liability">
              TrackDeck is not liable for any financial loss, data breach, or
              damages resulting from the use or inability to use the platform.
            </Section>

            <Section title="7. Changes to Terms">
              We reserve the right to modify these terms at any time. Continued
              use of TrackDeck constitutes acceptance of the updated terms.
            </Section>

            <Typography
              variant="body2"
              color="#a0aec0"
              mt={6}
              align="center"
              sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Last updated: July 12, 2025
            </Typography>

            {/* 🔙 Show Back to Signup if navigated from signup */}
            {cameFromSignup && (
              <Box mt={5} textAlign="center">
                <Button
                  variant="outlined"
                  onClick={() => navigate("/signup")}
                  sx={{
                    color: "#93c5fd",
                    borderColor: "#93c5fd",
                    textTransform: "none",
                    "&:hover": {
                      color: "#bfdbfe",
                      borderColor: "#bfdbfe",
                      backgroundColor: "rgba(191, 219, 254, 0.1)",
                    },
                  }}
                >
                  ⬅ Back to Signup
                </Button>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Terms;

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
  <Box mb={4}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
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
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Terms & Conditions
          </Typography>
          <Divider sx={{ mb: 4 }} />

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
            account and password. We are not liable for any loss resulting from
            unauthorized access to your account.
          </Section>

          <Section title="4. Intellectual Property">
            All content, trademarks, and branding on TrackDeck are the
            intellectual property of the company and may not be reused without
            permission.
          </Section>

          <Section title="5. Termination">
            We reserve the right to suspend or terminate user access in case of
            violation of any terms, misuse of the platform, or legal
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
            color="text.secondary"
            mt={5}
            align="center"
          >
            Last updated: July 12, 2025
          </Typography>

          {/* 🔙 Show Back to Signup if navigated from signup */}
          {cameFromSignup && (
            <Box mt={4} textAlign="center">
              <Button
                variant="outlined"
                onClick={() => navigate("/signup")}
                sx={{ textTransform: "none" }}
              >
                ⬅ Back to Signup
              </Button>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Terms;

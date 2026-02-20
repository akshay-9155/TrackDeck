import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, CircularProgress, Button } from "@mui/material";
import useVerifyEmail from "../hooks/useVerifyEmail";
import { useEffect } from "react";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { verifyEmail, loading } = useVerifyEmail();

  useEffect(() => {
    console.log(token);
    const response = verifyEmail(token);
    if (response.success) {
      navigate("/user/dashboard");
    }
  }, [token]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      {loading ? (
        <>
          <CircularProgress />
          <Typography mt={2}>Verifying your email...</Typography>
        </>
      ) : (
        <Typography>Email verification complete.</Typography>
      )}
    </Container>
  );
};

export default VerifyEmail;

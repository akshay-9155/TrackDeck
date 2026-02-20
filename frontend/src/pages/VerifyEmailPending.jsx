import { Container, Typography } from '@mui/material';
import React from 'react'

const VerifyEmailPending = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Check your email
      </Typography>
      <Typography>
        We’ve sent a verification link to your email address.
      </Typography>
    </Container>
  );
}

export default VerifyEmailPending
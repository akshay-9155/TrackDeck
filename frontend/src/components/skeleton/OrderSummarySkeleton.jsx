import { Grid, Skeleton, Typography, Box } from "@mui/material";

const OrderSummarySkeleton = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #2d3748, #4a5568)",
        p: 3,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(16, 48, 46, 0.2)",
      }}
    >
      <Grid container spacing={3}>
        {[...Array(4)].map((_, idx) => (
          <Grid key={idx} size={{ xs: 6, md: 3 }}>
            <Typography
              variant="body1"
              sx={{
                color: "transparent",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                "&::after": {
                  content: "attr(data-label)",
                  position: "absolute",
                  color: "#a0aec0",
                  fontWeight: 600,
                  textShadow: "none",
                  opacity: 0.7,
                },
              }}
              data-label={
                idx === 0
                  ? "Total Orders"
                  : idx === 1
                  ? "Delivered"
                  : idx === 2
                  ? "Pending Reviews"
                  : "Refund Received"
              }
            >
              <Skeleton
                width={120}
                height={40}
                sx={{
                  bgcolor: "rgba(224, 231, 255, 0.2)",
                  borderRadius: 1,
                  transform: "scale(1)",
                  "&:hover": { transform: "scale(1.02)" },
                  transition: "transform 0.3s ease",
                }}
              />
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderSummarySkeleton;

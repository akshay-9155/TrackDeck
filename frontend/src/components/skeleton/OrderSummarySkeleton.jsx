import { Grid, Skeleton, Typography } from "@mui/material";

const OrderSummarySkeleton = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(4)].map((_, idx) => (
        <Grid item xs={6} md={3} key={idx}>
          <Typography variant="body1">
            <Skeleton width="80%" height={28} />
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderSummarySkeleton;

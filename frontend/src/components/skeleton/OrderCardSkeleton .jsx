import { Card, CardContent, Grid, Skeleton } from "@mui/material";

const OrderCardSkeleton = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="40%" />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={120}
          sx={{ my: 1 }}
        />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="rectangular" width="100%" height={40} />
      </CardContent>
    </Card>
  );
};


export default OrderCardSkeleton;
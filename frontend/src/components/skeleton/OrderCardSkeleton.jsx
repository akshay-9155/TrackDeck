import { Skeleton, Stack, Card, CardContent } from "@mui/material";

const OrderCardSkeleton = () => (
  <Card
    sx={{
      borderRadius: 2,
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
      background: "linear-gradient(135deg, #1a2a44, #0d1b2a)",
      border: "1px solid rgba(16, 48, 46, 0.2)",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
      },
    }}
  >
    <CardContent
      sx={{
        p: 3,
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
          zIndex: 0,
        },
      }}
    >
      <Skeleton
        width="60%"
        height={24}
        sx={{ bgcolor: "rgba(224, 231, 255, 0.2)", borderRadius: 1, mb: 1 }}
      />
      <Skeleton
        width="40%"
        height={20}
        sx={{ bgcolor: "rgba(224, 231, 255, 0.2)", borderRadius: 1, mb: 2 }}
      />
      <Stack direction="row" spacing={1.5} sx={{ mb: 2, zIndex: 1 }}>
        <Skeleton
          variant="rounded"
          width={120}
          height={36}
          sx={{ bgcolor: "rgba(160, 174, 192, 0.2)", borderRadius: 2 }}
        />
        <Skeleton
          variant="rounded"
          width={140}
          height={36}
          sx={{ bgcolor: "rgba(160, 174, 192, 0.2)", borderRadius: 2 }}
        />
        <Skeleton
          variant="rounded"
          width={140}
          height={36}
          sx={{ bgcolor: "rgba(160, 174, 192, 0.2)", borderRadius: 2 }}
        />
      </Stack>
      <Skeleton
        width="80%"
        height={20}
        sx={{ bgcolor: "rgba(224, 231, 255, 0.2)", borderRadius: 1, mb: 1 }}
      />
      <Skeleton
        width="50%"
        height={20}
        sx={{ bgcolor: "rgba(224, 231, 255, 0.2)", borderRadius: 1, mb: 2 }}
      />
      <Stack direction="row" spacing={1.5} sx={{ zIndex: 1 }}>
        <Skeleton
          variant="rectangular"
          width={70}
          height={36}
          sx={{ bgcolor: "rgba(160, 174, 192, 0.2)", borderRadius: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={70}
          height={36}
          sx={{ bgcolor: "rgba(160, 174, 192, 0.2)", borderRadius: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={70}
          height={36}
          sx={{ bgcolor: "rgba(160, 174, 192, 0.2)", borderRadius: 1 }}
        />
      </Stack>
    </CardContent>
  </Card>
);

export default OrderCardSkeleton;

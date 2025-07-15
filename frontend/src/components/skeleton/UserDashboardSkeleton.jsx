import React from "react";
import { Skeleton, Box, Grid } from "@mui/material";
import OrderCardSkeleton from "./OrderCardSkeleton";

const UserDashboardSkeleton = () => {
  return (
    <Box
      p={4}
      sx={{
        background: "linear-gradient(135deg, #1a2a44, #0d1b2a, #10302E)",
        minHeight: "100vh",
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(76, 81, 191, 0.1), transparent)",
          animation: "pulse 15s infinite",
        },
        "@keyframes pulse": {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1.5)" },
        },
      }}
    >
      <Skeleton
        variant="text"
        width={280}
        height={48}
        sx={{
          bgcolor: "rgba(224, 231, 255, 0.2)",
          borderRadius: 1,
          mb: 2,
          animation: "fadeIn 1s ease-in",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      />

      <Box mt={3}>
        <Skeleton
          variant="text"
          width={200}
          height={32}
          sx={{ bgcolor: "rgba(224, 231, 255, 0.2)", borderRadius: 1, mb: 1 }}
        />
        <Skeleton
          variant="text"
          width={350}
          height={28}
          sx={{ bgcolor: "rgba(224, 231, 255, 0.2)", borderRadius: 1 }}
        />
      </Box>

      <Box mt={4}>
        <Skeleton
          variant="text"
          width={200}
          height={32}
          sx={{ bgcolor: "rgba(224, 231, 255, 0.2)", borderRadius: 1 }}
        />
      </Box>

      <Box mt={4} display="flex" justifyContent="flex-end" gap={3}>
        <Skeleton
          variant="rectangular"
          width={180}
          height={48}
          sx={{
            bgcolor: "rgba(160, 174, 192, 0.2)",
            borderRadius: 1,
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.02)" },
          }}
        />
        <Skeleton
          variant="rectangular"
          width={180}
          height={48}
          sx={{
            bgcolor: "rgba(160, 174, 192, 0.2)",
            borderRadius: 1,
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.02)" },
          }}
        />
      </Box>

      <Grid container spacing={3} mt={4}>
        {[...Array(6)].map((_, idx) => (
          <Grid key={idx} size={{ xs: 12, md: 6 }}>
            <OrderCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserDashboardSkeleton;

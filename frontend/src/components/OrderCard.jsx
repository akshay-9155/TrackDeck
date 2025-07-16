import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { format } from "date-fns";

const OrderCard = ({ order, onView, onEdit, onDelete }) => {
  if (!order) {
    return null;
  }
  const { product, feedback, rating, review, refund, dealer, timeline } = order;

  const statusLabel = (() => {
    if (feedback?.type === "Rating") return `Rating: ${rating?.status}`;
    if (feedback?.type === "Review" || feedback?.type === "ReviewLive")
      return `Review: ${review?.status}`;
    return null;
  })();

  return (
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
      <CardContent sx={{ position: "relative", p: 3 }}>
        {/* Header */}
        <Typography
          variant="subtitle2"
          color="#a0aec0"
          gutterBottom
          sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
        >
          Order ID: #{product?.orderId}
        </Typography>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#e0e7ff", textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }}
        >
          {product?.displayName}
        </Typography>

        <Typography
          variant="body2"
          color="#a0aec0"
          mb={1}
          sx={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
        >
          Platform: {product?.platform}
        </Typography>

        <Divider
          sx={{
            my: 1.5,
            borderColor: "rgba(224, 231, 255, 0.1)",
            background:
              "linear-gradient(90deg, transparent, #4c51bf, transparent)",
            height: 1,
          }}
        />

        {/* Status Tags */}
        <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={2.5}>
          {feedback?.type && (
            <Chip
              label={`Feedback: ${feedback.type}`}
              color="default"
              sx={{
                background: "rgba(224, 231, 255, 0.1)",
                color: "#e0e7ff",
                "& .MuiChip-label": { fontWeight: 500 },
              }}
            />
          )}
          {statusLabel && (
            <Chip
              label={statusLabel}
              color="info"
              sx={{
                background: "rgba(59, 130, 246, 0.1)",
                color: "#93c5fd",
                "& .MuiChip-label": { fontWeight: 500 },
              }}
            />
          )}
          {refund?.status && (
            <Chip
              label={`Refund: ${refund.status}`}
              color="warning"
              sx={{
                background: "rgba(245, 158, 11, 0.1)",
                color: "#facc15",
                "& .MuiChip-label": { fontWeight: 500 },
              }}
            />
          )}
        </Stack>

        {/* Dealer and Timeline Info */}
        <Box mb={2.5}>
          <Typography
            variant="body2"
            sx={{
              color: "#a0aec0",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            <strong style={{ color: "#e0e7ff" }}>Dealer:</strong>{" "}
            {dealer?.info?.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#a0aec0",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            <strong style={{ color: "#e0e7ff" }}>Order Date:</strong>{" "}
            {format(new Date(timeline?.orderPlacedAt), "dd MMM yyyy")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#a0aec0",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            <strong style={{ color: "#e0e7ff" }}>Delivery:</strong>{" "}
            {timeline?.isDelivered ? "Delivered" : "Pending"}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            color="info"
            size="small"
            onClick={() => onView(order)}
            sx={{
              borderColor: "#93c5fd",
              color: "#93c5fd",
              "&:hover": {
                borderColor: "#93c5fd",
                backgroundColor: "rgba(147, 197, 253, 0.1)",
              },
            }}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => onEdit(order)}
            sx={{
              borderColor: "#60a5fa",
              color: "#60a5fa",
              "&:hover": {
                borderColor: "#60a5fa",
                backgroundColor: "rgba(96, 165, 250, 0.1)",
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(order)}
            sx={{
              borderColor: "#f87171",
              color: "#f87171",
              "&:hover": {
                borderColor: "#f87171",
                backgroundColor: "rgba(248, 113, 113, 0.1)",
              },
            }}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

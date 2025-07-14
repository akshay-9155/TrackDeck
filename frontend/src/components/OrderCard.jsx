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
  if(!order){
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
        borderRadius: 3,
        boxShadow: 4,
        transition: "all 0.3s ease-in-out",
        ":hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        {/* Header */}
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Order ID: #{product?.orderId}
        </Typography>

        <Typography variant="h6" fontWeight="bold">
          {product?.displayName}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={1}>
          Platform: {product?.platform}
        </Typography>

        <Divider sx={{ my: 1 }} />

        {/* Status Tags */}
        <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
          {feedback?.type && (
            <Chip label={`Feedback: ${feedback.type}`} color="default" />
          )}
          {statusLabel && <Chip label={statusLabel} color="info" />}
          {refund?.status && (
            <Chip label={`Refund: ${refund.status}`} color="warning" />
          )}
        </Stack>

        {/* Dealer and Timeline Info */}
        <Box mb={2}>
          <Typography variant="body2">
            <strong>Dealer:</strong> {dealer?.info?.name}
          </Typography>
          <Typography variant="body2">
            <strong>Order Date:</strong>{" "}
            {format(new Date(timeline?.orderPlacedAt), "dd MMM yyyy")}
          </Typography>
          <Typography variant="body2">
            <strong>Delivery:</strong>{" "}
            {timeline?.isDelivered ? "Delivered" : "Pending"}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="info"
            size="small"
            onClick={() => onView(order)}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => onEdit(order)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(order)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

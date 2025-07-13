import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { format } from "date-fns";

const OrderCard = ({ order, onView, onEdit, onDelete }) => {
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
        <Typography variant="h6" fontWeight="bold">
          {order.productName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Platform: {order.platform} <br />
          Price: ₹{order.price} <br />
          Less: ₹{order.less} <br />
          Order Date: {format(new Date(order.orderDate), "dd MMM yyyy")} <br />
          Status: {order.isDelivered ? "Delivered" : "Pending"}
        </Typography>

        <Box mt={2}>
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

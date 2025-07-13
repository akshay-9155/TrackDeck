import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

const ViewOrderModal = ({ open, onClose, order }) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          gap={2}
        >
          <Typography>
            <strong>Product Name:</strong> {order.productName}
          </Typography>
          <Typography>
            <strong>Original Name:</strong> {order.productOriginalName}
          </Typography>
          <Typography>
            <strong>Platform:</strong> {order.platform}
          </Typography>
          <Typography>
            <strong>Price:</strong> ₹{order.price}
          </Typography>
          <Typography>
            <strong>Less:</strong> ₹{order.less}
          </Typography>
          <Typography>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          <Typography>
            <strong>Delivery Date:</strong>{" "}
            {order.deliveryDate
              ? new Date(order.deliveryDate).toLocaleDateString()
              : "-"}
          </Typography>
          <Typography>
            <strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}
          </Typography>

          <Divider gridColumn="span 2" sx={{ my: 2 }} />

          <Typography>
            <strong>Review Status:</strong> {order.reviewStatus}
          </Typography>
          <Typography>
            <strong>Rating Status:</strong> {order.ratingStatus}
          </Typography>
          <Typography>
            <strong>Review Text:</strong> {order.reviewText || "-"}
          </Typography>
          {order.reviewScreenshot && (
            <a
              href={order.reviewScreenshot}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Review Screenshot
            </a>
          )}
          {order.ratingScreenshot && (
            <a
              href={order.ratingScreenshot}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Rating Screenshot
            </a>
          )}

          <Divider gridColumn="span 2" sx={{ my: 2 }} />

          <Typography>
            <strong>Refund Status:</strong> {order.refundStatus}
          </Typography>
          <Typography>
            <strong>Refund Amount:</strong> ₹{order.refundAmount || 0}
          </Typography>
          {order.refundFormDate && (
            <Typography>
              <strong>Refund Form Date:</strong>{" "}
              {new Date(order.refundFormDate).toLocaleDateString()}
            </Typography>
          )}
          {order.refundReceivedDate && (
            <Typography>
              <strong>Refund Received:</strong>{" "}
              {new Date(order.refundReceivedDate).toLocaleDateString()}
            </Typography>
          )}
          {order.refundProof && (
            <a
              href={order.refundProof}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Refund Proof
            </a>
          )}

          <Divider gridColumn="span 2" sx={{ my: 2 }} />

          <Typography gridColumn="span 2">
            <strong>Notes:</strong> {order.notes || "-"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewOrderModal;

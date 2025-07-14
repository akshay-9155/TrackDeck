import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Link,
} from "@mui/material";

const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "-");

const ViewOrderModal = ({ open, onClose, order }) => {
  if (!order) return null;

  const {
    feedback,
    product,
    timeline,
    dealer,
    review,
    rating,
    sellerFeedback,
    refund,
    notes,
  } = order;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          gap={2}
        >
          {/* Product Info */}
          <Typography>
            <strong>Display Name:</strong> {product.displayName}
          </Typography>
          <Typography>
            <strong>Original Name:</strong> {product.originalName}
          </Typography>
          <Typography>
            <strong>Platform:</strong> {product.platform}
          </Typography>
          <Typography>
            <strong>Condition:</strong> {product.condition}
          </Typography>
          <Typography>
            <strong>Price:</strong> ₹{product.price}
          </Typography>
          <Typography>
            <strong>Less:</strong> ₹{product.less}
          </Typography>
          <Typography>
            <strong>Product Link:</strong>{" "}
            <Link href={product.link} target="_blank" rel="noopener noreferrer">
              Open Link
            </Link>
          </Typography>

          <Divider gridColumn="span 2" sx={{ my: 2 }} />

          {/* Dealer Info */}
          <Typography>
            <strong>Dealer Name:</strong> {dealer.info.name}
          </Typography>
          <Typography>
            <strong>Phone Number:</strong> {dealer.info.phoneNumber}
          </Typography>
          <Typography>
            <strong>Dealer Platform:</strong> {dealer.platform}
          </Typography>

          <Divider gridColumn="span 2" sx={{ my: 2 }} />

          {/* Timeline Info */}
          <Typography>
            <strong>Order Placed:</strong> {formatDate(timeline.orderPlacedAt)}
          </Typography>
          <Typography>
            <strong>Form Submitted:</strong>{" "}
            {formatDate(timeline.formSubmittedAt)}
          </Typography>
          <Typography>
            <strong>Delivery Date:</strong> {formatDate(timeline.deliveryDate)}
          </Typography>
          <Typography>
            <strong>Delivered:</strong> {timeline.isDelivered ? "Yes" : "No"}
          </Typography>

          <Divider gridColumn="span 2" sx={{ my: 2 }} />

          {/* Feedback Info */}
          <Typography>
            <strong>Feedback Type:</strong> {feedback?.type || "-"}
          </Typography>
          <Typography>
            <strong>Review Status:</strong> {review?.status}
          </Typography>
          <Typography>
            <strong>Rating Status:</strong> {rating?.status}
          </Typography>
          <Typography>
            <strong>Seller Feedback Status:</strong> {sellerFeedback?.status}
          </Typography>
          {review?.text && (
            <Typography>
              <strong>Review Text:</strong> {review.text}
            </Typography>
          )}
          {review?.screenshot && (
            <Link
              href={review.screenshot}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Review Screenshot
            </Link>
          )}
          {rating?.screenshot && (
            <Link
              href={rating.screenshot}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Rating Screenshot
            </Link>
          )}
          {sellerFeedback?.screenshot && (
            <Link
              href={sellerFeedback.screenshot}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Seller Feedback Screenshot
            </Link>
          )}

          <Divider gridColumn="span 2" sx={{ my: 2 }} />

          {/* Refund Info */}
          <Typography>
            <strong>Refund Status:</strong> {refund?.status}
          </Typography>
          <Typography>
            <strong>Refund Amount:</strong> ₹{refund?.amount || 0}
          </Typography>
          <Typography>
            <strong>Refund Form Date:</strong>{" "}
            {formatDate(refund?.formSubmittedAt)}
          </Typography>
          <Typography>
            <strong>Refund Received:</strong> {formatDate(refund?.receivedAt)}
          </Typography>
          {refund?.proof && (
            <Link href={refund.proof} target="_blank" rel="noopener noreferrer">
              View Refund Proof
            </Link>
          )}

          <Divider gridColumn="span 2" sx={{ my: 2 }} />

          {/* Notes */}
          <Typography gridColumn="span 2">
            <strong>Notes:</strong> {notes || "-"}
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

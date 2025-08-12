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
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "-");

const Section = ({ icon, title, children }) => (
  <Paper elevation={2} sx={{ p: 2 }}>
    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
      {icon}
      <Typography variant="h6">{title}</Typography>
    </Stack>
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
      gap={1}
    >
      {children}
    </Box>
  </Paper>
);

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
        <Stack spacing={3}>
          <Section
            icon={<ShoppingCartIcon color="primary" />}
            title="Product Info"
          >
            <Typography>
              <strong>Display Name:</strong> {product.displayName}
            </Typography>
            <Typography>
              <strong>Original Name:</strong> {product.originalName}
            </Typography>
            <Typography>
              <strong>Order Id:</strong> {product.orderId}
            </Typography>
            <Typography>
              <strong>Account Used:</strong> {product.accountInfo}
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
              <Link
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Link
              </Link>
            </Typography>
          </Section>

          <Section icon={<StoreIcon color="secondary" />} title="Dealer Info">
            <Typography>
              <strong>Dealer Name:</strong> {dealer.info.name}
            </Typography>
            <Typography>
              <strong>Phone Number:</strong> {dealer.info.phoneNumber}
            </Typography>
            <Typography>
              <strong>Dealer Platform:</strong> {dealer.platform}
            </Typography>
          </Section>

          <Section
            icon={<CalendarMonthIcon color="success" />}
            title="Timeline"
          >
            <Typography>
              <strong>Order Placed:</strong>{" "}
              {formatDate(timeline.orderPlacedAt)}
            </Typography>
            <Typography>
              <strong>Form Submitted:</strong>{" "}
              {formatDate(timeline.formSubmittedAt)}
            </Typography>
            <Typography>
              <strong>Delivery Date:</strong>{" "}
              {formatDate(timeline.deliveryDate)}
            </Typography>
            <Typography>
              <strong>Delivered:</strong> {timeline.isDelivered ? "Yes" : "No"}
            </Typography>
          </Section>

          <Section icon={<FeedbackIcon color="warning" />} title="Feedback">
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
          </Section>

          <Section icon={<MonetizationOnIcon color="error" />} title="Refund">
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
          </Section>

          {(review?.screenshot ||
            rating?.screenshot ||
            sellerFeedback?.screenshot ||
            refund?.proof) && (
            <Paper elevation={2} sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <InfoIcon color="info" />
                <Typography variant="h6">Images</Typography>
              </Stack>

              <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                gap={2}
              >
                {rating?.screenshot && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Rating Screenshot
                    </Typography>
                    <Box
                      component="img"
                      src={rating.screenshot}
                      alt="Rating Screenshot"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        border: "1px solid #ccc",
                      }}
                    />
                  </Box>
                )}

                {review?.screenshot && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Review Screenshot
                    </Typography>
                    <Box
                      component="img"
                      src={review.screenshot}
                      alt="Review Screenshot"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        border: "1px solid #ccc",
                      }}
                    />
                  </Box>
                )}

                {sellerFeedback?.screenshot && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Seller Feedback Screenshot
                    </Typography>
                    <Box
                      component="img"
                      src={sellerFeedback.screenshot}
                      alt="Seller Feedback Screenshot"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        border: "1px solid #ccc",
                      }}
                    />
                  </Box>
                )}

                {refund?.proof && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Refund Proof
                    </Typography>
                    <Box
                      component="img"
                      src={refund.proof}
                      alt="Refund Proof"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        border: "1px solid #ccc",
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Paper>
          )}

          <Section icon={<NoteAltIcon color="info" />} title="Notes">
            <Typography>{notes || "-"}</Typography>
          </Section>
        </Stack>
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

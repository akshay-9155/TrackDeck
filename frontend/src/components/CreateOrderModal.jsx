import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useCreateOrder from "../hooks/useCreateOrder.js";

const CreateOrderModal = ({ open, onClose, refresh }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createOrder, loading } = useCreateOrder();

  const onSubmit = async (data) => {
    const result = await createOrder(data);
    if (result.success) {
      reset();
      onClose();
      refresh();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create New Order</DialogTitle>
      <DialogContent>
        <form id="create-order-form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={1}>
            {/* Feedback Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Feedback Type"
                select
                fullWidth
                defaultValue=""
                {...register("feedbackType", {
                  required: "Feedback type is required",
                })}
                error={!!errors.feedbackType}
                helperText={errors.feedbackType?.message}
              >
                {["Rating", "ReviewLive", "Review", "Other"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Order ID"
                fullWidth
                {...register("productOrderId", {
                  required: "Order ID is required",
                })}
                error={!!errors.productOrderId}
                helperText={errors.productOrderId?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Display Name"
                fullWidth
                {...register("productDisplayName", {
                  required: "Display name is required",
                })}
                error={!!errors.productDisplayName}
                helperText={errors.productDisplayName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Original Name"
                fullWidth
                {...register("productOriginalName", {
                  required: "Original name is required",
                })}
                error={!!errors.productOriginalName}
                helperText={errors.productOriginalName?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Product Link"
                fullWidth
                {...register("productLink")}
                error={!!errors.productLink}
                helperText={errors.productLink?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Platform"
                select
                fullWidth
                defaultValue=""
                {...register("productPlatform", {
                  required: "Product platform is required",
                })}
                error={!!errors.productPlatform}
                helperText={errors.productPlatform?.message}
              >
                {["Amazon", "Flipkart", "Meesho", "Other"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Condition"
                select
                fullWidth
                defaultValue=""
                {...register("productCondition", {
                  required: "Product condition is required",
                })}
                error={!!errors.productCondition}
                helperText={errors.productCondition?.message}
              >
                {["Original", "Exchange", "Semi Empty", "Empty", "Other"].map(
                  (condition) => (
                    <MenuItem key={condition} value={condition}>
                      {condition}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                {...register("productPrice", { required: "Price is required" })}
                error={!!errors.productPrice}
                helperText={errors.productPrice?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Less"
                type="number"
                fullWidth
                {...register("productLess", { required: "Less is required" })}
                error={!!errors.productLess}
                helperText={errors.productLess?.message}
              />
            </Grid>

            {/* Dealer Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dealer Name"
                fullWidth
                {...register("dealerName", {
                  required: "Dealer name is required",
                })}
                error={!!errors.dealerName}
                helperText={errors.dealerName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Dealer Phone"
                fullWidth
                {...register("dealerPhoneNumber")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Telegram ID"
                fullWidth
                {...register("dealerTelegramId")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Dealer Platform"
                select
                fullWidth
                defaultValue=""
                {...register("dealerPlatform", {
                  required: "Dealer platform is required",
                })}
                error={!!errors.dealerPlatform}
                helperText={errors.dealerPlatform?.message}
              >
                {["Telegram", "Whatsapp"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Timeline */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Order Placed"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register("orderPlacedAt")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Form Submitted"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register("formSubmittedAt")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Delivery Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register("deliveryDate")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Is Delivered?"
                select
                fullWidth
                defaultValue="false"
                {...register("isDelivered")}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </TextField>
            </Grid>

            {/* Feedback Status */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Review Status"
                select
                fullWidth
                defaultValue=""
                {...register("reviewStatus")}
              >
                {["Pending", "Completed", "Not Required"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Rating Status"
                select
                fullWidth
                defaultValue=""
                {...register("ratingStatus")}
              >
                {["Pending", "Completed", "Not Required"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Seller Feedback Status"
                select
                fullWidth
                defaultValue=""
                {...register("sellerFeedbackStatus")}
              >
                {["Pending", "Completed", "Not Required"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Screenshots */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Review Text"
                fullWidth
                {...register("reviewText")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Review Screenshot URL"
                fullWidth
                {...register("reviewScreenshot")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rating Screenshot URL"
                fullWidth
                {...register("ratingScreenshot")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Seller Feedback Screenshot"
                fullWidth
                {...register("sellerFeedbackScreenshot")}
              />
            </Grid>

            {/* Refund */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Refund Status"
                select
                fullWidth
                defaultValue=""
                {...register("refundStatus")}
              >
                {["Pending", "Received", "Rejected"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Refund Amount"
                type="number"
                fullWidth
                {...register("refundAmount")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Refund Form Submitted At"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register("refundFormSubmittedAt")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Refund Received At"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register("refundReceivedAt")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Refund Proof URL"
                fullWidth
                {...register("refundProof")}
              />
            </Grid>

            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                {...register("notes")}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          form="create-order-form"
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Creating..." : "Create Order"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrderModal;

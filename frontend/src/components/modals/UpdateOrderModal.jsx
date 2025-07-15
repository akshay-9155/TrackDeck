import React, { useState, useEffect } from "react";
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
import useUpdateOrder from "../../hooks/useUpdateOrder.js";
import { cleanObject } from "../../utils/helper.js";

const statusOptions = ["Pending", "Completed", "Not Required"];
const refundStatusOptions = ["Pending", "Received", "Rejected"];
const feedbackTypes = ["Rating", "ReviewLive", "Review", "Other"];
const platforms = ["Amazon", "Flipkart", "Meesho", "Other"];
const productConditions = [
  "Original",
  "Exchange",
  "Semi Empty",
  "Empty",
  "Other",
];
const dealerPlatforms = ["Telegram", "Whatsapp"];

const UpdateOrderModal = ({ open, onClose, order, refresh }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const { updateOrder, loading } = useUpdateOrder();
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (order) {
      reset({
        feedbackType: order.feedback?.type || "",
        productDisplayName: order.product?.displayName || "",
        productOriginalName: order.product?.originalName || "",
        productLink: order.product?.link || "",
        productPlatform: order.product?.platform || "",
        productCondition: order.product?.condition || "",
        productPrice: order.product?.price || "",
        productLess: order.product?.less || "",

        dealerInfoName: order.dealer?.info?.name || "",
        dealerInfoPhoneNumber: order.dealer?.info?.phoneNumber || "",
        dealerInfoTelegramId: order.dealer?.info?.telegramId || "",
        dealerPlatform: order.dealer?.platform || "",

        deliveryDate: order.timeline?.deliveryDate?.split("T")[0] || "",
        isDelivered: order.timeline?.isDelivered || false,

        reviewStatus: order.review?.status || "",
        reviewText: order.review?.text || "",
        reviewScreenshot: order.review?.screenshot || "",

        ratingStatus: order.rating?.status || "",
        ratingScreenshot: order.rating?.screenshot || "",

        sellerFeedbackStatus: order.sellerFeedback?.status || "",
        sellerFeedbackScreenshot: order.sellerFeedback?.screenshot || "",

        refundStatus: order.refund?.status || "",
        refundAmount: order.refund?.amount || "",
        refundFormDate: order.refund?.formSubmittedAt?.split("T")[0] || "",
        refundReceivedDate: order.refund?.receivedAt?.split("T")[0] || "",
        refundProof: order.refund?.proof || "",

        notes: order.notes || "",
      });
    }
  }, [order, reset]);

  const onSubmit = async (data) => {
    setSubmitError(null);
    const result = await updateOrder(order?._id, cleanObject(data));
    if (result.success) {
      refresh();
      onClose();
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Order</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Feedback */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Feedback Type"
                select
                fullWidth
                defaultValue={watch("feedbackType")}
                {...register("feedbackType")}
              >
                {feedbackTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Display Name"
                fullWidth
                {...register("productDisplayName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Original Name"
                fullWidth
                {...register("productOriginalName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Link"
                fullWidth
                {...register("productLink")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Product Platform"
                fullWidth
                defaultValue={watch("productPlatform")}
                {...register("productPlatform")}
              >
                {platforms.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Condition"
                fullWidth
                defaultValue={watch("productCondition")}
                {...register("productCondition")}
              >
                {productConditions.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                {...register("productPrice")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Less"
                type="number"
                fullWidth
                {...register("productLess")}
              />
            </Grid>

            {/* Dealer */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dealer Name"
                fullWidth
                {...register("dealerInfoName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dealer Phone"
                fullWidth
                {...register("dealerInfoPhoneNumber")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Telegram ID"
                fullWidth
                {...register("dealerInfoTelegramId")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Dealer Platform"
                fullWidth
                defaultValue={watch("dealerPlatform")}
                {...register("dealerPlatform")}
              >
                {dealerPlatforms.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Timeline */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Delivery Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("deliveryDate")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Is Delivered"
                select
                fullWidth
                defaultValue={watch("isDelivered")}
                {...register("isDelivered")}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </TextField>
            </Grid>

            {/* Review */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Review Status"
                fullWidth
                defaultValue={watch("reviewStatus")}
                {...register("reviewStatus")}
              >
                {statusOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Review Text"
                fullWidth
                multiline
                rows={2}
                {...register("reviewText")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Review Screenshot URL"
                fullWidth
                {...register("reviewScreenshot")}
              />
            </Grid>

            {/* Rating */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Rating Status"
                fullWidth
                defaultValue={watch("ratingStatus")}
                {...register("ratingStatus")}
              >
                {statusOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Rating Screenshot URL"
                fullWidth
                {...register("ratingScreenshot")}
              />
            </Grid>

            {/* Seller Feedback */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Seller Feedback Status"
                fullWidth
                defaultValue={watch("sellerFeedbackStatus")}
                {...register("sellerFeedbackStatus")}
              >
                {statusOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Seller Feedback Screenshot"
                fullWidth
                {...register("sellerFeedbackScreenshot")}
              />
            </Grid>

            {/* Refund */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Refund Status"
                fullWidth
                defaultValue={watch("refundStatus")}
                {...register("refundStatus")}
              >
                {refundStatusOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
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
                label="Refund Form Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("refundFormDate")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Refund Received Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("refundReceivedDate")}
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
                multiline
                rows={3}
                {...register("notes")}
              />
            </Grid>
          </Grid>
          {submitError && (
            <p style={{ color: "red", marginTop: 8 }}>{submitError}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Saving..." : "Update Order"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateOrderModal;

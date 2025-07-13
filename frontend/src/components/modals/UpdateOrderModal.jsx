import React, { useState } from "react";
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

const statusOptions = ["Pending", "Completed", "Not Required"];
const refundStatusOptions = ["Not Applied", "Applied", "Received", "Rejected"];

const UpdateOrderModal = ({ open, onClose, order, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: order,
  });

  const { updateOrder, loading } = useUpdateOrder(order?._id);
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (data) => {
    setSubmitError(null);
    const result = await updateOrder(data);
    if (result.success) {
      onSuccess();
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Delivery Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("deliveryDate")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Review Status"
                defaultValue={order?.reviewStatus}
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
                fullWidth
                label="Review Text"
                multiline
                rows={2}
                {...register("reviewText")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Review Screenshot URL"
                {...register("reviewScreenshot")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Refund Status"
                defaultValue={order?.refundStatus}
                {...register("refundStatus")}
              >
                {refundStatusOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Refund Amount"
                type="number"
                {...register("refundAmount")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Refund Proof URL"
                {...register("refundProof")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
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

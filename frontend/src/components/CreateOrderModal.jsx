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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Name"
                fullWidth
                {...register("productName", { required: "Required" })}
                error={!!errors.productName}
                helperText={errors.productName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Original Name"
                fullWidth
                {...register("productOriginalName", { required: "Required" })}
                error={!!errors.productOriginalName}
                helperText={errors.productOriginalName?.message}
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
                label="Platform"
                fullWidth
                select
                defaultValue="Amazon"
                {...register("platform")}
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
                label="Price"
                type="number"
                fullWidth
                {...register("price", { required: "Required" })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Less"
                type="number"
                fullWidth
                {...register("less", { required: "Required" })}
                error={!!errors.less}
                helperText={errors.less?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Order Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("orderDate", { required: "Required" })}
                error={!!errors.orderDate}
                helperText={errors.orderDate?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Delivery Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("deliveryDate")}
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

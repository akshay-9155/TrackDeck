import { useMemo, useState } from "react";
import useGetBinOrders from "../hooks/useGetBinOrders";
import useRestoreOrder from "../hooks/useRestoreOrder";
import useDeleteOrder from "../hooks/useDeleteOrder";
import useClearBin from "../hooks/useClearBin";
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Alert,
  TextField,
  Stack,
} from "@mui/material";
import DeleteConfirmDialog from "../components/modals/DeleteConfirmDialog";

const Bin = () => {
  const {
    loading: fetchLoading,
    error,
    binOrders,
    getBinOrders: refetchOrders,
  } = useGetBinOrders();

  const { restoreOrder, loading: restoreLoading } = useRestoreOrder();
  const { deleteOrder, loading: deleteLoading } = useDeleteOrder();
  const { clearBin, loading: clearLoading } = useClearBin();

  const [search, setSearch] = useState("");
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  // 🔥 Unified dialog state
  const [dialogState, setDialogState] = useState({
    open: false,
    type: null, // "delete" | "restore" | "clear"
    order: null,
  });

  // ================= ACTIONS =================

  const handleRestore = async (orderId) => {
    setLoadingOrderId(orderId);
    const result = await restoreOrder(orderId);
    if (result.success) refetchOrders();
    setLoadingOrderId(null);
    closeDialog();
  };

  const handleDelete = async (orderId) => {
    setLoadingOrderId(orderId);
    const result = await deleteOrder(orderId);
    if (result.success) refetchOrders();
    setLoadingOrderId(null);
    closeDialog();
  };

  const handleClearBin = async () => {
    const result = await clearBin();
    if (result.success) refetchOrders();
    closeDialog();
  };

  // ================= DIALOG CONTROL =================

  const openDialog = (type, order = null) => {
    setDialogState({ open: true, type, order });
  };

  const closeDialog = () => {
    setDialogState({ open: false, type: null, order: null });
  };

  const handleConfirm = () => {
    if (dialogState.type === "delete") {
      handleDelete(dialogState.order?._id);
    } else if (dialogState.type === "restore") {
      handleRestore(dialogState.order?._id);
    } else if (dialogState.type === "clear") {
      handleClearBin();
    }
  };

  // ================= FILTER =================

  const filteredOrders = useMemo(() => {
    if (!search) return binOrders || [];

    return (binOrders || []).filter((order) => {
      const orderId = order.product?.orderId?.toLowerCase();
      const name = order.product?.displayName?.toLowerCase();

      return (
        orderId?.includes(search.toLowerCase()) ||
        name?.includes(search.toLowerCase())
      );
    });
  }, [search, binOrders]);

  // ================= SKELETON =================

  const renderSkeleton = () => (
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton width="80%" />
          </TableCell>
          <TableCell>
            <Skeleton width="60%" />
          </TableCell>
          <TableCell align="right">
            <Skeleton
              variant="rectangular"
              width={140}
              height={36}
              sx={{ ml: "auto" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  // ================= UI =================

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Bin Orders</Typography>

            <Button
              variant="contained"
              color="error"
              onClick={() => openDialog("clear")}
              disabled={clearLoading || !binOrders?.length || fetchLoading}
            >
              {clearLoading ? "Clearing..." : "Clear Bin"}
            </Button>
          </Box>

          <TextField
            fullWidth
            size="small"
            placeholder="Search by Order ID or Display Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mt: 2 }}
          />
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || "Something went wrong while fetching orders."}
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Order ID</strong></TableCell>
                <TableCell><strong>Display Name</strong></TableCell>
                <TableCell align="right"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>

            {fetchLoading ? (
              renderSkeleton()
            ) : (
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography>
                        {search
                          ? "No matching orders found."
                          : "No orders in the bin."}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order._id} hover>
                      <TableCell>#{order.product?.orderId}</TableCell>
                      <TableCell>{order.product?.displayName}</TableCell>
                      <TableCell align="right">
                        <Stack
                          spacing={1}
                          direction={{ xs: "column", md: "row" }}
                          justifyContent="flex-end"
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => openDialog("restore", order)}
                            disabled={loadingOrderId === order._id}
                          >
                            {loadingOrderId === order._id && restoreLoading
                              ? "Restoring..."
                              : "Restore"}
                          </Button>

                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => openDialog("delete", order)}
                            disabled={loadingOrderId === order._id}
                          >
                            {loadingOrderId === order._id && deleteLoading
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>

      {/* 🔥 Unified Confirm Dialog */}
      <DeleteConfirmDialog
        open={dialogState.open}
        onClose={closeDialog}
        onConfirm={handleConfirm}
        title={
          dialogState.type === "delete"
            ? "Delete Order"
            : dialogState.type === "restore"
            ? "Restore Order"
            : "Clear Bin"
        }
        content={
          dialogState.type === "delete"
            ? "Are you sure you want to delete this order? This action cannot be undone."
            : dialogState.type === "restore"
            ? "Are you sure you want to restore this order?"
            : "Are you sure you want to delete ALL orders in the bin? This cannot be undone."
        }
        confirmBtnText={
          dialogState.type === "delete"
            ? "Delete"
            : dialogState.type === "restore"
            ? "Restore"
            : "Clear"
        }
        confirmBtnLoadingText={
          dialogState.type === "delete"
            ? "Deleting..."
            : dialogState.type === "restore"
            ? "Restoring..."
            : "Clearing..."
        }
        confirmBtnColor={
          dialogState.type === "delete" ? "error" : dialogState.type === "restore" ? "success" : "warning"
        }
        loading={deleteLoading || restoreLoading || clearLoading}
      />
    </>
  );
};

export default Bin;
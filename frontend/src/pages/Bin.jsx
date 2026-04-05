import React, { useMemo, useState } from "react";
import useGetBinOrders from "../hooks/useGetBinOrders";
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

const Bin = () => {
  const { loading, error, binOrders } = useGetBinOrders();
  const [search, setSearch] = useState("");

  const handleRestore = async (orderId) => {
    console.log("Order Restore logic", orderId);
  };

  const handleDelete = async (orderId) => {
  const confirm = window.confirm("Are you sure you want to delete this order?");
  if (!confirm) return;

  console.log("Delete order logic", orderId);
};

  // 🔍 Filtered Data
  const filteredOrders = useMemo(() => {
    if (!search) return binOrders;

    return binOrders.filter((order) => {
      const orderId = order.product?.orderId?.toString().toLowerCase();
      const name = order.product?.displayName?.toLowerCase();

      return (
        orderId?.includes(search.toLowerCase()) ||
        name?.includes(search.toLowerCase())
      );
    });
  }, [search, binOrders]);

  // 🔹 Skeleton Loader
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
              width={100}
              height={36}
              sx={{ ml: "auto" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Bin Orders</Typography>
          <Button variant="contained" color="error" onClick={() => console.log("Clear Bin logic")}>
            Clear Bin
          </Button>
        </Box>

        {/* 🔍 Search Input */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search by Order ID or Display Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mt: 2 }}
        />
      </Paper>

      {/* 🔴 Error State */}
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

          {/* 🟡 Loading State */}
          {loading ? (
            renderSkeleton()
          ) : (
            <TableBody>
              {/* ⚪ Empty State */}
              {filteredOrders?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1">
                      {search
                        ? "No matching orders found."
                        : "No orders in the bin."}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell>
                      #{order.product?.orderId}
                    </TableCell>
                    <TableCell>
                      {order.product?.displayName}
                    </TableCell>
                    <TableCell align="right">
                      <Stack spacing={1} direction={{sx: 'column', md: 'row'}} justifyContent="flex-end"  >
                        <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleRestore(order._id)}
                        sx={{ mb: { xs: 1, md: 0 } }}
                      >
                        Restore
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
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
  );
};

export default Bin;
import { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ViewOrderModal from "../components/modals/ViewOrderModal.jsx";
import UpdateOrderModal from "../components/modals/UpdateOrderModal.jsx";
import ProfileModal from "../components/modals/ProfileModal.jsx";
import UpdateProfileModal from "../components/modals/UpdateProfileModal.jsx";
import DeleteConfirmDialog from "../components/modals/DeleteConfirmDialog.jsx";
import OrderCard from "../components/OrderCard.jsx";
import useOrders from "../hooks/useOrders.js";
import useOrderSummary from "../hooks/useOrderSummary.js";
import useUserProfile from "../hooks/useUserProfile.js";
import CreateOrderModal from "../components/CreateOrderModal.jsx";
import UserDashboardSkeleton from "../components/skeleton/UserDashboardSkeleton.jsx";
import OrderSummarySkeleton from "../components/skeleton/OrderSummarySkeleton.jsx";
import OrderCardSkeleton from "../components/skeleton/OrderCardSkeleton.jsx";
import useDeleteOrder from "../hooks/useDeleteOrder.js";
import { toggleRefreshOrderSummary } from "../features/orderSlice.jsx";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);
  const [filters, setFilters] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [openDeleteOrder, setOpenDeleteOrder] = useState(false);

  const { loading: loadingOrders, fetchOrders } = useOrders(filters);
  const { summary, loading: loadingSummary } = useOrderSummary();
  const {
    userProfile,
    loading: loadingProfile,
    fetchProfile,
    deleteAccount,
  } = useUserProfile();
  const { deleteOrder, loading: loadingDeleteOrder } = useDeleteOrder();

  return loadingProfile ? (
    <UserDashboardSkeleton />
  ) : (
    <Box
      sx={{
        px: 4,
        py: 6,
        background: "linear-gradient(135deg, #1a2a44, #0d1b2a, #10302E)",
        minHeight: "100vh",
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(76, 81, 191, 0.1), transparent)",
          animation: "pulse 15s infinite",
        },
        "@keyframes pulse": {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1.5)" },
        },
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "900",
          color: "#e0e7ff",
          textTransform: "uppercase",
          letterSpacing: 2,
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          animation: "fadeIn 1s ease-in",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        Welcome, {userProfile?.name}
      </Typography>

      <Box
        sx={{
          background: "linear-gradient(90deg, #2d3748, #4a5568)",
          p: 3,
          borderRadius: 2,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          mb: 5,
          border: "1px solid rgba(224, 231, 255, 0.1)",
        }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={4}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "700",
            color: "#a0aec0",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          Order Summary
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setOpenProfile(true)}
          sx={{
            borderColor: "#a0aec0",
            color: "#a0aec0",
            "&:hover": {
              borderColor: "#e0e7ff",
              backgroundColor: "rgba(224, 231, 255, 0.1)",
              color: "#e0e7ff",
            },
            transition: "all 0.3s ease",
          }}
        >
          Profile
        </Button>
      </Box>

      {loadingSummary ? (
        <OrderSummarySkeleton />
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            background: "linear-gradient(135deg, #2d3748, #4a5568)",
            p: 3,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            mb: 5,
          }}
        >
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              sx={{
                fontWeight: "600",
                color: "#e0e7ff",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              Total Orders: {summary?.totalOrders}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              sx={{
                fontWeight: "600",
                color: "#e0e7ff",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              Delivered: {summary?.deliveredOrders}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              sx={{
                fontWeight: "600",
                color: "#e0e7ff",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              Pending Reviews: {summary?.pendingReviews}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              sx={{
                fontWeight: "600",
                color: "#e0e7ff",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              Refund Received: ₹{summary?.totalRefundAmount}
            </Typography>
          </Grid>
        </Grid>
      )}

      <Box
        sx={{
          background: "linear-gradient(90deg, #2d3748, #4a5568)",
          p: 3,
          borderRadius: 2,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          mb: 5,
          border: "1px solid rgba(224, 231, 255, 0.1)",
        }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={4}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "800",
            color: "#a0aec0",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Your Orders
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenCreate(true)}
          sx={{
            background: "linear-gradient(45deg, #4c51bf, #6b7280)",
            color: "#ffffff",
            "&:hover": {
              background: "linear-gradient(45deg, #5a67d8, #9ca3af)",
              boxShadow: "0 4px 12px rgba(90, 103, 216, 0.4)",
            },
            transition: "all 0.3s ease",
            padding: "8px 16px",
            borderRadius: 1,
          }}
        >
          Create Order
        </Button>
      </Box>

      {loadingOrders ? (
        <Grid container spacing={3}>
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {orders?.length > 0 ? (
            orders.map((order) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={order._id}>
                <OrderCard
                  order={order}
                  onView={() => {
                    setSelectedOrder(order);
                    setOpenView(true);
                  }}
                  onEdit={() => {
                    setSelectedOrder(order);
                    setOpenUpdate(true);
                  }}
                  onDelete={() => {
                    setSelectedOrder(order);
                    setOpenDeleteOrder(true);
                  }}
                />
              </Grid>
            ))
          ) : (
            <Typography
              sx={{
                color: "#a0aec0",
                fontStyle: "italic",
                textAlign: "center",
                width: "100%",
                fontSize: "1.2rem",
                padding: 2,
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 1,
              }}
            >
              No orders found
            </Typography>
          )}
        </Grid>
      )}

      {/* Modals */}
      <CreateOrderModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        refresh={async () => {
          await fetchOrders();
          dispatch(toggleRefreshOrderSummary());
        }}
      />
      <ViewOrderModal
        open={openView}
        onClose={() => setOpenView(false)}
        order={selectedOrder}
      />
      <UpdateOrderModal
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        order={selectedOrder}
        refresh={async () => {
          await fetchOrders();
          dispatch(toggleRefreshOrderSummary());
        }}
      />
      <ProfileModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        user={userProfile}
        onEditProfile={() => {
          setOpenProfile(false);
          setOpenUpdateProfile(true);
        }}
        onDeleteUser={() => {
          setOpenProfile(false);
          setOpenDeleteUser(true);
        }}
      />
      <UpdateProfileModal
        open={openUpdateProfile}
        onClose={() => setOpenUpdateProfile(false)}
        user={userProfile}
        refresh={fetchProfile}
      />
      <DeleteConfirmDialog
        open={openDeleteUser}
        onClose={() => setOpenDeleteUser(false)}
        onConfirm={deleteAccount}
        title="Delete Account"
        content="Are you sure you want to delete your account and all associated data?"
        loading={loadingProfile}
      />
      <DeleteConfirmDialog
        open={openDeleteOrder}
        onClose={() => setOpenDeleteOrder(false)}
        onConfirm={async () => {
          await deleteOrder(selectedOrder._id);
          await fetchOrders();
          dispatch(toggleRefreshOrderSummary());
          setOpenDeleteOrder(false);
        }}
        title="Delete Order"
        content="Are you sure you want to delete this order? Deleting it will delete all its data."
        loading={loadingDeleteOrder}
      />
    </Box>
  );
};

export default UserDashboard;

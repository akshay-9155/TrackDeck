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
import OrderCardSkeleton from "../components/skeleton/OrderCardSkeleton .jsx";

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

  const { loading: loadingOrders, fetchOrders } = useOrders(filters);
  const { summary, loading: loadingSummary } = useOrderSummary();
  const {
    userProfile,
    loading: loadingProfile,
    fetchProfile,
    deleteAccount,
  } = useUserProfile();

  return loadingProfile ? (
    <UserDashboardSkeleton />
  ) : (
    <Box sx={{ px: 3, py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {userProfile?.name}
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={3}
      >
        <Typography variant="h6">Order Summary</Typography>
        <Button variant="outlined" onClick={() => setOpenProfile(true)}>
          Profile
        </Button>
      </Box>

      {loadingSummary ? (
        <OrderSummarySkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography>Total Orders: {summary?.totalOrders}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography>Delivered: {summary?.deliveredOrders}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography>Pending Reviews: {summary?.pendingReviews}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography>
              Refund Received: ₹{summary?.totalRefundAmount}
            </Typography>
          </Grid>
        </Grid>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={4}
      >
        <Typography variant="h5">Your Orders</Typography>
        <Button variant="contained" onClick={() => setOpenCreate(true)}>
          Create Order
        </Button>
      </Box>

      {loadingOrders ? (
        <Grid container spacing={2}>
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
        <Grid container spacing={2}>
          {orders?.length > 0 ? (
            orders.map((order) => (
              <Grid item xs={12} md={6} lg={4} key={order._id}>
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
                    setOpenDeleteUser(true);
                  }}
                />
              </Grid>
            ))
          ) : (
            <Typography>No orders found</Typography>
          )}
        </Grid>
      )}

      {/* Modals */}
      <CreateOrderModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        refresh={fetchOrders}
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
        refresh={fetchOrders}
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
    </Box>
  );
};

export default UserDashboard;

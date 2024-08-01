import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import useStore from "./app/store";

import HomeLayout from "./layouts/HomeLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import ChatLayout from "./layouts/ChatLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProfileLayout from "./layouts/ProfileLayout";

import Home from "./pages/Home/Home";
import ProductDetail from "./features/products/ProductDetail";
import NotFound from "./pages/NotFound";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ForgotPassword from "./features/auth/ForgotPassword";

import Profile from "./features/profile/Profile/Profile";
import EditProfile from "./features/profile/Profile/EditProfile";

import Chat from "./pages/Chat";
import ChatDetail from "./features/chat/ChatDetail";
import SearchProduct from "./features/products/SearchProduct";

import ManageProduct from "./features/moderator/ManageProduct";
import ManageReports from "./features/moderator/ManageReports";
import ManageCategories from "./features/moderator/ManageCategories";
import ModeratorProfile from "./features/moderator/ModeratorProfile";

import AdminModerator from "./features/admin/AdminModerator";
import Dashboard from "./features/admin/Dashboard";
import AdminUser from "./features/admin/AdminUser";

import RequestTrade from "./features/profile/Exchange/RequestTrade";
import ReceiveTrade from "./features/profile/Exchange/ReceiveTrade";
import InventoryTrade from "./features/profile/Exchange/InventoryTrade";
import TransactionComplete from "./features/profile/Exchange/TransactionComplete";

import ProtectedRoute from "./ProtectedRoute";
import { jwtDecode } from "jwt-decode";
import AccessDenied from "./pages/AccessDenied";
import Cookies from "js-cookie";
import TransactionCancelled from "./features/profile/Exchange/TransactionCancelled";

export default function App() {
  const colorMode = useStore((state) => state.colorMode);
  const setUserId = useStore((state) => state.setUserId);
  const userInfo = useStore((state) => state.userInfo);
  const logout = useStore((state) => state.logout);

  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    // console.log("token", token);
    if (!token) {
      logout();
    }
    if (
      userInfo?.data.role == "Administrator" &&
      window.location.pathname == "/"
    ) {
      navigate("/admin");
    } else if (
      userInfo?.data.role == "Moderator" &&
      window.location.pathname == "/"
    ) {
      navigate("/moderator");
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="search" element={<SearchProduct />}>
            <Route path="products/:id" element={<ProductDetail />} />
          </Route>
        </Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<ProfileLayout />} roles={["User"]} />
          }
        >
          <Route index element={<Profile />} />
          <Route path=":id" element={<Profile />} />
          <Route path="profile-info" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="request-trade" element={<RequestTrade />} />
          <Route path="receive-trade" element={<ReceiveTrade />} />
          <Route path="transaction-complete" element={<TransactionComplete />} />
          <Route path="transaction-cancelled" element={<TransactionCancelled />} />
          <Route path="inventory-trade" element={<InventoryTrade />} />
          <Route path=":id/inventory-trade" element={<InventoryTrade />} />
          <Route path="rating" element={<h1>My Rating</h1>} />
          <Route path=":id/rating" element={<h1>Rating other</h1>} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminLayout />}
              roles={["Administrator"]}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin-moderator" element={<AdminModerator />} />
          <Route path="admin-user" element={<AdminUser />} />
        </Route>

        <Route
          path="/moderator"
          element={
            <ProtectedRoute element={<EmptyLayout />} roles={["Moderator"]} />
          }
        >
          <Route index element={<ManageProduct />} />
          <Route path="manage-products" element={<ManageProduct />} />
          <Route path="moderator-profile" element={<ModeratorProfile />} />
          <Route path="manage-reports" element={<ManageReports />} />
          <Route path="manage-categories" element={<ManageCategories />} />
        </Route>

        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

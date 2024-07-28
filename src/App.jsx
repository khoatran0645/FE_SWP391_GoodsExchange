import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import HomeLayout from "./layouts/HomeLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import ChatLayout from "./layouts/ChatLayout";

import Home from "./pages/Home";
import ProductDetail from "./features/products/ProductDetail";
import NotFound from "./pages/NotFound";
import Login from "./features/auth/Login";

import Profile from "./features/profile/Profile";
import EditProfile from "./features/profile/EditProfile";

import Chat from "./pages/Chat";
import ChatDetail from "./features/chat/ChatDetail";
import Register from "./features/auth/Register";
import SearchProduct from "./features/products/SearchProduct";

import ManageProduct from "./features/moderator/ManageProduct";
import ManageReports from "./features/moderator/ManageReports";
import ManageCategories from "./features/moderator/ManageCategories";
import ModeratorProfile from "./features/moderator/ModeratorProfile";

import { ThemeProvider, createTheme } from "@mui/material";
import useStore from "./app/store";
import AdminMod from "./features/admin/AdminMod";
import AdminLayout from "./features/admin/AdminLayout";
import AdminUser from "./features/admin/AdminUser";
import Dashboard from "./features/admin/Dashboard";
import ForgotPassword from "./features/auth/ForgotPassword";
import ProfileLayout from "./features/profile/ProfileLayout";
import RequestTrade from "./features/profile/RequestTrade";
import ReceiveTrade from "./features/profile/ReceiveTrade";
import InventoryTrade from "./features/profile/InventoryTrade";
import TransactionTrade from "./features/profile/TransactionTrade";
export default function App() {
  const colorMode = useStore((state) => state.colorMode);
  const userInfo = useStore((state) => state.userInfo);
  const navigate = useNavigate();
  const location = useLocation();

  const darkTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    // console.log("userInfo", userInfo);
    // console.log("token", token);
    if (token != null) {
      // Redirect to "/"
      if (userInfo?.data.role == "Moderator") {
        navigate("/manage-products");
      } else if (userInfo?.data.role == "Administrator") {
        navigate("/admin");
      } else {
        navigate("/");
        // navigate(location.pathname, { replace: false });
      }
    } else {
      useStore.setState({ userInfo: null, userProfile: null, auth: false });
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="search" element={<SearchProduct />}>
            <Route path="products/:id" element={<ProductDetail />} />
          </Route>
          <Route path="/" element={<ChatLayout />}>
            <Route index element={<Chat />} />
            <Route path="chat" element={<Chat />}>
              <Route index element={<h1>Chat</h1>} />
              <Route path=":id" element={<ChatDetail />} />
            </Route>
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminMod />} />
          <Route path="admin-mod" element={<AdminMod />} />
          <Route path="admin-user" element={<AdminUser />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<EmptyLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route path="manage-products" exact element={<ManageProduct />} />
          <Route path="moderator-profile" element={<ModeratorProfile />} />

          <Route path="manage-reports" element={<ManageReports />} />
          <Route path="manage-categories" element={<ManageCategories />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>

        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="profile-info" element={<Profile />} />
          <Route path="request-trade" element={<RequestTrade />} />
          <Route path="receive-trade" element={<ReceiveTrade />} />
          <Route path="transaction-trade" element={<TransactionTrade />} />
          <Route path="inventory-trade" element={<InventoryTrade />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

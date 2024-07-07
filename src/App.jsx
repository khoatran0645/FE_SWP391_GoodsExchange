import { Routes, Route } from "react-router-dom";
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
import ModeratorProfile from "./features/moderator/ModeratorProfile";

import { ThemeProvider, createTheme } from "@mui/material";
import useStore from "./app/store";
import AdminPage from "./features/admin/AdminPage";

export default function App() {
  const colorMode = useStore((state) => state.colorMode);

  const darkTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });
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
        <Route path="/" element={<EmptyLayout />}>
          <Route path="admin" element={<AdminPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="moderator-profile" exact element={<ModeratorProfile />} />
          <Route path="manage-products" element={<ManageProduct />} />
          <Route path="manage-reports" element={<ManageReports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

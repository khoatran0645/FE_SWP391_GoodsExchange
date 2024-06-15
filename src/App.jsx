import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import HomeLayout from "./layouts/HomeLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import ChatLayout from "./layouts/ChatLayout";

import Home from "./pages/Home";
import Product from "./features/products/ProductDetail";
import NotFound from "./pages/NotFound";
import Login from "./features/auth/Login";

import Chat from "./pages/Chat";
import ChatDetail from "./features/chat/ChatDetail";
import Register from "./features/auth/Register";
import SearchProduct from "./features/products/SearchProduct";
import Test from "./pages/Test";

import ManageProduct from "./components/moderator/ManageProduct";
import ManageReports from "./components/moderator/ManageReports";
import HomeMod from "./components/moderator/HomeMod";

import { ThemeProvider, createTheme } from "@mui/material";
import useStore from "./app/store";

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
          <Route path="user" element={<Test />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="search" element={<SearchProduct />} />
          <Route path="/" element={<ChatLayout />}>
            <Route index element={<Chat />} />
            <Route path="chat" element={<Chat />}>
              <Route index element={<h1>Chat</h1>} />
              <Route path=":id" element={<ChatDetail />} />
            </Route>
          </Route>
        </Route>
        <Route path="/" element={<EmptyLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="mod-home" exact element={<HomeMod />} />
          <Route path="manage-products" element={<ManageProduct />} />
          <Route path="manage-reports" element={<ManageReports />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

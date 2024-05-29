import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import HomeLayout from "./layouts/HomeLayout";
import EmptyLayout from "./layouts/EmptyLayout";

import Home from "./pages/Home";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register"

import User from "./pages/User";



import { ThemeProvider, createTheme } from "@mui/material";
import { useStore } from "./app/store";

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
          <Route path="user" element={<User />} />
          <Route path="products/:id" element={<Product />} />
        </Route>
        <Route path="/auth" element={<EmptyLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

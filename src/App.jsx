import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<Product />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

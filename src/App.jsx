import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import EmptyLayout from "./layouts/EmptyLayout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register"
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="products/:id" element={<Product />} />
            </Route>
            <Route path="/auth/" element={<EmptyLayout />}>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
            </Route>
        
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

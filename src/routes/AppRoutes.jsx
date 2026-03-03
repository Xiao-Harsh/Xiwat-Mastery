import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Wishlist from '../pages/Wishlist';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import SEO from '../components/ui/SEO';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={
                    <>
                        <SEO title="Home" description="Discover our curated collection of minimalist timepieces designed for those who appreciate the essence of time." type="website" />
                        <Home />
                    </>
                } />
                <Route path="shop" element={
                    <>
                        <SEO title="Shop Collection" description="Browse our full catalog of premium watches." type="website" />
                        <Shop />
                    </>
                } />
                <Route path="product/:id" element={
                    <>
                        {/* Title will be dynamic if we had access to product data here, using generic for now */}
                        <SEO title="Product Details" description="View detailed specifications and features of our timepieces." type="article" />
                        <ProductDetails />
                    </>
                } />
                <Route path="cart" element={
                    <>
                        <SEO title="Your Bag" description="Review your selected items and proceed to checkout." type="website" />
                        <Cart />
                    </>
                } />
                <Route path="checkout" element={
                    <ProtectedRoute>
                        <SEO title="Checkout" description="Complete your purchase securely." type="website" />
                        <Checkout />
                    </ProtectedRoute>
                } />
                <Route path="wishlist" element={
                    <>
                        <SEO title="My Wishlist" description="Your favorite XIWAT timepieces in one place." type="website" />
                        <Wishlist />
                    </>
                } />
                <Route path="login" element={
                    <>
                        <SEO title="Login" description="Access your account and track your orders." type="website" />
                        <Login />
                    </>
                } />
                <Route path="register" element={
                    <>
                        <SEO title="Register" description="Join the XIWAT Vault and establish your identity." type="website" />
                        <Register />
                    </>
                } />
                <Route path="profile" element={
                    <ProtectedRoute>
                        <SEO title="Profile" description="Manage your account settings and view order history." type="website" />
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="admin" element={
                    <ProtectedRoute>
                        <SEO title="Admin Dashboard" description="Manage XIWAT inventory and performance." type="website" />
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AppRoutes from './routes/AppRoutes'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <CartProvider>
                    <WishlistProvider>
                        <AuthProvider>
                            <AppRoutes />
                        </AuthProvider>
                    </WishlistProvider>
                </CartProvider>
            </BrowserRouter>
        </HelmetProvider>
    )
}

export default App

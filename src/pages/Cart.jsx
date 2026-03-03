import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalAmount, totalItems } = useCart();

    if (cart.length === 0) {
        return (
            <Container className="pt-40 pb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="relative">
                        <ShoppingBag size={80} strokeWidth={1} className="text-gray-200" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-xiwat-gold rounded-full flex items-center justify-center text-white text-[10px] font-bold">0</div>
                    </div>
                </motion.div>
                <h2 className="text-4xl font-display font-bold mb-6 uppercase tracking-tighter text-xiwat-black">Your Bag is Empty</h2>
                <p className="text-xiwat-gray font-light leading-relaxed mb-10 text-lg max-w-md mx-auto">
                    Discover the centerpiece of your future collection starting with our curated favorites.
                </p>
                <Link to="/shop">
                    <Button>Explore Collections</Button>
                </Link>
            </Container>
        );
    }

    return (
        <div className="pt-32 pb-24 bg-xiwat-white min-h-screen">
            <Container>
                <div className="flex items-end justify-between mb-12 border-b border-xiwat-lightgray pb-8">
                    <h1 className="text-4xl font-display font-bold uppercase tracking-tighter text-xiwat-black">
                        Shopping Bag <span className="text-xiwat-gold text-sm font-sans tracking-widest ml-4">({totalItems} ITEM{totalItems !== 1 ? 'S' : ''})</span>
                    </h1>
                    <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest border-b border-xiwat-black pb-1 hover:text-xiwat-gold hover:border-xiwat-gold transition-colors mb-2 text-xiwat-black">
                        Continue Shopping
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                        {cart.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromCart}
                            />
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-32">
                            <CartSummary totalAmount={totalAmount} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Cart;

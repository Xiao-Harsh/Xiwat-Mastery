import { Link } from 'react-router-dom';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Button from '../ui/Button';

const QuickView = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    if (!product) return null;

    const isLoved = isInWishlist(product.id);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full text-xiwat-black hover:text-xiwat-gold transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 aspect-square bg-xiwat-lightgray">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <p className="text-xs font-bold text-xiwat-gold uppercase tracking-[0.3em] mb-4">
                                {product.category}
                            </p>
                            <h2 className="text-3xl font-display font-bold text-xiwat-black mb-4">
                                {product.name}
                            </h2>
                            <p className="text-2xl font-bold text-xiwat-black mb-6">
                                ₹{product.price.toLocaleString()}
                            </p>
                            <p className="text-xiwat-gray text-sm leading-relaxed mb-8">
                                {product.description || "Indulge in the pinnacle of horological craftsmanship. This XIWAT piece combines minimalist design with uncompromising precision."}
                            </p>

                            <div className="flex space-x-4 mb-8">
                                <Button
                                    className="flex-1 flex items-center justify-center space-x-2"
                                    onClick={() => {
                                        addToCart(product);
                                        onClose();
                                    }}
                                >
                                    <ShoppingBag size={18} />
                                    <span>Add to Bag</span>
                                </Button>
                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className={`p-4 border border-xiwat-lightgray rounded-sm transition-colors ${isLoved ? 'text-red-500 bg-red-50' : 'text-xiwat-black'
                                        }`}
                                >
                                    <Heart size={20} className={isLoved ? "fill-red-500" : ""} />
                                </button>
                            </div>

                            <Link
                                to={`/product/${product.id}`}
                                onClick={onClose}
                                className="text-xs font-bold uppercase tracking-widest text-xiwat-black hover:text-xiwat-gold transition-colors border-b border-xiwat-black inline-block w-fit"
                            >
                                View Full Details
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuickView;

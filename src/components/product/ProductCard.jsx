import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import QuickView from './QuickView';

const ProductCard = ({ product, index = 0 }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const isLoved = isInWishlist(product.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col items-center bg-white rounded-sm pb-6 transition-all duration-500 hover:shadow-2xl"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] bg-xiwat-lightgray overflow-hidden rounded-t-sm">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-xiwat-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-4">
                    <button
                        onClick={() => addToCart(product)}
                        className="p-4 bg-white text-xiwat-black hover:bg-xiwat-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
                        title="Add to Bag"
                    >
                        <ShoppingBag size={20} strokeWidth={1.5} />
                    </button>
                    <button
                        onClick={() => setIsQuickViewOpen(true)}
                        className="p-4 bg-white text-xiwat-black hover:bg-xiwat-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-700"
                        title="Quick View"
                    >
                        <Eye size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Wishlist Button (Always visible on top right) */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-xiwat-black hover:text-red-500 hover:scale-110 transition-all duration-300 shadow-sm"
                >
                    <Heart size={16} className={isLoved ? "fill-red-500 text-red-500" : ""} />
                </button>

                {product.stock < 10 && (
                    <div className="absolute top-4 left-4 bg-xiwat-black text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1">
                        Limited Stock
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="mt-6 text-center space-y-2 px-4">
                <p className="text-[10px] text-xiwat-gold uppercase font-bold tracking-widest">{product.category}</p>

                {/* Simulated Star Rating */}
                <div className="flex items-center justify-center space-x-1 text-xiwat-gold">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-[10px] ${star <= Math.round(product.rating || 5) ? 'opacity-100' : 'opacity-30'}`}>★</span>
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">({product.stock * 3 + 7} Reviews)</span>
                </div>

                <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-display font-medium text-xiwat-black hover:text-xiwat-gold transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm font-bold text-xiwat-black">₹{product.price.toLocaleString()}</p>
            </div>

            <QuickView
                product={product}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
            />
        </motion.div>
    );
};

export default ProductCard;

import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlist.length === 0) {
        return (
            <Container className="pt-40 pb-24 text-center">
                <div className="mb-8 flex justify-center">
                    <Heart size={64} className="text-gray-200" strokeWidth={1} />
                </div>
                <h2 className="text-4xl font-display font-bold mb-6 uppercase tracking-tighter">Your Vault is Empty</h2>
                <p className="text-xiwat-gray font-light leading-relaxed mb-10 text-lg max-w-md mx-auto">
                    You haven't curated any favorites yet. Explore our collection to find your next heirloom.
                </p>
                <Link to="/shop">
                    <Button variant="outline">Browse Catalog</Button>
                </Link>
            </Container>
        );
    }

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <Container>
                <div className="text-center mb-16 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-[0.5em] text-xiwat-gold">Curated Favorites</p>
                    <h1 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter">Your Vault</h1>
                    <div className="w-12 h-[1px] bg-xiwat-gold mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {wishlist.map((product) => (
                        <div key={product.id} className="group relative flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] bg-xiwat-lightgray overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                                />
                                <button
                                    onClick={() => removeFromWishlist(product.id)}
                                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-xiwat-black hover:text-red-500 hover:scale-110 transition-all duration-300 shadow-sm z-10"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="mt-6 space-y-4 px-2">
                                <div className="text-center space-y-1">
                                    <p className="text-[10px] text-xiwat-gold uppercase font-bold tracking-widest">{product.category}</p>
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="text-lg font-display font-medium hover:text-xiwat-gold transition-colors">{product.name}</h3>
                                    </Link>
                                    <p className="text-sm font-bold">₹{product.price.toLocaleString()}</p>
                                </div>

                                <Button
                                    onClick={() => addToCart(product)}
                                    className="w-full py-4 text-[10px] uppercase font-bold tracking-widest"
                                >
                                    <div className="flex items-center justify-center space-x-3">
                                        <ShoppingBag size={14} strokeWidth={2} />
                                        <span>Add to Bag</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Wishlist;

import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { ShoppingBag, ChevronRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <Container className="pt-40 pb-24 text-center">
                <h2 className="text-3xl font-display font-bold mb-4">Timepiece Not Found</h2>
                <p className="text-xiwat-gray mb-10 font-light italic">The record for this specific model seems to be misplaced in our archives.</p>
                <Link to="/shop">
                    <Button variant="outline">Back to Catalog</Button>
                </Link>
            </Container>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-xiwat-white">
            <Container>
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-12">
                    <Link to="/" className="hover:text-xiwat-black transition-colors">Origin</Link>
                    <ChevronRight size={12} strokeWidth={3} />
                    <Link to="/shop" className="hover:text-xiwat-black transition-colors">Catalog</Link>
                    <ChevronRight size={12} strokeWidth={3} />
                    <span className="text-xiwat-black font-display font-medium italic">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
                    {/* Gallery */}
                    <div className="animate-in fade-in duration-1000">
                        <div className="relative aspect-[4/5] bg-xiwat-lightgray overflow-hidden shadow-2xl group">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover grayscale-[20%] transition-transform duration-[2000ms] group-hover:scale-105"
                            />
                            <div className="absolute inset-x-8 bottom-8 h-20 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <p className="text-[10px] text-white uppercase font-bold tracking-[0.5em]">High Precision Masterpiece</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square bg-xiwat-lightgray opacity-50 cursor-pointer hover:opacity-100 transition-luxury overflow-hidden border border-transparent hover:border-xiwat-gold">
                                    <img src={product.image} className="w-full h-full object-cover grayscale" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col space-y-12 animate-in slide-in-from-right-12 duration-1000">
                        <div className="space-y-6">
                            <p className="text-xs uppercase font-bold tracking-[0.5em] text-xiwat-gold">{product.category} Collection</p>
                            <h1 className="text-6xl font-display font-bold leading-tight tracking-tighter uppercase">{product.name}</h1>
                            <p className="text-3xl font-light">₹{product.price.toLocaleString()}</p>
                        </div>

                        <div className="h-[1px] bg-xiwat-lightgray w-1/4"></div>

                        <div className="space-y-8">
                            <p className="text-xiwat-gray text-lg leading-relaxed font-light italic">
                                "{product.description}"
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-xiwat-gold rotate-45"></div>
                                    <span>Sapphire Crystal</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-xiwat-gold rotate-45"></div>
                                    <span>Swiss Components</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-xiwat-gold rotate-45"></div>
                                    <span>Italian TANNED Straps</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-xiwat-gold rotate-45"></div>
                                    <span>2 Year Global Shield</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-8">
                            <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest border-b border-xiwat-lightgray pb-4">
                                <span className="text-xiwat-gray">Availability</span>
                                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                                    {product.stock > 0 ? `${product.stock} Units in Vault` : 'Reservations Closed'}
                                </span>
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`w-full py-6 text-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ${isAdded ? 'bg-xiwat-gold' : ''}`}
                            >
                                <div className="flex items-center justify-center space-x-4">
                                    <ShoppingBag size={20} strokeWidth={1.5} />
                                    <span>{isAdded ? 'Added to Bag' : 'Add to Collection'}</span>
                                </div>
                            </Button>
                        </div>

                        {/* Micro Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-xiwat-lightgray">
                            <div className="text-center space-y-3 group">
                                <Truck size={24} className="mx-auto text-xiwat-gold group-hover:scale-110 transition-transform" strokeWidth={1} />
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em]">Global Logistics</p>
                            </div>
                            <div className="text-center space-y-3 group">
                                <ShieldCheck size={24} className="mx-auto text-xiwat-gold group-hover:scale-110 transition-transform" strokeWidth={1} />
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em]">Authenticity Token</p>
                            </div>
                            <div className="text-center space-y-3 group">
                                <RefreshCw size={24} className="mx-auto text-xiwat-gold group-hover:scale-110 transition-transform" strokeWidth={1} />
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em]">30-Day Exchange</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Reviews Section */}
                <div className="mt-32 border-t border-xiwat-lightgray pt-16">
                    <h2 className="text-2xl font-display font-medium text-center uppercase tracking-widest mb-12">Curator Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Review 1 */}
                        <div className="bg-gray-50 p-8 shadow-sm hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default">
                            <div className="flex text-xiwat-gold text-[10px] mb-4">
                                ★★★★★
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Impeccable Craftsmanship</h3>
                            <p className="text-xiwat-gray text-xs leading-relaxed font-light italic mb-4">
                                "The attention to detail on this piece is extraordinary. It feels substantial on the wrist and commands attention in the most understated way."
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-wider">— Alexander M., Verified Collector</p>
                        </div>
                        {/* Review 2 */}
                        <div className="bg-gray-50 p-8 shadow-sm hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default">
                            <div className="flex text-xiwat-gold text-[10px] mb-4">
                                ★★★★★
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">A True Heirloom</h3>
                            <p className="text-xiwat-gray text-xs leading-relaxed font-light italic mb-4">
                                "Photographs do not do it justice. The way the dial catches the light is mesmerizing. Worth every penny for such timeless design."
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-wider">— Jonathan S., Verified Collector</p>
                        </div>
                        {/* Review 3 */}
                        <div className="bg-gray-50 p-8 shadow-sm hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default">
                            <div className="flex text-xiwat-gold text-[10px] mb-4">
                                ★★★★☆
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Elegant and Precise</h3>
                            <p className="text-xiwat-gray text-xs leading-relaxed font-light italic mb-4">
                                "Beautifully finished movement and fantastic power reserve. The strap takes a few days to break in, but it's very comfortable afterward."
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-wider">— David L., Verified Collector</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductDetails;

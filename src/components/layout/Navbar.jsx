import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);
    const { totalItems } = useCart();
    const { totalWishlistItems } = useWishlist();
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isLinkActive = (link) => {
        if (link.name === 'Home') {
            return location.pathname === '/' && !location.hash;
        }
        if (link.name === 'Collections') {
            return location.hash === '#featured';
        }
        if (link.name === 'Shop') {
            return (
                location.pathname.startsWith('/shop') ||
                location.pathname.startsWith('/product/') ||
                location.pathname === '/cart' ||
                location.pathname === '/checkout'
            );
        }
        return location.pathname === link.path;
    };

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Reset scroll when navigating to a new page
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        } else {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const handleNavClick = (e, link) => {
        setIsOpen(false);

        // Handle "Home" link
        if (link.name === 'Home') {
            if (location.pathname === '/') {
                e.preventDefault();
                if (location.hash) {
                    navigate('/', { replace: true });
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        // Handle "Collections" link
        if (link.name === 'Collections') {
            if (location.pathname === '/') {
                e.preventDefault();
                if (location.hash !== '#featured') {
                    navigate('/#featured');
                } else {
                    const element = document.getElementById('featured');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } else {
                // If on another page, navigate home with hash
                e.preventDefault();
                navigate('/#featured');
            }
            return;
        }

        // Handle "Shop" link
        if (link.name === 'Shop') {
            if (location.pathname === '/shop') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/#featured' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-xiwat-white/80 backdrop-blur-md border-b border-xiwat-lightgray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={(e) => handleNavClick(e, { name: 'Home', path: '/' })}
                        className="text-2xl font-display font-bold tracking-tighter hover:text-xiwat-gold transition-colors"
                    >
                        XIWAT
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 uppercase text-xs font-semibold tracking-widest">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={(e) => handleNavClick(e, link)}
                                className={`transition-colors duration-300 ${isLinkActive(link)
                                    ? 'text-xiwat-gold'
                                    : 'text-xiwat-black'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-5">
                        <button
                            className="transition-colors"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search size={20} strokeWidth={1.5} />
                        </button>

                        <Link to={isAuthenticated ? "/profile" : "/login"}
                            className="transition-colors group relative"
                        >
                            <User size={20} strokeWidth={1.5} className={isAuthenticated ? "text-xiwat-gold" : ""} />
                            {isAuthenticated && (
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Account
                                </span>
                            )}
                        </Link>

                        <Link to="/wishlist" className="relative transition-all cursor-pointer">
                            <Heart size={20} strokeWidth={1.5} />
                            {totalWishlistItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                                    {totalWishlistItems}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="relative transition-all">
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-xiwat-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        <button
                            className="md:hidden transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-xiwat-white border-b border-xiwat-lightgray z-40 shadow-sm"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                <Search size={18} className="absolute left-4 text-gray-400" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search our collection..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-50 border border-xiwat-lightgray rounded-full py-3 pl-12 pr-12 focus:outline-none focus:border-xiwat-gold focus:ring-1 focus:ring-xiwat-gold transition-colors text-sm text-xiwat-black"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute right-4 text-gray-400 hover:text-xiwat-black transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-xiwat-white border-b border-xiwat-lightgray overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4 text-center uppercase text-sm font-semibold tracking-widest text-xiwat-black">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={`block py-2 transition-colors ${isLinkActive(link) ? 'text-xiwat-gold' : 'text-xiwat-black'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

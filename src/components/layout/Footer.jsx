import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-xiwat-black text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-display font-bold tracking-tighter italic">XIWAT</h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Defining time through the lens of minimalism and craftsmanship. Premium timepieces for the modern minimalist.
                        </p>
                        <div className="flex space-x-4">
                            <Instagram size={20} className="hover:text-xiwat-gold cursor-pointer transition-colors" />
                            <Twitter size={20} className="hover:text-xiwat-gold cursor-pointer transition-colors" />
                            <Facebook size={20} className="hover:text-xiwat-gold cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="/shop" className="hover:text-white transition-colors">Classic Series</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition-colors">Modern Minimal</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition-colors">Chrono Collection</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition-colors">Limited Edition</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/" className="hover:text-white transition-colors">Warranty</Link></li>
                            <li><Link to="/" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">The Collector's Club</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive releases and receive 10% off your first acquisition.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent border-b border-gray-700 py-2 focus:border-xiwat-gold outline-none w-full text-sm"
                            />
                            <button type="submit" className="border-b border-gray-700 py-2 px-4 uppercase text-[10px] font-bold tracking-widest hover:text-xiwat-gold transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                    <p>© 2024 XIWAT. All Rights Reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

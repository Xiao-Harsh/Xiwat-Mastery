import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import ProductGrid from '../components/product/ProductGrid';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import heroBg from '../assets/images/home final.webp';

const Home = () => {
    const featuredProducts = products.filter(p => p.featured).slice(0, 3);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="text-xiwat-black">
            {/* Hero Section */}
            <section className="relative h-[95vh] flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 10, ease: "easeOut" }}
                        src={heroBg}
                        alt="Premium Watch"
                        className="w-full h-full object-cover blur-[2px]"
                    />
                    {/* Sophisticated radial overlay for focus and highlighting */}
                    <div className="absolute inset-0 bg-black/40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                </div>

                <Container className="relative z-10 text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tighter leading-none"
                    >
                        XIWAT <br />
                        <span className="italic font-normal text-xiwat-gold">Timeless</span> Mastery.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="max-w-md text-gray-200 text-lg mb-8 font-light leading-relaxed"
                    >
                        Discover our curated collection of minimalist timepieces designed for those who appreciate the essence of time.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="flex space-x-4"
                    >
                        <Link to="/shop">
                            <Button>Shop Collection</Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={() => scrollToSection('philosophy')}
                            className="text-white border-white/30 backdrop-blur-sm hover:bg-white/10 hover:text-white"
                        >
                            Our Story
                        </Button>
                    </motion.div>
                </Container>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 right-10 z-10 hidden md:block"
                >
                    <div className="flex items-center space-x-4 text-white text-[10px] uppercase font-bold tracking-[0.3em] animate-pulse">
                        <span>Scroll to explore</span>
                        <div className="w-10 h-[1px] bg-white/50"></div>
                    </div>
                </motion.div>
            </section>

            {/* Featured Products */}
            <section id="featured" className="scroll-mt-20">
                <Container className="py-24">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-xiwat-gold mb-2">The Collection</p>
                            <h2 className="text-3xl md:text-4xl font-display font-bold">Featured Selection</h2>
                        </div>
                        <Link to="/shop" className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-xiwat-gold transition-colors group">
                            <span>View All Models</span>
                            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <ProductGrid products={featuredProducts} />
                </Container>
            </section>

            {/* Philosophy Section */}
            <section id="philosophy" className="bg-xiwat-lightgray py-32 mt-24 overflow-hidden scroll-mt-20">
                <Container className="text-center relative">
                    <div className="absolute -top-10 -left-10 text-9xl font-display font-bold text-black/5 select-none uppercase">Xiwat</div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-xiwat-gold mb-8">The Philosophy</h3>
                    <blockquote className="text-3xl md:text-5xl font-display font-bold leading-tight mb-12 max-w-4xl mx-auto">
                        "Simplicity is the ultimate sophistication. We strip away the noise to reveal the soul of every second."
                    </blockquote>
                    <p className="text-xiwat-gray italic font-light">The XIWAT Manifesto</p>
                </Container>
            </section>
        </div>
    );
};

export default Home;

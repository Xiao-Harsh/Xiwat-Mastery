import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductFilter from '../components/product/ProductFilter';
import ProductGrid from '../components/product/ProductGrid';
import Container from '../components/layout/Container';
import ProductSkeleton from '../components/ui/ProductSkeleton';
import { motion } from 'framer-motion';
import api from '../config/api';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [sortBy, setSortBy] = useState('featured');
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                if (searchTerm) {
                    const response = await api.get('/api/products/search', {
                        params: { query: searchTerm }
                    });
                    setProductList(response.data);
                } else {
                    const response = await api.get('/api/products');
                    if (response.data && response.data.length > 0) {
                        setProductList(response.data);
                    } else {
                        // If API returns empty list, fall back to local data
                        console.warn('API returned empty product list, falling back to local data');
                        setProductList(products);
                    }
                }
            } catch (error) {
                console.error('Error fetching products from API, falling back to local data:', error);
                // Fallback to local products data if API fails
                setProductList(products);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchProducts, 300); // Debounce
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const categories = ['All', ...new Set(productList.map(p => p.category || 'Luxury'))];

    const handleSearchChange = (val) => {
        setSearchTerm(val);
        if (val) {
            setSearchParams({ q: val });
        } else {
            setSearchParams({});
        }
    };

    const sortedProducts = useMemo(() => {
        return [...productList]
            .filter(p => (category === 'All' || p.category === category))
            .sort((a, b) => {
                if (sortBy === 'price-low') return a.price - b.price;
                if (sortBy === 'price-high') return b.price - a.price;
                return 0;
            });
    }, [productList, category, sortBy]);

    const handleCategoryChange = (cat) => {
        setCategory(cat);
    };

    return (
        <div className="pt-32 pb-24">
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 space-y-4"
                >
                    <p className="text-xs font-bold uppercase tracking-[0.5em] text-xiwat-gold">Explore</p>
                    <h1 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-xiwat-black">The Catalog</h1>
                    <div className="w-12 h-[1px] bg-xiwat-gold mx-auto"></div>
                </motion.div>

                {/* Toolbar */}
                <ProductFilter
                    categories={categories}
                    activeCategory={category}
                    onCategoryChange={handleCategoryChange}
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />

                {/* Content */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : sortedProducts.length > 0 ? (
                    <ProductGrid products={sortedProducts} className="animate-in fade-in zoom-in-95 duration-500" />
                ) : (
                    <div className="text-center py-24 border border-dashed border-xiwat-lightgray">
                        <p className="text-gray-400 font-light italic">No products found for your criteria.</p>
                        <button
                            onClick={() => {
                                setCategory('All');
                                setSearchTerm('');
                                setSearchParams({});
                            }}
                            className="mt-4 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-xiwat-black pb-1 hover:text-xiwat-gold hover:border-xiwat-gold transition-colors text-xiwat-black"
                        >
                            Reset Curation
                        </button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Shop;

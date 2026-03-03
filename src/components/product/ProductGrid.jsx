import ProductCard from './ProductCard';

const ProductGrid = ({ products, className = '' }) => {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 ${className}`}>
            {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
    );
};

export default ProductGrid;

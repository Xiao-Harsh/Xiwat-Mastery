import { Search, ChevronDown } from 'lucide-react';

const ProductFilter = ({
    categories,
    activeCategory,
    onCategoryChange,
    searchTerm,
    onSearchChange,
    sortBy,
    onSortChange
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0 border-b border-xiwat-lightgray pb-8">
            {/* Categories */}
            <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar pb-2">
                <div className="xiwat-tabs">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`xiwat-tab ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                    <div
                        className="xiwat-glider"
                        style={{
                            transform: `translateX(${categories.indexOf(activeCategory) * 80}px)`
                        }}
                    />
                </div>
            </div>

            {/* Search & Sort */}
            <div className="flex items-center space-x-8 w-full md:w-auto">
                <form
                    className="relative flex-grow min-w-[200px] md:w-64 group"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <button
                        type="button"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 group-focus-within:text-xiwat-gold transition-colors"
                    >
                        <Search size={16} />
                    </button>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 bg-transparent border-2 border-xiwat-lightgray rounded-full focus:outline-none focus:border-xiwat-gold placeholder-gray-400 transition-all duration-300 text-xs shadow-sm hover:border-gray-300"
                    />
                    {searchTerm && (
                        <button
                            type="reset"
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-xiwat-black transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </form>

                <div className="relative group flex items-center">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="appearance-none bg-transparent pr-8 text-[10px] font-bold uppercase tracking-[0.2em] outline-none cursor-pointer border-none p-0 text-xiwat-black transition-colors"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-xiwat-black transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;

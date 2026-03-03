import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="group relative flex flex-col items-center animate-pulse bg-white rounded-sm pb-6">
            {/* Image Container Skeleton */}
            <div className="relative w-full aspect-[4/5] bg-gray-200 overflow-hidden rounded-t-sm"></div>

            {/* Info Skeleton */}
            <div className="mt-6 text-center space-y-3 w-full px-4 flex flex-col items-center">
                {/* Category line */}
                <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                {/* Stars line */}
                <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                {/* Name line */}
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                {/* Price line */}
                <div className="h-3 bg-gray-200 rounded w-1/4 mt-2"></div>
            </div>
        </div>
    );
};

export default ProductSkeleton;

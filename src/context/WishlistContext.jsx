import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const item = window.localStorage.getItem('xiwat_wishlist');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error('Error reading wishlist from localStorage', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem('xiwat_wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error('Error saving wishlist to localStorage', error);
        }
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            if (!prev.find((item) => item.id === product.id)) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            } else {
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
                totalWishlistItems: wishlist.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

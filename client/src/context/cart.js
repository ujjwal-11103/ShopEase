import React, { useState, useContext, createContext, useEffect } from 'react';

// Create the context
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const existingCartData = localStorage.getItem("cart")
        if (existingCartData) setCart(JSON.parse(existingCartData))

    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

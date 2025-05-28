import { createContext, useContext, useState } from "react";

// Create context
const CartContext = createContext();

// Provider
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState([])
  return (
    <CartContext.Provider value={{ cart, setCart, product, setProduct }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook (recommended)
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };

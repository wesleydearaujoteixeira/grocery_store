'use client';

import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the cart context
interface CartContextType {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create the context with a default value of `undefined`
export const UpdateCartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const UpdateCartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState <any[]> ([]); // Cart state

  return (
    <UpdateCartContext.Provider value={{ cart, setCart }}>
      {children}
    </UpdateCartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useUpdateCart = () => {
  const context = useContext(UpdateCartContext);
  if (!context) {
    throw new Error("useUpdateCart must be used within an UpdateCartProvider");
  }
  return context;
};

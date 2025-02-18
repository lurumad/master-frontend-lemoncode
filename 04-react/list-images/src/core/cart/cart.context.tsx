import React from "react";
import { CartItem } from "./cart.model";

interface CartProfile {
  cartItems: CartItem[];
  updateCart: (item: CartItem) => void;
  emptyCart: () => void;
}

export const CartContext = React.createContext<CartProfile>({
  cartItems: [],
  updateCart: () => {
    console.warn(
      "** If you area reading this, likely you have forgotten to add the provider on top of your app"
    );
  },
  emptyCart: () => {
    console.warn(
      "** If you area reading this, likely you have forgotten to add the provider on top of your app"
    );
  },
});

interface CartProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProps> = ({ children }) => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const updateCart = (item: CartItem) => {
    console.log("cartItems", cartItems);
    console.log("item", item);
    if (cartItems.some((i) => i.id === item.id)) {
      removeItem(item.id);
    } else {
      setCartItems((items) => [...items, item]);
    }
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);

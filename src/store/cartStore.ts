import { create } from "zustand";

type CartItemType = {
  id: number;
  title: string;
  heroImage: string;
  price: number;
  quantity: number;
  maxQuantity: number;
};

type CartState = {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (itemId: number) => void;
  incrementItem: (itemId: number) => void;
  decrementItem: (itemId: number) => void;
  getTotalPrice: () => string;
  getItemCount: () => number;
  resetCart: () => void;
};

const initialCartItems: CartItemType[] = [];

export const useCartStore = create<CartState>((set, get) => ({
  items: initialCartItems,
  addItem: (item: CartItemType) => {
    const existingItem = get().items.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      set((state) => ({
        items: state.items.map((carItem) =>
          carItem.id === item.id
            ? {
                ...carItem,
                quantity: Math.min(
                  carItem.quantity + item.quantity,
                  carItem.maxQuantity
                ),
              }
            : carItem
        ),
      }));
    } else {
      set((state) => ({
        items: [...state.items, item],
      }));
    }
  },
  removeItem: (itemId: number) => {
    set((state) => ({
      items: state.items.filter((cartItem) => cartItem.id !== itemId),
    }));
  },
  incrementItem: (itemId: number) => {
    set((state) => {
      return {
        items: state.items.map((cartItem) =>
          cartItem.id === itemId && cartItem.quantity < cartItem.maxQuantity
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };
    });
  },
  decrementItem: (itemId: number) => {
    set((state) => ({
      items: state.items.map((cartItem) =>
        cartItem.id === itemId && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ),
    }));
  },
  getTotalPrice: () => {
    const { items } = get();
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  },
  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
  resetCart: () => {
    set({ items: initialCartItems });
  },
}));

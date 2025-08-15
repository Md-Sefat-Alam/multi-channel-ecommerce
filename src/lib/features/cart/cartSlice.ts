import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { decryptData, encryptData } from "@/utils/crypto/encryption";
import { IImage } from "@/app/lib/types/rootTypes";

// Type for Cart Item
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageLink: IImage[];
}

// Cart State Type
export interface CartState {
    items: CartItem[];
    totalPrice: number;
}

// Helper: Calculate Total Price
export const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Helper: Safe Decrypt Data
const safeDecryptData = (data: string | null): CartItem[] => {
    try {
        return data ? decryptData(data) : [];
    } catch (error) {
        console.error("Decryption failed:", error);
        return [];
    }
};

// Load Initial State
const loadInitialState = (): CartState => {
    // if (typeof window !== "undefined" && localStorage) {
    //     const cart = localStorage?.getItem("cart") || "[]";
    //     const items: CartItem[] = JSON.parse(cart);
    //     return {
    //         items,
    //         totalPrice: calculateTotalPrice(items),
    //     };
    // }
    return { items: [], totalPrice: 0 };
};

// Sync to LocalStorage
const syncLocalStorage = (state: CartState) => {
    try {
        // const encryptedData = encryptData(state.items);
        localStorage?.setItem("cart", JSON.stringify(state.items));
    } catch (error) {
        console.error("Failed to sync cart to localStorage:", error);
    }
};

// Cart Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: loadInitialState(),
    reducers: {
        setItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            state.totalPrice = calculateTotalPrice(state.items);
            syncLocalStorage(state);
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                message.info("You have already added this item to the cart.");
            } else {
                state.items.push(action.payload);
                message.success("Added to cart!");
            }
            state.totalPrice = calculateTotalPrice(state.items);
            syncLocalStorage(state);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            state.totalPrice = calculateTotalPrice(state.items);
            syncLocalStorage(state);
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity;
                state.totalPrice = calculateTotalPrice(state.items);
                syncLocalStorage(state);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            syncLocalStorage(state);
        },
    },
});

// Actions
export const {
    setItems: setCartItems,
    addItem: addToCart,
    removeItem: removeFromCart,
    updateQuantity,
    clearCart,
} = cartSlice.actions;

// Reducer
export default cartSlice.reducer;

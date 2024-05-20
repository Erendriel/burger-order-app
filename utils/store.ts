import { ActionTypes, CartType, ProductType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
};

export const useCartStore = create(
    persist<CartType & ActionTypes>(
        (set, get) => ({
            products: INITIAL_STATE.products,
            totalItems: INITIAL_STATE.totalItems,
            totalPrice: INITIAL_STATE.totalPrice,
            addToCart(item) {
                const products = get().products;
                const productInState = products.find(
                    (product) => product.id === item.id
                );

                if (productInState) {
                    const updatedProducts = products.map((product) =>
                        product.id === productInState.id
                            ? {
                                ...product,
                                quantity: product.quantity + item.quantity,
                            }
                            : product
                    );
                    set((state) => ({
                        products: updatedProducts,
                        totalItems: state.totalItems + item.quantity,
                        totalPrice: state.totalPrice + (item.price * item.quantity),
                    }));
                } else {
                    set((state) => ({
                        products: [...state.products, { ...item, quantity: item.quantity }],
                        totalItems: state.totalItems + item.quantity,
                        totalPrice: state.totalPrice + (item.price * item.quantity),
                    }));
                }
            },
            removeFromCart(item) {
                set((state) => ({
                    products: state.products.filter((product) => product.id !== item.id),
                    totalItems: state.totalItems - item.quantity,
                    totalPrice: state.totalPrice - (item.price * item.quantity),
                }));
            },
            increaseQuantity(item) {
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === item.id
                            ? { ...product, quantity: product.quantity + 1 }
                            : product
                    ),
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + item.price,
                }));
            },
            decreaseQuantity(item) {
                const productInState = get().products.find(
                    (product) => product.id === item.id
                );

                if (productInState && productInState.quantity > 1) {
                    set((state) => ({
                        products: state.products.map((product) =>
                            product.id === item.id
                                ? { ...product, quantity: product.quantity - 1 }
                                : product
                        ),
                        totalItems: state.totalItems - 1,
                        totalPrice: state.totalPrice - item.price,
                    }));
                } else if (productInState && productInState.quantity === 1) {
                    set((state) => ({
                        products: state.products.filter((product) => product.id !== item.id),
                        totalItems: state.totalItems - 1,
                        totalPrice: state.totalPrice - item.price,
                    }));
                }
            },
            clearCart() {
                set({
                    products: [],
                    totalItems: 0,
                    totalPrice: 0,
                });
            },
        }),
        { name: "cart", getStorage: () => localStorage }
    )
);

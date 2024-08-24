import { createContext, useContext, useReducer, ReactNode } from 'react';
import { ICart, ICartState, IProduct } from 'src/@types/shared';

// Initial state of the cart
const initialCartState: ICartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

// Define action types
export const actions = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
};

// Actions to update the cart
const cartReducer = (state: ICartState, action: any) => {
    switch (action.type) {
        case actions.ADD_TO_CART:
            // Logic to add item to cart
            const newItem = action.payload;
            return {
                ...state,
                items: [...state.items, newItem],
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + newItem.price,
            };
        case actions.REMOVE_FROM_CART:
            // Logic to remove item from cart
            const updatedItems = state.items.filter(item => item._id !== action.payload._id);
            const removedItem = state.items.find(item => item._id === action.payload._id);
            return {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems - (removedItem ? 1 : 0),
                totalPrice: state.totalPrice - (removedItem ? removedItem.price! * removedItem.quantity! : 0),
            };
        case actions.UPDATE_QUANTITY:
            // Logic to update quantity of an item in cart
            const updatedCart = state.items.map(item =>
                item._id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
            );
            return {
                ...state,
                items: updatedCart,
                totalPrice: calculateTotalPrice(updatedCart),
            };
        case actions.CLEAR_CART:
            // Logic to clear the cart
            return initialCartState;
        default:
            return state;
    }
};

// Helper function to calculate total price
const calculateTotalPrice = (items: IProduct[]): number => {
    return items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
};

// Create context for cart state and actions
const CartContext = createContext<{
    cartState: ICartState;
    addToCart: (item: IProduct) => void;
    removeFromCart: (item: IProduct) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void
} | undefined>(undefined);

// Custom hook to use cart context
export const useCart = (): ICart => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Cart provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

    const addToCart = (item: IProduct) => {
        dispatch({ type: actions.ADD_TO_CART, payload: item });
    };

    const removeFromCart = (item: IProduct) => {
        dispatch({ type: actions.REMOVE_FROM_CART, payload: item });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: actions.UPDATE_QUANTITY, payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: actions.CLEAR_CART });
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

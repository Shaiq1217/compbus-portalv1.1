import { IProduct } from ".";

export type ICartState = {
    items: IProduct[];
    totalItems: number;
    totalPrice: number;
}

export type ICart = {
    cartState: ICartState;
    addToCart: (item: IProduct) => void;
    removeFromCart: (item: IProduct) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}
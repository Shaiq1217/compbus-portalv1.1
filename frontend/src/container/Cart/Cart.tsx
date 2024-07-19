import React, { useContext } from 'react'
import { useCart } from 'src/components/Cart/CartProvider';

const Cart = () => {
    const cart = useCart();
    console.log(cart.cartState.items)
    return (
        <div>Cart</div>
    )
}

export default Cart
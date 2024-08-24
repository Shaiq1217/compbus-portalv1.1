import { IProduct } from 'src/@types/shared';
import { useCart } from 'src/components/Cart/CartProvider';

const Cart = () => {
    const { cartState } = useCart();
    const { items, totalItems, totalPrice } = cartState;

    return (
        <div className="p-4 max-w-3xl mx-auto ">
            {items.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <div className="bg-white-100 p-4 rounded-lg shadow-md">
                        <ul className="space-y-4 mb-6">
                            {items.map((item: IProduct) => (
                                <li key={item._id} className="p-4 flex flex-row items-center ">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-40 h-full object-cover rounded-lg py-2"
                                        />
                                    )}
                                    <div className="p-4 flex flex-col">
                                        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                                        {item.description && (
                                            <p className="text-gray-600 mb-2">{item.description}</p>
                                        )}
                                        <p className="text-gray-600 mb-2">
                                            Price: <span className="font-medium">${item.price?.toFixed(2) ?? '0.00'}</span>
                                        </p>
                                        {item.discount > 0 && (
                                            <p className="text-red-500 mb-2">
                                                Discount: <span className="font-medium">{item.discount}%</span>
                                            </p>
                                        )}
                                        <p className="text-gray-500">
                                            Quantity: <span className="font-medium">{item.quantity ?? 0}</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <p className="text-lg font-semibold mb-2">Cart Summary</p>
                        <p className="text-gray-700 mb-1">
                            Total Items: <span className="font-medium">{totalItems}</span>
                        </p>
                        <p className="text-gray-700">
                            Total Price: <span className="font-medium">${totalPrice.toFixed(2)}</span>
                        </p>
                    </div>
                </>
            )
            }
        </div >
    );
}

export default Cart;

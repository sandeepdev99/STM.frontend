import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQty,
    totalAmount,
  } = useContext(CartContext);

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Your Cart
      </h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <h3 className="font-semibold">
              {item.name}
            </h3>
            <p>₹{item.price}</p>
          </div>

          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              updateQty(item._id, Number(e.target.value))
            }
            className="w-16 border p-1"
          />

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Total: ₹{totalAmount}
        </h2>

        <button
          onClick={() => navigate('/checkout')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

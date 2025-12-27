import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { placeOrder } from '../services/order.service';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const res = await placeOrder({
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.qty,
        })),
        deliveryAddress: address,
      });

      clearCart();
      navigate(`/payment/${res.data.data._id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Checkout
      </h1>

      <textarea
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      <button
        onClick={handlePlaceOrder}
        disabled={loading || !address}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Placing order...' : 'Place Order'}
      </button>
    </div>
  );
}

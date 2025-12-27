import { useEffect, useState } from 'react';
import { getMyOrders } from '../services/order.service';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await getMyOrders();
    setOrders(res.data.data);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 mb-3 rounded"
        >
          <p>Status: {order.orderStatus}</p>
          <p>Total: ₹{order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}

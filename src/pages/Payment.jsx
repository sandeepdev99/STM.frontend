import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createPaymentOrder,
  verifyPayment,
} from '../services/payment.service';

export default function Payment() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    startPayment();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src =
        'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startPayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Razorpay SDK failed to load');
      return;
    }

    try {
      // 1️⃣ Create payment order on backend
      const res = await createPaymentOrder({ orderId });

      const options = {
        key: res.data.data.key,
        amount: res.data.data.amount,
        currency: 'INR',
        order_id: res.data.data.razorpayOrderId,
        name: 'Saral Tara Mart',
        description: 'Order Payment',

        handler: async (response) => {
          // 2️⃣ Verify payment on backend
          await verifyPayment(response);
          navigate('/orders');
        },

        theme: {
          color: '#16a34a',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment initiation failed');
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">
        Redirecting to payment...
      </h2>
    </div>
  );
}

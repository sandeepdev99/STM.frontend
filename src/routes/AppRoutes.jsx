import { Routes, Route } from 'react-router-dom';

import Home from "../pages/Home.jsx"
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

import Cart from '../pages/Cart.jsx';
import Checkout from '../pages/Checkout.jsx';
import Payment from '../pages/Payment.jsx';

import PrivateRoute from './PrivateRoute.jsx';

function AppRoutes() {
  return (
    <Routes>

      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      

      {/* ===== PROTECTED ROUTES ===== */}
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />

      <Route
        path="/payment/:orderId"
        element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;

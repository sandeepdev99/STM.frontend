import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth.services.js';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-2 mb-3"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="username"
          name="username"
          placeholder="username"
          className="w-full border p-2 mb-3"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/product.service.js';
import ProductCard from '../components/product/ProductCard.jsx';
import { CartContext } from '../context/CartContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const CATEGORIES = [
  'All',
  'Grocery',
  'Electronics',
  'Fashion',
  'Home',
  'Beauty',
  'Books',
  'Sports',
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [hideAddress, setHideAddress] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ===== Fetch products ===== */
  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts({ search, category });
      setProducts(res.data.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ===== Hide address bar on scroll ===== */
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setHideAddress(current > lastScroll && current > 50);
      lastScroll = current;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ===== Reusable product block ===== */
  const ProductBlock = ({ title }) => (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-3 px-4">{title}</h2>

      {loading ? (
        <p className="px-4">Loading products…</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {products.slice(0, 6).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAdd={() => addToCart(product)}
            />
          ))}
        </div>
      )}

      {/* Banner */}
      <div className="mt-4 mx-4 h-32 rounded-xl bg-linear-to-r from-green-500 to-emerald-800 flex items-center justify-center text-white font-bold text-xl">
        Mega Discount • Limited Time
      </div>
    </section>
  );

  return (
    <div className="bg-gray-50">

      {/* ================= HEADER ================= */}
      <header
        className="h-15 bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/your-image.jpg')", // ← your personal image here
        }}
      >
        <div className="h-full bg-black/50 flex items-center justify-between px-4">
          <h1 className="text-xl font-bold">Saral Tara Mart</h1>

          {user ? (
            <button
              onClick={() => navigate('/cart')}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Cart
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* ================= ADDRESS BAR ================= */}
      <div
        className={`sticky top-0 z-20 transition-transform  duration-300 ${
          hideAddress ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="bg-white shadow  text-sm h-5">
          📍 Deliver to: <span className="font-bold">Add Address</span>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className='bg-white sticky top-0 z-10' >
      <div className="p-4 ">
        <input
          type="text"
          placeholder="Search for products"
          className="w-full p-3 rounded border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

{/* ================= CATEGORY SLIDER ================= */}
<div className=" border-b bg-white sticky top-0 z-10">
  <div className="flex gap-6 overflow-x-auto overflow-y-scroll px-4 no-scrollbar">
    {CATEGORIES.map((cat) => (
      <button
        key={cat}
        onClick={() => setCategory(cat)}
        className={`relative py-3 text-sm font-medium whitespace-nowrap transition-colors
          ${category === cat ? 'text-green-700' : 'text-gray-600'}
        `}
      >
        {cat}

        {/* Underline */}
        {category === cat && (
          <span className="absolute left-0 -bottom-px w-full h-0.75 bg-green-700 rounded-full" />
        )}
      </button>
    ))}
  </div>
</div>

   </div>

      {/* ================= PRODUCT SECTIONS ================= */}
      <ProductBlock title="Recommended for You" />
      <ProductBlock title="Best Sellers" />
      <ProductBlock title="New Arrivals" />

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 p-6 mt-10 text-sm">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p>About Us</p>
            <p>Contact Us</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Follow</h3>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>Twitter</p>
          </div>
        </div>

        <p className="text-center text-xs">
          © 2025 Saral Tara Mart
        </p>
      </footer>
    </div>
  );
}

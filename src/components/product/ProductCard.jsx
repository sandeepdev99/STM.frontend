export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="font-semibold text-lg">
        {product.name}
      </h2>

      <p className="text-gray-600">
        Category: {product.category}
      </p>

      <p className="font-bold mt-2">
        ₹{product.price}
      </p>

      <p className="text-sm text-gray-500">
        Stock: {product.stock}
      </p>

      <button
        onClick={onAdd}
        disabled={product.stock === 0}
        className="mt-3 bg-green-600 text-white px-4 py-1 rounded disabled:bg-gray-400"
      >
        Add to Cart
      </button>
    </div>
  );
}

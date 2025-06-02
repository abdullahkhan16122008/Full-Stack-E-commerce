import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBox, FaTruck, FaSignOutAlt } from "react-icons/fa";
import NotFound from '../../components/NotFound'; // if it exists



export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    username: "",
    price: "",
    rating: "",
    availablity: true,
    category: "",
    image: "",
    description: "",
  });
  let handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
   const { name, value, type, checked } = e.target;

  if (type === "file") {
    const file = e.target.files[0]; // ✅ Only access files if it’s a file input
    setProduct((prev) => ({
      ...prev,
      image: file,
    }));
    setPreviewUrl(URL.createObjectURL(file));
  } else {
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('added successfully')
    try {
      const formData = new FormData();
Object.entries(product).forEach(([key, value]) => {
  formData.append(key, value);
});
      const response = await axios.post("https://full-stack-e-commerce-gd4t.onrender.com/api/products",  formData);
      setSuccess("Product added successfully!");
      setError("");
      setProduct({
        name: "",
        username: "",
        price: "",
        rating: "",
        availablity: true,
        category: "",
        image: null,
        description: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add product.");
      setSuccess("");
    }
  };

  let navigate = useNavigate()
  const [user, setUser] = useState('')
  useEffect(() => {
    let role = localStorage.getItem("userRole")
    if (role == "user") {
      setUser('user')
    }
    if (role == "admin") {
      setUser('admin')
    }
  }, [])
  if (user === '') return null; // Wait for user role to load
if (user === 'user') return <NotFound />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-green-700 text-white flex flex-col py-6 px-4 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-10">Admin Panel</h1>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin-dashboard" className="flex items-center gap-3 hover:bg-green-600 px-4 py-2 rounded">
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link to="/users" className="flex items-center gap-3 hover:bg-green-600 px-4 py-2 rounded">
            <FaUsers /> Users
          </Link>
          <Link to="/addproduct" className="flex items-center gap-3 hover:bg-green-600 px-4 py-2 rounded">
            <FaBox /> Products
          </Link>
          <Link to="/admin-dashboard/orders" className="flex items-center gap-3 hover:bg-green-600 px-4 py-2 rounded">
            <FaTruck /> Orders
          </Link>
          <Link to="/" onClick={handleLogout} className="flex items-center gap-3 hover:bg-red-600 px-4 py-2 rounded mt-auto">
            <FaSignOutAlt /> Logout
          </Link>
        </nav>
      </aside>

      <div className="w-[50%] mx-auto p-6 shadow-lg rounded-xl bg-white mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" className="p-2 border rounded" required />
          <input type="text" name="username" value={product.username} onChange={handleChange} placeholder="userame" className="p-2 border rounded" required />
          <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded" required />
          <input type="number" step="0.1" name="rating" value={product.rating} onChange={handleChange} placeholder="Rating" className="p-2 border rounded" />
          <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded" required />
          {previewUrl && (
        <div className="mt-4">
          <p>Preview:</p>
          <img src={previewUrl} alt="Preview" className="w-64 rounded shadow" />
        </div>
      )}
          <input type="file" name="image" onChange={handleChange} placeholder="Image URL" className="p-2 border rounded" />
          <textarea name="description" value={product.description} onChange={handleChange} placeholder="Product Description" className="p-2 border rounded" />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="availablity" checked={product.availablity} onChange={handleChange} />
            Available
          </label>
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

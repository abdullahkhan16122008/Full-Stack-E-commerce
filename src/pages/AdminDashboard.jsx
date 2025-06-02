import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBox, FaSignOutAlt, FaTruck } from 'react-icons/fa';
import NotFound from '../../components/NotFound';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  useEffect(() => {
    const checkRole = async () => {
      const role = localStorage.getItem("userRole");
      if (role === "user") {
        setUser("user");
      } else if (role === "admin") {
        setUser("admin");
      }
    };
    checkRole();
  }, []);

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
          <Link to="/" className="flex items-center gap-3 hover:bg-red-600 px-4 py-2 rounded mt-auto">
            <FaSignOutAlt /> Logout
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

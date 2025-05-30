import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaTruck, FaUsers, FaBox, FaSignOutAlt } from 'react-icons/fa';
import NotFound from '../../components/NotFound';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://ecom-backend.onrender.com/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://ecom-backend.onrender.com/api/users/${id}`);
      // Filter out the deleted user from state
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  let onLogOut = () => {
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    navigate('/')
  }


  if (user === 'user') return <NotFound />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
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
          <Link to="/" onClick={()=> {onLogOut()}} className="flex items-center gap-3 hover:bg-red-600 px-4 py-2 rounded mt-auto">
            <FaSignOutAlt /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow p-4">
          <Outlet />
          <div className="max-w-[1200px] mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Users Dashboard</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">
                        No user found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="border-t hover:bg-gray-50 transition">
                        <td className="py-3 px-4">{user._id}</td>
                        <td className="py-3 px-4">{user.name || "N/A"}</td>
                        <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;

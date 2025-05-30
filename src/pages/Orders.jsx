import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNav from '../../components/SideNav'
import NotFound from '../../components/NotFound'; // if it exists
import { Link, useNavigate } from "react-router-dom";



const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.post("https://mern-stack-e-commerce-2lqn.onrender.com/api/orders");
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();
    }, []);

    const handleChange = (e, orderId) => {
        const newStatus = e.target.value;
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleSubmit = async (e, orderId, status) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://ecom-backend.onrender.com/api/orders-status", {
                orderId,
                status,
            });
            alert("Order status updated!");
            console.log(response.data);
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };
    const handleDelete = async (orderId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://ecom-backend.onrender.com/api/orders/${orderId}`);
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            alert("Order deleted successfully");
        } catch (error) {
            console.error("Failed to delete order", error);
            alert("Failed to delete order");
        }
    };

       let navigate = useNavigate()
  const [user, setUser] = useState('')
  useEffect( async () => {
    let role = localStorage.getItem("userRole")
    if(role == "user"){
      setUser('user')
    }
    if (role == "admin"){
           setUser('admin')
    }
  }, [])

    return (
    <div className="flex min-h-screen bg-gray-100">
    {user == 'user'?<NotFound />:""}
            <SideNav />

        <div className="max-w-[1200px] mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Orders Dashboard</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border rounded-xl">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Total</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">{order._id}</td>
                                    <td className="py-3 px-4">{order.fullName || "N/A"}</td>
                                    <td className="py-3 px-4">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        {/* <h1 className="my-1">{order.orderStatus?`Delivered`:"no status"}</h1> */}
                                        <form
                                            onSubmit={(e) => handleSubmit(e, order._id, order.status)}
                                            className="flex items-center gap-2"
                                        >
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => handleChange(e, order._id)}
                                                className="border rounded px-2 py-1"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <input
                                                type="submit"
                                                value="Update"
                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                                            />
                                        </form>
                                    </td>
                                    <td className="py-3 px-4">${order.productPrice}</td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
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
    );
};

export default AdminOrdersPage;

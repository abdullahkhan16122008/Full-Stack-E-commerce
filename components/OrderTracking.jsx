import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { CheckCircle, Clock, Truck, PackageCheck } from "lucide-react";


const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.post("https://ecom-backend.onrender.com/api/orders");
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();
    }, []);


    return (
      <>
      <Navbar />

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
                            <th className="py-3 px-4">Address</th>
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
                                        {order.orderStatus === "Pending"?"Pending":""}
                                        {order.orderStatus === "Delivered"?"Delivered":""}
                                        {order.orderStatus === "Pending"?<Truck />: ""}
                                        {order.orderStatus === "Delivered"?<CheckCircle />: ""}
                                    </td>
                                    <td className="py-3 px-4">${order.productPrice}</td>
                                    <td className="py-3 px-4">{order.address}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default AdminOrdersPage;

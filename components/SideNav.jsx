import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBox, FaSignOutAlt, FaSquare, FaShip, FaTruck } from 'react-icons/fa';



const SideNav = () => {
    let handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }
    return (
        <>
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
                    <Link to="/" onClick={handleLogout} className="flex items-center gap-3 hover:bg-red-600 px-4 py-2 rounded mt-auto">
                        <FaSignOutAlt /> Logout
                    </Link>
                </nav>
            </aside>

        </>
    )
}

export default SideNav;

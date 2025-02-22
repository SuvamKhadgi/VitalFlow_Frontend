import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Side from '../../../components/sidebar';

function Allorder() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [selectedCart, setSelectedCart] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Check authentication and role
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token) {
            toast.error("Please LOGIN");
            navigate('/login', { replace: true });
        } else if (role === "user") {
            toast.error("Access denied: Admins only");
            navigate('/', { replace: true });
        }
    }, [navigate]);

    // Fetch all orders
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/order', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setItems(response.data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error("Failed to fetch orders");
            setItems([]);
        }
    };

    // Fetch cart details by ID
    const fetchCartDetails = async (cartId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/cart/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setSelectedCart(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching cart details:', error);
            toast.error("Failed to fetch cart details");
        }
    };

    // Delete order
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setItems(items.filter((item) => item._id !== id));
            toast.success('Order deleted successfully');
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to delete order');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="fixed h-full">
                <Side />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64 p-8">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">ALL ORDERS</h2>

                <div className="w-full bg-white rounded-lg shadow-lg p-6">
                    {items.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-700">
                                        <th className="p-4 font-semibold text-sm uppercase">Order ID</th>
                                        <th className="p-4 font-semibold text-sm uppercase">User ID</th>
                                        <th className="p-4 font-semibold text-sm uppercase">Cart ID</th>
                                        <th className="p-4 font-semibold text-sm uppercase">Address</th>
                                        <th className="p-4 font-semibold text-sm uppercase">Phone No</th>
                                        <th className="p-4 font-semibold text-sm uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr
                                            key={item._id}
                                            className="border-b hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="p-4 text-gray-600 break-all">{item._id}</td>
                                            <td className="p-4 text-gray-600 break-all">{item.userId || "N/A"}</td>
                                            <td
                                                className="p-4 text-blue-600 break-all cursor-pointer hover:underline"
                                                onClick={() => fetchCartDetails(item.cartId)}
                                            >
                                                {item.cartId || "N/A"}
                                            </td>
                                            <td className="p-4 text-gray-600">{item.address || "N/A"}</td>
                                            <td className="p-4 text-gray-600">{item.phone_no || "N/A"}</td>
                                            <td className="p-4">
                                                <button
                                                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                                    onClick={() => handleDelete(item._id)}
                                                    title="Delete Order"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            No orders found
                        </div>
                    )}
                </div>

                {/* Modal for Cart Items */}
                {showModal && selectedCart && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    Cart Items (ID: {selectedCart._id})
                                </h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                    onClick={() => setShowModal(false)}
                                >
                                    ×
                                </button>
                            </div>
                            {selectedCart.items && selectedCart.items.length > 0 ? (
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700">
                                            <th className="p-3 font-semibold text-sm">Item Name</th>
                                            <th className="p-3 font-semibold text-sm">Quantity</th>
                                            <th className="p-3 font-semibold text-sm">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedCart.items.map((cartItem) => (
                                            <tr key={cartItem._id} className="border-b">
                                                <td className="p-3 text-gray-600">
                                                    {cartItem.itemId?.item_name || "N/A"}
                                                </td>
                                                <td className="p-3 text-gray-600">
                                                    {cartItem.quantity || 0}
                                                </td>
                                                <td className="p-3 text-gray-600">
                                                    ${cartItem.itemId?.item_price || "N/A"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center text-gray-500 py-4">No items in this cart</p>
                            )}
                        </div>
                    </div>
                )}

                <ToastContainer autoClose={1000} position="top-center" />
            </div>
        </div>
    );
}

export default Allorder;
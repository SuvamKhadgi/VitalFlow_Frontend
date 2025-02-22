import axios from "axios";
import { ShoppingBag, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Ordercart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            toast.error("Please LOGIN");
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("id");
            const token = localStorage.getItem("token");
            if (userId && token) {
                const response = await axios.get(
                    `http://localhost:3000/api/cart/user/${userId}`, // Use port 5000
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                        },
                    }
                );
                console.log("API Response:", response);
                console.log("Response Data:", response.data);
                const itemsArray = response.data[0]?.items || [];
                console.log("Extracted Items:", itemsArray);
                setCartItems(itemsArray);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error.response || error);
            toast.error("Failed to load cart items");
            setCartItems([]);
        }
    };

    const calculateTotalAmount = (items) => {
        return items.reduce((total, item) => {
            return total + (item.quantity || 0) * (item.itemId?.item_price || 0);
        }, 0);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCartItems(cartItems.filter((item) => item._id !== id));
            toast.success("Item deleted successfully");
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to delete item");
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const userId = localStorage.getItem("id");
            const token = localStorage.getItem("token");
            if (!userId || !token) {
                toast.error("User not authenticated");
                return;
            }
            if (!address || !phone) {
                toast.error("Please fill in address and phone number");
                return;
            }

            const orderPromises = cartItems.map((item) =>
                axios.post(
                    `http://localhost:3000/api/order/`,
                    {
                        userId,
                        address,
                        phone_no: phone,
                        cartId: item._id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            );

            await Promise.all(orderPromises);
            toast.success("Your order has been placed successfully");
            setShowModal(false);
            setAddress("");
            setPhone("");
            fetchData();
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order");
        }
    };

    return (
        <>
            <div className="containers123">
                <div className="navvbaar">{/* Add navbar content if needed */}</div>
                <div className="w-11/12 mx-auto bg-white mt-20">
                    <h1 className="text-3xl font-bold text-center pt-6 pb-4">
                        YOUR ORDER LIST ITEMS
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="itemstbl w-full md:w-2/3">
                            <table className="neumorphic w-full">
                                <thead>
                                    <tr>
                                        <th className="font-medium">ID</th>
                                        <th className="font-medium">Item Name</th>
                                        <th className="font-medium">Description</th>
                                        <th className="font-medium">Quantity</th>
                                        <th className="font-medium">Price</th>
                                        <th className="font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item._id}</td>
                                                <td>{item.itemId?.item_name || "N/A"}</td>
                                                <td>{item.itemId?.description || "N/A"}</td>
                                                <td>{item.quantity || 0}</td>
                                                <td>{item.itemId?.item_price || "N/A"}</td>
                                                <td>
                                                    <button
                                                        className="rounded-2xl p-2 hover:bg-red-100"
                                                        onClick={() => handleDelete(item._id)}
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4">
                                                No items in cart
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="odrbx w-full md:w-1/3">
                            <h1 className="text-3xl font-bold text-center pt-6 pb-4">
                                ORDER NOW
                            </h1>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="font-medium">Name</th>
                                        <th className="font-medium">Qty</th>
                                        <th className="font-medium">Price</th>
                                        <th className="font-medium">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.itemId?.item_name || "N/A"}</td>
                                            <td>{item.quantity || 0}</td>
                                            <td>{item.itemId?.item_price || "N/A"}</td>
                                            <td>{(item.quantity || 0) * (item.itemId?.item_price || 0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="text-right font-medium">
                                            Total Amount:
                                        </td>
                                        <td>{calculateTotalAmount(cartItems)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <button
                                className="flex items-center justify-center w-full mt-4 p-4 bg-green-500 text-white rounded-2xl hover:bg-green-600"
                                onClick={() => setShowModal(true)}
                            >
                                PLACE AN ORDER NOW <ShoppingBag className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {showModal && (
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="modal-content bg-white p-6 rounded-lg w-96">
                        <span
                            className="close text-2xl cursor-pointer"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </span>
                        <h2 className="text-xl font-bold mb-4">FILL THIS FORM TO ORDER</h2>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Order
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Ordercart;
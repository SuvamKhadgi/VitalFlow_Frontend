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
    const [cartId, setCartId] = useState(""); // Store the Cart ID

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
                // const itemsArray = response.data[0]?.items || [];
                // console.log("Extracted Items:", itemsArray);
                // setCartItems(itemsArray);
                if (response.data.length > 0) {
                    setCartId(response.data[0]._id); // Store the correct cart ID
                    setCartItems(response.data[0].items || []);
                }
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

    const handleDelete = async (cartId, itemId) => {
        try {
            await axios.delete(`http://localhost:3000/api/cart/${cartId}/item/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Update state to remove only the deleted item
            setCartItems((prevCartItems) =>
                prevCartItems.filter((item) => item.itemId !== itemId)
            );

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
            if (!cartId) {
                toast.error("Cart ID not found!");
                console.error("Cart ID is missing.");
                return;
            }

            console.log("Placing order with Cart ID:", cartId);

            await axios.post(
                `http://localhost:3000/api/order/`,
                {
                    userId,
                    address,
                    phone_no: phone,
                    cartId, // Use the correct cart ID
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Your order has been placed successfully");
            setShowModal(false);
            setAddress("");
            setPhone("");
            fetchData();
        } catch (error) {
            console.error("Error placing order:", error.response?.data || error.message);
            toast.error("Failed to place order");
        }
    };

    return (

        <>
            <div className="container mx-auto p-4">
                <div className="navvbaar"></div>
                <div className="bg-white mt-20 shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-center mb-6">YOUR ORDER LIST ITEMS</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 overflow-x-auto">
                            <table className="neumorphic w-full">
                                <thead>
                                    <tr>
                                        <th className="font-medium p-2 text-left">ID</th>
                                        <th className="font-medium p-2 text-left">Item Name</th>
                                        <th className="font-medium p-2 text-left">Description</th>
                                        <th className="font-medium p-2 text-left">Quantity</th>
                                        <th className="font-medium p-2 text-left">Price</th>
                                        <th className="font-medium p-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.length > 0 ? cartItems.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-100">
                                            <td className="p-2">{item._id}</td>
                                            <td className="p-2">{item.itemId?.item_name || "N/A"}</td>
                                            <td className="p-2">{item.itemId?.description || "N/A"}</td>
                                            <td className="p-2">{item.quantity || 0}</td>
                                            <td className="p-2">{item.itemId?.item_price || "N/A"}</td>
                                            <td className="p-2">
                                                <button className="rounded-2xl p-2 hover:bg-red-100"
                                                    onClick={() => handleDelete(cartId, item.itemId?._id)}>


                                                    <Trash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4">No items in cart</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                            <h1 className="text-3xl font-bold text-center mb-4">ORDER NOW</h1>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="font-medium p-2 text-left">Name</th>
                                        <th className="font-medium p-2 text-left">Qty</th>
                                        <th className="font-medium p-2 text-left">Price</th>
                                        <th className="font-medium p-2 text-left">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item._id}>
                                            <td className="p-2">{item.itemId?.item_name || "N/A"}</td>
                                            <td className="p-2">{item.quantity || 0}</td>
                                            <td className="p-2">{item.itemId?.item_price || "N/A"}</td>
                                            <td className="p-2">{(item.quantity || 0) * (item.itemId?.item_price || 0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="text-right font-medium p-2">Total Amount:</td>
                                        <td className="p-2">{calculateTotalAmount(cartItems)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <button className="w-full mt-4 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={() => setShowModal(true)}>
                                PLACE AN ORDER NOW <ShoppingBag className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>

                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
                            <span className="text-2xl cursor-pointer" onClick={() => setShowModal(false)}>&times;</span>
                            <h2 className="text-xl font-bold mb-4">FILL THIS FORM TO ORDER</h2>
                            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 mb-4 border rounded" />
                            <button onClick={handlePlaceOrder} className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Order</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Ordercart;
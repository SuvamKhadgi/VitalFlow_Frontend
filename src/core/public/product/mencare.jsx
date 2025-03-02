import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import { useCartprod, useGetMenCareProducts } from "./productquery";


const MenCare = () => {
    const { data, isLoading, isError } = useGetMenCareProducts();
    const [quantities, setQuantities] = useState({});
    const { mutate: addToCart, isLoading: isAddingToCart } = useCartprod();

    const handleIncrease = (itemId) => {
        const item = data.find((item) => item._id === itemId);  // Matching by _id
        if (item) {
            setQuantities((prevQuantities) => {
                const currentQuantity = prevQuantities[itemId] || 1;  // Default to 1 if not set
                // Ensure the current quantity does not exceed the available stock (item_quantity)
                if (currentQuantity < item.item_quantity) {
                    return { ...prevQuantities, [itemId]: currentQuantity + 1 };
                }
                return prevQuantities;  // No change if the quantity exceeds item_quantity
            });
        }
    };

    const handleDecrease = (itemId) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[itemId] || 1;
            // Ensure the quantity doesn't go below 1
            if (currentQuantity > 1) {
                return { ...prevQuantities, [itemId]: currentQuantity - 1 };
            }
            return prevQuantities;  // No change if the quantity is already 1
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data!</div>;
    }


    const handleAddToCart = (itemId) => {
        const quantity = quantities[itemId] || 1; // Get selected quantity
        const userId = localStorage.getItem("id"); // Ensure user is logged in
        if (!userId) {
            alert("Please log in first.");
            return;
        }
        addToCart({ itemId, quantity }, {
            onSuccess: () => {
                toast.success("successfull added item to your cart")
            },
            onError: (error) => {
                console.error("Error adding to cart:", error.response?.data || error.message);
                toast.error("Failed to add the item to your cart");
            },
        });
    };


    return (
        <div>
            <Navbar />
            <div className="pt-32">
                <div className="flex items-center justify-center mb-8">
                    <div className="border-t border-gray-400 w-24"></div>
                    <Typography className="mx-14 text-2xl font-semibold">MEN CARE</Typography>
                    <div className="border-t border-gray-400 w-24"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-6 py-4">
                    {data?.map((product) => (
                        <Card key={product._id} className="w-full bg-gradient-to-b from-blue-400 to bg-cyan-200 max-w-3xs mx-auto shadow-lg rounded-lg overflow-hidden">
                            <CardHeader shadow={false} floated={false} className="h-48">
                                <img
                                    src={`http://localhost:3000/uploads/${product.image}`}
                                    alt={product.item_name}
                                    className="h-full w-full object-fill"
                                />
                            </CardHeader>
                            <CardBody className="p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <Typography color="blue-gray" className="font-medium text-lg">
                                        {product.item_name}
                                    </Typography>
                                    <Typography color="blue-gray" className="font-medium text-lg">
                                        Rs.{product.item_price}
                                    </Typography>
                                </div>
                                <Typography variant="small" color="gray" className="font-normal text-sm opacity-75">
                                    {product.description.length > 80
                                        ? `${product.description.substring(0, 80)}...`
                                        : product.description}
                                </Typography>
                                <div className="flex justify-center items-center mt-4">
                                    <Button
                                        onClick={() => handleDecrease(product._id)}  // Use _id to pass as a unique identifier
                                        className="bg-red-400 px-3 py-1 text-lg font-bold"
                                    >
                                        -
                                    </Button>
                                    <span className="mx-4 text-lg font-semibold">
                                        {quantities[product._id] || 1}
                                    </span>
                                    <Button
                                        onClick={() => handleIncrease(product._id)}  // Use _id to pass as a unique identifier
                                        className="bg-green-300 px-3 py-1 text-lg font-bold"
                                    >
                                        +
                                    </Button>
                                </div>
                            </CardBody>
                            <CardFooter className="pt-4 pb-4">
                                <Button
                                    ripple={false}
                                    fullWidth={true}
                                    className="bg-blue-gray-900 text-black shadow-md hover:scale-105 transition-transform duration-200"
                                    onClick={() => handleAddToCart(product._id)} disabled={isAddingToCart}
                                >
                                    Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div><ToastContainer
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
                transition:Bounce
            />
            <Footer />
        </div>
    );
};

export default MenCare;






export const Mencare = () => {
    const getRandomSubset = (data, numItems) => {
        if (!data) return [];
        const shuffled = [...data].sort(() => 0.5 - Math.random()); // Shuffle the array
        return shuffled.slice(0, numItems); // Select `numItems` random elements
    };
    const { data, isLoading, isError } = useGetMenCareProducts();
    const { mutate: addToCart, isLoading: isAddingToCart } = useCartprod();

    const randomProducts = getRandomSubset(data, 4);


    const [quantities, setQuantities] = useState({});

    const handleIncrease = (itemId) => {
        const item = data.find((item) => item._id === itemId);  // Matching by _id
        if (item) {
            setQuantities((prevQuantities) => {
                const currentQuantity = prevQuantities[itemId] || 1;  // Default to 1 if not set
                // Ensure the current quantity does not exceed the available stock (item_quantity)
                if (currentQuantity < item.item_quantity) {
                    return { ...prevQuantities, [itemId]: currentQuantity + 1 };
                }
                return prevQuantities;  // No change if the quantity exceeds item_quantity
            });
        }
    };

    const handleDecrease = (itemId) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[itemId] || 1;
            // Ensure the quantity doesn't go below 1
            if (currentQuantity > 1) {
                return { ...prevQuantities, [itemId]: currentQuantity - 1 };
            }
            return prevQuantities;  // No change if the quantity is already 1
        });
    };
    const handleAddToCart = (itemId) => {
        const quantity = quantities[itemId] || 1; // Get selected quantity
        const userId = localStorage.getItem("id"); // Ensure user is logged in
        if (!userId) {
            alert("Please log in first.");
            return;
        }
        addToCart({ itemId, quantity }, {
            onSuccess: () => {
                toast.success("successfully added item to your cart")
            },
            onError: (error) => {
                console.error("Error adding to cart:", error.response?.data || error.message);
                toast.error("Failed to add the item to your cart");
            },
        });
    };
    return <>
        <div className="flex items-center justify-center mb-8">
            <div className="border-t border-gray-400 w-24"></div>
            <Typography className="mx-14 text-2xl font-semibold">MEN CARE</Typography>
            <div className="border-t border-gray-400 w-24"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-8 bg-gradient-to-t from-blue-300 to-red-200">
            {randomProducts.map((product) => (
                <Card
                    key={product._id}  // Use product._id as the key
                    className="w-full bg-gradient-to-b from-blue-400 to bg-cyan-200 max-w-3xs mx-auto shadow-lg rounded-lg overflow-hidden"
                >
                    <CardHeader shadow={false} floated={false} className="h-48">
                        <img
                            src={`http://localhost:3000/uploads/${product.image}`}
                            alt="card-image"
                            className="h-full w-full object-fill"
                        />
                    </CardHeader>
                    <CardBody className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" className="font-medium text-lg">
                                {product.item_name}
                            </Typography>
                            <Typography color="blue-gray" className="font-medium text-lg">
                                Rs.{product.item_price}
                            </Typography>
                        </div>
                        <Typography variant="small" color="gray" className="font-normal text-sm opacity-75">
                            {product.description.length > 80
                                ? `${product.description.substring(0, 80)}...`
                                : product.description}
                        </Typography>
                        <div className="flex justify-center items-center mt-4">
                            <Button
                                onClick={() => handleDecrease(product._id)}  // Use _id to pass as a unique identifier
                                className="bg-red-400 px-3 py-1 text-lg font-bold"
                            >
                                -
                            </Button>
                            <span className="mx-4 text-lg font-semibold">
                                {quantities[product._id] || 1}
                            </span>
                            <Button
                                onClick={() => handleIncrease(product._id)}  // Use _id to pass as a unique identifier
                                className="bg-green-300 px-3 py-1 text-lg font-bold"
                            >
                                +
                            </Button>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-4 pb-4">
                        <Button
                            ripple={false}
                            fullWidth={true}
                            className="bg-blue-gray-900 text-black shadow-md hover:scale-105 transition-transform duration-200"
                            onClick={() => handleAddToCart(product._id)} disabled={isAddingToCart}
                        >
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div><ToastContainer
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
            transition:Bounce
        />
    </>
};
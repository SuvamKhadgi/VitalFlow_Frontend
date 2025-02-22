// import { Trash2, Upload, UploadCloudIcon, UploadIcon } from 'lucide-react';
// import React, { useEffect } from 'react';
// import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Side from '../../../components/sidebar';
// import { useSaveItem } from './query';

// // import { Upload, Trash2 } from 'react-feather';

// function Additems() {
//     const navigate = useNavigate()
//     useEffect(() => {
//         if (!localStorage.getItem("accessToken")) {
//             //   alert('PLEASE LOGIN')
//             // navigate('/login', { replace: true })
//         }
//     }, [])


//     const { register, handleSubmit } = useForm();
//     const saveApi = useSaveItem();

//     const onSubmit = (data, e) => {
//         const formData = new FormData();
//         formData.append('item_name', data?.item_name);
//         formData.append('description', data?.description);
//         formData.append('item_quantity', data?.item_quantity);
//         formData.append('item_price', data?.item_price);
//         formData.append('image', data?.image[0]); // Assuming itemImage is a file input
//         formData.append('item_type', data.item_type);


//         if (Object.values(data).some((value) => !value)) {
//             toast.error('Please fill all the fields!');
//             // } else if (!data.brandName) {
//             //     toast.error('Please select a brand!');
//         } else if (!data.item_type) {
//             toast.error('Please select a type!');
//         } else {
//             saveApi.mutate(formData);
//             toast.success('Product added successfully!');
//             // e.target.reset();
//         }
//     };
//     return (
//         <div className=" flex ">
//             <div className="">
//                 <Side />
//             </div>

//             <div className="flex items-center pl-5 justify-start min-h-screen w-full bg-gradient-to-br from-white-500 to-cyan-500">
//                 <img src='../src/assets/images/addprod.png' className="absolute  right-0  object-cover" />
//                 <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">

//                     <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
//                         Add Items
//                     </h2>

//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                         <div className="space-y-4">
//                             <input
//                                 className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
//                                 type="text"
//                                 placeholder="Item Name"
//                                 {...register("item_name")}
//                             />
//                             <textarea
//                                 className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 resize-none"
//                                 rows="4"
//                                 placeholder="Description"
//                                 {...register("description")}
//                             />
//                         </div>

//                         <div className="flex items-center gap-4">
//                             <input
//                                 className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
//                                 type="file"
//                                 accept="image/*"
//                                 required
//                                 {...register("image")}
//                             />
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <input
//                                 className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
//                                 type="text"
//                                 placeholder="Quantity"
//                                 {...register("item_quantity")}
//                             />
//                             <input
//                                 className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
//                                 type="text"
//                                 placeholder="Per Price"
//                                 {...register("item_price")}
//                             />
//                         </div>

//                         <select
//                             {...register("item_type")}
//                             className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
//                         >
//                             <option value="Personal care">Personal care</option>
//                             <option value="Family care">Family care</option>
//                             <option value="Wellness & Fitness">Wellness & Fitness</option>
//                             <option value="Acrylic Painting">Acrylic Painting</option>
//                             <option value="Devices">Devices</option>
//                             <option value="First Aid">First Aid</option>

//                         </select>

//                         <div className="flex items-center justify-center gap-6">
//                             <button
//                                 type="submit"
//                                 className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition duration-300"
//                             >
//                                 <UploadIcon /> Upload
//                             </button>

//                             <button
//                                 type="reset"
//                                 className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition duration-300"
//                             >
//                                 <Trash2 /> Reset
//                             </button>
//                         </div>
//                     </form>

//                     <ToastContainer autoClose={1000} />
//                 </div>
//             </div>

//         </div >

//     );
// };

// export default Additems;








import { Trash2, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Side from '../../../components/sidebar';
import { useSaveItem } from './query';

function Additems() {
    const navigate = useNavigate();
    useEffect(() => {
        
            if (!localStorage.getItem("token")) {
              navigate('/login', { replace: true });
            } else if (localStorage.getItem("role") === "user") {
              navigate('/', { replace: true });
            }
          
    }, []);

    const { register, handleSubmit, watch, setValue } = useForm();
    const saveApi = useSaveItem();
    const [selectedCategory, setSelectedCategory] = useState("");

    // Main Categories and Their Subcategories
    const subOptions = {
        "Personal care": ["Body Care", "Eye Care", "Hair Care", "Oral Care"],
        "Family care": ["Baby Care", "Woman Care", "Men Care"],
        "Wellness & Fitness": ["Nutrition", "Supplements", "Gym Supplements"],
        "Acrylic Painting": ["Brushes", "Paints", "Canvas"],
        "Devices": ["Medical Devices", "Blood Glucose Monitor"],
        "First Aid": ["Bandages", "Ointments", "Emergency Kits"]
    };

    // Handle Main Category Change
    const handleCategoryChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        setValue("item_type", selectedValue); // Set main category in form data
        setValue("sub_item_type", ""); // Reset subcategory
    };

    // Form Submission
    const onSubmit = (data) => {
        if (!data.item_type || !data.sub_item_type) {
            toast.error("Please select a category and subcategory!");
            return;
        }

        const formData = new FormData();
        formData.append('item_name', data?.item_name);
        formData.append('description', data?.description);
        formData.append('item_quantity', data?.item_quantity);
        formData.append('item_price', data?.item_price);
        formData.append('image', data?.image[0]);
        formData.append('item_type', data.item_type);
        formData.append('sub_item_type', data.sub_item_type); // Add Sub-category

        saveApi.mutate(formData);
        toast.success("Product added successfully!");
    };

    return (
        <div className="flex">
            <Side />
            <div className="flex items-center pl-5 justify-start min-h-screen w-full bg-gradient-to-br from-white-500 to-cyan-500">
                <img src="../src/assets/images/addprod.png" className="absolute right-0 object-cover" />
                <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Add Items</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <input
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
                                type="text"
                                placeholder="Item Name"
                                {...register("item_name")}
                            />
                            <textarea
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 resize-none"
                                rows="4"
                                placeholder="Description"
                                {...register("description")}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <input
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
                                type="file"
                                accept="image/*"
                                required
                                {...register("image")}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
                                type="text"
                                placeholder="Quantity"
                                {...register("item_quantity")}
                            />
                            <input
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
                                type="text"
                                placeholder="Per Price"
                                {...register("item_price")}
                            />
                        </div>

                        {/* Main Category */}
                        <select
                            {...register("item_type")}
                            onChange={handleCategoryChange}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
                        >
                            <option value="">Select Category</option>
                            {Object.keys(subOptions).map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>

                        {/* Subcategory - Conditional Rendering */}
                        {selectedCategory && (
                            <select
                                {...register("sub_item_type")}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
                            >
                                <option value="">Select Subcategory</option>
                                {subOptions[selectedCategory]?.map((sub) => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        )}

                        <div className="flex items-center justify-center gap-6">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition duration-300"
                            >
                                <Upload /> Upload
                            </button>

                            <button
                                type="reset"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition duration-300"
                            >
                                <Trash2 /> Reset
                            </button>
                        </div>
                    </form>

                    <ToastContainer autoClose={1000} />
                </div>
            </div>
        </div>
    );
};

export default Additems;

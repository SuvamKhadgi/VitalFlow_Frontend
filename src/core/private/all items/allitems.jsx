import { useEffect } from 'react';
import { Clipboard } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Side from '../../../components/sidebar';
import { useDeleteItem, useGetList } from './query';
function Allitems() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login', { replace: true });
          } else if (localStorage.getItem("role") === "user") {
            navigate('/', { replace: true });
          }
    }, [])
    const { data: itemsList } = useGetList()
    const { mutate: deleteItem } = useDeleteItem();
    const handleDelete = (id) => {
        deleteItem(id, {
            onSuccess: () => {
                console.log("Item deleted successfully");
                // Optionally, you can refresh the list or show a success message
            },
            onError: (error) => {
                console.error("Error deleting item:", error);
            }
        });
    };
    return (
        <div className=" flex">
            <div className="">
                <Side />
            </div>
            <div className="text-3xl ml-8 w-full">
                <h2 className="font-semibold text-center mb-8 mt-8 text-blue-900">ALL Items</h2>
                <div className='itemstbl w-full bg-white shadow-lg rounded-lg p-6'>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className='font-medium px-4 py-2 border-b-2 border-blue-500'>ID</th>
                                <th className='font-medium px-4 py-2 border-b-2 border-blue-500'>Item Name</th>
                                <th className='font-medium px-4 py-2 border-b-2 border-blue-500'>Image</th>
                                <th className='font-medium px-4 py-2 border-b-2 border-blue-500'>Description</th>
                                <th className='font-medium px-4 py-2 border-b-2 border-blue-500'>Categories</th>
                                <th className='font-medium px-4 py-2 border-b-2 border-blue-500'>Quantity</th>
                                <th className='font-medium px-4 py-2 border-b-2 border-blue-500'>Price</th>
                                <th className='font-medium px-4 py-2 border-b-2 border-blue-500'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsList?.data?.map((i) => (
                                <tr key={i?._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-2 border-b">
                                        <div className="flex items-center">
                                            {i?._id}
                                            <button className="ml-2" onClick={() => handleCopy(i?._id)}>
                                                <Clipboard size={18} className="text-gray-600 hover:text-blue-500 transition-colors" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border-b">{i?.item_name}</td>
                                    <td className="px-4 py-2 border-b">
                                        <img
                                            className="rounded-lg shadow-sm"
                                            style={{ height: '100px', width: 'auto' }}
                                            src={`http://localhost:3000/uploads/${i?.image}`}
                                            alt={i?.item_name}
                                        />
                                    </td>
                                    <td className="px-4 py-2 border-b">{i?.description}</td>
                                    <td className="px-4 py-2 border-b">{i?.item_type}</td>
                                    <td className="px-4 py-2 border-b">{i?.item_quantity}</td>
                                    <td className="px-4 py-2 border-b">${i?.item_price}</td>
                                    <td className="px-4 py-2 border-b">
                                        <button
                                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                            onClick={() => handleDelete(i._id)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ToastContainer autoClose={1000} />
            </div>
        </div >
    );
};
export default Allitems;




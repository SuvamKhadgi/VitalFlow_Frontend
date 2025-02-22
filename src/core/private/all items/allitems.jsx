import { useEffect, useState } from 'react';
import { Clipboard, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Side from '../../../components/sidebar';
import { useDeleteItem, useGetList } from './query';

function Allitems() {
  const navigate = useNavigate();
  const { data: itemsList, isLoading } = useGetList();
  const { mutate: deleteItem } = useDeleteItem();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const itemsPerPage = 5;

  // Authentication check
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login', { replace: true });
    } else if (localStorage.getItem("role") === "user") {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Search logic
  useEffect(() => {
    if (!searchQuery) {
      setFilteredItems(itemsList?.data || []);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/search?query=${searchQuery}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredItems([]);
      }
    };
    fetchSearchResults();
  }, [searchQuery, itemsList]);

  const handleDelete = (id) => {
    deleteItem(id, {
      onSuccess: () => {
        toast.success('Item deleted successfully!');
      },
      onError: (error) => {
        toast.error('Error deleting item');
        console.error("Error deleting item:", error);
      },
    });
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success('ID copied to clipboard!');
  };

  // Pagination logic
  const totalItems = filteredItems.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Side />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">All Items</h2>
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 text-blue-800">
                <tr>
                  <th className="p-3 font-semibold text-left">ID</th>
                  <th className="p-3 font-semibold text-left">Name</th>
                  <th className="p-3 font-semibold text-left">Image</th>
                  <th className="p-3 font-semibold text-left">Description</th>
                  <th className="p-3 font-semibold text-left">Category</th>
                  <th className="p-3 font-semibold text-left">Qty</th>
                  <th className="p-3 font-semibold text-left">Price</th>
                  <th className="p-3 font-semibold text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center">
                        <span className="truncate max-w-[100px]">{item._id}</span>
                        <button onClick={() => handleCopy(item._id)} className="ml-2">
                          <Clipboard size={16} className="text-gray-500 hover:text-blue-600" />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 truncate max-w-[150px]">{item.item_name}</td>
                    <td className="p-3">
                      <img
                        src={`http://localhost:3000/uploads/${item.image}`}
                        alt={item.item_name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3 truncate max-w-[200px]">{item.description}</td>
                    <td className="p-3">{item.item_type}</td>
                    <td className="p-3">{item.item_quantity}</td>
                    <td className="p-3">${item.item_price}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 p-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default Allitems; 
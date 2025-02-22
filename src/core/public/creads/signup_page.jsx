import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/creds/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      // Show success toast
      toast.success('Signup successful! Welcome aboard!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to dashboard after a short delay to allow toast to be seen
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (err) {
      setError(err.message);
      toast.error('Signup failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <Navbar/>
      <div className="relative h-screen w-full flex items-center bg-gradient-to-br from-white-500 to-cyan-500">
        <img
          src="../src/assets/images/logo3.png"
          alt="Your Image"
          className="absolute bottom-0 right-0 w-1/2 object-cover"
        />
        
        <div className="p-10 m-12 rounded-2xl max-w-md w-full">
          <h2 className="text-2xl text-blue-900 font-bold mb-2">USER <strong>SIGNUP</strong></h2>
          <p className="text-gray-700 mb-4">Create your account to get started.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-4 my-2 bg-white bg-opacity-80 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 my-2 bg-white bg-opacity-80 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 my-2 bg-white bg-opacity-80 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-700 text-white py-3 rounded-xl text-lg hover:from-cyan-600 hover:to-cyan-800 transition disabled:opacity-50"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-gray-800 text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-cyan-600 hover:underline">Log in</a>
          </p>
        </div>
      </div>
      <ToastContainer />
      <Footer/>
    </div>
  );
};

export default Signup;
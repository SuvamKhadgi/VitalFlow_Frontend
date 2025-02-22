import { jwtDecode } from "jwt-decode"; // Install with: npm install jwt-decode
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import { useLoginMutation } from "./query";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          const { token } = response.data;
          if (token) {
            localStorage.setItem("token", token);

            console.log("Login successful, token saved to local storage");

            // Decode the token to extract user role
            try {
              const decodedToken = jwtDecode(token);


              const userId = decodedToken.userId; // Ensure 'userId' is the correct key in your token
              const name = decodedToken.name;
              const role = decodedToken.role;

              localStorage.setItem("id", userId);
              localStorage.setItem("name", name);
              localStorage.setItem("role", role);
              const userRole = decodedToken.role; // Ensure your backend includes 'role' in the token

              // Redirect based on role
              if (userRole === "admin") {
                navigate("/admindashboard");
              } else {
                navigate("/");
              }
            } catch (error) {
              console.error("Error decoding token:", error);
            }
          } else {
            console.error("Token not found in response");
          }
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };

  return (
    <div>
      <Navbar />
      <div className="relative h-screen w-full flex items-center bg-gradient-to-br from-white-500 to-cyan-500">
        <img
          src="../src/assets/images/logo3.png"
          alt="Your Image"
          className="absolute bottom-0 right-0 w-1/2 object-cover"
        />
        <div className="p-10 m-12 rounded-2xl max-w-md w-full">
          <h2 className="text-2xl text-blue-900 font-bold mb-2">
            USER <strong>LOGIN</strong>
          </h2>
          <p className="text-gray-700 mb-4">
            Welcome User, Please enter your Email and Password.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 my-2 bg-white bg-opacity-80 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 my-2 bg-white bg-opacity-80 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex justify-between items-center text-sm text-gray-800 my-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember
              </label>
              <a href="/forgotpassword" className="text-cyan-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-700 text-white py-3 rounded-xl text-lg hover:from-cyan-600 hover:to-cyan-800 transition"
            >
              Log in
            </button>
            <div className="flex justify-between items-center text-sm text-gray-800 my-2">
              <label className="flex items-center">
                <h3>Don't have a account? Make one!</h3>
              </label>
              <a href="/signup" className="text-cyan-600 hover:underline">
                Go To SignUp Page
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

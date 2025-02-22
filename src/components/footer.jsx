import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-300 text-white py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand & Description */}
                    <div>
                        <h3 className="text-2xl font-bold text-black mb-4">VitalFlow E-Pharmacy</h3>
                        <p className="text-black leading-relaxed">
                            Your trusted online pharmacy for quality medicines and healthcare products. Fast delivery, affordable prices, and exceptional service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl  text-black font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="hover:text-teal-200 transition-colors">Home</a>
                            </li>
                            <li>
                                <a href="/shop" className="hover:text-teal-200 transition-colors">Shop</a>
                            </li>
                            <li>
                                <a href="/orders" className="hover:text-teal-200 transition-colors">My Orders</a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-teal-200 transition-colors">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h4 className="text-xl text-black  font-semibold mb-4">Get in Touch</h4>
                        <p className="text-black  mb-2">Email: vitalflow33@gmail.com</p>
                        <p className="text-black  mb-4">Phone: +1 (800) 123-4567</p>
                        <div>
                            <h5 className="text-lg  text-black font-medium mb-2">Subscribe to Our Newsletter</h5>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
                                />
                                <button
                                    type="submit"
                                    className="bg-teal-500 p-2 rounded-r-md hover:bg-teal-400 transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-teal-400 text-center">
                    <p className="text-sm text-black ">
                        &copy; {new Date().getFullYear()} E-Pharmacy. All rights reserved.
                    </p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <a href="#" className="text-gray-200 hover:text-teal-200 transition-colors">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-200 hover:text-teal-200 transition-colors">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-200 hover:text-teal-200 transition-colors">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
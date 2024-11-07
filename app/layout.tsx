'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaHome, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import './globals.css'; // Importing global CSS here

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="bg-indigo-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <a className="text-xl font-bold flex items-center">
                <FaHome className="mr-2" /> My Shop
              </a>
            </Link>
            <div className="flex items-center">
              <Link href="/products">
                <a className="mr-4 hover:underline">Products</a>
              </Link>
              <Link href="/cart">
                <a className="hover:underline flex items-center">
                  <FaShoppingCart className="mr-1" /> Cart ({cartCount})
                </a>
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} My Shop. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="https://twitter.com" className="hover:text-indigo-600">
                <FaTwitter size={24} />
              </a>
              <a href="https://facebook.com" className="hover:text-indigo-600">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-indigo-600">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

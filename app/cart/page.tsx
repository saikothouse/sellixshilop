'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTrash, FaArrowRight } from 'react-icons/fa';

interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cart.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src={product.image_url} alt={product.title} className="w-24 h-24 object-cover mr-4 rounded-lg" />
              <div className="flex-grow">
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-indigo-600 font-bold">${product.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Link href="/checkout">
            <a className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
              <FaArrowRight className="mr-1" /> Proceed to Checkout
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

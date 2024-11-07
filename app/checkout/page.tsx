'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const placeOrder = async () => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      const result = await response.json();
      if (result.url) {
        router.push(result.url);
      } else {
        alert('Payment processing failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order');
    }
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
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
            </div>
          ))}
          <div className="mt-6 flex justify-end">
            <h2 className="text-xl font-bold">Total: ${totalPrice}</h2>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={placeOrder} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const { data } = await axios.get(`https://dev.sellix.io/products/${params.id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SELLIX_API_KEY}`,
    },
  });

  return {
    props: {
      product: data.data.product,
    },
  };
}

const ProductPage = ({ product }: { product: Product }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img src={product.image_url} alt={product.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-indigo-600 font-bold mb-4">${product.price}</p>
        <button onClick={addToCart} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;

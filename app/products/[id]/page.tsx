'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://dev.sellix.io/products/${params.id}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SELLIX_API_KEY}`,
          },
        });
        setProduct(data.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, [params.id]);

  const addToCart = () => {
    if (product) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  if (!product) return <div>Loading...</div>;

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

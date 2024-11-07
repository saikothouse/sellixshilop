'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaInfoCircle, FaShoppingBag } from 'react-icons/fa';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://dev.sellix.io/products', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SELLIX_API_KEY}`,
          },
        });
        console.log('Fetched products:', data);
        setProducts(data.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-indigo-600 font-bold">${product.price}</p>
            <div className="flex justify-between items-center mt-4">
              <a href={`/products/${product.id}`} className="text-indigo-600 hover:underline flex items-center">
                <FaInfoCircle className="mr-1" /> View Details
              </a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
                <FaShoppingBag className="mr-1" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

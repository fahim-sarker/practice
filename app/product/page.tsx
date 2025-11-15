"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const data: Product[] = [
        {
          id: 1,
          name: "Product 1",
          price: 19.99,
          description: "This is product 1",
        },
        {
          id: 2,
          name: "Product 2",
          price: 29.99,
          description: "This is product 2",
        },
        {
          id: 3,
          name: "Product 3",
          price: 39.99,
          description: "This is product 3",
        },
      ];
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-500 mb-2">{product.description}</p>
            <p className="text-blue-500 font-bold mb-4">${product.price}</p>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Mock data
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

    const found = data.find(item => item.id === productId);
    setProduct(found || null);
  }, [productId]);

  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert("Added to cart!");
    router.push("/cart");
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={() => router.back()} className="mb-4 underline">
        Back
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-2">{product.description}</p>
        <p className="text-blue-600 mt-4 font-bold text-xl">${product.price}</p>

        <button
          onClick={addToCart}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

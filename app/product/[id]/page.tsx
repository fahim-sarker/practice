"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { data, Product } from "@/public/data/data";


const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = data.find(item => item.id === Number(params.id));
    if (found) setProduct(found);
  }, [params.id]);

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

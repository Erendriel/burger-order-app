"use client";
import { ProductType } from '@/types/types';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from "@/utils/store";
import { toast } from 'react-toastify';

type Props = {
  id: string;
  allProducts: ProductType[];
}

const ProductsSuggested = ({ id, allProducts }: Props) => {
  const suggestedProducts = allProducts.filter((item) => item.id !== id);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { addToCart } = useCartStore();

  const setProductQuantity = (productId: string, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleCart = (product: ProductType, quantity: number) => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price / 100,
      quantity: quantity,
    });
    toast.success("The product added to the cart!");
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Suggested Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {suggestedProducts.map((item) => (
          <div key={item.id} className="w-full p-4">
            <div className="block rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 group">
              {item.image && (
                <div className="relative h-72">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4 bg-white h-48 group-hover:bg-fuchsia-50 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
                <div className="flex items-center flex-row justify-between">
                  <h2 className="text-2xl font-bold text-red-500">
                    ${((item.price / 100) * (quantities[item.id] || 1)).toFixed(2)}
                  </h2>
                  <div className="flex items-center">
                    <div className="flex gap-4 items-center ring-1 ring-red-500 p-3">
                      <button onClick={() => setProductQuantity(item.id, (quantities[item.id] || 1) > 1 ? (quantities[item.id] || 1) - 1 : 1)}>-</button>
                      <span>{quantities[item.id] || 1}</span>
                      <button onClick={() => setProductQuantity(item.id, (quantities[item.id] || 1) < 9 ? (quantities[item.id] || 1) + 1 : 9)}>+</button>
                    </div>
                    <div className="relative w-8 h-8 md:w-10 md:h-10 cursor-pointer">
                      <Image src="/cart.png" alt="cart" fill onClick={() => handleCart(item, quantities[item.id] || 1)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSuggested;

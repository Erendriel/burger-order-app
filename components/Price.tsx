"use client";

import React, { useEffect, useState } from "react";

type PriceProps = {
  price: number;
  id: string;
};

const Price = ({ price, id }: PriceProps) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTotal(quantity * price);
  }, [quantity, price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-red-500">${total.toFixed(2)}</h2>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"-"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {"+"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;

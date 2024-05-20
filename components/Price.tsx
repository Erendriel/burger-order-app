"use client";
import { ProductType } from "@/types/types";
import { useEffect, useState } from "react";
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import { toast } from "react-toastify";

interface PriceProps {
  product: ProductType;
  quantity: number;
  setQuantity: (value: number) => void;
}

const Price = ({ product, quantity, setQuantity }: PriceProps) => {
  const [total, setTotal] = useState((product.price / 100) * quantity);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const price = product.price / 100;
    if (!isNaN(price) && !isNaN(quantity)) {
      setTotal(quantity * price);
    } else {
      setTotal(0);
    }
  }, [quantity, product]);

  
  useEffect(()=>{
    useCartStore.persist.rehydrate()
  },[])


  const handleCart = () => {
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
    <div className="flex items-center flex-row gap-4 justify-center">
      <h2 className="text-2xl font-bold text-red-500">${total.toFixed(2)}</h2>
      <div className="flex justify-start items-center">
        <div className="flex gap-4 items-center ring-1 ring-red-500 p-3">
          <button onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}>+</button>
        </div>
        <div className="relative w-8 h-8 md:w-10 md:h-10 cursor-pointer">
          <Image src="/cart.png" alt="cart" fill onClick={handleCart} />
        </div>
      </div>
    </div>
  );
};

export default Price;

"use client"
import { ProductType } from "@/types/types";
import { useState } from "react";
import Image from "next/image";
import Price from "./Price";
import ProductsSuggested from "./ProductsSuggested";

interface SingleProductPageProps {
  product: ProductType;
  allProducts: ProductType[];
}

const SingleProductPage = ({ product, allProducts }: SingleProductPageProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="pt-12 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {product.image && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image src={product.image} alt={product.name} className="object-cover" fill />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="pt-56 h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{product.name}</h1>
        <p>{product.description}</p>
        <Price product={product} quantity={quantity} setQuantity={setQuantity} />
        <ProductsSuggested id={product.id} allProducts={allProducts} />
      </div>
    </div>
  );
};

export default SingleProductPage;

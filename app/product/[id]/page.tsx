"use client";
import Price from "@/components/Price";
import { product } from "@/data";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";

const SingleProductPage = () => {
  const params = useParams();
  const { id } = params;

  const singleProduct = product.find((item) => item.id === id);

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {singleProduct.image && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.image}
            alt={singleProduct.name}
            className="object-cover"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {singleProduct.name}
        </h1>
        <p>{singleProduct.description}</p>
        <Price price={singleProduct.price / 100} id={singleProduct.id} />
      </div>
    </div>
  );
};

export default SingleProductPage;

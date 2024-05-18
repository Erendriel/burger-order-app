import { product } from "@/data";
import ScrollWrapper from "./ScrollWrapper";
import Image from "next/image";
import React from "react";

const Featured: React.FC = () => {
  const products = product;

  return (
    <ScrollWrapper>
      <div className="w-max flex">
        {products.map((item: any) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {item.image && (
              <div className="relative flex-1 w-full h-64 md:h-80 lg:h-96">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.name}
              </h1>
              <p className="p-4 2xl:p-8">{item.description}</p>
              <span className="text-xl font-bold">
                ${(item.price / 100).toFixed(2)}
              </span>
              <button className="bg-red-600 text-white p-2 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </ScrollWrapper>
  );
};

export default Featured;

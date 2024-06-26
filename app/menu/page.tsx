import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductType } from "@/types/types";

const getData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log('API URL:', apiUrl); // Log the API URL for debugging

  try {
    const res = await fetch(`${apiUrl}/api/products`, { cache: "no-store" });
    if (!res.ok) {
      const errorMessage = `Failed to fetch data: ${res.status} ${res.statusText}`;
      console.error(errorMessage); // Log the error message
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error after logging it
  }
}

const MenuPage = async() => {
  const products:ProductType[] = await getData()
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {products.map((item) => (
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 p-4" key={item.id}>
          <Link
            className="block rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 group"
            href={`/product/${item.id}`}
          >
            {/* IMAGE CONTAINER */}
            {item.image && (
              <div className="relative h-72">
                <Image
                  src={item.image}
                  alt=""
                  layout="fill"
                  className="object-cover"
                />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="p-4 bg-white h-48 group-hover:bg-fuchsia-50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-bold uppercase mb-2">
                  {item.name}
                </h1>
                <p className="text-sm mb-4">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-auto mb-2">
                <h2 className="text-lg font-bold text-red-500">
                  ${(item.price / 100).toFixed(2)}
                </h2>
                <button className="ml-2 uppercase bg-red-500 text-white p-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;

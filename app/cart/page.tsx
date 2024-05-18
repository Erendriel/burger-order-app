import Image from "next/image";
import React from "react";

const CartPage = () => {
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {/* SINGLE ITEM */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-24 relative flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1601894087104-0c18bc34dbd6"
              alt="Bacon & Egg"
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start flex-grow ml-4">
            <h1 className="uppercase text-xl font-bold">Bacon & Egg</h1>
          </div>
          <div className="flex items-center">
            <h2 className="font-bold mr-4">$7.99</h2>
            <span className="cursor-pointer">X</span>
          </div>
        </div>
        {/* SINGLE ITEM */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-24 relative flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1549611016-3a70d82b5040"
              alt="Mushroom"
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start flex-grow ml-4">
            <h1 className="uppercase text-xl font-bold">Mushroom</h1>
          </div>
          <div className="flex items-center">
            <h2 className="font-bold mr-4">$7.99</h2>
            <span className="cursor-pointer">X</span>
          </div>
        </div>
        {/* SINGLE ITEM */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-24 relative flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1606755962773-d324e0a13086"
              alt="Chicken Sandwich"
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start flex-grow ml-4">
            <h1 className="uppercase text-xl font-bold">Chicken Sandwich</h1>
          </div>
          <div className="flex items-center">
            <h2 className="font-bold mr-4">$7.99</h2>
            <span className="cursor-pointer">X</span>
          </div>
        </div>
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal (3 items)</span>
          <span className="">$81.70</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL (INCL. VAT)</span>
          <span className="font-bold">$81.70</span>
        </div>
        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;

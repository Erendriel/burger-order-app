"use client"
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart,
    decreaseQuantity, increaseQuantity,
    clearCart
  } = useCartStore()
  const [deliveryCost, setDeliveryCost] = useState(2)
  const {data:session} = useSession();
  const router = useRouter();


  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    if (totalPrice > 50)
      setDeliveryCost(0)
    else setDeliveryCost(2)
  }, [totalPrice])

  const handleCheckout = async () => {
    if(!session) {
      router.push("/")
    }else{
      try {
        const res = await fetch("http://localhost:3000/api/orders",{
          method: "POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            price:totalPrice,
            products,
            status:"Paid!",
            userEmail: session.user.email
          }),
        });
        const data = await res.json()
        router.push(`/pay/${data.id}`)
      } catch (error) {
        console.error(error)
      }
    }

  }
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        <button onClick={() => clearCart()}>Clear Cart</button>
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div className="flex items-center justify-between mb-4" key={item.id}>
            <div className="w-24 h-24 relative flex-shrink-0">
              {item.image && <Image
                src={item.image}
                alt="Bacon & Egg"
                layout="fill"
                className="object-cover"
              />}
            </div>
            <div className="flex flex-row items-start flex-grow ml-4">
              <h1 className="uppercase text-xl font-bold">{item.name} ({item.quantity})</h1>
              <h1 className="ml-5 text-xl font-bold cursor-pointer" onClick={() => decreaseQuantity(item)}>-</h1>
              <h1 className="ml-5 text-xl font-bold cursor-pointer" onClick={() => increaseQuantity(item)}>+</h1>
            </div>
            <div className="flex items-center">
              <h2 className="font-bold mr-4">{(item.price).toFixed(2)}</h2>
              <span className="cursor-pointer" onClick={() => removeFromCart(item)}>X</span>
            </div>
          </div>
        )
        )}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="mr-1">Subtotal {totalItems}</span>
          <span className="">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          {deliveryCost === 0
            ? <span className="text-green-500">FREE!</span>
            : <span>${deliveryCost.toFixed(2)}</span>
          }
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL (INCL. VAT)</span>
          <span className="font-bold">${(totalPrice + deliveryCost).toFixed(2)}</span>
        </div>
        <button className="bg-red-500 text-white p-3 rounded-md w-100 self-end" onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;

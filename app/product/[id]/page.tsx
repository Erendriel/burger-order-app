import ProductsSuggested from "@/components/ProductsSuggested";
import { ProductType } from "@/types/types";
import React from "react";
import SingleProduct from "@/components/SingleProduct";

const getSingleProductData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};
const getAllProductsData = async () => {
  const res = await fetch(`http://localhost:3000/api/products/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {

  const singleProduct: ProductType = await getSingleProductData(params.id);
  const allProducts: ProductType[] = await getAllProductsData();


  return (
    <>
    <SingleProduct product={singleProduct} allProducts={allProducts}/>
    </>
  );
};

export default SingleProductPage;

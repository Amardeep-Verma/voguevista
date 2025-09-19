import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  // ✅ 1. Use the 'allProducts' master list from the context
  const { allProducts } = useContext(ShopContext);

  // 2. Derive the bestseller list directly. This line re-runs on every render.
  const bestsellerProducts = allProducts
    .filter((item) => item.bestseller === true)
    .slice(0, 5);

  // Loading state (optional but good practice)
  if (allProducts.length === 0) {
    return (
      <div className="text-center my-10 text-xl text-gray-500">Loading...</div>
    );
  }

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore,
          maxime provident distinctio perspiciatis laboriosam officiis
          consectetur explicabo.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestsellerProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            // ✅ 3. Pass the first image from the image array
            image={item.image[0]}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

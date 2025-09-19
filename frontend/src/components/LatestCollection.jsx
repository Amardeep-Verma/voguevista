import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  // Use the master 'allProducts' list for consistency
  const { allProducts } = useContext(ShopContext);

  // Derive the latest products directly, no need for useState or useEffect
  const latestProducts = allProducts.slice(-10).reverse(); // Gets the last 10 newest items

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ea
          molestias ipsa eum placeat eligendi dolore.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem
            // ✅ FIX 1: Used the unique item._id for the key
            key={item._id}
            // ✅ FIX 2: Used the correct item._id with an underscore
            id={item._id}
            // ✅ FIX 3: Passed only the first image from the array
            image={item.image[0]}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;

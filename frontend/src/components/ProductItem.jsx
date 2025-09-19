import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer group">
      <div className="overflow-hidden">
        <img
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
          src={image} // ✅ FIX: Changed from image[0] to image
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm truncate">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;

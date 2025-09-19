import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  // ✅ Renamed to 'allProducts' for clarity, assuming this is your master list
  const { allProducts, currency, addToCart } = useContext(ShopContext);

  // ✅ Changed initial state to null for clearer loading logic
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (allProducts.length > 0) {
      // ✅ Replaced inefficient .map() with the correct .find() method
      const product = allProducts.find((item) => item._id === productId);

      if (product) {
        setProductData(product);
        setImage(product.image[0]); // Set the initial main image
      }
    }
  }, [productId, allProducts]); // Effect depends on allProducts now

  // ✅ Improved Loading and Not Found states
  if (!productData) {
    return <div className="text-center my-20">Loading product...</div>;
  }

  return (
    <div className="border-t-2 pt-10">
      <div className="flex gap-8 flex-col sm:flex-row">
        {/* Left side thumbnails */}
        <div className="flex sm:flex-col gap-3 sm:w-[15%] w-full overflow-x-auto">
          {productData.image.map((item, index) => (
            <img
              key={index}
              src={item}
              onClick={() => setImage(item)}
              className="w-24 h-24 object-contain rounded-md cursor-pointer hover:shadow-md"
              alt="product thumbnail"
            />
          ))}
        </div>

        {/* Main image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={image}
            alt={productData.name}
            className="max-h-[500px] object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="text-gray-600 mt-2">{productData.description}</p>
          <p className="text-xl font-semibold mt-4">
            {currency}
            {productData.price}
          </p>

          {/* Sizes */}
          <div className="mt-4">
            <h3 className="font-medium">Available Sizes:</h3>
            <div className="flex gap-2 mt-2">
              {productData.sizes.map((size, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1 rounded-md cursor-pointer 
                    ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="mt-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {/* ... rest of your JSX */}
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;

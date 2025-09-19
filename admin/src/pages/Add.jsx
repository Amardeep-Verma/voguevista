import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // ✅ Refactor 1: Use a single array to manage all images.
  // We initialize an array of 4 null elements.
  const [images, setImages] = useState(Array(4).fill(null));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // ✅ Refactor 2: Create a dedicated handler for image changes.
  // It takes the file and the index of the image to update.
  const handleImageChange = (e, index) => {
    const newImages = [...images]; // Create a copy of the state array
    newImages[index] = e.target.files[0]; // Update the specific image
    setImages(newImages); // Set the new array as the state
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // ✅ Refactor 3: Loop through the images array to append files.
      // This is much cleaner and more scalable.
      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset all form fields
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        // ✅ Refactor 4: Reset the images array state.
        setImages(Array(4).fill(null));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const allSizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Upload Images */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {/* ✅ Refactor 5: The map now works with the images array state. */}
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index}`}>
              <img
                className="w-20"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />
              <input
                onChange={(e) => handleImageChange(e, index)}
                type="file"
                id={`image${index}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category, Subcategory & Price */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border border-gray-300 rounded sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {allSizes.map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;

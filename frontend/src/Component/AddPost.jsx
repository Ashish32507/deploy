import React, { useState } from "react";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../utils/Constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      pdName: productName,
      pdDescription: description,
      pdPrice: price,
      pdImageURL: imageUrl,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${PRODUCT_API_END_POINT}/add`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace 'token' with your actual token variable
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      navigate("/products");

      // Clear the form (optional)
      setProductName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Product Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Product Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;

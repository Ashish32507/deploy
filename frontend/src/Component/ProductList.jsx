import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../utils/Constant";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const API_URL = `${PRODUCT_API_END_POINT}/all-product`;

  // Simplified normalization: only essential fields
  const normalizeProduct = (p) => ({
    id: p._id || p.id || "",
    name: p.pdName,
    description: p.pdDescription,
    price: p.pdPrice,
    imageUrl: p.pdImageURL,
  });

  // Load products from API
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const normalizedProducts = res.data.product.map(normalizeProduct);
        setProducts(normalizedProducts);
      })
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${PRODUCT_API_END_POINT}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Handle edit button
  const handleEdit = (product) => {
    setEditId(product.id);
    setEditData(product);
  };

  // Prepare data for API update
  const prepareEditDataForApi = (data) => ({
    pdName: data.name,
    pdDescription: data.description,
    pdPrice: data.price,
    pdImageURL: data.imageUrl,
  });

  // Handle save (PUT request)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = prepareEditDataForApi(editData);
      const res = await axios.put(
        `${PRODUCT_API_END_POINT}/update/${editId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedProduct = normalizeProduct(res.data);
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? updatedProduct : p))
      );
      setEditId(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
        <button
          onClick={() => navigate("/add-product")} // You will define this handler to open a form or add product logic
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col gap-4"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            {editId === product.id ? (
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  type="url"
                  value={editData.imageUrl}
                  onChange={(e) =>
                    setEditData({ ...editData, imageUrl: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-1 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white px-4 py-1 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 flex-grow">
                  {product.description}
                </p>
                <p className="mt-1 font-medium text-blue-600">
                  ${product.price}
                </p>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

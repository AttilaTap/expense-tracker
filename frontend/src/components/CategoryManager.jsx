import { useState, useEffect } from "react";
import axios from "../axiosInstance";

function CategoryManager({ onCategoryUpdated }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`/categories/${userId}`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategoryId) {
      alert("Please select a category to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category? All transactions linked to it will also be deleted!"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`/categories/${selectedCategoryId}`);
      alert("Category deleted successfully!");
      setSelectedCategoryId("");
      fetchCategories();
      if (onCategoryUpdated) {
        onCategoryUpdated();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(error.response?.data || "Failed to delete category.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Manage Categories</h2>
      
      <div className="flex gap-4">
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleDeleteCategory}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CategoryManager;

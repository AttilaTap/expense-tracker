import React from 'react';
import { useState, useEffect } from "react";
import axios from "../axiosInstance";

function CategoryManager({ onCategoryUpdated, refresh }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [refresh]);

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

    const confirmDelete = window.confirm("Are you sure you want to delete this category? All transactions linked to it will also be deleted!");
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`/categories/${selectedCategoryId}`);
      alert("Category deleted successfully!");
      setSelectedCategoryId("");
      if (onCategoryUpdated) {
        onCategoryUpdated();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(error.response?.data || "Failed to delete category.");
    }
  };

  return (
    <div className='py-4 mt-4 space-y-4 bg-white dark:bg-gray-800 transition-colors'>
      <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>Manage Categories</h2>

      <div className='flex gap-4'>
        <select
          key={refresh}
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className='flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600'
        >
          <option value=''>Select Category</option>
          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleDeleteCategory}
          className='px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CategoryManager;

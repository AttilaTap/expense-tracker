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

    const confirmDelete = window.confirm("Are you sure you want to delete this category? All transactions linked to it will also be deleted!");
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
    <div style={{ marginBottom: "30px" }}>
      <h2>Manage Categories</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          style={{ flexGrow: 1, padding: "8px" }}
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
          style={{ padding: "8px 12px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CategoryManager;

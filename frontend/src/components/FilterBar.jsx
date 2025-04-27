import { useState, useEffect } from "react";
import axios from "../axiosInstance";

function FilterBar({ onFilterChange, refresh }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`/categories/${userId}`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, [refresh]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold text-gray-800'>Filter Transactions</h2>

      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none'
      >
        <option value=''>All Categories</option>
        {categories.map((cat) => (
          <option
            key={cat.id}
            value={cat.id}
          >
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;

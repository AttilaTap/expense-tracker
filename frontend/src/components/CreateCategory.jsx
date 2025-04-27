import { useState } from "react";
import axios from "../axiosInstance";

function CreateCategory({ onCategoryCreated }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");
      await axios.post("/categories", {
        name,
        userId: parseInt(userId),
      });

      setName("");
      if (onCategoryCreated) {
        await onCategoryCreated();
      }
    } catch (error) {
      console.error("Error creating category:", error);

      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("Failed to create category.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 rounded-xl shadow-md space-y-4'
    >
      <h2 className='text-2xl font-bold text-gray-800'>Add Category</h2>

      <input
        type='text'
        placeholder='Category Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none'
      />

      <button
        type='submit'
        className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition'
      >
        Add Category
      </button>
    </form>
  );
}

export default CreateCategory;

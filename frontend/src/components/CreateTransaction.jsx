import { useState, useEffect } from "react";
import axios from "../axiosInstance";

function CreateTransaction({ onTransactionCreated, refresh }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, [refresh]);

  const fetchCategories = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`/categories/${userId}`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error creating transaction:", error);
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("Failed to create transaction.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/transactions", {
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
        categoryId: parseInt(categoryId),
      });

      setDescription("");
      setAmount("");
      setCategoryId("");

      if (onTransactionCreated) {
        onTransactionCreated();
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 rounded-xl shadow-md space-y-4'
    >
      <h2 className='text-2xl font-bold text-gray-800'>Add Transaction</h2>

      <input
        type='text'
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className='w-full pr-40 pl-4 py-2  border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none'
      />

      <input
        type='number'
        placeholder='Amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none'
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
        className='w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none'
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
        type='submit'
        className='w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition'
      >
        Add Transaction
      </button>
    </form>
  );
}

export default CreateTransaction;

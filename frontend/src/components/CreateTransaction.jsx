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
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Add Transaction
      </button>
    </form>
  );
}

export default CreateTransaction;

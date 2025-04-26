import { useState, useEffect } from "react";
import axios from "axios";

function CreateTransaction({ onTransactionCreated }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5251/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5251/api/transactions", {
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
        categoryId: parseInt(categoryId),
      });

      setDescription("");
      setAmount("");
      setCategoryId("");

      onTransactionCreated(); // Notify parent to refresh the list
    } catch (error) {
      console.error("Error creating transaction:", error);
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
      />
      <br />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <br />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <br />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default CreateTransaction;

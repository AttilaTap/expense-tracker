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
    <form onSubmit={handleSubmit}>
      <h2>Add Category</h2>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Add Category
      </button>
    </form>
  );
}

export default CreateCategory;

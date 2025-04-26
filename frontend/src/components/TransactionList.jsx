import { useEffect, useState } from "react";
import axios from "../axiosInstance";

function TransactionList({ filters = {} }) {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    // Only category filter now
    if (filters.category && filters.category !== "") {
      filtered = filtered.filter((t) =>
        t.category?.id === parseInt(filters.category)
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      {filteredTransactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {filteredTransactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.description} - {transaction.amount} € - {transaction.category?.name || "No Category"}
              <button
                onClick={() => handleDelete(transaction.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;

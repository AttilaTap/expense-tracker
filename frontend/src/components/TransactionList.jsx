import { useEffect, useState } from "react";
import axios from "../axiosInstance";

function TransactionList({ filters = {}, onRefresh  }) {
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

    if (filters.category && filters.category !== "") {
      filtered = filtered.filter((t) => t.category?.id === parseInt(filters.category));
    }

    setFilteredTransactions(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/transactions/${id}`);
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-semibold text-gray-800 p-4' >Transactions</h2>
      {filteredTransactions.length === 0 ? (
        <p className='text-gray-600'>No transactions yet.</p>
      ) : (
        <ul className='space-y-4'>
          {filteredTransactions.map((transaction) => (
            <li
              key={transaction.id}
              className='bg-white p-4 rounded-lg shadow-md flex justify-between items-center'
            >
              <div className='text-left'>
                <div className='font-semibold text-lg'>{transaction.description}</div>
                <div className='text-gray-500 text-sm'>
                  {transaction.amount} € {transaction.category?.name ? `- ${transaction.category.name}` : "- No Category"}
                </div>
              </div>
              <button
                onClick={() => handleDelete(transaction.id)}
                className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
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

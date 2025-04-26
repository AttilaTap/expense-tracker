import { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import CreateTransaction from "./components/CreateTransaction";
import CreateCategory from "./components/CreateCategory";
import CategoryManager from "./components/CategoryManager";
import Login from "./components/Login";
import FilterBar from "./components/FilterBar";
import ExpensePieChart from "./components/ExpensePieChart";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filters, setFilters] = useState({ category: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleFilterChange = (category) => {
    setFilters({ category });
  };

  function handleLoginSuccess() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-400 to-teal-600">
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-400 to-teal-600 flex items-start justify-center p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <CategoryManager onCategoryUpdated={handleRefresh} />
        <FilterBar onFilterChange={handleFilterChange} refresh={refresh} />
        <ExpensePieChart refresh={refresh} />
        <CreateCategory onCategoryCreated={handleRefresh} />
        <CreateTransaction onTransactionCreated={handleRefresh} refresh={refresh} />

        <hr className="my-6" />

        <TransactionList filters={filters} key={refresh} />
      </div>
    </div>
  );
}

export default App;

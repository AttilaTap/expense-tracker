import TransactionList from "./components/TransactionList";
import CreateTransaction from "./components/CreateTransaction";
import CreateCategory from "./components/CreateCategory";
import CategoryManager from "./components/CategoryManager";
import Login from "./components/Login";
import FilterBar from "./components/FilterBar";
import ExpensePieChart from "./components/ExpensePieChart";
import { useState, useEffect } from "react";

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

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-teal-400 to-teal-600'>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto my-10 p-6 bg-gray-50 rounded-2xl shadow-md space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold text-gray-800'>Expense Tracker</h1>
        <button
          onClick={handleLogout}
          className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition'
        >
          Logout
        </button>
      </div>

      <ExpensePieChart refresh={refresh} />

      <div className='grid md:grid-cols-2 gap-6'>
        <CreateCategory onCategoryCreated={handleRefresh} />

        <CreateTransaction
          onTransactionCreated={handleRefresh}
          refresh={refresh}
        />
      </div>

      <CategoryManager onCategoryUpdated={handleRefresh} />

      <FilterBar
        onFilterChange={handleFilterChange}
        refresh={refresh}
      />

      <div className='bg-white p-2 rounded-2xl shadow'>
        <TransactionList
          filters={filters}
          key={refresh}
        />
      </div>
    </div>
  );
}

export default App;

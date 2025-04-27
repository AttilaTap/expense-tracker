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
    <div className='max-w-7xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Expense Tracker</h1>
        <button
          onClick={handleLogout}
          className='py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md'
        >
          Logout
        </button>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* LEFT SIDE */}
        <div className='flex-1 bg-white p-6 rounded-2xl shadow-md'>
          <ExpensePieChart refresh={refresh} />
          <div className='mt-6'>
            <CategoryManager onCategoryUpdated={handleRefresh} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex-1 bg-white p-6 rounded-2xl shadow-md'>
          <FilterBar
            onFilterChange={handleFilterChange}
            refresh={refresh}
          />
          <TransactionList
            filters={filters}
            key={refresh}
            onRefresh={handleRefresh}
          />
        </div>
      </div>

      <div className='mt-10 flex flex-col md:flex-row gap-6'>
  {/* LEFT SIDE: Create Category */}
  <div className='flex-1 bg-white p-6 rounded-2xl shadow-md'>
    <CreateCategory onCategoryCreated={handleRefresh} />
  </div>

  {/* RIGHT SIDE: Create Transaction */}
  <div className='flex-1 bg-white p-6 rounded-2xl shadow-md'>
    <CreateTransaction onTransactionCreated={handleRefresh} refresh={refresh} />
  </div>
</div>
    </div>
  );
}

export default App;

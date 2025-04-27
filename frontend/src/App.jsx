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
  const [darkMode, setDarkMode] = useState(false);

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
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors`}>
      <div className='max-w-7xl mx-auto p-6 text-gray-800 dark:text-gray-100'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold'>Expense Tracker</h1>
          <div className='flex gap-4'>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className='py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition'
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={handleLogout}
              className='py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition'
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard (Pie + Transactions) */}
        <div className='flex flex-col md:flex-row gap-6'>
          {/* LEFT SIDE */}
          <div className='flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md transition'>
            <ExpensePieChart refresh={refresh} />
            <CategoryManager onCategoryUpdated={handleRefresh} />
          </div>

          {/* RIGHT SIDE */}
          <div className='flex-1 min-w-0 max-h-[600px] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col transition'>
            <FilterBar
              onFilterChange={handleFilterChange}
              refresh={refresh}
            />

            <h2 className='text-2xl font-bold mt-6 mb-4 text-left'>Transactions</h2>

            <div className='flex-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-700'>
              <TransactionList
                filters={filters}
                key={refresh}
                onRefresh={handleRefresh}
              />
            </div>
          </div>
        </div>

        {/* Create Category + Create Transaction Section */}
        <div className='mt-6 flex flex-col md:flex-row gap-6'>
          <div className='flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md transition'>
            <CreateCategory onCategoryCreated={handleRefresh} />
          </div>

          <div className='flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md transition'>
            <CreateTransaction
              onTransactionCreated={handleRefresh}
              refresh={refresh}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

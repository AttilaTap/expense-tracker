import TransactionList from "./TransactionList";
import CreateTransaction from "./CreateTransaction";
import CreateCategory from "./CreateCategory";
import Login from "./Login";
import { useState, useEffect } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleRefresh = () => {
    setRefresh(!refresh);
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
      <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", textAlign: "center" }}>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Expense Tracker</h1>
        <button onClick={handleLogout} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <CreateCategory onCategoryCreated={handleRefresh} />
      <CreateTransaction onTransactionCreated={handleRefresh} refresh={refresh} />
      <hr />
      <TransactionList key={refresh} />
    </div>
  );
}

export default App;

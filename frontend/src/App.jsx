import TransactionList from "./TransactionList";
import CreateTransaction from "./CreateTransaction";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTransactionCreated = () => {
    setRefresh(!refresh); // Trigger re-fetch
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }}>
      <h1 style={{ textAlign: "center" }}>Expense Tracker</h1>
      <CreateTransaction onTransactionCreated={handleTransactionCreated} />
      <hr />
      <TransactionList key={refresh} />
    </div>
  );
}

export default App;

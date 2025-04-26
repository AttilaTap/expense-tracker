import TransactionList from "./TransactionList";
import CreateTransaction from "./CreateTransaction";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTransactionCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <CreateTransaction onTransactionCreated={handleTransactionCreated} />
      <TransactionList key={refresh} />
    </div>
  );
}

export default App;

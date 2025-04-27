import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#8884D8", "#82CA9D"];

function ExpensePieChart({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/transactions");
      const transactions = response.data;

      const categoryTotals = {};
      for (const transaction of transactions) {
        const categoryName = transaction.category?.name || "Uncategorized";
        categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + transaction.amount;
      }

      const formattedData = Object.keys(categoryTotals).map((key) => ({
        name: key,
        value: categoryTotals[key],
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching transactions for pie chart:", error);
    }
  };

  if (data.length === 0) {
    return (
      <div style={styles.card}>
        <h2 style={styles.title}>Expenses Overview</h2>
        <p>No transactions to display chart.</p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Expenses Overview</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default ExpensePieChart;

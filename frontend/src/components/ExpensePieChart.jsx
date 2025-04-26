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

      // Group by category
      const categoryTotals = {};
      for (const transaction of transactions) {
        const categoryName = transaction.category?.name || "Uncategorized";
        categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + transaction.amount;
      }

      // Format for recharts
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
    return <p>No transactions to display chart.</p>;
  }

  return (
    <div style={{ width: "100%", height: 300, marginBottom: "30px" }}>
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
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;

import React from 'react';
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
      <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center transition-colors'>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4'>Expenses Overview</h2>
        <p className='text-gray-600 dark:text-gray-400'>No transactions to display chart.</p>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center transition-colors'>
      <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4'>Expenses Overview</h2>
      <div className='w-full h-80 '>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              outerRadius={90}
              fill='#8884d8'
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#f9fafb",
              }}
              itemStyle={{ color: "#f9fafb" }}
              wrapperStyle={{ outline: "none" }}
            />
            <Legend
              verticalAlign='bottom'
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpensePieChart;

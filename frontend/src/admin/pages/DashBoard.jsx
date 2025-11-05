import React from "react";
import { ShoppingBag, Users, BarChart3, Wallet } from "lucide-react";

const stats = [
  { label: "Total Orders", value: 1203, icon: <ShoppingBag size={30} /> },
  { label: "Total Customers", value: 842, icon: <Users size={30} /> },
  { label: "Revenue", value: "₹4,23,000", icon: <Wallet size={30} /> },
  { label: "Monthly Growth", value: "+12%", icon: <BarChart3 size={30} /> },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="text-gray-700">{s.icon}</div>
          <p className="mt-4 text-3xl font-bold">{s.value}</p>
          <p className="text-gray-600 text-sm mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

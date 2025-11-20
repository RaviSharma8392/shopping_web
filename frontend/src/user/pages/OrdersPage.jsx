import React from "react";
import AccountNavbar from "../code/bars/AccountNavbar";
import { COLORS } from "../../style/theme";
import { IMAGES } from "../../assets/images";
import { Link } from "react-router-dom";

const orders = [
  {
    id: "ORD001",
    product: "Floral Kurti",
    date: "2025-11-10",
    status: "Delivered",
  },
  {
    id: "ORD002",
    product: "Cotton Kurti",
    date: "2025-11-12",
    status: "Shipped",
  },
];

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{order.product}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

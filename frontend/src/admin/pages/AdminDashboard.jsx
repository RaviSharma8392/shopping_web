import React from "react";
import {
  Users,
  Package,
  ShoppingCart,
  Tag,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Eye,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { useDashboard } from "../hooks/useDashboard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    usersCount,
    categoriesCount,
    productsCount,
    ordersCount,
    recentProducts,
    popularProducts,
    lowStockProducts,
    loading,
    error,
    refreshData,
  } = useDashboard();

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const getTrendData = (current, previous) => {
    if (previous === 0) return { trend: "up", value: "100%" };
    const change = ((current - previous) / previous) * 100;
    return {
      trend: change >= 0 ? "up" : "down",
      value: `${Math.abs(change).toFixed(1)}%`,
    };
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Dashboard
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">Welcome to your admin dashboard</p>
          </div>
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mt-4 lg:mt-0">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={formatNumber(usersCount)}
            subtitle="from last month"
            trend="up"
            trendValue="12%"
            icon={Users}
            color="blue"
            loading={loading}
          />
          <StatCard
            title="Categories"
            value={formatNumber(categoriesCount)}
            subtitle="active categories"
            trend="up"
            trendValue="5%"
            icon={Tag}
            color="green"
            loading={loading}
          />
          <StatCard
            title="Products"
            value={formatNumber(productsCount)}
            subtitle="in inventory"
            trend="up"
            trendValue="8%"
            icon={Package}
            color="orange"
            loading={loading}
          />
          <StatCard
            title="Total Orders"
            value={formatNumber(ordersCount)}
            subtitle="this month"
            trend="up"
            trendValue="15%"
            icon={ShoppingCart}
            color="purple"
            loading={loading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Products
              </h3>
              <button
                onClick={() => navigate("/admin/products")}
                className="text-sm text-[#B4292F] hover:text-[#9c2227] font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      {product.banner ? (
                        <img
                          src={product.banner}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ₹{product.price} • {product.collectionType}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {product.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No products found</p>
                </div>
              )}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Low Stock Alert
              </h3>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                {lowStockProducts.length} items
              </span>
            </div>

            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 animate-pulse">
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                ))
              ) : lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500">Stock running low</p>
                    </div>
                    <div className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      {product.stock || 0} left
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 text-green-400" />
                  <p>All products are well stocked</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/admin/products/create")}
              className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#B4292F] hover:bg-red-50 transition-all duration-200 text-center">
              <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Add Product</p>
              <p className="text-sm text-gray-500">Create new product</p>
            </button>

            <button
              onClick={() => navigate("/admin/categories/create")}
              className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#B4292F] hover:bg-red-50 transition-all duration-200 text-center">
              <Tag className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Add Category</p>
              <p className="text-sm text-gray-500">Create new category</p>
            </button>

            <button
              onClick={() => navigate("/admin/products")}
              className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#B4292F] hover:bg-red-50 transition-all duration-200 text-center">
              <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-medium text-gray-900">View Products</p>
              <p className="text-sm text-gray-500">Manage inventory</p>
            </button>

            <button
              onClick={() => navigate("/admin/orders")}
              className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#B4292F] hover:bg-red-50 transition-all duration-200 text-center">
              <ShoppingCart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-medium text-gray-900">View Orders</p>
              <p className="text-sm text-gray-500">Manage orders</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { api } from "../../config";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    // Simulate fetching user data
    const userData = JSON.parse(
      localStorage.getItem("user") ||
        '{"name":"John Doe","email":"john.doe@example.com","role":"customer"}'
    );
    setUser(userData);
    setEditedUser(userData);

    // Sample data for demonstration
    setOrders([
      {
        id: "ORD-12345",
        date: "2023-10-15",
        status: "Delivered",
        total: 149.99,
        items: 3,
      },
      {
        id: "ORD-12346",
        date: "2023-10-10",
        status: "Shipped",
        total: 89.99,
        items: 2,
      },
      {
        id: "ORD-12347",
        date: "2023-10-05",
        status: "Processing",
        total: 229.99,
        items: 5,
      },
    ]);

    setWishlist([
      {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        image: "https://via.placeholder.com/80",
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://via.placeholder.com/80",
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        price: 49.99,
        image: "https://via.placeholder.com/80",
      },
    ]);

    setAddresses([
      {
        id: 1,
        name: "Home",
        address: "123 Main St, Apt 4B, New York, NY 10001",
        isDefault: true,
      },
      {
        id: 2,
        name: "Work",
        address: "456 Office Blvd, Floor 12, New York, NY 10002",
        isDefault: false,
      },
    ]);

    setLoading(false);
  }, []);

  const handleSaveProfile = () => {
    setUser(editedUser);
    setEditMode(false);
    // In a real app, you would save to the backend here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Account</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-indigo-600 font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium">{user?.name}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-3">Your Account</h3>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeTab === "orders"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}>
                Your Orders
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeTab === "profile"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}>
                Login & Security
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeTab === "addresses"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}>
                Your Addresses
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeTab === "wishlist"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}>
                Your Wishlist
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeTab === "payments"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}>
                Payment Options
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Your Orders</h2>
              <div className="border-b border-gray-200 mb-4">
                <div className="flex space-x-6">
                  <button className="pb-3 font-medium border-b-2 border-orange-500 text-orange-500">
                    Orders
                  </button>
                  <button className="pb-3 text-gray-600 hover:text-orange-500">
                    Buy Again
                  </button>
                  <button className="pb-3 text-gray-600 hover:text-orange-500">
                    Not Yet Shipped
                  </button>
                  <button className="pb-3 text-gray-600 hover:text-orange-500">
                    Cancelled Orders
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm text-gray-500">ORDER PLACED</p>
                        <p className="font-medium">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">TOTAL</p>
                        <p className="font-medium">${order.total}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">SHIP TO</p>
                        <p className="font-medium text-blue-600 cursor-pointer hover:underline">
                          John Doe
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          ORDER # {order.id}
                        </p>
                        <p className="font-medium text-blue-600 cursor-pointer hover:underline">
                          Order details
                        </p>
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-lg font-medium text-green-700">
                        {order.status}
                      </p>
                      <p className="text-gray-600">{order.items} item(s)</p>
                      <div className="flex justify-between items-center mt-3">
                        <button className="px-4 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50">
                          Track package
                        </button>
                        <button className="px-4 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50">
                          Leave seller feedback
                        </button>
                        <button className="px-4 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50">
                          Write a product review
                        </button>
                        <button className="px-4 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50">
                          Buy again
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Login & Security</h2>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Name</h3>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveProfile}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Save
                    </button>
                  )}
                </div>

                {!editMode ? (
                  <p>{user?.name}</p>
                ) : (
                  <input
                    type="text"
                    value={editedUser.name || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, name: e.target.value })
                    }
                    className="border rounded-md px-3 py-2 w-full md:w-1/2"
                  />
                )}
              </div>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Email</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit
                  </button>
                </div>
                <p>{user?.email}</p>
              </div>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Password</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit
                  </button>
                </div>
                <p>•••••••••••</p>
              </div>

              <div>
                <h3 className="font-medium mb-4">
                  Two-Step Verification (2SV)
                </h3>
                <p className="text-gray-600 mb-4">
                  Two-step verification adds an extra layer of security to your
                  account.
                </p>
                <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-full text-sm font-medium">
                  Get started
                </button>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Addresses</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                  Add Address
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Your addresses are used for checkout and delivery.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    {address.isDefault && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mb-2 inline-block">
                        Default
                      </span>
                    )}
                    <h3 className="font-medium mb-2">{address.name}</h3>
                    <p className="text-gray-600 mb-4">{address.address}</p>
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Remove
                      </button>
                      {!address.isDefault && (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-full">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Add Address</p>
                </div>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Your Wishlist</h2>

              {wishlist.length === 0 ? (
                <div className="text-center py-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your Wishlist is empty
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Save your favorite items here
                  </p>
                  <NavLink
                    to="/item"
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-full text-sm font-medium">
                    Continue shopping
                  </NavLink>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold text-gray-900 mb-4">
                          ${item.price}
                        </p>
                        <div className="flex justify-between">
                          <button className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 rounded-full text-sm font-medium">
                            Add to Cart
                          </button>
                          <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 rounded-full text-sm font-medium">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Options</h2>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="font-medium mb-4">Credit and Debit Cards</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-gray-200 rounded-sm mr-3"></div>
                      <div>
                        <p className="font-medium">Visa ending in 1234</p>
                        <p className="text-sm text-gray-600">Expires 12/2025</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Remove
                    </button>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add a payment method
                </button>
              </div>

              <div>
                <h3 className="font-medium mb-4">Other payment methods</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add a gift card
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

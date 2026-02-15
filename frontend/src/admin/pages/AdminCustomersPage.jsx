import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  Search,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Ban,
  CheckCircle2,
  CornerUpLeft,
  User,
  ShoppingBag,
  CreditCard,
  MapPin,
  Loader2,
  Package,
  ChevronRight,
  ArrowDown,
} from "lucide-react";

// --- 1. Premium Skeleton Loader ---
const CustomerListSkeleton = () => (
  <div className="animate-pulse space-y-3 p-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-white">
        <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-1/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

// --- 2. Formatters ---
const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

// --- Main Component ---
const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- FETCH LOGIC ---
  const fetchCustomers = async (isNext = false) => {
    if (isNext && (!lastDoc || !hasMore)) return;
    if (!isNext) setLoading(true);

    try {
      const customersRef = collection(db, "users");
      let q = query(customersRef, orderBy("createdAt", "desc"), limit(10));

      if (isNext && lastDoc) {
        q = query(
          customersRef,
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(10),
        );
      }

      const snapshot = await getDocs(q);
      const newDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (isNext) setCustomers((prev) => [...prev, ...newDocs]);
      else setCustomers(newDocs);

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      if (snapshot.docs.length < 10) setHasMore(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setLastDoc(null);
    setHasMore(true);
    setSelectedCustomer(null);
    fetchCustomers(false);
  };

  const filteredList = customers.filter(
    (c) =>
      !searchTerm ||
      c.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- ACTIONS ---
  const handleBlockCustomer = async () => {
    if (!selectedCustomer) return;
    setActionLoading(true);
    const newStatus = !selectedCustomer.isBlocked;
    try {
      await updateDoc(doc(db, "users", selectedCustomer.id), {
        isBlocked: newStatus,
      });
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id ? { ...c, isBlocked: newStatus } : c,
        ),
      );
      setSelectedCustomer((prev) => ({ ...prev, isBlocked: newStatus }));
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCustomer = async () => {
    if (!selectedCustomer || !window.confirm("Permanently delete?")) return;
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, "users", selectedCustomer.id));
      setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
      setSelectedCustomer(null);
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden h-full w-full bg-gray-50">
      {/* ================= LEFT COLUMN: SCROLLABLE LIST ================= */}
      <div
        className={`flex-col border-r border-gray-200 w-full md:w-[380px] bg-white z-10 ${selectedCustomer ? "hidden md:flex" : "flex"}`}>
        {/* Header */}
        <div className="h-16 px-4 border-b border-gray-200 flex items-center justify-between shrink-0 bg-white">
          <h1 className="font-bold text-lg text-gray-900">Customers</h1>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-full hover:bg-gray-100 text-gray-500 transition ${refreshing ? "animate-spin" : ""}`}>
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-200 bg-gray-50/50 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-md text-sm transition-all outline-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <CustomerListSkeleton />
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredList.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`
                      p-4 cursor-pointer transition-colors hover:bg-gray-50
                      ${selectedCustomer?.id === customer.id ? "bg-blue-50/60 border-l-4 border-l-black" : "border-l-4 border-l-transparent"}
                  `}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm text-white
                        ${selectedCustomer?.id === customer.id ? "bg-black" : "bg-gray-400"}
                    `}>
                      {customer.displayName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {customer.displayName || "Unknown User"}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {customer.email}
                      </p>
                    </div>
                    {customer.isBlocked && (
                      <Ban size={14} className="text-red-500" />
                    )}
                  </div>
                </div>
              ))}

              {/* Infinite Scroll Trigger */}
              <div className="p-4">
                {hasMore ? (
                  <button
                    onClick={() => fetchCustomers(true)}
                    className="w-full py-2 text-xs font-bold text-gray-500 hover:text-black border border-dashed border-gray-300 hover:border-gray-400 rounded-md transition-all flex items-center justify-center gap-2">
                    <ArrowDown size={12} /> Load More
                  </button>
                ) : (
                  <div className="text-center text-xs text-gray-300 font-medium">
                    End of Results
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= RIGHT COLUMN: AMAZON STYLE DASHBOARD ================= */}
      <div
        className={`flex-1 flex flex-col h-full bg-gray-100 ${!selectedCustomer ? "hidden md:flex" : "flex"}`}>
        {selectedCustomer ? (
          <>
            {/* Header / Breadcrumb */}
            <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 shadow-sm sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-500">
                  <CornerUpLeft size={20} />
                </button>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    {selectedCustomer.displayName}
                    {selectedCustomer.emailVerified && (
                      <CheckCircle2 size={16} className="text-blue-500" />
                    )}
                  </h2>
                  <span className="text-xs text-gray-500 font-mono">
                    ID: {selectedCustomer.id}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBlockCustomer}
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-md text-xs font-bold shadow-sm border transition-all ${selectedCustomer.isBlocked ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}>
                  {actionLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : selectedCustomer.isBlocked ? (
                    "Unblock Access"
                  ) : (
                    "Block Access"
                  )}
                </button>
                <button
                  onClick={handleDeleteCustomer}
                  disabled={actionLoading}
                  className="p-2 bg-white border border-gray-300 text-gray-500 hover:text-red-600 hover:border-red-300 rounded-md shadow-sm transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="max-w-5xl mx-auto space-y-6">
                {/* 1. Account Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Orders Card */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-full text-orange-600">
                      <Package size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Total Orders
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedCustomer.ordersCount || 0}
                      </h3>
                    </div>
                  </div>
                  {/* Spent Card */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-full text-green-600">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Total Spent
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {formatCurrency(selectedCustomer.totalSpent)}
                      </h3>
                    </div>
                  </div>
                  {/* Member Since Card */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Member Since
                      </p>
                      <h3 className="text-lg font-bold text-gray-900">
                        {formatDate(selectedCustomer.createdAt)}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* 2. Left Column: Contact & Addresses */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Contact Info */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-sm text-gray-800">
                        Contact Details
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="flex items-start gap-3">
                          <Mail size={16} className="text-gray-400 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">Email</p>
                            <a
                              href={`mailto:${selectedCustomer.email}`}
                              className="text-blue-600 hover:underline">
                              {selectedCustomer.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone size={16} className="text-gray-400 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">Phone</p>
                            <p className="text-gray-600">
                              {selectedCustomer.phoneNumber || "Not provided"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Addresses (Amazon Style) */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-sm text-gray-800 flex justify-between items-center">
                        <span>Primary Address</span>
                        <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                          Edit
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex gap-3">
                          <MapPin size={16} className="text-gray-400 mt-1" />
                          <div className="text-sm text-gray-600 leading-relaxed">
                            {selectedCustomer.address ? (
                              <p>{selectedCustomer.address}</p>
                            ) : (
                              <p className="italic text-gray-400">
                                No primary address saved.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Right Column: Recent Orders Table */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">
                          Recent Orders
                        </h3>
                        <button className="text-sm text-blue-600 hover:underline font-medium">
                          View All
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                              <th className="px-6 py-3">Order Placed</th>
                              <th className="px-6 py-3">Total</th>
                              <th className="px-6 py-3">Ship To</th>
                              <th className="px-6 py-3">Status</th>
                              <th className="px-6 py-3"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {/* Mock Order Data - Replace with real mapping */}
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-gray-900">
                                Feb 12, 2024
                              </td>
                              <td className="px-6 py-4 font-medium">₹2,499</td>
                              <td className="px-6 py-4 text-gray-500">
                                {selectedCustomer.displayName}
                              </td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Delivered
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <ChevronRight
                                  size={16}
                                  className="text-gray-400"
                                />
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-gray-900">
                                Jan 28, 2024
                              </td>
                              <td className="px-6 py-4 font-medium">₹899</td>
                              <td className="px-6 py-4 text-gray-500">
                                Office
                              </td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Delivered
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <ChevronRight
                                  size={16}
                                  className="text-gray-400"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {/* Empty State Logic */}
                        {(!selectedCustomer.ordersCount ||
                          selectedCustomer.ordersCount === 0) && (
                          <div className="p-8 text-center text-gray-500">
                            <Package
                              size={32}
                              className="mx-auto text-gray-300 mb-2"
                            />
                            <p>No orders placed yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center mb-4">
              <User size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Select a Customer
            </h3>
            <p className="text-sm max-w-xs text-center mt-2">
              View profile, track recent orders, and manage account settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;

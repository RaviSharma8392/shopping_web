import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../features/auth/context/UserContext";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ChevronRight,
  Search,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  XCircle,
  Calendar,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/button/CustomButton";

const ORDERS_PER_PAGE = 5;

const OrdersPage = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // 1. FETCH ORDERS
  useEffect(() => {
    if (!isLoggedIn || !user?.uid) {
      setLoading(false);
      return;
    }

    const fetchInitialOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(ORDERS_PER_PAGE),
        );

        const snap = await getDocs(q);
        const fetchedOrders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        setOrders(fetchedOrders);
        setLastVisible(snap.docs[snap.docs.length - 1]);
        setHasMore(snap.docs.length === ORDERS_PER_PAGE);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialOrders();
  }, [user?.uid, isLoggedIn]);

  // 2. FILTER LOGIC
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" &&
          ["processing", "shipped"].includes(
            order.orderStatus?.toLowerCase(),
          )) ||
        (activeTab === "completed" &&
          ["delivered", "cancelled"].includes(
            order.orderStatus?.toLowerCase(),
          ));

      return matchesSearch && matchesTab;
    });
  }, [orders, searchTerm, activeTab]);

  // 3. LOAD MORE
  const loadMoreOrders = async () => {
    if (!lastVisible || loadingMore) return;
    setLoadingMore(true);

    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(ORDERS_PER_PAGE),
      );

      const snap = await getDocs(q);
      const newOrders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      setOrders((prev) => [...prev, ...newOrders]);
      setLastVisible(snap.docs[snap.docs.length - 1]);
      setHasMore(snap.docs.length === ORDERS_PER_PAGE);
    } catch (err) {
      console.error("Error loading more:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (!isLoggedIn) return <AuthRedirect navigate={navigate} />;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 font-sans selection:bg-black selection:text-white">
      {/* --- GLASS HEADER --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Order History
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Check the status of recent orders, manage returns, and download
                invoices.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative group w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by Order ID or Item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-black/5 transition-all outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* MODERN TABS */}
          <div className="flex items-center gap-1 mt-6 p-1 bg-gray-100/50 rounded-xl w-fit">
            {[
              { id: "all", label: "All Orders" },
              { id: "active", label: "Active" },
              { id: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-2 rounded-lg text-xs font-bold transition-all duration-300
                  ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }
                `}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {loading && <OrdersSkeleton />}

        {!loading && filteredOrders.length === 0 && (
          <EmptyState searchTerm={searchTerm} navigate={navigate} />
        )}

        {!loading &&
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} navigate={navigate} />
          ))}

        {/* LOAD MORE */}
        {!loading && hasMore && (
          <div className="flex justify-center pt-8">
            <button
              onClick={loadMoreOrders}
              disabled={loadingMore}
              className="group relative px-8 py-3 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-900 shadow-sm hover:shadow-md hover:border-gray-300 transition-all disabled:opacity-50">
              <span className="flex items-center gap-2">
                {loadingMore && (
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                )}
                {loadingMore ? "Loading..." : "Load Older Orders"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   COMPONENT: ORDER CARD (PREMIUM)
   ========================================================================= */
const OrderCard = ({ order, navigate }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const statusConfig = {
    delivered: {
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: CheckCircle,
      label: "Delivered",
      progress: 100,
    },
    shipped: {
      color: "bg-blue-50 text-blue-700 border-blue-100",
      icon: Truck,
      label: "On The Way",
      progress: 65,
    },
    cancelled: {
      color: "bg-red-50 text-red-600 border-red-100",
      icon: XCircle,
      label: "Cancelled",
      progress: 0,
    },
    processing: {
      color: "bg-amber-50 text-amber-700 border-amber-100",
      icon: Clock,
      label: "Processing",
      progress: 25,
    },
  };

  const status =
    statusConfig[order.orderStatus?.toLowerCase()] || statusConfig.processing;
  const StatusIcon = status.icon;
  const isCancelled = order.orderStatus?.toLowerCase() === "cancelled";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {/* 1. COMPACT HEADER */}
      <div className="bg-gray-50/50 border-b border-gray-100 p-5 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar size={12} /> Placed
            </span>
            <span className="font-semibold text-gray-900">
              {formatDate(order.createdAt)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <CreditCard size={12} /> Total
            </span>
            <span className="font-bold text-gray-900">
              ₹{order.totalAmount?.toLocaleString()}
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              ID
            </span>
            <span className="font-mono text-gray-500">
              #{order.id.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.color} shadow-sm`}>
          <StatusIcon size={14} strokeWidth={2.5} />
          <span className="text-xs font-bold uppercase tracking-wide">
            {status.label}
          </span>
        </div>
      </div>

      {/* 2. PROGRESS BAR (Hidden if cancelled) */}
      {!isCancelled && (
        <div className="relative h-1 w-full bg-gray-100">
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-r-full
              ${status.label === "Delivered" ? "bg-emerald-500" : "bg-black"}
            `}
            style={{ width: `${status.progress}%` }}
          />
        </div>
      )}

      {/* 3. PRODUCT LIST */}
      <div className="p-5 space-y-6">
        {order.items?.map((item, index) => (
          <div key={index} className="flex gap-5 group/item">
            {/* Product Image */}
            <div
              onClick={() =>
                navigate(`/product/${item.slug || item.productId}`)
              }
              className="relative w-24 h-28 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 cursor-pointer">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover/item:scale-110"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3
                    onClick={() => navigate(`/product/${item.slug}`)}
                    className="text-base font-bold text-gray-900 leading-tight cursor-pointer hover:text-black hover:underline decoration-1 underline-offset-2 transition-all line-clamp-2 pr-4">
                    {item.name}
                  </h3>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  {item.selectedSize && (
                    <span className="bg-gray-100 px-2 py-1 rounded-md font-medium text-gray-700">
                      Size: {item.selectedSize}
                    </span>
                  )}
                  <span>Qty: {item.quantity}</span>
                </div>
              </div>

              {/* Item Actions */}
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={() =>
                    navigate(`/product/${item.slug || item.productId}`)
                  }
                  className="text-xs font-bold text-gray-400 hover:text-black flex items-center gap-1 transition-colors">
                  <RefreshCw size={12} /> Buy Again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. CARD FOOTER */}
      <div className="px-5 py-4 bg-gray-50/30 border-t border-gray-100 flex justify-between items-center">
        <button className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">
          Download Invoice
        </button>
        <CustomButton
          text="Track Order"
          icon={<ArrowRight size={16} />}
          onClick={() => navigate(`/account/orders/${order.id}`)}
          variant="outline"
          className="h-10 px-6 text-xs border-gray-200 hover:border-black hover:bg-black hover:text-white"
        />
      </div>
    </div>
  );
};

/* =========================================================================
   HELPER COMPONENTS
   ========================================================================= */

const EmptyState = ({ searchTerm, navigate }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in-up">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
      {searchTerm ? (
        <Search size={40} className="text-gray-400" />
      ) : (
        <Package size={40} className="text-gray-400" />
      )}
    </div>
    <h2 className="text-xl font-bold text-gray-900 mb-2">
      {searchTerm ? "No matching orders" : "No orders yet"}
    </h2>
    <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
      {searchTerm
        ? `We couldn't find any orders matching "${searchTerm}". Try a different ID or keyword.`
        : "It looks like you haven't placed an order yet. Discover our latest collection now!"}
    </p>
    <CustomButton
      text={searchTerm ? "Clear Search" : "Start Shopping"}
      onClick={
        searchTerm ? () => window.location.reload() : () => navigate("/")
      }
      className="px-10 shadow-xl shadow-gray-200"
    />
  </div>
);

const AuthRedirect = ({ navigate }) => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center bg-white">
    <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-gray-200">
      <ShoppingBag size={32} />
    </div>
    <h2 className="text-2xl font-bold mb-2 text-gray-900">Login Required</h2>
    <p className="text-gray-500 mb-8">
      Please login to view your complete order history.
    </p>
    <CustomButton
      text="Login to Account"
      onClick={() => navigate("/auth/login")}
      className="px-12"
    />
  </div>
);

const OrdersSkeleton = () => (
  <div className="space-y-6">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
        <div className="flex justify-between mb-8">
          <div className="h-4 bg-gray-100 w-1/4 rounded"></div>
          <div className="h-6 bg-gray-100 w-24 rounded-full"></div>
        </div>
        <div className="flex gap-5">
          <div className="w-24 h-28 bg-gray-100 rounded-lg"></div>
          <div className="flex-1 space-y-3 py-2">
            <div className="h-5 bg-gray-100 w-3/4 rounded"></div>
            <div className="h-4 bg-gray-100 w-1/3 rounded"></div>
            <div className="h-4 bg-gray-100 w-1/4 rounded mt-4"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default OrdersPage;

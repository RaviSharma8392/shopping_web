import React, { useState, useEffect, useMemo } from "react";
import {
  fetchOrdersService,
  updateOrderStatusService,
} from "../services/firebase/adminOrderService";
import { Search, RefreshCw, MessageCircle, Trash2 } from "lucide-react";
import OrderDetailsModal from "../components/modals/OrderDetailsModal";
import { useNavigate } from "react-router-dom";

const STATUS_FLOW = {
  pending: {
    label: "Pending",
    color: "text-red-600",
    next: "confirmed",
    btn: "Confirm Order & WhatsApp",
  },
  confirmed: {
    label: "Confirmed",
    color: "text-blue-600",
    next: "packaging",
    btn: "Move to Packaging",
  },
  packaging: {
    label: "Packaging",
    color: "text-orange-600",
    next: "shipping",
    btn: "Ready for Shipping",
  },
  shipping: {
    label: "Shipping",
    color: "text-purple-600",
    next: "delivered",
    btn: "Mark as Delivered",
  },
  delivered: {
    label: "Delivered",
    color: "text-green-600",
    next: null,
    btn: null,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-gray-400",
    next: null,
    btn: null,
  },
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/admin");
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { orders: fetched } = await fetchOrdersService();
      setOrders(fetched || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (order, nextStatus) => {
    try {
      await updateOrderStatusService(order.id, nextStatus);

      // WhatsApp only on confirmed
      if (nextStatus === "confirmed") {
        const name = order?.userSnapshot?.name || "Customer";
        let phone = order?.userSnapshot?.phone;

        if (phone) {
          phone = phone.replace(/\D/g, "");
          if (phone.length === 10) phone = "91" + phone;

          const orderId = order.id.slice(-6).toUpperCase();

          const msg = `Hi ${name},

Your order #${orderId} has been CONFIRMED! ✅

We will notify you once it is shipped.

Thank you for shopping with us.`;

          window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
            "_blank",
          );
        }
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: nextStatus } : o)),
      );

      if (selectedOrder?.id === order.id) {
        setSelectedOrder({ ...selectedOrder, status: nextStatus });
      }
    } catch (e) {
      alert("Update failed.");
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Permanently delete this order from database?")) return;

    setOrders((prev) => prev.filter((o) => o.id !== orderId));

    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }
  };

  // ✅ Optimized Search (No UI change)
  const filtered = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return orders.filter((o) => {
      return (
        o.userId?.toLowerCase().includes(search) ||
        o.id?.toLowerCase().includes(search) ||
        o.userSnapshot?.email?.toLowerCase().includes(search) ||
        o.userSnapshot?.phone?.toLowerCase().includes(search) ||
        o.userSnapshot?.name?.toLowerCase().includes(search)
      );
    });
  }, [orders, searchTerm]);

  return (
    <div className="bg-[#eaeded] min-h-screen font-sans text-[#111] pb-10">
      {/* HEADER */}
      <div className="bg-[#232f3e] sticky top-0 z-[60] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 text-white font-black text-2xl min-w-max cursor-pointer">
            <span className="tracking-tighter">MnMukt Admin</span>
          </div>

          <div className="flex-1 flex w-full rounded-md overflow-hidden bg-white shadow-sm ring-1 ring-black/5 focus-within:ring-[#e77600] focus-within:ring-2 transition-all">
            <input
              type="text"
              placeholder="Search orders, customers, or products..."
              className="flex-1 px-4 py-2 outline-none text-sm placeholder:text-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-[#febd69] hover:bg-[#f3a847] px-5 border-l border-gray-300 text-[#232f3e] transition-colors">
              <Search size={20} />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={loadOrders}
              className="text-white text-[11px] font-bold hover:text-[#febd69] flex items-center gap-1.5 uppercase tracking-widest transition-colors">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Sync
            </button>

            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

            <div
              onClick={handleRedirect}
              className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-white/60 font-bold leading-none uppercase">
                  Hello, Admin
                </p>
                <p className="text-xs text-white font-bold leading-none mt-1 group-hover:text-[#febd69]">
                  GO TO Main Page
                </p>
              </div>

              <div className="w-9 h-9 bg-[#febd69] rounded-full flex items-center justify-center font-black text-[#232f3e] border-2 border-transparent group-hover:border-white transition-all">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ORDERS */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-normal text-gray-800 mb-6">
          Your Shipments
        </h1>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20 font-bold text-[#007185]">
              Loading Data...
            </div>
          ) : (
            filtered.map((order) => {
              const statusConfig =
                STATUS_FLOW[order.status] || STATUS_FLOW.pending;

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:border-gray-400 transition-all">
                  <div className="bg-[#f0f2f2] px-6 py-3 border-b border-gray-300 flex justify-between items-center text-[11px] text-[#565959]">
                    <div className="flex gap-10">
                      <div>
                        <p className="uppercase font-bold">Placed</p>
                        <p className="text-gray-900 font-bold">
                          {order.createdAt?.toDate
                            ? order.createdAt.toDate().toLocaleDateString()
                            : "Today"}
                        </p>
                      </div>
                      <div>
                        <p className="uppercase font-bold">Total</p>
                        <p className="text-gray-900 font-bold">
                          ₹{order.totalAmount}
                        </p>
                      </div>
                      <div>
                        <p className="uppercase font-bold">Ship To</p>
                        <p className="text-[#007185] font-bold">
                          {order?.userSnapshot?.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <p className="uppercase font-bold text-gray-400">
                        ID: #{order.id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-6 items-center flex-1">
                      <div className="h-16 w-16 bg-white border rounded shadow-sm overflow-hidden shrink-0">
                        <img
                          src={order.items?.[0]?.image}
                          className="w-full h-full object-contain"
                          alt=""
                        />
                      </div>

                      <div>
                        <h3
                          className={`text-lg font-bold ${statusConfig.color}`}>
                          {statusConfig.label}
                        </h3>

                        <p className="text-xs text-gray-500">
                          {order.items?.length} items
                        </p>

                        <button
                          onClick={() => {
                            let phone = order?.userSnapshot?.phone;
                            if (!phone) return;
                            phone = phone.replace(/\D/g, "");
                            if (phone.length === 10) phone = "91" + phone;
                            window.open(`https://wa.me/${phone}`, "_blank");
                          }}
                          className="text-[#007185] text-[10px] font-bold uppercase flex items-center gap-1 mt-2 hover:underline">
                          <MessageCircle size={14} className="text-green-600" />
                          WhatsApp
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-64">
                      {statusConfig.next && (
                        <button
                          onClick={() => handleAction(order, statusConfig.next)}
                          className="bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-full border border-[#fcd200] text-[11px] font-bold shadow-sm">
                          {statusConfig.btn}
                        </button>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-white border border-gray-300 py-2 rounded-full text-[11px] font-bold hover:bg-gray-50 shadow-sm">
                          Order Details
                        </button>

                        <button
                          onClick={() => handleAction(order, "cancelled")}
                          className="bg-white border border-red-100 text-red-400 py-2 rounded-full text-[11px] font-bold hover:bg-red-50 shadow-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          handleAction={handleAction}
          handleDelete={handleDelete}
          STATUS_FLOW={STATUS_FLOW}
        />
      )}
    </div>
  );
};

export default AdminOrdersPage;

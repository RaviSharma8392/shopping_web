import React from "react";
import {
  X,
  ShoppingBag,
  Printer,
  MapPin,
  AlertCircle,
  MessageCircle,
  CheckCircle2,
  Trash2,
  XCircle,
} from "lucide-react";

const OrderDetailsModal = ({
  selectedOrder,
  setSelectedOrder,
  handleAction,
  handleDelete,
  STATUS_FLOW,
}) => {
  if (!selectedOrder) return null;

  const STATUS_STEPS = [
    "pending",
    "confirmed",
    "packaging",
    "shipping",
    "delivered",
  ];
  const currentStatusIndex = STATUS_STEPS.indexOf(selectedOrder.status);
  const flowConfig = STATUS_FLOW[selectedOrder.status];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#eaeded] w-full h-full overflow-hidden flex flex-col animate-in fade-in duration-300">
        {/* HEADER */}
        <div className="bg-[#232f3e] px-8 py-5 flex justify-between items-center shrink-0 shadow-lg">
          <div className="flex items-center gap-4">
            <ShoppingBag className="text-[#febd69]" size={28} />
            <div>
              <h2 className="text-white text-xl font-black">Order Summary</h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                ID: {selectedOrder.id}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedOrder(null)}
            className="text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-all active:scale-90">
            <X size={24} />
          </button>
        </div>

        {/* SUB-HEADER */}
        <div className="bg-white px-8 py-4 border-b flex justify-between items-center shadow-sm">
          <div className="flex gap-10">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                Order Date
              </p>
              <p className="text-sm font-bold text-gray-800">Feb 15, 2026</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">
                Status
              </p>
              <p
                className={`text-sm font-bold uppercase tracking-tight ${STATUS_FLOW[selectedOrder.status]?.color}`}>
                {selectedOrder.status}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#007185] border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-all shadow-sm">
            <Printer size={16} /> Print Packing Slip
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white/50">
          {/* TRACKER */}
          <div className="flex justify-between items-center max-w-4xl mx-auto py-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            {STATUS_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStatusIndex;
              return (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        isCompleted
                          ? "bg-[#f3a847] border-[#f3a847] text-white shadow-md"
                          : "bg-white border-gray-200 text-gray-300"
                      }`}>
                      {isCompleted ? (
                        <CheckCircle2 size={18} strokeWidth={3} />
                      ) : (
                        <span className="text-sm font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-tighter ${isCompleted ? "text-gray-800" : "text-gray-400"}`}>
                      {step}
                    </span>
                  </div>
                  {idx < STATUS_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all duration-1000 ${isCompleted ? "bg-[#f3a847]" : "bg-gray-200"}`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ADDRESS CARD */}
                <div className="bg-white border-2 border-transparent border-l-[#ff9900] p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-[#8a6d3b]">
                    <MapPin size={18} />
                    <h4 className="text-[11px] font-black uppercase tracking-widest">
                      Shipping Destination
                    </h4>
                  </div>
                  <div className="flex gap-3">
                    <p className="text-md font-md text-gray-900 mb-1">
                      Name: {selectedOrder.deliveryAddress?.name}
                    </p>
                    <p className="text-md font-md text-gray-900 mb-1">
                      Phone: {selectedOrder.deliveryAddress?.phone}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 font-bold leading-relaxed">
                    {selectedOrder.deliveryAddress?.line1}
                    <br />
                    {selectedOrder.deliveryAddress?.city},{" "}
                    {selectedOrder.deliveryAddress?.state} -{" "}
                    {selectedOrder.deliveryAddress?.pincode}
                  </p>
                </div>

                {/* CONTACT CARD */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-gray-400 text-[11px] font-bold tracking-widest">
                    <AlertCircle size={18} /> Customer Info
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-[#007185] underline decoration-blue-100 truncate">
                      userId: {selectedOrder?.userId}
                    </p>
                    <p className="text-sm font-bold text-[#007185] underline decoration-blue-100 truncate">
                      {selectedOrder.userSnapshot?.email}
                    </p>
                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                      <p className="text-sm font-black font-mono text-gray-800">
                        {selectedOrder.userSnapshot?.phone}
                      </p>
                      <button
                        onClick={() =>
                          window.open(
                            `https://wa.me/${selectedOrder.userSnapshot?.phone}`,
                            "_blank",
                          )
                        }
                        className="text-green-600 hover:scale-110 transition-transform">
                        <MessageCircle size={20} />
                      </button>
                    </div>
                    <span className="text-[10px] bg-gray-100 px-3 py-1 rounded-full text-gray-400 font-black uppercase border border-gray-100">
                      {selectedOrder.paymentMethod || "Manual"}
                    </span>
                  </div>
                </div>
              </div>

              {/* PRODUCT MANIFEST */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-2 border-b bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Cart Items
                </div>
                <div className="divide-y divide-gray-100">
                  {selectedOrder.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                      <img
                        src={item.image}
                        className="w-14 h-14 object-contain border rounded bg-white p-1"
                        alt=""
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 font-bold">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-gray-900 italic">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BILL SIDEBAR */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#232f3e] rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col items-center">
                <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mb-2">
                  Grand Total
                </p>
                <p className="text-5xl font-black text-[#febd69] tracking-tighter mb-6">
                  ₹{selectedOrder.totalAmount}
                </p>
                <div className="w-full space-y-3 text-[11px] border-t border-white/10 pt-6 font-bold">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Shipping:</span>
                    <span className="text-green-400 uppercase">Free</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
              </div>

              <div className="space-y-3 pt-4">
                {flowConfig?.next && (
                  <button
                    onClick={() => handleAction(selectedOrder, flowConfig.next)}
                    className="w-full py-4 bg-[#f3a847] hover:bg-[#e79624] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95">
                    {flowConfig.btn}
                  </button>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAction(selectedOrder, "cancelled")}
                    className="py-4 bg-white border border-red-100 text-red-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-1">
                    <XCircle size={14} /> Cancel
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="py-4 bg-white border border-gray-200 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">
                    Dismiss
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(selectedOrder.id)}
                  className="w-full py-2 text-gray-300 hover:text-red-600 transition-all text-[9px] font-black uppercase tracking-[0.3em]">
                  Delete Record Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;

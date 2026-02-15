import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Search,
  Loader2,
  Mail,
  Phone,
  Package,
  RefreshCw,
  Trash2,
  Archive,
  CornerUpLeft,
} from "lucide-react";

// --- Helper Components ---
const MessageListSkeleton = () => (
  <div className="animate-pulse space-y-4 p-4">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="flex flex-col gap-2 border-b border-gray-100 pb-4">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/5"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="h-10 bg-gray-100 rounded w-full mt-1"></div>
      </div>
    ))}
  </div>
);

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  const isToday = date.toDateString() === new Date().toDateString();

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: isToday ? undefined : "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// --- Page Component ---
const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch Logic
  const fetchMessages = async (isLoadMore = false) => {
    if (isLoadMore && (!lastDoc || !hasMore)) return;
    if (!isLoadMore) setLoading(true);

    try {
      let q = query(
        collection(db, "contactMessages"),
        orderBy("createdAt", "desc"),
        limit(10),
      );

      if (isLoadMore && lastDoc) {
        q = query(
          collection(db, "contactMessages"),
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

      if (isLoadMore) {
        setMessages((prev) => [...prev, ...newDocs]);
      } else {
        setMessages(newDocs);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      if (snapshot.docs.length < 10) setHasMore(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setLastDoc(null);
    setHasMore(true);
    setMessages([]);
    fetchMessages(false);
  };

  // --- Actions ---

  const handleDelete = async () => {
    if (!selectedMessage) return;
    if (!window.confirm("Delete this message? This cannot be undone.")) return;

    setActionLoading(true);
    try {
      await deleteDoc(doc(db, "contactMessages", selectedMessage.id));
      setMessages((prev) => prev.filter((m) => m.id !== selectedMessage.id));
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete message.");
    }
    setActionLoading(false);
  };

  const handleArchive = async () => {
    if (!selectedMessage) return;
    setActionLoading(true);
    try {
      await updateDoc(doc(db, "contactMessages", selectedMessage.id), {
        status: "archived",
      });
      setMessages((prev) =>
        prev.map((m) =>
          m.id === selectedMessage.id ? { ...m, status: "archived" } : m,
        ),
      );
      // Update the selected message object as well to reflect change immediately in UI
      setSelectedMessage((prev) => ({ ...prev, status: "archived" }));
    } catch (error) {
      console.error("Error archiving:", error);
    }
    setActionLoading(false);
  };

  const handleReply = () => {
    if (!selectedMessage) return;
    const subject = `Re: ${selectedMessage.subject || "Inquiry"}`;
    const body = `Hi ${selectedMessage.name},\n\nThank you for contacting us.\n\nRef: "${selectedMessage.message}"\n\n[Reply here]`;
    window.location.href = `mailto:${selectedMessage.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex-1 flex overflow-hidden h-full w-full">
      {/* LEFT LIST */}
      <div
        className={`flex-col border-r border-gray-200 w-full md:w-[400px] bg-white ${
          selectedMessage ? "hidden md:flex" : "flex"
        }`}>
        {/* Header */}
        <div className="h-16 px-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h1 className="font-bold text-lg">Inbox</h1>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-full hover:bg-gray-100 text-gray-500 transition ${
              refreshing ? "animate-spin" : ""
            }`}>
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-100 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search inquiries..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent rounded-lg text-sm transition-all outline-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <MessageListSkeleton />
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-all hover:bg-gray-50 group ${
                    selectedMessage?.id === msg.id
                      ? "bg-blue-50/50 border-l-4 border-l-black"
                      : "border-l-4 border-l-transparent"
                  }`}>
                  <div className="flex justify-between items-start mb-1">
                    <h4
                      className={`text-sm truncate pr-2 ${
                        selectedMessage?.id === msg.id
                          ? "font-bold text-black"
                          : "font-medium text-gray-700"
                      }`}>
                      {msg.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap font-medium">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-900 font-medium truncate mb-1">
                    {msg.subject || "General Inquiry"}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                  {msg.status === "archived" && (
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 rounded mt-2 inline-block">
                      Archived
                    </span>
                  )}
                </div>
              ))}

              <div className="p-4 text-center">
                {hasMore ? (
                  <button
                    onClick={() => fetchMessages(true)}
                    className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wider py-2">
                    Load Older Messages
                  </button>
                ) : (
                  <span className="text-xs text-gray-300">
                    No more messages
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT DETAIL */}
      <div
        className={`flex-1 flex flex-col bg-gray-50/50 ${
          !selectedMessage ? "hidden md:flex" : "flex"
        }`}>
        {selectedMessage ? (
          <>
            {/* Toolbar */}
            <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full">
                  <CornerUpLeft size={20} />
                </button>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black text-white">
                  Inbox
                </span>
                {selectedMessage.status === "archived" && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Archived
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <button
                  onClick={handleArchive}
                  disabled={actionLoading}
                  className="p-2 hover:bg-gray-100 rounded-lg tooltip disabled:opacity-50"
                  title="Archive">
                  <Archive size={18} />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg tooltip disabled:opacity-50"
                  title="Delete">
                  {actionLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedMessage.subject || "No Subject"}
                  </h2>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-black text-white flex items-center justify-center font-bold text-lg shadow-md">
                        {selectedMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">
                          {selectedMessage.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {selectedMessage.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-500">
                        {formatDate(selectedMessage.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-sm font-medium">
                        {selectedMessage.phone || "No phone provided"}
                      </span>
                    </div>
                    {selectedMessage.orderId && (
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800">
                        <Package size={16} />
                        <span className="text-sm font-bold">
                          Order: {selectedMessage.orderId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 md:p-8 min-h-[200px] text-gray-800 leading-7 whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
                  <button
                    onClick={handleReply}
                    className="flex-1 bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-sm">
                    <Mail size={16} /> Reply via Email
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Mail size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Select a message
            </h3>
            <p className="text-sm">
              Choose an inquiry from the list to view details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;

import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  ArrowRight,
  Loader2,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  X,
} from "lucide-react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        brand: "MNMUKT",
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", orderId: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F6] font-sans pb-12">
      {/* 1. TOP NAV BAR (Amazon Squid Ink) */}
      <div className="bg-[#232F3E] text-white p-5 pt-12">
        <h1 className="text-xl font-bold">Contact Customer Service</h1>
        <p className="text-xs opacity-80 mt-1">We are here to help 24/7</p>
      </div>

      <main className="max-w-4xl mx-auto md:p-6">
        {/* 2. QUICK CONTACT TILES (Amazon Type) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 -mt-6">
          <a
            href="https://wa.me/919899990772"
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-50 rounded-full text-green-600">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Chat with us</p>
                <p className="text-[10px] text-gray-400">Response in 5 mins</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </a>

          <a
            href="tel:+919899990772"
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Call Support</p>
                <p className="text-[10px] text-gray-400">9 AM - 6 PM IST</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </a>
        </div>

        {/* 3. THE FORM CARD */}
        <div className="bg-white mx-4 mt-2 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-md font-bold text-gray-900">Send a Message</h2>
          </div>

          {status === "success" && (
            <div className="m-5 p-3 bg-green-50 border border-green-100 rounded text-green-700 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} /> Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase">
                Full Name
              </label>
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-2 text-sm focus:border-[#B4292F] focus:outline-none"
                placeholder="Required"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 text-sm focus:border-[#B4292F] focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase">
                  Order ID
                </label>
                <input
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 text-sm focus:border-[#B4292F] focus:outline-none"
                  placeholder="#MN-1234 (Optional)"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase">
                Comment or Message
              </label>
              <textarea
                name="message"
                required
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-md p-3 mt-2 text-sm focus:border-[#B4292F] focus:outline-none resize-none"
                placeholder="Explain your issue..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#FF9900] hover:bg-[#F28B00] text-gray-900 font-bold py-3 rounded-lg shadow-sm transition-all active:scale-95">
              {status === "loading" ? (
                <Loader2 className="animate-spin mx-auto w-5 h-5" />
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>

        {/* 4. ADDRESS BAR (Amazon Type Minimalist) */}
        <div className="p-6 text-gray-600">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Store Address
          </h3>
          <div className="flex gap-4 items-start text-xs leading-relaxed">
            <MapPin size={18} className="text-gray-400 shrink-0" />
            <span>B 005, Sector 85, Noida, UP 201301</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;

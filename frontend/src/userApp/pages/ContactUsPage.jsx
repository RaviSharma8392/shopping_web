import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  ArrowRight,
  Loader2,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Added Phone
    orderId: "", // Added Order ID
    subject: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        brand: "MNMUKT",
        theme: "Blanc",
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        orderId: "",
        subject: "General Inquiry",
        message: "",
      });

      // Auto-dismiss alert after 6 seconds
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="h-screen bg-gray-50 text-gray-900 font-sans selection:bg-black selection:text-white flex items-center justify-center p-0 md:p-8">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden bg-white md:rounded-3xl md:shadow-2xl md:shadow-gray-200/50">
        {/* LEFT: The Form Area */}
        <div className="bg-white/80 md:backdrop-blur-md p-8 md:p-16 lg:p-20 flex flex-col justify-center relative">
          {/* Subtle Background Texture */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>

          <div className="mb-10">
            <h5 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
              Customer Service
            </h5>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6 leading-tight">
              How may we <br /> assist you?
            </h1>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              For styling advice, order inquiries, or brand information. Our
              concierge team is at your disposal.
            </p>
          </div>

          {/* ALERT BANNER SYSTEM */}
          {status === "success" && (
            <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-green-800">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-green-700 mt-1">
                  Thank you for contacting MNMUKT. Our team will get back to you
                  within 24 hours.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="text-green-500 hover:text-green-700">
                <X size={16} />
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-red-800">
                  Submission Failed
                </h4>
                <p className="text-xs text-red-700 mt-1">
                  Something went wrong. Please check your connection and try
                  again.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="text-red-500 hover:text-red-700">
                <X size={16} />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 focus:border-black focus:outline-none transition-all placeholder-gray-300"
                  placeholder="Full Name"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 focus:border-black focus:outline-none transition-all placeholder-gray-300"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Mobile & Order ID Row (NEW) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 focus:border-black focus:outline-none transition-all placeholder-gray-300"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">
                  Order ID{" "}
                  <span className="text-[10px] font-normal normal-case opacity-60">
                    (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 focus:border-black focus:outline-none transition-all placeholder-gray-300"
                  placeholder="#MN-1234"
                />
              </div>
            </div>

            {/* Message Area */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">
                Inquiry Details
              </label>
              <textarea
                name="message"
                required
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 focus:border-black focus:outline-none transition-all resize-none placeholder-gray-300"
                placeholder="How can we help?"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full md:w-auto px-12 py-4 bg-black text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gray-900 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                {status === "loading" ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Submit Inquiry"
                )}
                {!status && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-12 flex gap-4 text-gray-400">
            <Instagram className="w-5 h-5 hover:text-black transition cursor-pointer" />
            <Facebook className="w-5 h-5 hover:text-black transition cursor-pointer" />
          </div>
        </div>

        {/* RIGHT: Image & Info Overlay */}
        <div className="relative hidden lg:block h-full min-h-[800px] bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop"
            alt="MNMUKT Bright Editorial"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Info Card - White Frosted Glass */}
          <div className="absolute bottom-12 left-12 right-12 bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-sm text-gray-900">
            <h3 className="text-xl font-light tracking-wide mb-6">
              MNMUKT Atelier
            </h3>
            <div className="space-y-5 text-sm text-gray-700">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-black mt-0.5" />
                <span>
                  B 005, Sector 85, Noida,
                  <br />
                  Uttar Pradesh 201301
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-black" />
                <a
                  href="mailto:care@mnmukt.in"
                  className="hover:underline underline-offset-4 decoration-1">
                  care@mnmukt.in
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-black" />
                <span>+91 98999 90772</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;

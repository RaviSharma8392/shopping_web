import React, { useEffect, useState } from "react";
import { Download, Monitor, X, ShieldCheck, Zap } from "lucide-react";

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDeferredPrompt(null);
  };

  if (!deferredPrompt || !showModal) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#232f3e]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>

        {/* Amazon Squid Ink Header Section */}
        <div className="bg-[#232f3e] p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#37475a] rounded-2xl flex items-center justify-center mb-4 border border-white/10 shadow-inner relative">
            <span className="text-[#febd69] font-black text-4xl">M</span>
            <div className="absolute -bottom-2 -right-2 bg-[#febd69] p-1.5 rounded-lg text-[#232f3e] shadow-lg">
              <Monitor size={16} strokeWidth={3} />
            </div>
          </div>
          <h2 className="text-white text-xl font-bold tracking-tight">
            mnmukt Desktop
          </h2>
          <p className="text-white/60 text-xs mt-1 uppercase tracking-[0.2em]">
            Official Admin App
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <FeatureItem
              icon={<Zap size={14} />}
              text="Faster loading and performance"
            />
            <FeatureItem
              icon={<ShieldCheck size={14} />}
              text="Secure, isolated environment"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleInstall}
              className="w-full bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-md shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Download size={16} strokeWidth={3} />
              Install mnmukt App
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 py-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-gray-600 transition-colors">
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small Helper Component
const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-gray-600">
    <div className="text-[#febd69]">{icon}</div>
    <p className="text-xs font-medium">{text}</p>
  </div>
);

export default PWAInstallButton;

import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function TaruvedaFooter() {
  return (
    <footer className="bg-[#1A261D] text-[#E5E0D8] pt-16 pb-8 font-sans border-t border-[#2C3E30]">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- Top Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 1. Brand & Parent Company */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#FDFBF7] tracking-tight mb-1">
                Taruveda
              </h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A373] font-semibold">
                A Venture of Mnmukt
              </p>
            </div>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Curating nature's finest ingredients to bring you authentic
              Ayurvedic luxury. Pure, ethical, and rooted in tradition.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2C3E30] flex items-center justify-center hover:bg-[#D4A373] hover:text-[#1A261D] transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#FDFBF7] mb-6">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-[#9CA3AF]">
              {[
                "Hair Care",
                "Skin Care",
                "Body Care",
                "Gift Hampers",
                "About Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-[#D4A373] transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#D4A373] transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#FDFBF7] mb-6">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-[#9CA3AF]">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4A373] mt-0.5 shrink-0" />
                <span>
                  Mnmukt Headquarters,
                  <br />
                  12/B, Green Estate, Civil Lines,
                  <br />
                  India - 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4A373] shrink-0" />
                <a
                  href="mailto:support@mnmukt.com"
                  className="hover:text-[#FDFBF7]">
                  support@mnmukt.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4A373] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#FDFBF7] mb-6">
              Stay Connected
            </h3>
            <p className="text-sm text-[#9CA3AF] mb-4">
              Subscribe to receive exclusive organic tips and early access to
              new launches.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#2C3E30] border border-[#3E4F42] rounded-lg py-3 px-4 text-sm text-[#FDFBF7] placeholder-[#6B7280] focus:outline-none focus:border-[#D4A373] transition-colors"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#D4A373] rounded-md text-[#1A261D] hover:bg-[#C29263] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-[#2C3E30] pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6B7280]">
          <p>© 2026 Mnmukt Enterprises. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#FDFBF7] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#FDFBF7] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#FDFBF7] transition-colors">
              Shipping
            </a>
          </div>

          <p className="flex items-center gap-1 opacity-50">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in
            India
          </p>
        </div>
      </div>
    </footer>
  );
}

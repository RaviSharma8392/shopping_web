// Footer.jsx
import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Footer = ({ small = false }) => {
  return (
    <footer className="bg-[#1f1d1d] text-gray-200">
      <div className={`max-w-7xl mx-auto px-6 ${small ? "py-8" : "py-12"}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">UrbanCart</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Clean groceries, quick delivery. Built with care — local flavours,
              global standards.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Instagram">
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Shop</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>
                <a href="/category/fruits" className="hover:text-white">
                  Fruits & Vegetables
                </a>
              </li>
              <li>
                <a href="/category/dairy" className="hover:text-white">
                  Dairy & Eggs
                </a>
              </li>
              <li>
                <a href="/category/snacks" className="hover:text-white">
                  Snacks & Beverages
                </a>
              </li>
              <li>
                <a href="/category/household" className="hover:text-white">
                  Household
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Support</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>
                <a href="/help" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white">
                  Terms & Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">
              Newsletter
            </h4>

            <p className="text-sm text-gray-300 mb-3">
              Get a quick weekly update on new products & offers.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // placeholder: hook this to your API or Firebase function
                const form = e.currentTarget;
                const email = form.elements["email"].value;
                // small UX: remove later or wire to toast
                if (!email) return;
                alert(`Thanks — subscribed: ${email}`);
                form.reset();
              }}
              className="flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-3 py-2 rounded-md bg-gray-800 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
                aria-label="Subscribe">
                <span className="hidden sm:inline">Subscribe</span>
                <span className="sm:hidden">
                  <FaEnvelope />
                </span>
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-400">
              <div>
                Contact:{" "}
                <a href="tel:+911234567890" className="hover:text-white">
                  +91 12345 67890
                </a>
              </div>
              <div className="mt-1">
                Email:{" "}
                <a
                  href="mailto:hello@urbancart.example"
                  className="hover:text-white">
                  hello@urbancart.example
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} UrbanCart. All rights reserved.
          </p>

          <div className="text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white mr-4">
              Privacy
            </a>
            <a href="/sitemap" className="hover:text-white">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const footerData = {
    categories: [
      "Anarkali Suit Sets",
      "Kurtas",
      "Jewellery",
      "Palazzos",
      "Straight Suit Sets",
    ],
    customerService: ["Returns & Cancellation", "FAQs", "Contact us", "Blog"],
    aboutUs: ["About Manmukt", "Careers", "Store Locator", "Terms & Privacy"],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-50 text-gray-700 border-t mb-15 md:mb-0 border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* Categories */}
        <div className="col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>s
          <ul className="space-y-2">
            {footerData.categories.map((cat, idx) => (
              <li key={idx}>
                <Link
                  to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-gray-900 transition-colors text-sm">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Customer Service</h3>
          <ul className="space-y-2">
            {footerData.customerService.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-gray-900 transition-colors text-sm">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">About Manmukt</h3>
          <ul className="space-y-2">
            {footerData.aboutUs.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-gray-900 transition-colors text-sm">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & App */}
        <div className="col-span-2 flex flex-col items-start">
          <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex space-x-3 mb-6">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                <social.icon size={20} />
              </a>
            ))}
          </div>
          {/* <h3 className="font-semibold text-gray-900 mb-2">Download App</h3>
          <div className="flex space-x-3">
            <img
              src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div> */}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-100 py-4 text-center text-gray-500 text-xs">
        &copy; 2024 Manmukt Fashion Limited. Made in India.
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Star,
  Plus,
  Search,
  User,
  Menu,
  X,
  Leaf,
  Check,
} from "lucide-react";
import { useCart } from "../../../context/TaruvedaCartContext";
import { productService } from "../services/productService";

const BASE_URL = "/taruveda-organic-shampoo-oil";

const navLinks = [
  { name: "Shop", value: "All" },
  { name: "Hair Care", value: "Hair Care" },
  { name: "Skin Care", value: "Skin Care" },
  { name: "Body Care", value: "Body Care" },
  { name: "Combo", value: "Combos" },
];

const secondaryLinks = ["Blogs", "Track Order", "Contact Us"];

export default function TaruvedaProductPage() {
  const { cart, addToCart, totalItems } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getTaruvedaProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#2C3E30]">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Leaf className="w-8 h-8 text-[#2C3E30]" />
          <span className="tracking-widest uppercase text-xs font-bold">
            Loading...
          </span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C2826] font-sans selection:bg-[#2C3E30] selection:text-white pb-20">
      {/* --- HEADER --- */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-white 
           border-b border-gray-100 py-4
        `}>
        <div className="max-w-[1500px] mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setSelectedCategory("All")}>
            <Leaf className="w-6 h-6 text-green-700 group-hover:rotate-12 transition-transform duration-300" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight text-[#1a2e1f] leading-none">
                TARUVEDA
              </h1>

              <span className="text-[9px] uppercase tracking-[0.3em] text-green-800/60 ml-0.5">
                Organic Essentials
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setSelectedCategory(link.value)}
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group py-2 ${
                  selectedCategory === link.value
                    ? "text-green-800"
                    : "text-gray-600 hover:text-green-800"
                }`}>
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-green-700 transform transition-transform duration-300 origin-left ${
                    selectedCategory === link.value
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
              </button>
            ))}
            <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
            {secondaryLinks.map((link) => (
              <button
                key={link}
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-gray-600 transition-colors">
                {link}
              </button>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button className="text-gray-600 hover:text-green-800">
              <Search className="w-5 h-5" />
            </button>
            <Link
              to={"/user/profile"}
              className="hidden md:block text-gray-600 hover:text-green-800">
              <User className="w-5 h-5" />
            </Link>
            <Link
              to={`${BASE_URL}/cart`}
              className="relative text-gray-600 hover:text-green-800 group">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-green-700 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="xl:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top-2">
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setSelectedCategory(link.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-xs font-bold uppercase tracking-widest py-2 border-b border-gray-50 ${
                    selectedCategory === link.value
                      ? "text-green-800"
                      : "text-gray-500"
                  }`}>
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* --- PRODUCT GRID --- */}
      <main className="max-w-[1500px] mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 px-2 gap-2">
          <div>
            <span className="text-[10px] md:text-xs font-bold text-green-600 uppercase tracking-widest mb-2 block">
              Shop By Category
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-[#1a2e1f] capitalize">
              {selectedCategory === "All"
                ? "Curated Collection"
                : selectedCategory}
            </h2>
          </div>
          <span className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-wider">
            {filteredProducts.length} Products
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-8 md:gap-x-8 md:gap-y-12">
          {filteredProducts.map((product) => {
            const inCart = cart[product.id]?.quantity || 0;

            return (
              <div key={product.id} className="group relative flex flex-col">
                {/* --- IMAGE CARD --- */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F0EFEA] mb-3 md:mb-5 shadow-sm md:group-hover:shadow-md transition-all duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out md:group-hover:scale-105"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-white/95 px-2 py-1 text-[9px] md:text-[10px] font-bold flex items-center shadow-sm text-[#2C3E30] z-10">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                    {product.rating}
                  </div>

                  {/* --- MOBILE ADD BUTTON (Always Visible) --- */}
                  <div className="md:hidden absolute bottom-2 right-2 z-20">
                    {inCart === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="w-9 h-9 bg-white text-[#1a2e1f] rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform">
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="w-9 h-9 bg-[#1a2e1f] text-white rounded-full shadow-lg flex items-center justify-center font-bold text-xs border-2 border-white">
                        {inCart}
                      </div>
                    )}
                  </div>

                  {/* --- DESKTOP HOVER ADD BUTTON (Slide Up) --- */}
                  <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    {inCart === 0 ? (
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full bg-white/95 backdrop-blur-sm text-[#2C3E30] py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#2C3E30] hover:text-white transition-colors shadow-lg">
                        Add To Bag
                      </button>
                    ) : (
                      <div className="w-full bg-[#2C3E30] text-white py-3 text-xs font-bold uppercase tracking-widest text-center shadow-lg flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" /> Added ({inCart})
                      </div>
                    )}
                  </div>
                </div>

                {/* --- PRODUCT INFO --- */}
                <div className="flex flex-col flex-grow px-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 truncate">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-sm md:text-base text-[#1a2e1f] leading-tight mb-1 md:mb-2 md:group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-1 flex items-center justify-between">
                    <span className="font-bold text-sm md:text-base text-[#1a2e1f]">
                      ₹{product.price}
                    </span>
                    {/* Mobile "In Bag" Text Indicator */}
                    {inCart > 0 && (
                      <span className="md:hidden text-[9px] font-bold text-green-700 uppercase tracking-wider bg-green-50 px-1.5 py-0.5 rounded">
                        In Bag
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* --- MOBILE FLOATING CHECKOUT BAR --- */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 md:hidden animate-in slide-in-from-bottom-6 duration-500">
          <Link
            to={`${BASE_URL}/cart`}
            className="flex items-center justify-between bg-[#1a2e1f] text-white p-4 shadow-2xl backdrop-blur-xl bg-opacity-95 rounded-none">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 w-8 h-8 flex items-center justify-center text-sm font-bold">
                {totalItems}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">
                View Bag
              </span>
            </div>
            <ShoppingBag className="w-4 h-4 opacity-80" />
          </Link>
        </div>
      )}
    </div>
  );
}

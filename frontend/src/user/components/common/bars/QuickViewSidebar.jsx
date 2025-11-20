// import React, { useState } from "react";
// import { motion } from "framer-motion";

// export default function QuickViewSidebar({ product, open, onClose }) {
//   const [step, setStep] = useState(0);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [error, setError] = useState("");

//   if (!open) return null;

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "100%" }}
//       transition={{ type: "tween", duration: 0.3 }}
//       className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-4 overflow-y-auto rounded-l-2xl">
//       <button
//         onClick={onClose}
//         className="text-gray-600 hover:text-black mb-4 text-sm">
//         ✕ Close
//       </button>

//       {/* ERROR BOX */}
//       {error && (
//         <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded">
//           {error}
//         </div>
//       )}

//       {/* STEP 0 - Product Preview */}
//       {step === 0 && (
//         <div className="space-y-4">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-48 object-cover rounded-xl"
//           />

//           <h2 className="text-xl font-semibold">{product?.title}</h2>
//           <p className="text-gray-500 text-sm">{product?.description}</p>

//           <div className="text-2xl font-bold">₹{product?.price}</div>

//           <button
//             onClick={() => setStep(1)}
//             className="w-full bg-black text-white py-2 mt-4 rounded-xl shadow">
//             Select Size
//           </button>
//         </div>
//       )}

//       {/* STEP 1 - Size Selection */}
//       {step === 1 && (
//         <div className="space-y-4">
//           <h3 className="font-medium text-lg">Choose Your Size</h3>
//           <div className="flex gap-2 flex-wrap">
//             {product?.sizes?.map((size) => (
//               <button
//                 key={size}
//                 onClick={() => {
//                   setSelectedSize(size);
//                   setError("");
//                 }}
//                 className={`px-3 py-1 border text-sm rounded-xl ${
//                   selectedSize === size
//                     ? "bg-black text-white"
//                     : "hover:bg-gray-100"
//                 }`}>
//                 {size}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() => {
//               if (!selectedSize) {
//                 setError("Please select a size to continue.");
//                 return;
//               }
//               setStep(2);
//             }}
//             className="w-full bg-black text-white py-2 rounded-xl shadow">
//             Continue
//           </button>
//         </div>
//       )}

//       {/* STEP 2 - Actions */}
//       {step === 2 && (
//         <div className="space-y-4">
//           <h3 className="font-medium text-lg">
//             Selected Size: <span className="font-bold">{selectedSize}</span>
//           </h3>

//           <div className="flex gap-3 mt-4">
//             <button className="flex-1 bg-black text-white py-2 rounded-xl shadow">
//               Add to Cart
//             </button>
//             <button className="flex-1 bg-green-600 text-white py-2 rounded-xl shadow">
//               Buy Now
//             </button>
//           </div>

//           <button
//             onClick={() => setStep(1)}
//             className="text-sm text-gray-600 underline mt-3">
//             Change Size
//           </button>
//         </div>
//       )}
//     </motion.div>
//   );
// }

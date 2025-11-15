import React, { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  // Fetch wishlist (Firebase if logged in, else localStorage)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        // ⭐ Fetch From Firebase
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().wishlist) {
          setWishlist(userSnap.data().wishlist);
        } else {
          setWishlist([]);
        }
      } else {
        // ⭐ Fetch From LocalStorage
        const localData = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(localData);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ⭐ Remove item from wishlist (local + Firebase synced)
  const removeItem = async (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);

    const user = auth.currentUser;

    if (user) {
      await updateDoc(doc(db, "users", user.uid), { wishlist: updated });
    } else {
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
  };

  if (loading) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-lg font-semibold">
        Loading wishlist...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Heart size={26} /> Your Wishlist
      </h2>

      {/* If empty */}
      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 py-20 text-lg">
          Your wishlist is empty 🥹
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-xl shadow-sm hover:shadow-md transition relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.category}</p>

              <div className="flex items-center justify-between mt-3">
                <p className="font-bold text-lg">₹{item.price}</p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded-full hover:bg-red-100">
                  <Trash2 size={20} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

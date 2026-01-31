import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 1. DERIVED STATE (Access address easily)
  const address = user?.address || null;

  /* --------------------------------------------------
     1️⃣ INITIAL LOAD: GET FROM LOCAL STORAGE (INSTANT)
  -------------------------------------------------- */
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      try {
        const parsedUser = JSON.parse(localUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Local storage parse error", e);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  /* --------------------------------------------------
     2️⃣ BACKGROUND SYNC: VERIFY + FETCH ADDRESS
     (Prevents address disappearing on refresh)
  -------------------------------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // A. Fetch Main User Profile
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            let dbData = userSnap.data();

            // B. 🔥 CRITICAL FIX: Fetch Address from Subcollection
            // Since DB only stores 'defaultAddressId', we must fetch the actual data
            // to keep our LocalStorage complete.
            if (dbData.defaultAddressId) {
              try {
                const addrRef = doc(
                  db,
                  "users",
                  firebaseUser.uid,
                  "addresses",
                  dbData.defaultAddressId,
                );
                const addrSnap = await getDoc(addrRef);

                if (addrSnap.exists()) {
                  // Attach address to the user object we are about to save
                  dbData.address = { id: addrSnap.id, ...addrSnap.data() };
                }
              } catch (addrErr) {
                console.error("Failed to sync address:", addrErr);
                // Fallback: Keep existing address from local state if DB fetch fails
                if (user?.address) dbData.address = user.address;
              }
            }

            // C. Update State & LocalStorage
            setUser(dbData);
            setIsLoggedIn(true);
            localStorage.setItem("user", JSON.stringify(dbData));
            localStorage.setItem("auth_uid", firebaseUser.uid);
          }
        } catch (error) {
          console.error("Background sync failed:", error);
        }
      } else {
        handleLogoutCleanup();
      }
    });

    return () => unsubscribe();
  }, []);

  /* --------------------------------------------------
     3️⃣ UPDATE USER (Syncs UI + LocalStorage + DB)
  -------------------------------------------------- */
  const updateUser = async (updatedFields) => {
    const uid = auth.currentUser?.uid || localStorage.getItem("auth_uid");
    if (!uid) return;

    // A. OPTIMISTIC UPDATE (Instant UI Change)
    setUser((prev) => {
      // Deep merge address to ensure we don't lose fields
      const mergedData = {
        ...prev,
        ...updatedFields,
        address: updatedFields.address
          ? { ...prev?.address, ...updatedFields.address }
          : prev?.address,
      };

      // Save to LocalStorage immediately
      localStorage.setItem("user", JSON.stringify(mergedData));
      return mergedData;
    });

    // B. BACKEND UPDATE
    try {
      const userRef = doc(db, "users", uid);

      // Note: We DO NOT save the full 'address' object to the main 'users' doc
      // because we use subcollections. We only save 'defaultAddressId' or profile info.
      // We filter out 'address' before sending to main user doc to keep DB clean.

      const { address, ...validFirestoreFields } = updatedFields;

      if (Object.keys(validFirestoreFields).length > 0) {
        await setDoc(userRef, validFirestoreFields, { merge: true });
      }
    } catch (error) {
      console.error("❌ Failed to sync to Firebase:", error);
    }
  };

  /* --------------------------------------------------
     4️⃣ UPDATE ADDRESS SPECIFICALLY
     (Use this when user saves address in Checkout/Profile)
  -------------------------------------------------- */
  const updateAddress = async (newAddressData) => {
    // 1. Update Local State & Storage immediately
    await updateUser({ address: newAddressData });

    // 2. (Optional) If you want to force a DB write for the address specifically
    // You usually handle the DB write in your 'EditProfilePage' or 'AddressPage'
    // but this ensures your Context stays in sync.
  };

  /* --------------------------------------------------
     5️⃣ LOGOUT & LOGIN
  -------------------------------------------------- */
  const handleLogoutCleanup = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("auth_uid");
  };

  const logout = async () => {
    await signOut(auth);
    handleLogoutCleanup();
  };

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("auth_uid", auth.currentUser?.uid);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        address, // 🔥 Exposed directly
        isLoggedIn,
        loading,
        login,
        logout,
        updateUser,
        updateAddress, // 🔥 Use this to update address
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

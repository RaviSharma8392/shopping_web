import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 🔑 always contains uid
  console.log(user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ===============================
     Load user from localStorage
  =============================== */
  useEffect(() => {
    const cached = localStorage.getItem("auth_user");
    if (cached) {
      setUser(JSON.parse(cached));
      setIsLoggedIn(true);
      setLoading(false);
    }
  }, []);

  /* ===============================
     Sync with Firebase Auth
  =============================== */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        clearAuth();
        return;
      }

      try {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          clearAuth();
          return;
        }

        const data = snap.data();

        const finalUser = {
          uid: firebaseUser.uid,

          // ===== Core =====
          role: data.role ?? "user",
          provider: data.provider ?? "email",
          isBlocked: data.isBlocked ?? false,

          // ===== Identity =====
          name: data.name ?? "",
          email: data.email ?? "",
          emailVerified: data.emailVerified ?? false,
          phone: data.phone ?? "",

          // ===== Commerce =====
          defaultAddressId: data.defaultAddressId ?? null,

          createdAt: data.createdAt ?? null,
          updatedAt: data.updatedAt ?? null,
        };

        setUser(finalUser);
        setIsLoggedIn(true);
        localStorage.setItem("auth_user", JSON.stringify(finalUser));
      } catch (err) {
        console.error("Auth sync failed:", err);
        clearAuth();
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ===============================
     Helpers
  =============================== */

  const clearAuth = () => {
    setUser(null);
    setIsLoggedIn(false);
    setLoading(false);
    localStorage.removeItem("auth_user");
  };

  /* ===============================
     Manual login (after signup)
  =============================== */
  const login = (uid, firestoreUser) => {
    const finalUser = {
      uid,
      role: firestoreUser.role ?? "user",
      provider: firestoreUser.provider ?? "email",
      isBlocked: firestoreUser.isBlocked ?? false,

      name: firestoreUser.name ?? "",
      email: firestoreUser.email ?? "",
      emailVerified: firestoreUser.emailVerified ?? false,
      phone: firestoreUser.phone ?? "",

      defaultAddressId: firestoreUser.defaultAddressId ?? null,

      createdAt: firestoreUser.createdAt ?? null,
      updatedAt: firestoreUser.updatedAt ?? null,
    };

    setUser(finalUser);
    setIsLoggedIn(true);
    localStorage.setItem("auth_user", JSON.stringify(finalUser));
  };

  /* ===============================
     Update user (NO address logic)
  =============================== */
  const updateUser = (fields) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updated = { ...prev, ...fields };
      localStorage.setItem("auth_user", JSON.stringify(updated));
      return updated;
    });
  };

  /* ===============================
     Logout
  =============================== */
  const logout = async () => {
    await signOut(auth);
    clearAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        logout,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

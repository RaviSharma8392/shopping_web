import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // -------------------------
  // STATE
  // -------------------------
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // FIREBASE AUTH SYNC
  // -------------------------
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
          role: data.role || "user",
          provider: data.provider || "email",
          isBlocked: data.isBlocked || false,
          name: data.name || "",
          email: data.email || "",
          gender: data.gender || "",
          dateOfBirth: data.dateOfBirth || "",
          emailVerified: firebaseUser.emailVerified,
          phone: data.phone || "",
          defaultAddressId: data.defaultAddressId || null,
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
        };

        setUser(finalUser);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(finalUser));
        localStorage.setItem("auth_uid", firebaseUser.uid);
      } catch (err) {
        console.error("Auth sync failed:", err);
        clearAuth();
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // -------------------------
  // HELPERS
  // -------------------------
  const clearAuth = () => {
    setUser(null);
    setIsLoggedIn(false);
    setLoading(false);
    localStorage.removeItem("user");
    localStorage.removeItem("auth_uid");
  };

  // -------------------------
  // FORCE REFRESH FROM FIRESTORE
  // -------------------------
  const refreshUserFromFirestore = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      const refreshedUser = {
        uid,
        role: data.role || "user",
        provider: data.provider || "email",
        isBlocked: data.isBlocked || false,
        name: data.name || "",
        email: data.email || "",
        gender: data.gender || "",
        dateOfBirth: data.dateOfBirth || "",
        emailVerified: auth.currentUser.emailVerified,
        phone: data.phone || "",
        defaultAddressId: data.defaultAddressId || null,
        createdAt: data.createdAt || null,
        updatedAt: data.updatedAt || null,
      };

      setUser(refreshedUser);
      localStorage.setItem("user", JSON.stringify(refreshedUser));
    }
  };

  // -------------------------
  // UPDATE USER (LOCAL + FIRESTORE)
  // -------------------------
  const updateUserAndSync = async (updates) => {
    if (!user?.uid) return;

    // console.log("Updates received:", updates);

    const ref = doc(db, "users", user.uid);

    // Only keep fields that are not undefined, null, or empty
    const payload = {};
    Object.keys(updates).forEach((key) => {
      if (
        updates[key] !== undefined &&
        updates[key] !== null &&
        updates[key] !== ""
      ) {
        payload[key] = updates[key];
      }
    });

    payload.updatedAt = new Date().toISOString();

    // Update Firestore
    await updateDoc(ref, payload);

    // Update local state
    const updatedUser = {
      ...user,
      ...payload,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // -------------------------
  // LOGOUT
  // -------------------------
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
        logout,
        refreshUserFromFirestore,
        updateUserAndSync,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

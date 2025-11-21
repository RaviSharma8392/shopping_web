import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Load User From LocalStorage First
  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const parsed = JSON.parse(localUser);
      setUser(parsed);
      setIsLoggedIn(true);
      setLoading(false); // prevent UI block
    }
  }, []);

  //  Then Sync With Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        // user logged out
        setUser(null);
        setIsLoggedIn(false);
        setLoading(false);
        localStorage.removeItem("user");
        return;
      }

      // fetch latest firestore profile
      const ref = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const firestoreUser = snap.data();

        setUser(firestoreUser);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(firestoreUser));
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // MANUAL LOGIN
  const login = (uid, userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("auth_uid", uid);
  };

  // UPDATE USER LOCALLY
  const updateUser = (updatedFields) => {
    const updatedUser = {
      ...user,
      ...updatedFields,
      address: {
        ...user?.address,
        ...updatedFields.address,
      },
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("auth_uid");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

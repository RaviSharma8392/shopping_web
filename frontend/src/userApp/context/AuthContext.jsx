export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  /* ===============================
     1. HYDRATE FROM LOCAL STORAGE (INSTANT)
  =============================== */
  useEffect(() => {
    const cached = localStorage.getItem("auth_user");

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch (e) {
        console.warn("Corrupt localStorage user");
      }
    }

    setIsHydrated(true);
    setLoading(false);
  }, []);

  /* ===============================
     2. BACKGROUND FIREBASE SYNC
  =============================== */
  useEffect(() => {
    const handleOnline = () => {
      console.log("Network restored — rechecking auth");

      const current = auth.currentUser;

      if (!current && user) {
        clearAuth();
      }
    };

    window.addEventListener("online", handleOnline);

    return () => window.removeEventListener("online", handleOnline);
  }, [user]);

  /* ===============================
     3. UPDATE USER (LOCAL FIRST)
  =============================== */
  const updateUser = async (fields) => {
    if (!user?.uid) return;

    const updatedUser = { ...user, ...fields };
    setUser(updatedUser);
    localStorage.setItem("auth_user", JSON.stringify(updatedUser));

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        ...fields,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Will auto-sync when online:", err);
    }
  };

  /* =============================== */
  const clearAuth = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("auth_user");
  };

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
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

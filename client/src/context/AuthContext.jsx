import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const setUser = (data) => {
    if (data) {
      setUserState(data);
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      setUserState(null);
      localStorage.removeItem("user");
    }
  };

  // ✅ THIS FIXES THE "?" ON REFRESH
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/check-auth",
          { withCredentials: true }
        );

        if (res.data?.success && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

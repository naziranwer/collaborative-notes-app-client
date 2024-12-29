import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (token && !storedUser) {
      try {
        const decoded = jwtDecode(token);
        sessionStorage.setItem("user", JSON.stringify(decoded));
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error.message);
        logout();
      }
    }
  }, []);

  const login = (data) => {
    const { token, user } = data;

    try {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      setUser(user);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

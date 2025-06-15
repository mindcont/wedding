import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Invitation from "@/pages/Invitation";
import GuestPage from "@/pages/Guest";
import AdminComments from "@/pages/AdminComments";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/invitation" element={<Invitation />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/admin/comments" element={<AdminComments />} />
        <Route path="/wishes" element={<GuestPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}

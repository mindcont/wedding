import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Invitation from "@/pages/Invitation";
import GuestPage from "@/pages/Guest";
import AdminComments from "@/pages/AdminComments";
import AdminLinks from "@/pages/AdminLinks";
import Login from "@/pages/Login";
import { createContext, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { weddingData } from "@/data/wedding";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
  supabaseClient: createClient(
    weddingData.supabaseConfig.apiEndpoint,
    weddingData.supabaseConfig.apiKey
  )
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabaseClient = createClient(
    weddingData.supabaseConfig.apiEndpoint,
    weddingData.supabaseConfig.apiKey
  );

  const logout = async () => {
    await supabaseClient.auth.signOut();
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        setIsAuthenticated, 
        logout,
        supabaseClient
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/invitation" element={<Invitation />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/guest/:name-invite" element={<GuestPage />} />
        <Route path="/wishes" element={<GuestPage />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin/comments" element={
          <ProtectedRoute>
            <AdminComments />
          </ProtectedRoute>
        } />
        <Route path="/admin/links" element={
          <ProtectedRoute>
            <AdminLinks />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthContext.Provider>
  );
}

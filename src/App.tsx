import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { weddingData } from "@/data/wedding";
import SinglePage from "@/pages/SinglePage";
import { createContext } from "react";

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

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        setIsAuthenticated, 
        logout,
        supabaseClient
      }}
    >
      <SinglePage />
    </AuthContext.Provider>
  );
}

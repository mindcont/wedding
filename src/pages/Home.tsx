import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8E0E0] flex flex-col items-center justify-between p-8">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300&display=swap');
        `}
      </style>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 
          className="text-5xl md:text-6xl font-bold mb-6 font-great-vibes"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {weddingData.coupleName}
        </h1>
        <p 
          className="text-xl md:text-2xl mt-4 font-roboto-light"
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}
        >
          {weddingData.weddingDate}
        </p>
      </div>

      <div className="w-full max-w-md mb-8">
        {weddingData.navItems.map((item) => (
          <motion.button
            key={item.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(item.path)}
            className="w-full bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 font-medium py-4 px-6 rounded-lg shadow-md mb-4 transition-all duration-300"
          >
            {item.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
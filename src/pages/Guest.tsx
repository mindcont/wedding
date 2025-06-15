import { weddingData } from "@/data/wedding";
import { Empty } from "@/components/Empty";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function GuestPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8E0E0] p-4 md:p-8">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300&display=swap');
        `}
      </style>

      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen">
        {/* 导航栏 - 与首页一致 */}
        <div className="w-full mb-8">
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

        {/* 宾客专属内容 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full text-center"
        >
          <h1 
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            尊敬的宾客
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-8 leading-relaxed"
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}
          >
            感谢您来见证我们的幸福时刻！
          </p>
          
          <div className="mt-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={weddingData.featuredPhoto.url}
                alt={weddingData.featuredPhoto.alt}
                className="w-full h-auto object-cover rounded-lg"
                style={{ aspectRatio: "3/4" }}
              />
            </motion.div>
            <p className="mt-4 text-gray-600">张明 & 李雪</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
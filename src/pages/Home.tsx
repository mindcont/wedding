import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState<{ip_address: string; visit_time: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取访客IP并记录
    const recordVisitor = async () => {
      try {
        // 获取访客IP
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        
        // 记录访客信息
        await weddingData.supabaseConfig.recordVisitor(
          ip,
          navigator.userAgent
        );
        
        // 获取最近访客记录
        const recentVisitors = await weddingData.supabaseConfig.getRecentVisitors();
        setVisitors(recentVisitors);
      } catch (error) {
        console.error('访客记录错误:', error);
      } finally {
        setLoading(false);
      }
    };

    recordVisitor();
  }, []);

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

      {/* 访客记录区域 */}
      <div className="w-full max-w-md bg-white bg-opacity-80 rounded-lg shadow-md p-4 mt-4">
        <h3 className="text-lg font-medium mb-2">最近访客</h3>
        {loading ? (
          <p className="text-gray-600">加载中...</p>
        ) : visitors.length > 0 ? (
          <ul className="space-y-2">
            {visitors.map((visitor, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{visitor.ip_address}</span>
                <span className="text-gray-500">
                  {new Date(visitor.visit_time).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">暂无访客记录</p>
        )}
      </div>
    </div>
  );
}
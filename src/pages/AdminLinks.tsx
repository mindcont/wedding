import { useState, useEffect } from "react";
import { weddingData } from "@/data/wedding";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';
import { AuthContext } from "@/App";

export default function AdminLinks() {
  const navigate = useNavigate();
  const [links, setLinks] = useState<{name: string; tableNumber?: string; link: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await weddingData.supabaseConfig.getAllGuestLinks();
        setLinks(data);
      } catch (error) {
        console.error('Error fetching links:', error);
        toast.error('获取链接失败');
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('链接已复制');
  };

  return (
    <div className="min-h-screen bg-[#F8E0E0] p-4 md:p-8">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300&display=swap');
        `}
      </style>

      <div className="max-w-4xl mx-auto">
        {/* 导航栏 */}
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

        {/* 链接管理标题 */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-center"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          宾客邀请链接管理
        </motion.h1>

        {/* 链接列表 */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-300"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((item) => (
              <motion.div
                key={item.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white bg-opacity-80 rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.tableNumber && (
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                      桌号: {item.tableNumber}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`${window.location.origin}${item.link}`}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(`${window.location.origin}${item.link}`)}
                    className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg transition-colors"
                  >
                    复制
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
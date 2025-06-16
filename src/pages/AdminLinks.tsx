import { useState, useEffect, useContext } from "react";
import { weddingData } from "@/data/wedding";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';
import { AuthContext } from "@/App";

export default function AdminLinks() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [links, setLinks] = useState<{name: string; tableNumber?: string; link: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 如果未认证，重定向到首页
    if (!isAuthenticated) {
      toast.error('请先登录管理员账户');
      navigate("/");
      return;
    }
    const fetchLinks = async () => {
      try {
        // 初始化Supabase客户端
        const supabase = createClient(
          weddingData.supabaseConfig.apiEndpoint,
          weddingData.supabaseConfig.apiKey
        );
        
        // 直接查询数据库
        const { data, error: queryError } = await supabase
          .from('guests')
          .select('name, table_number');
        
        if (queryError) throw queryError;
        
        // 格式化数据
        const formattedData = data?.map(guest => ({
          name: guest.name,
          tableNumber: guest.table_number,
          link: `/guest/${encodeURIComponent(guest.name)}-invite`
        })) || [];
        
        setLinks(formattedData);
        setError(null);
      } catch (err) {
        console.error('获取链接失败:', err);
        setError('无法获取宾客链接，请检查网络连接或数据库配置');
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

        {/* 错误提示 */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
          >
            <p>{error}</p>
          </motion.div>
        )}

        {/* 链接列表 */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-300"></div>
            <p>正在加载宾客链接...</p>
          </div>
        ) : links.length > 0 ? (
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
        ) : (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <p>暂无宾客数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
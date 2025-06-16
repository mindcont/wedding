import { useState, useEffect, useContext } from "react";
import { weddingData } from "@/data/wedding";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';
import { AuthContext } from "@/App";

export default function AdminComments() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('请先登录管理员账户');
      navigate("/");
      return;
    }

    const fetchComments = async () => {
      try {
        const supabase = createClient(
          weddingData.supabaseConfig.apiEndpoint,
          weddingData.supabaseConfig.apiKey
        );
        
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setComments(data || []);
        setError(null);
      } catch (err) {
        console.error('获取评论失败:', err);
        setError('无法获取评论数据，请检查网络连接或数据库配置');
        toast.error('获取评论失败');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );
      
      const { error } = await supabase
        .from('messages')
        .update({ is_approved: true })
        .eq('id', id);
      
      if (error) throw error;
      
      setComments(prev => 
        prev.map(comment => 
          comment.id === id ? {...comment, is_approved: true} : comment
        )
      );
      toast.success('评论已审核通过');
    } catch (err) {
      console.error('审核评论失败:', err);
      toast.error('审核评论失败');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );
      
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setComments(prev => prev.filter(comment => comment.id !== id));
      toast.success('评论已删除');
    } catch (err) {
      console.error('删除评论失败:', err);
      toast.error('删除评论失败');
    }
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

        {/* 评论管理标题 */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-center"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          评论管理
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

        {/* 评论列表 */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-300"></div>
            <p>正在加载评论...</p>
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white bg-opacity-80 rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{comment.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${comment.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {comment.is_approved ? '已审核' : '待审核'}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{comment.content}</p>
                <div className="flex space-x-2">
                  {!comment.is_approved && (
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      审核通过
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    删除
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <p>暂无评论数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
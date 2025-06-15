import { useState } from "react";
import { weddingData } from "@/data/wedding";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AdminComments() {
  const navigate = useNavigate();
  const [comments, setComments] = useState(weddingData.comments);

  const handleApprove = (id: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === id ? {...comment, approved: true} : comment
      )
    );
    toast.success('评论已审核通过');
  };

  const handleDelete = (id: string) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
    toast.success('评论已删除');
  };

  return (
    <div className="min-h-screen bg-[#F8E0E0] p-4 md:p-8">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300&display=swap');
        `}
      </style>

      <div className="max-w-4xl mx-auto">
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

        {/* 评论管理标题 */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-center"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          评论管理
        </motion.h1>

        {/* 评论列表 */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white bg-opacity-80 rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{comment.author}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${comment.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {comment.approved ? '已审核' : '待审核'}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{comment.content}</p>
              <div className="flex space-x-2">
                {!comment.approved && (
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
      </div>
    </div>
  );
}
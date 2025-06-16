import { weddingData } from "@/data/wedding";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Empty } from "@/components/Empty";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';

export default function GuestPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [guest, setGuest] = useState<{name: string; table_number?: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState({
    name: '',
    content: '',
    emoji: '❤️'
  });

  useEffect(() => {
    const fetchGuest = async () => {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );

      try {
        let query = supabase
          .from('guests')
          .select('name, table_number');
        
        if (name) {
          query = query.eq('name', decodeURIComponent(name));
        }

        const { data, error } = await query;

        if (error) throw error;
        
        if (data && data.length > 0) {
          setGuest(data[0]);
        }
      } catch (error) {
        console.error('Error fetching guest:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
    
    // 获取留言
    const fetchMessages = async () => {
      try {
        const data = await weddingData.supabaseConfig.getMessages();
        setMessages(data);
      } catch (error) {
        console.error('获取留言失败:', error);
      }
    };
    
    fetchMessages();
  }, [name]);

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
            {guest ? `尊敬的 ${guest.name}` : '尊敬的宾客'}
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-8 leading-relaxed"
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}
          >
            {guest ? 
              `邀请您来见证我们的幸福时刻！` : 
              '邀请您来见证我们的幸福时刻！'
            }
          </p>

          {guest?.table_number && (
            <p className="text-lg mb-4">
              您的桌号: {guest.table_number}
            </p>
          )}
          
           {/* 留言表单 */}
           <div className="mt-8 w-full">
             <div className="bg-white bg-opacity-80 rounded-lg shadow-md p-6 mb-6">
               <h3 className="text-xl font-medium mb-4">留下您的祝福</h3>
               <div className="space-y-4">
                 <input
                   type="text"
                   placeholder="您的姓名"
                   className="w-full px-4 py-2 border rounded-lg"
                   value={newMessage.name}
                   onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
                 />
                 <textarea
                   placeholder="祝福内容"
                   className="w-full px-4 py-2 border rounded-lg"
                   rows={3}
                   value={newMessage.content}
                   onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                 />
                 <div className="flex items-center space-x-2">
                   <span className="text-2xl">{newMessage.emoji}</span>
                   <select 
                     className="px-3 py-1 border rounded-lg"
                     value={newMessage.emoji}
                     onChange={(e) => setNewMessage({...newMessage, emoji: e.target.value})}
                   >
                     <option value="❤️">❤️ 爱心</option>
                     <option value="😊">😊 微笑</option>
                     <option value="🎉">🎉 庆祝</option>
                     <option value="💐">💐 鲜花</option>
                     <option value="🥂">🥂 干杯</option>
                   </select>
                 </div>
                 <button
                   onClick={async () => {
                     if (!newMessage.name || !newMessage.content) {
                       toast.error('请填写姓名和留言内容');
                       return;
                     }
                     try {
                       await weddingData.supabaseConfig.addMessage(
                         newMessage.name,
                         newMessage.content,
                         newMessage.emoji
                       );
                       toast.success('留言已提交');
                       setNewMessage({name: '', content: '', emoji: '❤️'});
                       const data = await weddingData.supabaseConfig.getMessages();
                       setMessages(data);
                     } catch (error) {
                       toast.error('留言提交失败');
                     }
                   }}
                   className="w-full py-2 px-4 bg-pink-300 hover:bg-pink-400 text-white rounded-lg transition-colors"
                 >
                   提交留言
                 </button>
               </div>
             </div>
             
             {/* 留言列表 */}
             {messages.length > 0 && (
               <div className="bg-white bg-opacity-80 rounded-lg shadow-md p-6">
                 <h3 className="text-xl font-medium mb-4">祝福留言</h3>
                 <div className="space-y-4">
                   {messages.map((message) => (
                     <div key={message.id} className="border-b pb-4 last:border-0">
                       <div className="flex items-start">
                         <span className="text-2xl mr-2">{message.emoji}</span>
                         <div>
                           <p className="font-medium">{message.name}</p>
                           <p className="text-gray-700">{message.content}</p>
                           <p className="text-xs text-gray-500 mt-1">
                             {new Date(message.created_at).toLocaleString('zh-CN')}
                           </p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}
           </div>
           
   
        </motion.div>
      </div>
    </div>
  );
}
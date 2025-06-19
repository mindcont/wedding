import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { toast } from "sonner";
import { AuthContext } from "@/App";
import { createClient } from '@supabase/supabase-js';
import MapComponent from "@/components/MapComponent";
import { ImageModal } from "@/components/ImageModal";

export default function SinglePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState({
    name: '',
    content: '',
    emoji: '❤️'
  });
  const [visitors, setVisitors] = useState<{ ip_address: string; visit_time: string }[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [loading, setLoading] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useContext(AuthContext);

  const fetchRecentVisitors = async () => {
    try {
      const visitors = await weddingData.supabaseConfig.getRecentVisitors();
      console.log('成功获取最近访客:', visitors);
    } catch (error) {
      console.error('获取最近访客失败:', error);
    }
  };


  // 获取留言数据
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log('开始获取留言数据...');
        const data = await weddingData.supabaseConfig.getApprovedMessages();
        console.log('成功获取留言数据:', data);
        setMessages(data);
      } catch (error) {
        console.error('获取留言失败:', error);
        toast.error('获取留言失败，请刷新重试');
      }
    };
    fetchMessages();
  }, []);

  // 获取访客数据
  useEffect(() => {
    const fetchTotalVisits = async () => {
      try {
        console.log('开始获取访客数据...');
        const total = await weddingData.supabaseConfig.getTotalVisits();
        console.log('成功获取访问总数:', total);
        setTotalVisits(total);
      } catch (error) {
        console.error('获取访问总数失败:', error);
        toast.error('获取访问总数失败，请刷新重试');
      } finally {
        setLoading(false);
      }
    };

    const recordVisitor = async () => {
      try {
        const ip = await weddingData.supabaseConfig.recordVisitor(navigator.userAgent);
        console.log('访客记录成功，IP:', ip);
        await fetchTotalVisits();
      } catch (error) {
        console.error('记录访客失败:', error);
        await fetchRecentVisitors();
      }
    };

    fetchRecentVisitors();
    recordVisitor();
  }, []);

  // 滚动到指定区域
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // 自动滚动留言
  useEffect(() => {
    if (!messagesContainerRef.current || messages.length <= 3) return;

    const container = messagesContainerRef.current;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    let scrollPosition = 0;
    let scrollDirection = 1;
    let isScrolling = true;

    const scrollMessages = () => {
      if (!isScrolling) return;

      scrollPosition += scrollDirection * 0.5;

      if (scrollPosition >= scrollHeight) {
        isScrolling = false;
        setTimeout(() => {
          isScrolling = true;
          scrollDirection = -1;
        }, 2000);
      } else if (scrollPosition <= 0) {
        isScrolling = false;
        setTimeout(() => {
          isScrolling = true;
          scrollDirection = 1;
        }, 2000);
      }

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

      requestAnimationFrame(scrollMessages);
    };

    const scrollInterval = requestAnimationFrame(scrollMessages);

    return () => cancelAnimationFrame(scrollInterval);
  }, [messages]);

  // 顶部导航栏
  const renderNavBar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-medium text-gray-800 hover:text-pink-400 transition-colors"
            >
              {weddingData.coupleName}
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {weddingData.navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.name === '婚纱照' ? 'gallery' : item.name === '请柬' ? 'invitation' : 'wishes')}
                className={`px-3 py-2 text-sm font-medium ${activeSection === (item.name === '婚纱照' ? 'gallery' : item.name === '请柬' ? 'invitation' : 'wishes') ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-700 hover:text-pink-400'} transition-colors`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            {/* 移动端菜单按钮 */}
            <button className="text-gray-700 hover:text-pink-400">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // 首页内容
  const renderHomeSection = () => (
    <section id="home" className="min-h-screen flex flex-col items-center justify-between p-8 pt-24">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
          {weddingData.coupleName}
        </h1>
        <p className="text-xl md:text-2xl mt-4" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}>
          {weddingData.weddingDate}
        </p>
      </div>

      <div className="w-full max-w-md mb-8">
        {weddingData.navItems.map((item) => (
          <motion.button
            key={item.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(item.name === '婚纱照' ? 'gallery' : item.name === '请柬' ? 'invitation' : 'wishes')}
            className="w-full bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 font-medium py-4 px-6 rounded-lg shadow-md mb-4 transition-all duration-300"
          >
            {item.name}
          </motion.button>
        ))}
      </div>


    </section>
  );

  // 相册内容
  const renderGallerySection = () => (
    <section id="gallery" className="min-h-screen bg-[#F8E0E0] p-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold my-8 text-center" style={{ fontFamily: "'Great Vibes', cursive" }}>
          我们的婚纱照
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {weddingData.galleryPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage({ url: photo.url, alt: photo.alt })}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-auto object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                style={{ aspectRatio: "3/4" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // 请柬内容
  const renderInvitationSection = () => (
    <section id="invitation" className="min-h-screen bg-[#F8E0E0] p-4 md:p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white bg-opacity-80 rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: "'Great Vibes', cursive" }}>
            婚礼邀请函
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <i className="fa-regular fa-calendar text-xl mr-4 text-pink-300"></i>
              <div>
                <h3 className="font-medium">日期</h3>
                <p>{weddingData.weddingDetails.date}</p>
              </div>
            </div>

            <div className="flex items-center">
              <i className="fa-regular fa-clock text-xl mr-4 text-pink-300"></i>
              <div>
                <h3 className="font-medium">时间</h3>
                <p>{weddingData.weddingDetails.time}</p>
              </div>
            </div>

            <div className="flex items-center">
              <i className="fa-regular fa-location-dot text-xl mr-4 text-pink-300"></i>
              <div>
                <h3 className="font-medium">地点</h3>
                <p>{weddingData.weddingDetails.location}</p>
                <p className="text-sm text-gray-600">{weddingData.weddingDetails.address}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-80 rounded-lg shadow-md p-6 mb-8 text-center"
        >
          <h3 className="text-xl font-medium mb-4">诚挚邀请</h3>
          <p className="mb-4">我们诚挚邀请您参加我们的婚礼，见证我们人生中最重要的时刻。</p>
          <button
            onClick={() => scrollToSection('wishes')}
            className="w-full py-3 px-6 rounded-lg bg-pink-300 hover:bg-pink-400 text-white transition-colors"
          >
            查看专属邀请
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white bg-opacity-80 rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4">
            <h3 className="text-xl font-medium mb-2">婚礼地点导航</h3>
            <p className="text-sm text-gray-600 mb-4">点击下方地图查看路线</p>
          </div>

          <MapComponent
            markerPosition={[weddingData.mapData.lng, weddingData.mapData.lat]}
            markerIcon={weddingData.mapData.marker.icon}
          />

          <div className="p-4">
            <a
              href={`https://uri.amap.com/marker?position=${weddingData.mapData.lng},${weddingData.mapData.lat}&name=${encodeURIComponent(weddingData.weddingDetails.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg text-sm transition-colors"
            >
              路线规划
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // 留言内容
  const renderWishesSection = () => (
    <section id="wishes" className="min-h-screen bg-[#F8E0E0] p-4 md:p-8 pt-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen">
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
                  onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                />
                <textarea
                  placeholder="祝福内容"
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                />
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{newMessage.emoji}</span>
                  <select
                    className="px-3 py-1 border rounded-lg"
                    value={newMessage.emoji}
                    onChange={(e) => setNewMessage({ ...newMessage, emoji: e.target.value })}
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
                      setNewMessage({ name: '', content: '', emoji: '❤️' });
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
    </section>
  );

  return (
    <div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300&display=swap');
        `}
      </style>

      {renderNavBar()}
      {renderHomeSection()}
      {renderGallerySection()}
      {renderInvitationSection()}
      {renderWishesSection()}

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          altText={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* 页脚区域 */}
      <footer className="bg-white bg-opacity-80 py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium mb-1">历史访问数量</h3>
            {loading ? (
              <p className="text-gray-600 text-xs">加载中...</p>
            ) : (
              <p className="text-xl font-bold text-pink-500">
                {totalVisits}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1"> <a href="https://www.coze.cn" target="_blank">由 Coze AI 驱动，Powered by Love</a></h3>

            <p className="text-xs text-gray-500">

              最后更新: {new Date().toLocaleString('zh-CN')}
            </p>
          </div>


        </div>
      </footer>
    </div>

  );
}
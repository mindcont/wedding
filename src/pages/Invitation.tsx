import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { useNavigate } from "react-router-dom";
import MapComponent from "@/components/MapComponent";

export default function Invitation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8E0E0] p-4 md:p-8">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300&display=swap');
        `}
      </style>

      <div className="max-w-4xl mx-auto">
        {/* 婚礼信息卡片 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white bg-opacity-80 rounded-lg shadow-md p-6 mb-8"
        >
          <h2 
            className="text-3xl font-bold mb-4 text-center"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
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

        {/* 邀请信息 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-80 rounded-lg shadow-md p-6 mb-8 text-center"
        >
          <h3 className="text-xl font-medium mb-4">诚挚邀请</h3>
          <p className="mb-4">我们诚挚邀请您参加我们的婚礼，见证我们人生中最重要的时刻。</p>
          <button
            onClick={() => navigate('/guest')}
            className="w-full py-3 px-6 rounded-lg bg-pink-300 hover:bg-pink-400 text-white transition-colors"
          >
            查看专属邀请
          </button>
        </motion.div>

        {/* 地图区域 */}
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
    </div>
  );
}
import { createClient } from '@supabase/supabase-js';

export const weddingData = {
  coupleName: "张明 & 李雪",
  weddingDate: "2025年10月1日",
  weddingDetails: {
    date: "2025年10月1日",
    time: "下午3点",
    location: "青岛瑞吉酒店",
    address: "山东省青岛市市南区香港中路48号"
  },
  mapData: {
    lat: 36.06623,
    lng: 120.384428,
    marker: {
      icon: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E5%A9%9A%E7%A4%BC%E5%9C%B0%E7%82%B9%E6%A0%87%E8%AE%B0%EF%BC%8C%E7%B2%89%E8%89%B2%E5%BF%83%E5%BD%A2%EF%BC%8C%E7%AE%80%E7%BA%A6%E6%B8%85%E6%96%B0%E9%A3%8E%E6%A0%BC&sign=997c8d874089ac47cdd534f458374d7a"
    }
  },
  navItems: [
    { name: "婚纱照", path: "/gallery" },
    { name: "请柬", path: "/invitation" },
    { name: "祝福留言", path: "/wishes" }
  ],
  galleryPhotos: [
    {
      id: "1",
      url: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=%E6%B5%AA%E6%BC%AB%E5%A9%9A%E7%BA%B1%E7%85%A7%EF%BC%8C%E6%B5%B7%E8%BE%B9%E6%97%A5%E8%90%BD%EF%BC%8C%E6%96%B0%E4%BA%BA%E7%9B%B8%E6%8B%A5%EF%BC%8C%E4%B8%93%E4%B8%9A%E6%91%84%E5%BD%B1%E9%A3%8E%E6%A0%BC&sign=51b0db37caf6beacb0e4482618598e71",
      alt: "海边日落婚纱照"
    },
    {
      id: "2",
      url: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=%E5%8F%A4%E5%85%B8%E9%A3%8E%E6%A0%BC%E5%A9%9A%E7%BA%B1%E7%85%A7%EF%BC%8C%E6%AC%A7%E5%BC%8F%E5%BB%BA%E7%AD%91%E8%83%8C%E6%99%AF%EF%BC%8C%E6%96%B0%E4%BA%BA%E7%AB%AF%E5%BA%84%E7%AB%99%E7%AB%8B&sign=7ce2c541ab19b76dd2fc024bb625ad0b",
      alt: "欧式建筑婚纱照"
    },
    {
      id: "3",
      url: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=%E6%A3%AE%E6%9E%97%E4%B8%BB%E9%A2%98%E5%A9%9A%E7%BA%B1%E7%85%A7%EF%BC%8C%E9%98%B3%E5%85%89%E9%80%8F%E8%BF%87%E6%A0%91%E5%8F%B6%EF%BC%8C%E6%96%B0%E4%BA%BA%E8%87%AA%E7%84%B6%E4%BA%92%E5%8A%A8&sign=8a0e21e73d106bebbd153d13cd10c59e",
      alt: "森林主题婚纱照"
    },
    {
      id: "4",
      url: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=%E5%9F%8E%E5%B8%82%E5%A4%9C%E6%99%AF%E5%A9%9A%E7%BA%B1%E7%85%A7%EF%BC%8C%E9%9C%93%E8%99%B9%E7%81%AF%E5%85%89%E8%83%8C%E6%99%AF%EF%BC%8C%E6%96%B0%E4%BA%BA%E6%B5%AA%E6%BC%AB%E5%AF%B9%E8%A7%86&sign=b02c8281fe279688b8a0d3de6627d54d",
      alt: "城市夜景婚纱照"
    },
    {
      id: "5",
      url: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=%E4%BC%A0%E7%BB%9F%E4%B8%AD%E5%BC%8F%E5%A9%9A%E7%BA%B1%E7%85%A7%EF%BC%8C%E7%BA%A2%E8%89%B2%E7%A4%BC%E6%9C%8D%EF%BC%8C%E5%8F%A4%E5%85%B8%E5%BA%AD%E9%99%A2%E8%83%8C%E6%99%AF&sign=cb169b84f7f7e486a23b2dd76e870849",
      alt: "中式传统婚纱照"
    },
    {
      id: "6",
      url: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=%E5%88%9B%E6%84%8F%E5%A9%9A%E7%BA%B1%E7%85%A7%EF%BC%8C%E6%B0%94%E7%90%83%E8%83%8C%E6%99%AF%EF%BC%8C%E6%96%B0%E4%BA%BA%E8%B7%B3%E8%B7%83%E7%9E%AC%E9%97%B4&sign=20644475b60565b02a37ddb418420b8c",
      alt: "创意气球婚纱照"
    }
  ],
  guestMessages: [
    {
      name: "张三",
      message: "亲爱的张三，感谢您来见证我们的幸福时刻！"
    },
    {
      name: "李四",
      message: "尊敬的李四，您的到来让我们的婚礼更加完美！"
    }
  ],
  featuredPhoto: {
    url: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=%E7%B2%89%E8%89%B2%E4%B8%BB%E9%A2%98%E5%A9%9A%E7%BA%B1%E7%85%A7%EF%BC%8C%E6%96%B0%E4%BA%BA%E7%9B%B8%E6%8B%A5%EF%BC%8C%E6%B5%AA%E6%BC%AB%E6%84%9F%EF%BC%8C%E7%AE%80%E7%BA%A6%E9%A3%8E%E6%A0%BC&sign=67fd7985eb9af582e75f8653e1db233a",
    alt: "精选婚纱照"
  },
  comments: [
    {
      id: "1",
      author: "张三",
      content: "祝新人百年好合！",
      approved: true
    },
    {
      id: "2",
      author: "李四",
      content: "婚礼太美了，感动！",
      approved: false
    },
    {
      id: "3",
      author: "王五",
      content: "期待参加你们的婚礼！",
      approved: true
    }
  ],
    // Supabase配置 - 从环境变量读取
    supabaseConfig: {
      tableName: "guests",
      schema: `
        CREATE TABLE guests (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          phone TEXT,
          relationship TEXT,
          table_number TEXT,
          is_attending BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
        
        CREATE TABLE visitors (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          ip_address TEXT NOT NULL,
          visit_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
          user_agent TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
        
        -- 留言表
        CREATE TABLE messages (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          content TEXT NOT NULL,
          emoji TEXT,
          is_approved BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
        
        -- 创建索引
        CREATE INDEX idx_guests_name ON guests(name);
        CREATE INDEX idx_guests_phone ON guests(phone);
        CREATE INDEX idx_visitors_time ON visitors(visit_time);
        CREATE INDEX idx_messages_created ON messages(created_at);
        
        -- RLS策略
        ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
        ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
        ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
        
        -- 管理员可以完全访问
        CREATE POLICY "Admin access guests" ON guests
          FOR ALL USING (auth.role() = 'admin');
        CREATE POLICY "Admin access visitors" ON visitors
          FOR ALL USING (auth.role() = 'admin');
        CREATE POLICY "Admin access messages" ON messages
          FOR ALL USING (auth.role() = 'admin');
        
        -- 其他角色权限
        CREATE POLICY "Read access guests" ON guests
          FOR SELECT USING (true);
        CREATE POLICY "Insert access visitors" ON visitors
          FOR INSERT WITH CHECK (true);
        CREATE POLICY "Insert access messages" ON messages
          FOR INSERT WITH CHECK (true);
        CREATE POLICY "Read approved messages" ON messages
          FOR SELECT USING (is_approved = true OR auth.role() = 'admin');
    `,
    apiEndpoint: import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co",
    apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key",
    // 获取访客IP地址
    getVisitorIp: async () => {
      const ipApis = [
        'https://ipapi.co/json/',
        'https://ipinfo.io/json'
      ];
      
      for (const api of ipApis) {
        try {
          const response = await fetch(api);
          const data = await response.json();
          return data.ip || data.ipAddress;
        } catch (error) {
          console.warn(`从${api}获取IP失败:`, error);
        }
      }
      return 'unknown';
    },

    // 记录访客信息
    recordVisitor: async (userAgent: string) => {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );
      
      try {
        const ip = await weddingData.supabaseConfig.getVisitorIp();
      const { error } = await supabase
        .from('visitors')
          .insert({ 
            ip_address: ip,
            user_agent: userAgent 
          });
      
        if (error) {
          console.error('记录访客失败:', error);
          throw error;
        }
        return ip;
      } catch (error) {
        console.error('记录访客信息时发生错误:', error);
        // 即使失败也返回unknown以便继续流程
        return 'unknown';
      }
    },
    // 获取最近访客
    getRecentVisitors: async (limit = 5) => {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );
      const { data, error } = await supabase
        .from('visitors')
        .select('ip_address, visit_time')
        .order('visit_time', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error('获取访客记录失败:', error);
        return [];
      }
      return data || [];
    },

    // 获取总访问量
   const getTotalVisits = async () => {
  const { data, error } = await supabase
    .from('visitors')
    .select('*', { count: 'exact', head: true });
  console.log('获取总访问量:', data, error);
  if (error) {
    console.error('计数查询失败:', error);
    // 备用查询：获取全部记录后计算长度
    const { data: fullData, error: altError } = await supabase
      .from('visitors')
      .select('id');
      
    return altError ? 0 : fullData.length;
  }
  return data?.count || 0; // 显式访问data.count
},

    // 生成个性化邀请链接的函数
    generateInviteLink: (name: string) => `/guest/${name}-invite`,
    getAllGuestLinks: async () => {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );
      const { data, error } = await supabase
        .from('guests')
        .select('name, table_number');
      
      if (error) throw error;
      
      return data?.map(guest => ({
         name: guest.name,
         tableNumber: guest.table_number,
         link: `/guest/${guest.name}-invite`
      })) || [];
    },
    
    // 获取留言
    getMessages: async () => {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    // 添加留言
    addMessage: async (name: string, content: string, emoji?: string) => {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );
      const { data, error } = await supabase
        .from('messages')
        .insert({ 
          name, 
          content, 
          emoji,
          is_approved: true // 新留言默认未审核
        });
      
      if (error) throw error;
      return data;
    },
    
    // 获取已审核留言
    getApprovedMessages: async () => {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );
      console.log('执行getApprovedMessages查询...');
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('获取已审核留言失败:', error);
        throw error;
      }
      console.log('成功获取已审核留言:', data);
      return data || [];
    }
  },
  
  // 高德地图配置
  amapConfig: {
    key: import.meta.env.VITE_AMAP_KEY || "您的高德地图key",
    version: "2.0",
    plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.HawkEye", "AMap.ControlBar"],
    center: [120.384428, 36.06623], // 青岛瑞吉酒店坐标
    zoom: 15,
    minZoom: 10,
    maxZoom: 18
  }

};
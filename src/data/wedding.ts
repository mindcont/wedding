import { createClient } from '@supabase/supabase-js';
// 本地图片资源路径
const localImagePath = (filename: string) =>
  `/assets/img/${filename}`;

export const weddingData = {
  coupleName: "张正轩 & 李梦",
  weddingDate: "2025年6月28日",
  weddingDetails: {
    date: "2025年6月28日 （农历六月初四）",
    time: "中午12点",
    location: "菏泽郓城县",
    address: "山东省菏泽市郓城县丽都大酒店"
  },
  mapData: {
    lat: 36.06623,
    lng: 120.384428,
    marker: {
      icon: localImagePath('maker2.png')
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
      url: localImagePath('1.webp'),
      alt: "海边日落婚纱照"
    },
    {
      id: "2",
      url: localImagePath('2.webp'),
      alt: "欧式建筑婚纱照"
    },
    {
      id: "3",
      url: localImagePath('3.webp'),
      alt: "森林主题婚纱照"
    },
    {
      id: "4",
      url: localImagePath('4.webp'),
      alt: "城市夜景婚纱照"
    },
    {
      id: "5",
      url: localImagePath('5.webp'),
      alt: "中式传统婚纱照"
    },
    {
      id: "6",
      url: localImagePath('6.webp'),
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
    url: localImagePath('featured.webp'),
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
    getTotalVisits: async () => {
      const supabase = createClient(
        weddingData.supabaseConfig.apiEndpoint,
        weddingData.supabaseConfig.apiKey
      );
      try {
        console.log('开始执行总访问量查询...');
        // 方案2: 精确计数
        const { data, error: altError } = await supabase
          .from('visitors')
          .select('*', { count: 'exact' });

        if (!altError) {
          console.log('查询总访问量成功，返回记录数:', data?.length || 0);
          return data?.length || 0;
        }
        console.error('查询总访问量失败:', altError);
        // 所有方案都失败时返回0
        return 0;
      } catch (err) {
        console.error('获取总访问量时发生异常:', err);
        return 0;
      }
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
    center: [115.93413676285013, 35.610928105788716], // 青岛瑞吉酒店坐标
    zoom: 15,
    minZoom: 10,
    maxZoom: 18
  }

};
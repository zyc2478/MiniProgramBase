App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    cart: [],
    categories: [
      { id: 'cat1', name: '人气热销', icon: '🔥' },
      { id: 'cat2', name: '美味汉堡', icon: '🍔' },
      { id: 'cat3', name: '香脆炸鸡', icon: '🍗' },
      { id: 'cat4', name: '经典小食', icon: '🍟' },
      { id: 'cat5', name: '甜点饮品', icon: '🥤' },
      { id: 'cat6', name: '超值全家桶', icon: '🧺' }
    ],
    foods: [
      // 汉堡类
      { id: 'f101', categoryId: 'cat2', isPopular: true, name: '至尊和牛汉堡', price: 58, memberPrice: 48, originalPrice: 78, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', desc: '澳洲进口和牛，搭配特制芝士酱，口感醇厚。' },
      { id: 'f102', categoryId: 'cat2', isPopular: true, name: '双层芝士牛肉堡', price: 42, memberPrice: 35, originalPrice: 48, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', desc: '双层多汁牛肉饼，浓郁芝士，满足感爆棚。' },
      { id: 'f103', categoryId: 'cat2', name: '板烧鸡腿堡', price: 32, memberPrice: 28, originalPrice: 38, image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400', desc: '整块无骨鸡腿排，肉质鲜嫩，原汁原味。' },
      
      // 炸鸡类
      { id: 'f201', categoryId: 'cat3', isPopular: true, name: '黄金香脆鸡腿', price: 22, memberPrice: 18, originalPrice: 28, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400', desc: '秘制腌料，外皮酥脆，内里肉汁饱满。' },
      { id: 'f202', categoryId: 'cat3', name: '新奥尔良烤翅', price: 19, memberPrice: 16, originalPrice: 24, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400', desc: '甜辣入入味，火候恰到好处。' },
      { id: 'f203', categoryId: 'cat3', name: '天乐鸡', price: 28, memberPrice: 22, originalPrice: 35, image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?w=400', desc: '招牌天乐鸡，大块吃肉，鲜嫩多汁。' },
      
      // 小食类
      { id: 'f301', categoryId: 'cat4', isPopular: true, name: '劲爆鸡米花', price: 18, memberPrice: 15, originalPrice: 22, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400', desc: '外焦里嫩，颗颗劲爆。' },
      { id: 'f302', categoryId: 'cat4', name: '大份黄金薯条', price: 16, memberPrice: 12, originalPrice: 20, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', desc: '精选土豆，外脆里嫩，热气腾腾。' },
      { id: 'f303', categoryId: 'cat4', name: '美味脆饼', price: 14, memberPrice: 10, originalPrice: 18, image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=400', desc: '金黄酥脆，口感丰富。' },
      { id: 'f304', categoryId: 'cat4', name: '葡式蛋挞', price: 9, memberPrice: 6, originalPrice: 12, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', desc: '层层酥脆，奶香浓郁。' },
      
      // 饮品类
      { id: 'f401', categoryId: 'cat5', isPopular: true, name: '雪顶咖啡', price: 25, memberPrice: 19, originalPrice: 30, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400', desc: '经典咖啡搭配香甜冰淇淋雪顶。' },
      { id: 'f402', categoryId: 'cat5', name: '美式咖啡', price: 18, memberPrice: 15, originalPrice: 24, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', desc: '甄选咖啡豆，香气浓郁。' },
      { id: 'f403', categoryId: 'cat5', name: '青蔗冰饮', price: 16, memberPrice: 12, originalPrice: 20, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', desc: '清甜青蔗，解腻必备。' },
      { id: 'f404', categoryId: 'cat5', name: '甜橙芒果', price: 28, memberPrice: 22, originalPrice: 32, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400', desc: '新鲜甜橙与芒果的完美融合。' },
      { id: 'f405', categoryId: 'cat5', name: '冰镇可乐', price: 8, memberPrice: 5, originalPrice: 10, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', desc: '气泡充足，酷爽解腻。' },

      // 套餐桶
      { id: 'f601', categoryId: 'cat6', isPopular: true, name: '天享桶', price: 99, memberPrice: 79, originalPrice: 158, image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400', desc: '超值天享桶，包含汉堡、炸鸡、薯条与可乐，全家共享。' }
    ]
  }
})

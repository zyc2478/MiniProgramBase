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
      { id: 'cat1', name: '超值套餐', icon: '🍱' },
      { id: 'cat2', name: '美味汉堡', icon: '🍔' },
      { id: 'cat3', name: '香脆炸鸡', icon: '🍗' },
      { id: 'cat4', name: '经典小食', icon: '🍟' },
      { id: 'cat5', name: '甜点饮品', icon: '🥤' }
    ],
    foods: [
      // 汉堡类
      { id: 'f101', categoryId: 'cat2', name: '至尊和牛汉堡', price: 48, originalPrice: 68, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', desc: '澳洲进口和牛，搭配特制芝士酱，口感醇厚。' },
      { id: 'f102', categoryId: 'cat2', name: '双层芝士牛肉堡', price: 38, originalPrice: 45, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', desc: '双层多汁牛肉饼，浓郁芝士，满足感爆棚。' },
      { id: 'f103', categoryId: 'cat2', name: '板烧鸡腿堡', price: 28, originalPrice: 32, image: 'https://images.unsplash.com/photo-1513185158878-8d8c196b3c6c?w=400', desc: '整块无骨鸡腿排，肉质鲜嫩，原汁原味。' },
      
      // 炸鸡类
      { id: 'f201', categoryId: 'cat3', name: '黄金香脆鸡腿', price: 18, originalPrice: 22, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400', desc: '秘制腌料，外皮酥脆，内里肉汁饱满。' },
      { id: 'f202', categoryId: 'cat3', name: '新奥尔良烤翅', price: 16, originalPrice: 20, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400', desc: '甜辣入味，火候恰到好处。' },
      { id: 'f203', categoryId: 'cat3', name: '上校黄金鸡块', price: 12, originalPrice: 15, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400', desc: '一口一个，搭配番茄酱或甜辣酱。' },
      
      // 小食类
      { id: 'f301', categoryId: 'cat4', name: '大份黄金薯条', price: 15, originalPrice: 18, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', desc: '精选土豆，外脆里嫩，热气腾腾。' },
      { id: 'f302', categoryId: 'cat4', name: '葡式蛋挞', price: 8, originalPrice: 10, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', desc: '层层酥脆，奶香浓郁。' },
      { id: 'f303', categoryId: 'cat4', name: '香甜玉米杯', price: 10, originalPrice: 12, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400', desc: '清甜爽口，健康搭配。' },
      
      // 饮品类
      { id: 'f401', categoryId: 'cat5', name: '冰镇可乐', price: 6, originalPrice: 8, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', desc: '气泡充足，酷爽解腻。' },
      { id: 'f402', categoryId: 'cat5', name: '鲜榨橙汁', price: 18, originalPrice: 22, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400', desc: '100%新鲜橙汁，富含维C。' },
      { id: 'f403', categoryId: 'cat5', name: '珍珠奶茶', price: 15, originalPrice: 18, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400', desc: 'Q弹珍珠，浓郁茶香。' }
    ]
  }
})

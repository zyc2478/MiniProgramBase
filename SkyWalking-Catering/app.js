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
      { id: '1', name: '人气热销', icon: '🔥' },
      { id: '2', name: '超值套餐', icon: '🍱' },
      { id: '3', name: '汉堡小食', icon: '🍔' },
      { id: '4', name: '甜点饮品', icon: '🥤' }
    ],
    foods: [
      { id: '101', categoryId: '3', name: '至尊和牛汉堡', price: 48, originalPrice: 68, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', desc: '澳洲进口和牛，多汁鲜嫩' },
      { id: '102', categoryId: '3', name: '黄金香脆薯条', price: 15, originalPrice: 20, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', desc: '精选土豆，外脆里糯' },
      { id: '103', categoryId: '3', name: '香辣脆皮鸡腿', price: 18, originalPrice: 22, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400', desc: '经典香辣，鲜嫩多汁' },
      { id: '104', categoryId: '3', name: '蜜汁新奥尔良鸡翅', price: 16, originalPrice: 20, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400', desc: '秘制酱料，甜而不腻' },
      { id: '105', categoryId: '3', name: '上校黄金鸡块', price: 12, originalPrice: 15, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400', desc: '香脆可口，一口一个' },
      { id: '106', categoryId: '4', name: '葡式蛋挞', price: 8, originalPrice: 10, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', desc: '层层酥脆，奶香浓郁' },
      { id: '107', categoryId: '4', name: '冰镇可乐', price: 6, originalPrice: 8, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', desc: '劲爽气泡，酷爽一夏' }
    ]
  }
})

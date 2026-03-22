const app = getApp()

Page({
  data: {
    featuredFoods: []
  },

  onLoad() {
    const allFoods = app.globalData.foods;
    // 随机选4个作为精选
    const featured = allFoods.slice(0, 4);
    this.setData({
      featuredFoods: featured
    });
  },

  goToMenu() {
    wx.switchTab({
      url: '/pages/menu/menu'
    });
  }
})

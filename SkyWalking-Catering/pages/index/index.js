const app = getApp()

Page({
  data: {
    categories: [],
    promoFoods: []
  },

  onLoad() {
    this.setData({
      categories: app.globalData.categories,
      // 取前3个作为促销商品
      promoFoods: app.globalData.foods.slice(0, 3)
    })
  },

  goToMenu(e) {
    const categoryId = e.currentTarget.dataset.id;
    // 切换到菜单页并传递分类ID
    wx.setStorageSync('selectedCategoryId', categoryId);
    wx.switchTab({
      url: '/pages/menu/menu'
    });
  },

  addToCart(e) {
    const item = e.currentTarget.dataset.item;
    let cart = app.globalData.cart;
    const index = cart.findIndex(i => i.id === item.id);
    
    if (index > -1) {
      cart[index].count++;
    } else {
      cart.push({ ...item, count: 1 });
    }
    
    app.globalData.cart = cart;
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  }
})

const app = getApp()

Page({
  data: {
    categories: [],
    activeCategoryId: '',
    activeCategoryName: '',
    currentFoods: [],
    totalCount: 0,
    totalPrice: 0,
    totalDiscount: 0,
    showCartDetail: false,
    cartItems: []
  },

  onLoad() {
    this.setData({
      categories: app.globalData.categories
    });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    // 默认选择第一个分类 (人气热销)
    if (!this.data.activeCategoryId) {
      this.selectCategory({ currentTarget: { dataset: { id: this.data.categories[0].id } } });
    }
    this.updateCartStatus();
  },

  selectCategory(e) {
    const id = e.currentTarget.dataset.id;
    const category = this.data.categories.find(c => c.id === id);
    this.setData({
      activeCategoryId: id,
      activeCategoryName: category.name
    });
    this.refreshCurrentFoods();
  },

  refreshCurrentFoods() {
    const allFoods = app.globalData.foods;
    const cart = app.globalData.cart;
    
    let filteredFoods = [];
    if (this.data.activeCategoryId === 'cat1') {
      // 人气热销：筛选标记为 popular 的商品
      filteredFoods = allFoods.filter(f => f.isPopular);
    } else {
      // 其他分类：按 categoryId 筛选
      filteredFoods = allFoods.filter(f => f.categoryId === this.data.activeCategoryId);
    }

    const currentFoods = filteredFoods.map(f => {
      const cartItem = cart.find(ci => ci.id === f.id);
      return { ...f, count: cartItem ? cartItem.count : 0 };
    });

    this.setData({ currentFoods });
  },

  changeCount(e) {
    const { id, delta } = e.currentTarget.dataset;
    const d = parseInt(delta);
    let cart = app.globalData.cart;
    const allFoods = app.globalData.foods;
    
    const cartIndex = cart.findIndex(i => i.id === id);
    
    if (d > 0) {
      if (cartIndex > -1) {
        cart[cartIndex].count++;
      } else {
        const food = allFoods.find(f => f.id === id);
        cart.push({ ...food, count: 1 });
      }
    } else {
      if (cartIndex > -1) {
        cart[cartIndex].count--;
        if (cart[cartIndex].count <= 0) {
          cart.splice(cartIndex, 1);
        }
      }
    }

    app.globalData.cart = cart;
    this.refreshCurrentFoods();
    this.updateCartStatus();
  },

  updateCartStatus() {
    const cart = app.globalData.cart;
    let totalCount = 0;
    let totalPrice = 0;
    let totalDiscount = 0;

    cart.forEach(item => {
      totalCount += item.count;
      // 模拟会员逻辑：如果商品有会员价，则按会员价计算
      const actualPrice = item.memberPrice || item.price;
      totalPrice += item.count * actualPrice;
      
      if (item.originalPrice) {
        totalDiscount += item.count * (item.originalPrice - actualPrice);
      }
    });

    this.setData({
      totalCount,
      totalPrice,
      totalDiscount,
      cartItems: cart
    });

    if (totalCount === 0) {
      this.setData({ showCartDetail: false });
    }
  },

  toggleCartDetail() {
    if (this.data.totalCount > 0) {
      this.setData({ showCartDetail: !this.data.showCartDetail });
    }
  },

  clearCart() {
    wx.showModal({
      title: '提示',
      content: '确定清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.cart = [];
          this.refreshCurrentFoods();
          this.updateCartStatus();
        }
      }
    });
  },

  onCheckout() {
    if (this.data.totalCount === 0) return;
    
    wx.showLoading({ title: '准备结算...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '天行会员结算',
        content: `您已享受会员优惠！\n实付金额：￥${this.data.totalPrice}\n请确认支付？`,
        success: (res) => {
          if (res.confirm) {
            wx.showToast({ title: '支付成功！', icon: 'success' });
            app.globalData.cart = [];
            this.refreshCurrentFoods();
            this.updateCartStatus();
          }
        }
      });
    }, 800);
  }
})

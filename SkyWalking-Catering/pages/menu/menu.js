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
    // 默认选择第一个分类
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
    const currentFoods = allFoods
      .filter(f => f.categoryId === this.data.activeCategoryId)
      .map(f => {
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
      totalPrice += item.count * item.price;
      if (item.originalPrice) {
        totalDiscount += item.count * (item.originalPrice - item.price);
      }
    });

    this.setData({
      totalCount,
      totalPrice,
      totalDiscount,
      cartItems: cart
    });

    // 如果购物车空了，关闭详情弹窗
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
        title: '支付确认',
        content: `总计：￥${this.data.totalPrice}\n请确认下单？`,
        success: (res) => {
          if (res.confirm) {
            wx.showToast({ title: '下单成功！', icon: 'success' });
            app.globalData.cart = [];
            this.refreshCurrentFoods();
            this.updateCartStatus();
          }
        }
      });
    }, 800);
  }
})

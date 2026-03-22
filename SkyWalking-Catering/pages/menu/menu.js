const app = getApp()

Page({
  data: {
    categories: [],
    activeCategoryId: '',
    activeCategoryName: '',
    currentFoods: [],
    totalCount: 0,
    totalPrice: 0
  },

  onLoad() {
    this.setData({
      categories: app.globalData.categories
    });
  },

  onShow() {
    // 检查是否有从首页跳转过来的分类ID
    const selectedId = wx.getStorageSync('selectedCategoryId') || this.data.categories[0].id;
    this.selectCategory({ currentTarget: { dataset: { id: selectedId } } });
    wx.removeStorageSync('selectedCategoryId');
    this.updateCartStatus();
  },

  selectCategory(e) {
    const id = e.currentTarget.dataset.id;
    const category = this.data.categories.find(c => c.id === id);
    const allFoods = app.globalData.foods;
    const cart = app.globalData.cart;

    // 过滤出当前分类的商品，并同步购物车数量
    const currentFoods = allFoods
      .filter(f => f.categoryId === id)
      .map(f => {
        const cartItem = cart.find(ci => ci.id === f.id);
        return { ...f, count: cartItem ? cartItem.count : 0 };
      });

    this.setData({
      activeCategoryId: id,
      activeCategoryName: category.name,
      currentFoods: currentFoods
    });
  },

  changeCount(e) {
    const { id, delta } = e.currentTarget.dataset;
    const d = parseInt(delta);
    let cart = app.globalData.cart;
    const foodIndex = this.data.currentFoods.findIndex(f => f.id === id);
    const food = this.data.currentFoods[foodIndex];

    const cartIndex = cart.findIndex(i => i.id === id);
    
    if (d > 0) {
      if (cartIndex > -1) {
        cart[cartIndex].count++;
      } else {
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
    
    // 更新当前页面的商品显示数量
    const newCount = (food.count || 0) + d;
    this.setData({
      [`currentFoods[${foodIndex}].count`]: newCount > 0 ? newCount : 0
    });

    this.updateCartStatus();
  },

  updateCartStatus() {
    const cart = app.globalData.cart;
    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      totalCount += item.count;
      totalPrice += item.count * item.price;
    });

    this.setData({
      totalCount,
      totalPrice
    });
  },

  goToSettle() {
    wx.showLoading({ title: '准备结算...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '支付功能正在开发中，总金额：￥' + this.data.totalPrice,
        showCancel: false
      });
    }, 1000);
  }
})

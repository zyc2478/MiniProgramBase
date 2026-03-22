const app = getApp()

Page({
  data: {
    order: null
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
    
    // 获取最新订单
    if (app.globalData.lastOrder) {
      this.setData({
        order: app.globalData.lastOrder
      });
    }
  },

  onRefresh() {
    wx.showLoading({ title: '刷新中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '状态已更新', icon: 'none' });
    }, 500);
  },

  onContact() {
    wx.makePhoneCall({
      phoneNumber: '400-123-4567',
      fail: () => {
        wx.showModal({
          title: '联系商家',
          content: '请拨打客服电话：400-123-4567',
          showCancel: false
        });
      }
    });
  }
})

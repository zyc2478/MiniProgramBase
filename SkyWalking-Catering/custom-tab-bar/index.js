Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#ff4d4f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "🏠",
      text: "首页"
    }, {
      pagePath: "/pages/menu/menu",
      iconPath: "🍱",
      text: "点餐"
    }, {
      pagePath: "/pages/me/me", // Placeholder for VIP, will handle special click
      text: "会员卡"
    }, {
      pagePath: "/pages/order/order",
      iconPath: "📋",
      text: "订单"
    }, {
      pagePath: "/pages/me/me",
      iconPath: "👤",
      text: "我的"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const index = data.index
      if (index === 2) {
        // Handle special VIP button click
        wx.showToast({
          title: '会员中心开发中',
          icon: 'none'
        })
        return
      }
      wx.switchTab({url})
    }
  }
})

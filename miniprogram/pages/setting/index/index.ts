// pages/setting/index/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarTheme: "默认配色",
    mainVibrate: false,
    mainCache: ""
  },

  onShow() {
    this.initCalendarSettings()
    this.initMainSettings()
  },

  goBack() {
    wx.navigateBack()
  },

  goCalendarTheme() {
    wx.navigateTo({
      url: "../theme/theme"
    })
  },

  goCalendarBackground() {
    wx.navigateTo({
      url: "../background/background"
    })
  },

  handleVibrate(e: any) {
    this.setData({ mainVibrate: e.detail.value })
    if(e.detail.value) {
      wx.setStorageSync("settingVibrate", true)
    } else {
      wx.removeStorageSync("settingVibrate")
    }
  },

  handleClearCache() {
    wx.showModal({
      title: "系统提示",
      content: "您确定要清空缓存吗？该操作会丢失您的登录状态和所有设置！！！",
      success(res) {
        if(res.confirm) {
          wx.clearStorageSync()
          wx.showToast({
            title: "清空成功",
            icon: "success",
            duration: 1000
          })
          setTimeout(() => {
            wx.reLaunch({
              url: "../../user/user"
            })
          }, 1000);
        }
      }
    })
  },

  initCalendarSettings() {
    // 主题配色
    if(wx.getStorageSync("calendarThemes").length > 0 && wx.getStorageSync("calendarThemesSelected") != 0) {
      this.setData({ calendarTheme: wx.getStorageSync("calendarThemes")[wx.getStorageSync("calendarThemesSelected") - 1].title })
    } else {
      this.setData({ calendarTheme: "默认配色" })
    }

    // 主题背景
  },

  initMainSettings() {
    let _this = this
    // 交互震动
    if(wx.getStorageSync("settingVibrate")) {
      this.setData({ mainVibrate: true })
    }

    // 缓存占用
    this.setData({ mainCache: wx.getStorageInfoSync().currentSize.toString() })
  }
})
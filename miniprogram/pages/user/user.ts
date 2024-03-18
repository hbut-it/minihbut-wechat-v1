// pages/user/user.ts
import { decode } from "js-base64"
import { apiGetUserInfo, apiCheckToken, apiRefreshToken, apiRenewUserInfo, apiRenewAuth } from "../../api/user"

Page({
  data: {
    isLogin: false,
    loaded: false
  },
  
  onShow() {
    this.getTabBar().init()
    this.checkToken()
  },

  openLoginPage() {
    wx.navigateTo({
      url:"/pages/login/login"
    })
  },

  openAboutPage() {
    wx.navigateTo({
      url:"/pages/about/about"
    })
  },

  async doLogout() {
    const jwxtLoginInfo = await wx.getStorageSync("jwxtLoginInfo")
    wx.clearStorageSync() // 清空本地储存
    wx.setStorageSync("jwxtLoginInfo", jwxtLoginInfo)
    wx.showToast({
      title: "退出成功",
      icon: "success",
      duration: 1000
    })
    setTimeout(() => {
      wx.reLaunch({
        url: "../user/user"
      })
    }, 1000)
  },

  async checkToken() {
    // 本地储存是否存在token
    if (!wx.getStorageSync("tokenHead") && !wx.getStorageSync("token")) {
      this.setData({ loaded: true })
      return
    }
    const res = await apiCheckToken()
    // token已过期
    if (res.code != 200) {
      const loginInfo = wx.getStorageSync("jwxtLoginInfo")
      wx.clearStorageSync()
      wx.setStorageSync("jwxtLoginInfo", loginInfo)
      wx.showToast({
        title: "登录已过期",
        icon: "error",
        duration: 1000
      })
      this.setData({ loaded: true })
      return
    }
    
    // token未过期进行续期
    this.doRefreshToken()

    // 设置登录状态
    this.setData({ isLogin: true })
    this.getUserInfo()
    this.setData({ loaded: true })
  },

  async doRefreshToken() {
    const res = await apiRefreshToken()
    if (res.code === 200) {
      wx.setStorageSync("token", res.data) // 重置token
    }
  },

  async getUserInfo() {
    const info = wx.getStorageSync("studentInfo")
    this.setData({ studentInfo: info })
    const res = await apiGetUserInfo()
    if (res.code === 200 && info != res.data) {
      wx.setStorageSync("studentInfo", res.data)
      this.setData({ studentInfo: res.data })
    }
    if (res.code != 200) {
      wx.showToast({
        title: "用户信息更新失败",
        icon: "error"
      })
    }
  },

  openThemePage() {
    wx.showToast({
      title: "该功能升级改造中",
      icon: "none"
    })
  },

  async renewUserInfo() {
    wx.showLoading({ title: "刷新中" })
    const res = await apiRenewUserInfo()
    wx.hideLoading()
    if (res.code === 400) {
      const loginInfo = wx.getStorageSync("jwxtLoginInfo")
      const spider = await apiRenewAuth(JSON.parse(decode(loginInfo)))
      if (spider.code === 200) {
        this.renewUserInfo()
        return
      }
      wx.clearStorageSync()
      wx.setStorageSync("jwxtLoginInfo", loginInfo)
      wx.showToast({
        title: "登录已过期",
        icon: "error",
        duration: 1000
      })
      return
    }
    if (res.code === 200) {
      this.setData({ studentInfo: res.data })
      wx.setStorageSync("studentInfo", res.data)
      wx.showToast({
        title: "刷新成功",
        icon: "success",
        duration: 1000
      })
      setTimeout(() => {
        wx.switchTab({
          url: "../../user/user"
        })
      }, 1000);
      return
    }
    wx.showToast({
      title: "刷新失败",
      icon: "error"
    })
  }
})
// pages/user/user.ts
import { apiGetUserInfo, apiCheckToken, apiRefreshToken } from "../../api/user"

Page({
  data: {
    isLogin: false,
    loaded: false
  },
  
  onShow () {
    this.checkToken()
  },

  openLoginPage () {
    wx.navigateTo({
      url:"/pages/login/login"
    })
  },

  openAboutPage () {
    wx.navigateTo({
      url:"/pages/about/about"
    })
  },

  doLogout () {
    wx.clearStorageSync()
    wx.showToast({
      title: "退出成功",
      icon: "success",
      duration: 1000
    })
    setTimeout(() => {
      wx.reLaunch({
        url: "../user/user"
      })
    }, 1000);
  },

  async checkToken () {
    // 本地储存是否存在token
    if (!wx.getStorageSync("tokenHead") && !wx.getStorageSync("token")) {
      this.setData({ loaded: true })
      return
    }
    const res = await apiCheckToken()
    // token已过期
    if (res.code != 200) {
      wx.clearStorageSync()
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

  async doRefreshToken () {
    const res = await apiRefreshToken()
    if (res.code === 200) {
      wx.setStorageSync("token", res.data) // 重置token
    }
  },

  async getUserInfo () {
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

  openFeedbackPage () {
    wx.openEmbeddedMiniProgram({
      appId: "wx8abaf00ee8c3202e",
      extraData :{
        id : "598009"
      }
    })
  },
})
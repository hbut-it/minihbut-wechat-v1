// pages/index/index.ts
import { encode } from "js-base64"
import { apiGetIndexNotice, apiGetIndexSwipers } from "../../api/common"
import { apiCheckToken, apiRefreshToken } from "../../api/user"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: [{}],
    notice: {
      visible: false,
      theme: "",
      content: ""
    },
    noticeLoaded: false,
    isLogin: false
  },

  onShow() {
    this.getNotice()
    this.getSwipers()
    this.checkToken()
  },

  async getNotice () {
    const res = await apiGetIndexNotice()
    this.setData({ noticeLoaded: true })
    if (res.code === 200) {
      this.setData({ notice: res.data })
      return
    }
    wx.showToast({
      title: "公告获取错误",
      icon: "error",
      duration: 1000
    })
  },

  async getSwipers () {
    const res = await apiGetIndexSwipers()
    if (res.code === 200) {
      this.setData({ swiper: res.data })
      return
    }
    wx.showToast({
      title: "轮播图获取错误",
      icon: "error",
      duration: 1000
    })
  },

  goReport () {
    if (!this.data.isLogin) {
      wx.showModal({
        title: "系统提示",
        content: "您暂未登录教务系统，无法查看相关内容，是否前往登录",
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../login/login"
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: "../report/report"
    })
  },

  goRank () {
    if (!this.data.isLogin) {
      wx.showModal({
        title: "系统提示",
        content: "您暂未登录教务系统，无法查看相关内容，是否前往登录",
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../login/login"
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: "../rank/rank"
    })
  },

  goExam () {
    if (!this.data.isLogin) {
      wx.showModal({
        title: "系统提示",
        content: "您暂未登录教务系统，无法查看相关内容，是否前往登录",
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../login/login"
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: "../exam/exam"
    })
  },

  goClassroom () {
    wx.navigateTo({
      url: "../classroom/classroom"
    })
  },

  async checkToken() {
    // 本地储存是否存在token
    if (!wx.getStorageSync("tokenHead") && !wx.getStorageSync("token")) {
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
      return
    }

    // token未过期进行续期
    this.doRefreshToken()

    // 设置登录状态
    this.setData({ isLogin: true })
  },

  async doRefreshToken() {
    const res = await apiRefreshToken()
    if (res.code === 200) {
      wx.setStorageSync("token", res.data) // 重置token
    }
  },

  goExtraUrl (e: any) {
    if (!e.currentTarget.dataset.url) { return }
    wx.navigateTo({
      url: "../extra/extra?title=" + e.currentTarget.dataset.title + "&url=" + encode(e.currentTarget.dataset.url)
    })
  }
})
// pages/rank/rank.ts
import { decode } from "js-base64"
import { apiGetTermsAll } from "../../api/common"
import { apiGetRank, apiRefreshRank } from "../../api/main"
import { apiRenewAuth } from "../../api/user"

Page({
  data: {
    isLoading: true,
    termSelected: "",
    rankData: {},
    termValue: 0,
    termList: [""]
  },

  onShow () {
    this.getTerm()
  },

  goBack () {
    wx.navigateBack()
  },

  // 获取学期
  async getTerm () {
    const res = await apiGetTermsAll()
    const list = []
    list.push("从入学至今")
    for (const item of res.data) {
      list.push(item)
    }
    this.setData({ termList: list })
    this.getRank("001")
  },

  handleTermChange(e: any) {
    console.log(e)
    this.setData({ termValue: e.detail.value })
    let term = ""
    if(e.detail.value === "0") {
      term = "001"
    } else {
      term = this.data.termList[e.detail.value]
    }
    this.getRank(term)
  },

  // 获取排名
  async getRank (term: string) {
    wx.showLoading({ title: "加载中" })
    const res = await apiGetRank({ xnxq: term })
    wx.hideLoading()
    if (res.code === 400) {
      const loginInfo = wx.getStorageSync("jwxtLoginInfo")
      const spider = await apiRenewAuth(JSON.parse(decode(loginInfo)))
      if (spider.code === 200) {
        this.getRank(term)
        return
      }
      wx.clearStorageSync()
      wx.setStorageSync("jwxtLoginInfo", loginInfo)
      wx.showToast({
        title: "登录已过期",
        icon: "error",
        duration: 1000
      })
      setTimeout(() => {
        wx.reLaunch({
          url: "../user/user"
        })
      }, 1000)
      return
    }
    if (res.code === 200) {
      if (!res.data.arithmeticMeanScore && !res.data.meanScore) {
        res.data.arithmeticMeanScore = "/"
        res.data.meanScore = "/"
      }
      this.setData({
        rankData: res.data,
        isLoading: false
      })
      return
    }
    if (res.code === 400) {
      wx.showToast({
        title: "学期排名不存在",
        icon: "error"
      })
      return
    }
    wx.showToast({
      title: "排名获取失败",
      icon: "error"
    })
  },

  async doRefreshRank () {
    wx.showLoading({ title: "刷新中" })
    let term = ""
    if(this.data.termValue === 0) {
      term = "001"
    } else {
      term = this.data.termList[this.data.termValue]
    }
    const res = await apiRefreshRank({ xnxq: term })
    wx.hideLoading()
    if (res.code === 200) {
      wx.showToast({
        title: "刷新成功",
        icon: "success",
        duration: 1000
      })
      this.setData({ rankData: res.data })
      return
    }
    if (res.code === 400) {
      const loginInfo = wx.getStorageSync("jwxtLoginInfo")
      const spider = await apiRenewAuth(JSON.parse(decode(loginInfo)))
      if (spider.code === 200) {
        this.doRefreshRank()
        return
      }
      wx.clearStorageSync()
      wx.setStorageSync("jwxtLoginInfo", loginInfo)
      wx.showToast({
        title: "登录已过期",
        icon: "error",
        duration: 1000
      })
      setTimeout(() => {
        wx.reLaunch({
          url: "../user/user"
        })
      }, 1000)
      return
    }
    wx.showToast({
      title: "排名刷新失败",
      icon: "error"
    })
  }
})
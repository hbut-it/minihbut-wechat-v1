// pages/rank/rank.ts
import { decode } from "js-base64"
import { apiGetTermsAll } from "../../api/common"
import { apiGetRank, apiRefreshRank } from "../../api/main"
import { apiRenewAuth } from "../../api/user"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    termSelected: "",
    rankData: {}
  },

  onShow () {
    this.getTerm()
  },

  goBack () {
    wx.navigateBack()
  },

  /**
   * 学期获取方法
   */
  async getTerm () {
    const res = await apiGetTermsAll()
    const optionXnxq = []
    optionXnxq.push({ label: "全部", value: "001" })
    for (const item of res.data) {
      optionXnxq.push({ label: item, value: item })
    }
    this.setData({ termOptions: optionXnxq })
    this.setData({ termSelected: optionXnxq[2].value })
    this.getRank(optionXnxq[2].value)
  },

  handleDropdown (e: any) {
    this.setData({
      termSelected: e.detail.value,
      rankData: {},
      isLoading: true
    })
    this.getRank(e.detail.value)
  },

  async getRank (term: string) {
    const res = await apiGetRank({ xnxq: term })
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
    const res = await apiRefreshRank({ xnxq: this.data.termSelected })
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
      const spider = await apiRenewAuth(JSON.parse(decode(wx.getStorageSync("jwxtLoginInfo"))))
      if (spider.code === 200) {
        this.doRefreshRank()
        return
      }
    }
    wx.showToast({
      title: "排名刷新失败",
      icon: "error"
    })
  }
})
// pages/exam/exam.ts
import { decode } from "js-base64"
import { apiGetTermsAll } from "../../api/common"
import { apiGetExam, apiRefreshExam } from "../../api/main"
import { apiRenewAuth } from "../../api/user"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    termSelected: ""
  },

  async onShow() {
    await this.getTerm()
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  /**
   * 学期选择方法
   * @param e
   */
  async handleDropdown (e: any) {
    this.setData({ termSelected: e.detail.value })
    await this.getExam(e.detail.value)
  },

  /**
   * 学期获取方法
   */
  async getTerm () {
    const res = await apiGetTermsAll()
    const optionXnxq = []
    for (const item of res.data) {
      optionXnxq.push({ label: item, value: item })
    }
    this.setData({ termOptions: optionXnxq })
    this.setData({ termSelected: optionXnxq[0].value })
    this.getExam(optionXnxq[0].value)
  },

  /**
   * 考场获取方法
   */
  async getExam (term: string) {
    wx.showLoading({ title: "加载中" })
    const res = await apiGetExam({ xnxq: term })
    wx.hideLoading()
    if (res.code != 200) {
      wx.showToast({
        title: "考场获取失败",
        icon: "error"
      })
      return
    }
    if (res.data.length > 0) {
      this.setData({ examList: res.data })
      return
    }
    wx.showToast({
      title: "暂无考场安排",
      icon: "error"
    })
  },

  async doRefreshExam () {
    wx.showLoading({ title: "刷新中" })
    const res = await apiRefreshExam({ xnxq: this.data.termSelected })
    wx.hideLoading()
    if (res.code === 200) {
      wx.showToast({
        title: "刷新成功",
        icon: "success",
        duration: 1000
      })
      setTimeout(() => {
        this.getExam(this.data.termSelected)
      }, 1000);
      return
    }
    if (res.code === 400) {
      const spider = await apiRenewAuth(JSON.parse(decode(wx.getStorageSync("jwxtLoginInfo"))))
      if (spider.code === 200) {
        this.doRefreshExam()
        return
      }
    }
    wx.showToast({
      title: "考场刷新失败",
      icon: "error"
    })
  }
})
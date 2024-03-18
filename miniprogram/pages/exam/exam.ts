// pages/exam/exam.ts
import { decode } from "js-base64"
import { apiGetTermsAll } from "../../api/common"
import { apiGetExam, apiRefreshExam } from "../../api/main"
import { apiRenewAuth } from "../../api/user"

Page({
  data: {
    termList: {},
    termSelected: "",
    termValue: 0,
    isEmpty: false
  },

  // 初始化
  async onShow() {
    await this.getTerm()
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 获取学期列表
  async getTerm () {
    const res = await apiGetTermsAll()
    this.setData({
      termList: res.data,
      termSelected: res.data[0]
    })
    this.getExam(res.data[0])
  },

  // 选择学期
  async handleTermChange(e: any) {
    this.setData({
      termSelected: this.data.termList[e.detail.value],
      termValue: e.detail.value
    })
    this.getExam(this.data.termList[e.detail.value])
  },

  // 获取考场信息
  async getExam (term: string) {
    this.setData({
      examList: [],
      isEmpty: false
    })
    wx.showLoading({ title: "加载中" })
    const res = await apiGetExam({ xnxq: term })
    wx.hideLoading()
    if (res.code === 400) {
      const loginInfo = wx.getStorageSync("jwxtLoginInfo")
      const spider = await apiRenewAuth(JSON.parse(decode(loginInfo)))
      if (spider.code === 200) {
        this.getExam(term)
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
      if (res.data.length === 0) {
        this.setData({ isEmpty: true })
        return
      }
      const data = this.praseExam(res.data)
      this.setData({ examList: data })
      return
    }
    if (res.code === 404) {
      this.setData({ isEmpty: true })
      return
    }
    wx.showToast({
      title: "考场获取失败",
      icon: "error"
    })
  },

  // 刷新考场信息
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
      const loginInfo = wx.getStorageSync("jwxtLoginInfo")
      const spider = await apiRenewAuth(JSON.parse(decode(loginInfo)))
      if (spider.code === 200) {
        this.doRefreshExam()
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
      title: "考场刷新失败",
      icon: "error"
    })
  },

  // 格式化考场信息
  praseExam (data: API.ExamResult) {
    const arr = []
    for(const item of data) {
      const day = item.ksTime.split(" ")[0]
      const endTime = item.ksTime.split("~")[1]
      const examDate = new Date(day + " " + endTime + ":00").getTime()
      let isEnded = false
      if (examDate < (new Date().getTime())) {
        isEnded = true
      }
      const newData = {
        dataXnxq: item.dataXnxq,
        ksFs: item.ksFs,
        ksLocation: item.ksLocation,
        ksName: item.ksName,
        ksPc: item.ksPc,
        ksTime: item.ksTime,
        ksZwh: item.ksZwh,
        isEnded: isEnded
      }
      arr.push(newData)
    }
    return arr
  }
})
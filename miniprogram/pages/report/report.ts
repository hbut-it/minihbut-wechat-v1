// pages/report/report.ts
import { decode } from "js-base64"
import { apiGetTermsAll } from "../../api/common"
import { apiGetRank, apiGetReport, apiRefreshRank, apiRefreshReport } from "../../api/main"
import { apiRenewAuth } from "../../api/user"
import { getKcxz, getKsxs, getXdxz } from "../../utils/reportUtil"

Page({
  data: {
    dialogVisible: false,
    isLoading: true,
    isEmpty: false,
    termSelected: "",
    averageJd: "",
    averagePjf: "",
    dialogShow: []
  },

  onShow () {
    this.getTerm()
  },

  /**
   * 返回上一页
   */
  goBack () {
    wx.navigateBack()
  },

  /**
   * 打开成绩详情
   * @param e
   */
  showDialog (e: any) {
    const arr: any = this.data.reportList.filter(item => item.cjId === e.currentTarget.dataset.cjid)
    this.setData({ dialogShow: arr[0] })
    this.setData({ dialogVisible: true })
  },

  /**
   * 隐藏详情
   */
  hideDialog () {
    this.setData({ dialogVisible: false })
  },

  /**
   * 学期选择方法
   * @param e
   */
  handleDropdown (e: any) {
    this.setData({ termSelected: e.detail.value })
    this.getReport(e.detail.value)
  },

  /**
   * 学期获取方法
   */
  async getTerm () {
    const res = await apiGetTermsAll()
    const optionXnxq = []
    optionXnxq.push({ label: "从入学至今", value: "001" })
    for (const item of res.data) {
      optionXnxq.push({ label: item, value: item })
    }
    this.setData({ termOptions: optionXnxq })
    this.setData({ termSelected: optionXnxq[0].value })
    this.getReport(optionXnxq[0].value)
  },

  /**
   * 成绩获取方法
   */
  async getReport (term: string) {
    this.clearData()
    this.setData({
      isLoading: true,
      isEmpty: false
    })
    wx.showLoading({ title: "加载中" })
    const res = await apiGetReport({ xnxq: term })
    wx.hideLoading()
    if (res.code === 400) {
      const spider = await apiRenewAuth(JSON.parse(decode(wx.getStorageSync("jwxtLoginInfo"))))
      if (spider.code === 200) {
        this.getReport(term)
        return
      }
    }
    if (res.code != 200) {
      wx.showToast({
        title: "成绩获取失败",
        icon: "error"
      })
      return
    }
    if (res.data.studentGrades.length > 0) {
      const emptyList = []
      for (const item of res.data.studentGrades) {
        item.kname = item.kname.replace("（", "(").replace("）", ")")
        item.kcXz = getKcxz(item.kcXz)
        item.ksXs = getKsxs(item.ksXs)
        item.xdXz = getXdxz(item.xdXz)
        if (Number(item.gradePoints) >= 90) {
          item.color = "#27ae60"
        }
        if (Number(item.gradePoints) < 90 && Number(item.gradePoints) >= 60) {
          item.color = "var(--td-brand-color)"
        }
        if (Number(item.gradePoints) < 60) {
          item.color = "#c0392b"
        }
        emptyList.push(item)
      }
      this.setData({
        reportList: emptyList,
        isLoading: false
      })
      this.getAverage(term)
      return
    }
    this.setData({
      isLoading: false,
      averageJd: "/",
      averagePjf: "/",
      isEmpty: true
    })
  },

  /**
   * 清空数据方法
   */
  clearData () {
    this.setData({
      isLoading: false,
      averageJd: "",
      averagePjf: "",
      reportList: []
    })
  },

  async doRefreshReport () {
    wx.showLoading({ title: "刷新中" })
    const res = await apiRefreshReport()
    const _res = await apiRefreshRank({ xnxq: this.data.termSelected })
    wx.hideLoading()
    if (res.code === 200 && _res.code === 200) {
      wx.showToast({
        title: "刷新成功",
        icon: "success",
        duration: 1000
      })
      setTimeout(() => {
        this.onShow()
      }, 1000)
      return
    }
    if (res.code === 400) {
      const spider = await apiRenewAuth(JSON.parse(decode(wx.getStorageSync("jwxtLoginInfo"))))
      if (spider.code === 200) {
        this.doRefreshReport()
        return
      }
    }
    wx.showToast({
      title: "成绩刷新失败",
      icon: "error"
    })
  },
  
  async getAverage (term: string) {
    const res = await apiGetRank({ xnxq: term })
    if (res.code === 200) {
      const score = res.data.meanScore.replace(" ", "")
      const average = res.data.arithmeticMeanScore.replace(" ", "")
      this.setData({
        averageJd: score,
        averagePjf: average
      })
      return
    }
    wx.showToast({
      title: "排名获取失败",
      icon: "error"
    })
  },

  showInfoDialog () {
    wx.showModal({
      title: "提示",
      content: "所有成绩数据均来自教务系统，小程序不参与任何绩点、平均分与成绩的计算。"
    })
  }
})
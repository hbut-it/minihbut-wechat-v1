// pages/statistics/statistics.ts
import dayjs from "dayjs"
import { apiGetStatisticsDetail, apiGetStatisticsList } from "../../api/main"

Page({
  data: {
    empty: true,
    keyword: "",
    list: [],
    dropdownOptions: [
      { label: "按课程名称搜索", value: "1" },
      { label: "按教师姓名搜索", value: "2" }
    ],
    dropdownValue: "1",
    barPlaceholder: "请输入课程名称（回车搜索）",
    popupVisible: false,
    popupValue: {}
  },

  goBack() {
    wx.navigateBack()
  },

  async getLessons(type: string, keyword: string) {
    const res = await apiGetStatisticsList({
      type: type,
      keyword: keyword
    })
    if(res.data.length > 0) {
      this.setData({
        empty: false,
        list: res.data
      })
    } else {
      this.setData({
        empty: true,
        list: []
      })
    }
  },

  async getDetail(name: string, teacher: string) {
    wx.showLoading({ title: "加载中" })
    const res = await apiGetStatisticsDetail({
      kcName: name,
      teacherName: teacher
    })
    wx.hideLoading()
    if(res.code === 404 || res.code === 400) {
      wx.showToast({
        title: "样本数据过少",
        icon: "error",
        duration: 1000
      })
      return
    }
    if(res.code === 200) {
      this.setData({
        popupValue: {
          kcMc: res.data.kcMc,
          teacherName: res.data.teacherName,
          updateDatetime: dayjs(Number(res.data.updateDatetime)).format("YYYY-MM-DD HH:mm:ss"),
          maxGrade: res.data.maxGrade,
          meanGrade: res.data.meanGrade,
          sampleSize: res.data.sampleSize,
          gradesGreaterThan90: this.parsePercentage(res.data.gradesGreaterThan90, res.data.sampleSize),
          gradesBetween80And90: this.parsePercentage(res.data.gradesBetween80And90, res.data.sampleSize),
          gradesBetween70And80: this.parsePercentage(res.data.gradesBetween70And80, res.data.sampleSize),
          gradesBetween60And70: this.parsePercentage(res.data.gradesBetween60And70, res.data.sampleSize),
          gradesLessThan60: this.parsePercentage(res.data.gradesLessThan60, res.data.sampleSize)
        }
      })
      this.setData({
        popupVisible: true
      })
      return
    }
  },

  handleSearch(e: any) {
    if(e.detail.value) {
      this.getLessons(this.data.dropdownValue, e.detail.value)
    } else {
      this.setData({
        empty: true,
        list: []
      })
    }
  },

  handleDropdown(e: any) {
    this.setData({ dropdownValue: e.detail.value })
    if(e.detail.value === "1") {
      this.setData({ barPlaceholder: "请输入课程名称（回车搜索）" })
    } else {
      this.setData({ barPlaceholder: "请输入教师姓名（回车搜索）" })
    }
  },

  onVisibleChange(e: any) {
    this.setData({ popupVisible: e.detail.visible })
  },

  parsePercentage(min: number | string, total: number | string) {
    return (Number(min) / Number(total) * 100).toFixed(2).toString() + "%"
  },

  async handleDetail(e: any) {
    this.getDetail(e.currentTarget.dataset.name, e.currentTarget.dataset.teacher)
  }
})
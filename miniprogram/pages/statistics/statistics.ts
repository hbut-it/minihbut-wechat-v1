// pages/statistics/statistics.ts
import dayjs from "dayjs"
import { apiGetStatisticsDetail, apiGetStatisticsList } from "../../api/main"

Page({
  data: {
    empty: true,
    type: "1",
    typeValue: 0,
    typeList: ["课程", "教师"],
    keyword: "",
    list: [],
    popupVisible: false,
    popupValue: {}
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 获取课程
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

  // 获取课程详情
  async getDetail(name: string, teacher: string) {
    wx.showLoading({ title: "加载中" })
    const res = await apiGetStatisticsDetail({
      kcName: name,
      teacherName: teacher
    })
    wx.hideLoading()
    if(res.code === 404) {
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

  // 执行搜索
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

  // 搜索框输入
  handleInput(e: any) {
    this.setData({ keyword: e.detail.value })
  },

  // 搜索执行
  handleConfirm() {
    this.getLessons(this.data.type, this.data.keyword)
  },

  parsePercentage(min: number | string, total: number | string) {
    return (Number(min) / Number(total) * 100).toFixed(2).toString() + "%"
  },

  async handleDetail(e: any) {
    this.getDetail(e.currentTarget.dataset.name, e.currentTarget.dataset.teacher)
  },

  handleTypeChange(e: any) {
    this.setData({
      type: (parseInt(e.detail.value) + 1).toString(),
      typeValue: e.detail.value
    })
  },

  onVisibleChange(e: any) {
    this.setData({ popupVisible: e.detail.visible })
  },

  showInfoDialog() {
    wx.showModal({
      title: "提示",
      content: "统计数据为“最终成绩”，且数据均来源于Mini湖工用户，与实际情况可能存在较大误差，仅供参考！"
    })
  }
})
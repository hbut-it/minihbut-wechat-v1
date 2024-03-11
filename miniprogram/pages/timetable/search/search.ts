// pages/timetable/search/search.ts
import { apiGetClassCalendar, apiGetClasses, apiGetColleges } from "../../../api/main"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    collegeVisible: false,
    gradeVisible: false,
    classVisible: false,
    collegeValue: [],
    gradeValue: [],
    classValue: [],
    collegeList: [],
    gradeList: [
      { label: "2023级", value: "23" },
      { label: "2022级", value: "22" },
      { label: "2021级", value: "21" },
      { label: "2020级", value: "20" },
      { label: "2019级", value: "19" }
    ],
    classList: [],
    collegeNote: "请选择学院",
    gradeNote: "请选择年级",
    classNote: "请选择班级"
  },

  onShow() {
    this.getColleges()
  },

  goBack() {
    wx.navigateBack()
  },

  async getColleges() {
    const res = await apiGetColleges()
    if(res.code === 200) {
      const arr: any = []
      for(const item of res.data) {
        arr.push({ label: item.collegeName, value: item.collegeYxid })
      }
      arr.splice(0, 2) // 删除前两个非学院的学院
      this.setData({ collegeList: arr })
    }
  },

  async getClasses(collegeYxid: string, grade?: string) {
    const res = await apiGetClasses({ institute: collegeYxid, grade: grade })
    if(res.code === 200) {
      const arr: any = []
      for(const item of res.data) {
        arr.push({ label: item, value: item })
      }
      this.setData({ classList: arr })
    }
  },

  async getCalendar(className: string, xnxq?: string) {
    wx.showLoading({ title: "查询中" })
    const res = await apiGetClassCalendar({
      className: className,
      xnxq: xnxq ? xnxq : "2023-2024-2"
    })
    wx.hideLoading()

    if(res.code === 200) {
      if(res.data.length === 0) {
        wx.showToast({
          title: "班级无当前学期课表",
          icon: "none"
        })
        return
      }
      wx.setStorageSync("tmpClassCalendar", {
        name: this.data.classValue[0],
        data: res.data
      })
      wx.navigateTo({
        url: "../calendar/calendar"
      })
      return
    }
    wx.showToast({
      title: "查询失败",
      icon: "error"
    })
  },

  handleCollegePicker() {
    this.setData({ collegeVisible: true })
  },

  handleGradePicker() {
    if(this.data.collegeValue.length === 0) {
      wx.showToast({
        title: "请选择学院",
        icon: "none",
        duration: 1000
      })
      return
    }
    this.setData({ gradeVisible: true })
  },

  handleClassPicker() {
    if(this.data.collegeValue.length === 0) {
      wx.showToast({
        title: "请选择学院",
        icon: "none",
        duration: 1000
      })
      return
    }
    if(this.data.gradeValue.length === 0) {
      wx.showToast({
        title: "请选择年级",
        icon: "none",
        duration: 1000
      })
      return
    }
    this.setData({ classVisible: true })
  },

  onCollegeChange(e: any) {
    this.setData({
      collegeNote: e.detail.label[0],
      collegeValue: e.detail.value,
      classNote: "请选择班级",
      classValue: []
    })
    if(this.data.gradeValue.length > 0) {
      this.getClasses(e.detail.value[0], this.data.gradeValue[0])
    }
  },

  onGradeChange(e: any) {
    this.setData({
      gradeNote: e.detail.label[0],
      gradeValue: e.detail.value,
      classNote: "请选择班级",
      classValue: []
    })
    this.getClasses(this.data.collegeValue[0], e.detail.value[0])
  },

  onClassChange(e: any) {
    this.setData({
      classNote: e.detail.label[0],
      classValue: e.detail.value
    })
  },

  handleSearch() {
    if(!(this.data.collegeValue.length > 0) || !(this.data.gradeValue.length > 0) || !(this.data.classValue.length > 0)) {
      wx.showToast({
        title: "请补充完整",
        icon: "error"
      })
      return
    }
    this.getCalendar(this.data.classValue[0])
  }
})
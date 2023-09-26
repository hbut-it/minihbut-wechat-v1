// pages/classroom/classroom.ts
import { apiGetClassroom } from "../../api/main"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    buildingPickerVisible: false,
    weekPickerVisible: false,
    dayPickerVisible: false,
    jcPickerVisible: false,
    buildings: [
      { label: "所有", value: ""},
      { label: "教一楼", value: "1" },
      { label: "教二楼", value: "2" },
      { label: "教三楼（文科楼）", value: "3" },
      { label: "教四楼（艺设楼）", value: "4" },
      { label: "教五楼", value: "5" },
      { label: "教六楼（实训楼）", value: "6" },
      { label: "教七楼（机械楼）", value: "7" },
      { label: "工程1号楼", value: "工" },
    ],
    days: [
      { label: "周一", value: "1" },
      { label: "周二", value: "2" },
      { label: "周三", value: "3" },
      { label: "周四", value: "4" },
      { label: "周五", value: "5" },
      { label: "周六", value: "6" },
      { label: "周日", value: "7" }
    ],
    jcs: [
      { label: "第1节", value: "1" },
      { label: "第2节", value: "2" },
      { label: "第3节", value: "3" },
      { label: "第4节", value: "4" },
      { label: "第5节", value: "5" },
      { label: "第6节", value: "6" },
      { label: "第7节", value: "7" },
      { label: "第8节", value: "8" },
      { label: "第9节", value: "9" },
      { label: "第10节", value: "10" },
      { label: "第11节", value: "11" },
    ],
    buildingPickerValue: [],
    weekPickerValue: [],
    dayPickerValue: [],
    jcPickerValue: [],
    buildingNote: "请选择教学楼",
    weekNote: "请选择周次",
    dayNote: "请选择星期",
    jcNote: "请选择节次"
  },

  onShow() {
    this.initWeeks()
    this.setData({ _jcs: this.data.jcs })
  },

  goBack () {
    wx.navigateBack()
  },
  
  showBuildingPicker () {
    this.setData({ buildingPickerVisible: true })
  },

  showWeekPicker () {
    this.setData({ weekPickerVisible: true })
  },

  showDayPicker () {
    this.setData({ dayPickerVisible: true })
  },

  showJcPicker () {
    this.setData({ jcPickerVisible: true })
  },

  onJcPickerPick (e: any) {
    if (Number(e.detail.value[1]) < Number(e.detail.value[0])) {
      const jcValue: any = []
      jcValue.push(e.detail.value[0])
      jcValue.push(e.detail.value[0])
      this.setData({ jcPickerValue: jcValue })
    }
  },
  
  initWeeks () {
    let i = 0
    const arr = []
    while (i < 24) {
      arr.push({ label: "第" + (i + 1) + "周", value: (i+1).toString() })
      i++
    }
    this.setData({ weeks: arr })
  },

  onBuildingPickerChange (e: any) {
    this.setData({
      buildingPickerValue: e.detail.value,
      buildingNote: e.detail.label[0]
    })
  },

  onWeekPickerChange (e: any) {
    this.setData({
      weekPickerValue: e.detail.value,
      weekNote: e.detail.label[0]
    })
  },

  onDayPickerChange (e: any) {
    this.setData({
      dayPickerValue: e.detail.value,
      dayNote: e.detail.label[0]
    })
  },

  onJcPickerChange (e: any) {
    let jieciNote = ""
    let jieciValue: any = []
    if (e.detail.value[0] === e.detail.value[1]) {
      jieciNote = "第" + e.detail.value[0] + "节"
      jieciValue.push(e.detail.value[0])
    } else {
      jieciNote = "第" + e.detail.value[0] + "-" + e.detail.value[1] + "节"
      let i = Number(e.detail.value[0]) - 1
      while (i < Number(e.detail.value[1])) {
        jieciValue.push((i + 1).toString())
        i++
      } 
    }
    this.setData({
      jcPickerValue: jieciValue,
      jcNote: jieciNote
    })
  },

  async doResearch () {
    if (this.data.weekPickerValue.length === 0) {
      wx.showToast({
        title: "周次不能为空",
        icon: "error",
        duration: 1000
      })
      return
    }
    this.setData({ loaded: false })
    wx.showLoading({ title: "查询中" })
    const res = await apiGetClassroom({
      bid: this.data.buildingPickerValue[0] ? this.data.buildingPickerValue[0] : "",
      week: this.data.weekPickerValue[0],
      xingqi: this.data.dayPickerValue[0] ? this.data.dayPickerValue[0] : "",
      jieci: this.data.jcPickerValue ? this.data.jcPickerValue : ""
    })
    wx.hideLoading()
    this.setData({ loaded: true })
    if (res.code === 200) {
      wx.showToast({
        title: "查询成功",
        icon: "success"
      })
      this.setData({ classroomList: res.data })
      return
    }
    wx.showToast({
      title: "查询失败",
      icon: "error"
    })
  }
})
// pages/classroom/classroom.ts
import { apiGetClassroom } from "../../api/main"

Page({
  data: {
    buildingValue: "1",
    buildingList: ["所有", "教一楼", "教二楼", "教三楼（文科楼）", "教四楼（艺设楼）", "教五楼", "教六楼（实训楼）", "教七楼（机械楼）", "工程1号楼", "工程2号楼"],
    weekValue: "0",
    weekList: ["第1周", "第2周", "第3周", "第4周", "第5周", "第6周", "第7周", "第8周", "第9周", "第10周", "第11周", "第12周", "第13周", "第14周", "第15周", "第16周", "第17周", "第18周", "第19周", "第20周", "第21周", "第22周", "第23周"],
    dayValue: "0",
    dayList: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    sectionValue: [0, 1],
    sectionList: [
      ["第1节", "第2节", "第3节", "第4节", "第5节", "第6节", "第7节", "第8节", "第9节", "第10节", "第11节"],
      ["第1节", "第2节", "第3节", "第4节", "第5节", "第6节", "第7节", "第8节", "第9节", "第10节", "第11节"]
    ],
    isClassEmpty: true
  },

  goBack () {
    wx.navigateBack()
  },

  handleBuildingChange(e: any) {
    this.setData({ buildingValue: e.detail.value })
  },

  handleWeekChange(e: any) {
    this.setData({ weekValue: e.detail.value })
  },

  handleDayChange(e: any) {
    this.setData({ dayValue: e.detail.value })
  },

  handleSectionColumnChange(e: any) {
    if(e.detail.column === 0) {
      const st = e.detail.value
      const nd = this.data.sectionValue[1]
      if(st >= nd) {
        this.setData({ sectionValue: [nd - 1, nd] })
      } else {
        this.setData({ sectionValue: [st, nd]})
      }
    }
    if(e.detail.column === 1) {
      const st = this.data.sectionValue[0]
      const nd = e.detail.value
      if(st >= nd) {
        this.setData({ sectionValue: [st, st + 1] })
      } else {
        this.setData({ sectionValue: [st, nd]})
      }
    }
  },

  async handleSearch() {
    let building = this.data.buildingValue.toString()
    if(building === "0") {
      building = ""
    }
    if(building === "8") {
      building = "工"
    }
    if(building === "9") {
      building = "工2"
    }
    const week = (parseInt(this.data.weekValue) + 1).toString()
    const day = (parseInt(this.data.dayValue) + 1).toString()
    let section: number[] = []
    let i = this.data.sectionValue[0]
    while(i <= this.data.sectionValue[1]) {
      section.push(i + 1)
      i++
    }
    wx.showLoading({ title: "查询中" })
    const res = await apiGetClassroom({
      bid: building,
      week: week,
      xingqi: day,
      jieci: section
    })
    wx.hideLoading()
    if(res.code === 200) {
      wx.showToast({
        title: "查询成功",
        icon: "success"
      })
      if(res.data.length === 0) {
        this.setData({ isClassEmpty: true })
        return
      }
      this.setData({ classList: res.data })
      if(res.data.length > 0) {
        this.setData({ isClassEmpty: false })
      }
      return
    }
    wx.showToast({
      title: "查询失败",
      icon: "error"
    })
  }
})
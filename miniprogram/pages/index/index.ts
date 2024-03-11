// pages/index/index.ts
import { apiGetIndexNotice, apiGetTodayLessons, apiGetWeather } from "../../api/common"
import { apiCheckToken, apiRefreshToken } from "../../api/user"

Page({
  data: {
    isLogin: false,
    weather: {},
    weatherNowText: "",
    weatherNowIcon: "",
    isTodayFinished: false,
    noticeVisible: true,
    noticeList: [""],
    lessonStartTime: ["8:20", "9:10", "10:15", "11:05", "14:00", "14:50", "15:55", "16:45", "18:30", "19:20", "20:10"]
  },

  // 获取天气
  async getWeather() {
    const date = new Date()
    const hour = date.getHours()
    const res = await apiGetWeather()
    if(res.code === 200) {
      this.setData({ weather: res.data })
      if(hour < 18) {
        this.setData({
          weatherNowText: res.data.textDay,
          weatherNowIcon: res.data.iconDay
        })
      } else {
        this.setData({
          weatherNowText: res.data.textNight,
          weatherNowIcon: res.data.iconNight
        })
      }
    }
  },

  // 前往我的成绩页面
  goReport() {
    if (!this.data.isLogin) {
      wx.showModal({
        title: "系统提示",
        content: "您暂未登录教务系统，无法查看相关内容，是否前往登录",
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../login/login"
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: "../report/report"
    })
  },

  // 前往我的排名页面
  goRank() {
    if (!this.data.isLogin) {
      wx.showModal({
        title: "系统提示",
        content: "您暂未登录教务系统，无法查看相关内容，是否前往登录",
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../login/login"
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: "../rank/rank"
    })
  },

  // 前往我的考场页面
  goExam() {
    if (!this.data.isLogin) {
      wx.showModal({
        title: "系统提示",
        content: "您暂未登录教务系统，无法查看相关内容，是否前往登录",
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../login/login"
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: "../exam/exam"
    })
  },

  // 前往空教室页面
  goClassroom() {
    wx.navigateTo({
      url: "../classroom/classroom"
    })
  },

  // 前往班级课表页面
  goTimetableSearch() {
    wx.navigateTo({
      url: "../timetable/search/search"
    })
  },

  // 前往给分统计页面
  goStatistics() {
    if (!this.data.isLogin) {
      wx.showModal({
        title: "系统提示",
        content: "您暂未登录教务系统，无法查看相关内容，是否前往登录",
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../login/login"
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: "../statistics/statistics"
    })
  },

  // 检验token是否过期
  async checkToken() {
    // 本地储存是否存在token
    if (!wx.getStorageSync("tokenHead") && !wx.getStorageSync("token")) {
      return
    }
    const res = await apiCheckToken()
    // token已过期
    if (res.code != 200) {
      wx.clearStorageSync()
      wx.showToast({
        title: "登录已过期",
        icon: "error",
        duration: 1000
      })
      return
    }
    // token未过期进行续期
    this.doRefreshToken()
    // 设置登录状态
    this.setData({ isLogin: true })
  },

  // 刷新token
  async doRefreshToken() {
    const res = await apiRefreshToken()
    if (res.code === 200) {
      wx.setStorageSync("token", res.data) // 重置token
    }
  },

  // 前往i湖工小程序
  goMiniprogramMap() {
    wx.navigateToMiniProgram({
      appId: "wx22aea6eb3fe08ad7"
    })
  },

  // 前往校园地图小程序
  goMiniprogramiHBUT() {
    wx.navigateToMiniProgram({
      appId: "wx3bff1e3a28b21f44"
    })
  },

  // 获取今日课程
  async getTodayLessons() {
    if(!this.data.isLogin) {
      return
    }
    const res = await apiGetTodayLessons({ xnxq: "2023-2024-2" })
    if(res.code === 200) {
      if(res.data.length === 0) {
        this.setData({ isTodayFinished: true })
        return
      }
      this.parseTodayLessons(res.data)
      return
    }
  },

  // 格式化今日课程
  parseTodayLessons(data: any) {
    let i = 0
    while(i < data.length) {
      data[i].startTime = this.data.lessonStartTime[data[i].timeJcList[0] - 1]
      i++
    }
    this.setData({ todayLessons: data })
  },

  // 获取公告
  async getNotice() {
    const res = await apiGetIndexNotice()
    if(res.code === 200) {
      this.setData({ noticeList: res.data })
    }
  },

  // 初始化
  async onShow() {
    this.getTabBar().init()
    this.getWeather()
    this.getNotice()
    await this.checkToken()
    await this.getTodayLessons()
  }
})
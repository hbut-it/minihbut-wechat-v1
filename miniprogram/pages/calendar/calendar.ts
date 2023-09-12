// pages/calendar/calendar.ts
import dayjs from "dayjs"
import { decode } from "js-base64"
import { apiGetTermRange, apiGetTermsAll } from "../../api/common"
import { apiAddCalendar, apiDeleteLesson, apiExportCalendar, apiGetMyCalendar, apiRefreshCalendar } from "../../api/main"
import { apiRenewAuth } from "../../api/user"

Page({
  data: {
    paddingTop: 0,
    weekNow: 1,
    totalWeeks: 19,
    nowMonth: 1,
    sidebarVisible: false,
    termPickerVisible: false,
    termPickerValue: [],
    popupVisible: false,
    popupValue: {},
    addLessonVisible: false,
    timePickerVisible: false,
    timePickerValue: [],
    timePickerNote: "请选择上课时间",
    weekPickerVisible: false,
    weekPickerValue: [],
    weekPickerNote: "请选择上课周数",
    addName: "",
    addTeacher: "",
    addPosition: "",
    jieciValue: "",
    themeName: "默认主题",
    termNow: "",
    pickerDays: [
      { value: "1", label: "周一" },
      { value: "2", label: "周二" },
      { value: "3", label: "周三" },
      { value: "4", label: "周四" },
      { value: "5", label: "周五" },
      { value: "6", label: "周六" },
      { value: "7", label: "周日" },
    ],
    pickerJcs: [
      { value: "1", label: "第1节" },
      { value: "2", label: "第2节" },
      { value: "3", label: "第3节" },
      { value: "4", label: "第4节" },
      { value: "5", label: "第5节" },
      { value: "6", label: "第6节" },
      { value: "7", label: "第7节" },
      { value: "8", label: "第8节" },
      { value: "9", label: "第9节" },
      { value: "10", label: "第10节" },
      { value: "11", label: "第11节" },
    ],
    // 课程时间范围
    leftTimeList: [
      { start: "8:20", end: "9:05" },
      { start: "9:10", end: "9:55" },
      { start: "10:15", end: "11:00" },
      { start: "11:05", end: "11:50" },
      { start: "14:00", end: "14:45" },
      { start: "14:50", end: "15:35" },
      { start: "15:55", end: "16:40" },
      { start: "16:45", end: "17:30" },
      { start: "18:30", end: "19:15" },
      { start: "19:20", end: "20:05" },
      { start: "20:10", end: "20:55" }
    ],
    // 根据周次划分的解析结果
    courses: [],
    // 暂存的课程合并数组
    mergedCourses: [],
    currentWeekList: [],
    // 当前课表
    currentCourses: [],
    // 默认颜色组
    colors: [],
    // 课程颜色组储存
    courseColors:[],
    // 接口获取到的学期列表
    termList: [],
    // 接口获取到的课表列表
    calendarList: [],
    // 接口获取到的学期开始和结束时间
    startTime: 0,
    endTime: 0
  },

  async onReady() {
    // 初始化safeAreaTop
    this.setData({
      paddingTop: wx.getStorageSync("safeAreaTop"),
      termNow: wx.getStorageSync("calendarTerm")
    })

    // 初始化默认颜色组
    const defaultColors = ["#f3a683", "#f7d794", "#778beb", "#e77f67", "#cf6a87", "#786fa6", "#f8a5c2", "#63cdda", "#ea8685", "#596275", "#60a3bc", "#4a69bd"]

    // 若颜色组不止一个且选择自定义颜色组
    if (wx.getStorageSync("calendarThemes").length > 0 && wx.getStorageSync("calendarThemesSelected") != 0) {
      this.setData({
        colors: wx.getStorageSync("calendarThemes")[wx.getStorageSync("calendarThemesSelected") - 1].colors
      })
    } else {
      this.setData({ colors: defaultColors })
    }

    if (!wx.getStorageSync("studentInfo")) {
      wx.setStorageSync("calendarFirstShow", true)
      return
    }

    await this.getTermsAll()
    await this.getTermRange()
    await this.getCalendarWithoutTerm()
  },

  onShow () {
    this.getTabBar().init()
    // 检测本地储存记录
    if (!wx.getStorageSync("studentInfo")) {
      wx.showModal({
        title: "系统提示",
        content: "您暂未登录教务系统，无法查看相关内容，是否前往登录",
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: "../user/user"
            })
          } else {
            wx.switchTab({
              url: "../index/index"
            })
          }
        }
      })
    } else {
      if (wx.getStorageSync("calendarFirstShow")) {
        this.onReady()
      }
    }
    this.initAddLessonData()
  },

  onHide () {
    this.setData({
      termPickerVisible: false,
      sidebarVisible: false
    })
  },

  // 解析课程
  parse () {
    // 根据学期时间计算本学期周数并生成对应的数组
    var count = 0;
    while(this.semesterWeeks() > count) {
      this.data.courses.push(Array.from({ length: 7 }, () => []))
      count++
    }
    this.data.calendarList.sort((a, b) => parseInt(a.timeJc) - parseInt(b.timeJc))
    let colorCount = 0
    for (const course of this.data.calendarList) {
      const list = this.data.courseColors.filter(item => {
        return item.kname === course.kname
      })
      if (list.length === 0) {
        course.color = this.data.colors[colorCount]
        this.data.courseColors.push(course)
        colorCount++
      } else {
        course.color = list[0].color
      }
      if(colorCount === (this.data.colors.length + 1)) {
        colorCount = 0
      }
    }
    for (const course of this.data.calendarList) {
      let merged = false;
      for (const mergedCourse of this.data.mergedCourses) {
        if (mergedCourse.timeWeek === course.timeWeek && mergedCourse.kname === course.kname && mergedCourse.skLoc === course.skLoc) {
          const lastJieciArr = mergedCourse.timeJc.split('-')
          const lastJieciEnd = lastJieciArr[1]
          // 如果不存在连续节次
          if (lastJieciEnd === undefined) {
            // 判断已有节次是否与连续
            if (Math.abs(course.timeJc - mergedCourse.timeJc) === 1) {
              const jieciStart = Math.min(course.timeJc, mergedCourse.timeJc)
              const jieciEnd = Math.max(course.timeJc, mergedCourse.timeJc)
              mergedCourse.timeJc = `${jieciStart}-${jieciEnd}`
            } else {
              // 不连续则跳过本次循环
              continue
            }
          } else {
            // 如果存在连续节次，且最后的节次与当前节次是连续的
            if (Math.abs(course.timeJc - lastJieciEnd) === 1) {
              mergedCourse.timeJc = `${lastJieciArr[0]}-${course.timeJc}`
            } else {
              // 不连续则跳过本次循环
              continue
            }
          }
          merged = true;
          break;
        }
      }
      // 如果没有需要合并的则直接插入
      if (!merged) {
        this.data.mergedCourses.push(course)
      }
    }
    // 课程归类
    for (const course of this.data.mergedCourses) {
      // 根据周数进行遍历
      for (const week of course.kweekStrList) {
        // 构建新的数组结构
        const lesson = course.timeJc.split("-")
        const _course = {
          id: course.csId, // 课程ID
          name: course.kname, // 课程名称
          teacher: course.teacherName, // 教师
          lesson_start: lesson[0], // 课程开始节次
          lesson_end: (lesson.length === 2) ? lesson[1] : lesson[0], // 课程结束节次
          classroom: course.skLoc, // 上课地点
          jc: course.timeJc,
          zc: course.kweek,
          color: course.color
        }
        this.data.courses[parseInt(week) - 1][parseInt(course.timeWeek) - 1].push(_course)
      }
    }
    return this.data.courses
  },

  // 计算学期周数
  semesterWeeks () {
    const startDate: any = new Date(this.data.startTime * 1000)
    const endDate: any = new Date(this.data.endTime * 1000)
    // 计算时间差（以秒为单位）
    const timeDiff = Math.abs(endDate - startDate) / 1000
    // 计算总周数
    const totalWeeks = Math.floor(timeDiff / (7 * 24 * 60 * 60))
    // 判断是否存在不满一周的最后一周
    const hasPartialWeek = timeDiff % (7 * 24 * 60 * 60) !== 0
    // 最终总周数
    const semesterWeeks = hasPartialWeek ? totalWeeks + 1 : totalWeeks
    this.setData({ totalWeeks: semesterWeeks })
    return semesterWeeks
  },

  // 获取周数与对应日期
  getWeekAndDate (week: number) {
    const totalWeeks = this.semesterWeeks()
    const startOfWeek = new Date(this.data.startTime * 1000)
    if (week < 1 || week > totalWeeks) {
      // 无效的选择周数
      return []
    }
    // 获取起始日期的星期几
    const startDayOfWeek = startOfWeek.getDay()
    const weekStart = new Date(startOfWeek)
    weekStart.setDate(startOfWeek.getDate() + (week - 1) * 7 - startDayOfWeek + 1)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6);
    const weekDates = []
    const daysOfWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    this.setData({ nowMonth: new Date(weekStart).getMonth() + 1 })
    for(let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart)
      currentDate.setDate(weekStart.getDate() + i)
      const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate() < 10 ? "0" : ""}${currentDate.getDate()}`
      let today = false
      if (formattedDate === dayjs().format("M-DD")) {
        today = true
      }
      weekDates.push({
        title: daysOfWeek[i],
        date: formattedDate,
        isToday: today
      });
    }
    return weekDates
  },

  // 根据今天日期获取当前周数
  getCurrentWeekNumber () {
    if(Math.floor(new Date().getTime() / 1000) > this.data.endTime || Math.floor(new Date().getTime() / 1000) < this.data.startTime) {
      return 1
    }
    const start: any = new Date(this.data.startTime * 1000)
    const now: any = new Date()
    const startOfWeek: any = new Date(start)
    const diff = now - startOfWeek
    const currentWeekNumber = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1
    if(currentWeekNumber > this.semesterWeeks()) {
      return this.semesterWeeks()
    }
    return currentWeekNumber
  },

  // 获取本周与日期
  getCurrentWeekAndDate () {
    return this.getWeekAndDate(this.getCurrentWeekNumber())
  },

  /**
   * 获取学期列表
   */
  async getTermsAll () {
    const res = await apiGetTermsAll()
    if (res.code === 200) {
      const terms = []
      for (const item of res.data) {
        terms.push({ value: item, label: item })
      }
      this.setData({ termList: terms })
      if (!wx.getStorageSync("calendarTerm")) {
        wx.setStorageSync("calendarTerm", res.data[0])
        const tmp = []
        tmp.push(res.data[0])
        this.setData({ termPickerValue: tmp })
      } else {
        const tmp = []
        tmp.push(wx.getStorageSync("calendarTerm"))
        this.setData({ termPickerValue: tmp })
      }
      return
    }
    wx.showToast({
      title: "学期列表获取错误",
      icon: "error"
    })
  },

  /**
   * 获取指定学期的开始和结束时间
   * @param term
   */
  async getTermRange (term?: string) {
    let req = ""
    if (!term) {
      req = wx.getStorageSync("calendarTerm")
    } else {
      req = term
    }
    const res = await apiGetTermRange({ xnxq: req })
    if (res.code === 200) {
      this.setData({
        startTime: Number(res.data.start.timestamp),
        endTime: Number(res.data.end.timestamp)
      })
      return
    }
    wx.showToast({
      title: "学期期间获取错误",
      icon: "error"
    })
  },

  /**
   * 获取课表列表（非自选学期）
   */
  async getCalendarWithoutTerm () {
    wx.showLoading({ title: "加载中" })
    const term = wx.getStorageSync("calendarTerm")
    const res = await apiGetMyCalendar({ xnxq: term })
    wx.hideLoading()

    // uid和route过期自动刷新
    if (res.code === 400) {
      const spider = await apiRenewAuth(JSON.parse(decode(wx.getStorageSync("jwxtLoginInfo"))))
      if (spider.code === 200) {
        this.getCalendarWithoutTerm()
        return
      }
      wx.clearStorageSync()
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
      wx.removeStorageSync("calendarFirstShow")
      this.setData({ calendarList: res.data })
      this.initData()
      if (res.data.length === 0) {
        wx.showToast({
          title: "该学期暂无课程",
          icon: "error"
        })
      }
      return
    }

    wx.showToast({
      title: "课表获取错误",
      icon: "error"
    })
  },

  /**
   * 获取课表列表（自选学期）
   */
  async getCalendar(term: string) {
    wx.showLoading({ title: "加载中" })
    const res = await apiGetMyCalendar({ xnxq: term })
    wx.hideLoading()

    // uid和route过期自动刷新
    if (res.code === 400) {
      const spider = await apiRenewAuth(JSON.parse(decode(wx.getStorageSync("jwxtLoginInfo"))))
      if (spider.code === 200) {
        this.getCalendar(term)
        return
      }
      wx.clearStorageSync()
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
      this.setData({ calendarList: res.data })
      this.initData()
      if (res.data.length === 0) {
        wx.showToast({
          title: "该学期暂无课程",
          icon: "error"
        })
      }
      return
    }

    wx.showToast({
      title: "课表获取错误",
      icon: "error"
    })
  },

  initData () {
    this.parse() // 预处理并归类课程
    this.setData({
      currentWeekList: this.getCurrentWeekAndDate(), // 获取本周的日期列表
      weekNow: this.getCurrentWeekNumber(),
      currentCourses: this.data.courses[this.getCurrentWeekNumber() - 1] // 获取本周课程
    })
  },

  handleWeekChange (e: any) {
    if(wx.getStorageSync("settingVibrate")) {
      wx.vibrateShort()
    }
    const direct = e.currentTarget.dataset.direction
    // 周数减
    if (direct === "1") {
      // 第一周不能再往左移了
      if (this.data.weekNow === 1) {
        wx.showToast({
          title: "没有第0周啊喂",
          icon: "none",
          duration: 1000
        })
        return
      }
      this.setData({
        weekNow: this.data.weekNow - 1,
        currentCourses: this.data.courses[this.data.weekNow - 2],
        currentWeekList: this.getWeekAndDate(this.data.weekNow - 1)
      })
    }
    // 周数加
    if (direct === "2") {
      // 最后一周不能再往右移了
      if (this.data.weekNow === this.data.totalWeeks) {
        wx.showToast({
          title: "后面就没课啦",
          icon: "none",
          duration: 1000
        })
        return
      }
      this.setData({
        weekNow: this.data.weekNow + 1,
        currentCourses: this.data.courses[this.data.weekNow],
        currentWeekList: this.getWeekAndDate(this.data.weekNow + 1)
      })
    }
  },

  handleSidebarVisible () {
    const status = this.data.sidebarVisible
    if (status) {
      this.setData({ sidebarVisible: false })
      return
    }
    this.setData({ sidebarVisible: true })
  },

  handleTermPickerVisible () {
    this.setData({ termPickerVisible: true })
  },

  async onTermPickerChange (e: any) {
    this.clearData()
    this.setData({ termPickerValue: e.detail.value })
    wx.setStorageSync("calendarTerm", e.detail.value[0])
    this.setData({ termNow: e.detail.value[0] })
    await this.getTermRange(e.detail.value[0])
    await this.getCalendar(e.detail.value[0])
  },
  
  clearData (keepWeek?: boolean) {
    if (!keepWeek) {
      this.setData({
        weekNow: 1
      })
    }
    this.setData({
      courses: [],
      mergedCourses: [],
      currentWeekList: [],
      currentCourses: [],
      courseColors: [],
      calendarList: [],
      startTime: 0,
      endTime: 0,
      nowMonth: 1
    })
  },

  handleLessonDetail (e: any) {
    this.setData({
      popupValue: e.currentTarget.dataset.info,
      popupVisible: true
    })
  },

  onPopupVisibleChange (e: any) {
    this.setData({ popupVisible: e.detail.visible });
  },

  onAddVisibleChange (e: any) {
    this.setData({ addLessonVisible: e.detail.visible });
  },

  async resetData () {
    this.clearData(true)
    await this.getTermRange()
    await this.getCalendarWithoutTerm()
  },

  async deleteLesson (e: any) {
    const res = await apiDeleteLesson({ csId: e.currentTarget.dataset.csid })
    if (res.code === 200) {
      wx.showToast({
        title: "课程删除成功",
        icon: "success",
        duration: 1000
      })
      setTimeout(() => {
        this.setData({ popupVisible: false })
        this.resetData()
      }, 1000);
      return
    }
    wx.showToast({
      title: "课程删除失败",
      icon: "error"
    })
  },

  async refreshCalendar () {
    wx.showLoading({ title: "刷新中" })
    const res = await apiRefreshCalendar({ xnxq: wx.getStorageSync("calendarTerm") })
    wx.hideLoading()
    if (res.code === 400) {
      const spider = await apiRenewAuth(JSON.parse(decode(wx.getStorageSync("jwxtLoginInfo"))))
      if (spider.code === 200) {
        this.refreshCalendar()
        return
      }
      wx.clearStorageSync()
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
      wx.showToast({
        title: "刷新成功",
        icon: "success",
        duration: 1000
      })
      setTimeout(() => {
        this.resetData()
      }, 1000);
      return
    }

    wx.showToast({
      title: "刷新失败",
      icon: "error"
    })
  },

  handleAddLesson () {
    this.setData({ addLessonVisible: true })
  },

  handleAddTime () {
    this.setData({ timePickerVisible: true })
  },

  handleAddWeek () {
    this.setData({ weekPickerVisible: true })
  },

  initAddLessonData () {
    let i = 1
    const weeks = []
    while (i <= this.data.totalWeeks) {
      weeks.push({ value: i.toString(), label: "第" + i + "周" })
      i++
    }
    this.setData({
      _pickerJcs: this.data.pickerJcs,
      pickerWeeks: weeks,
      _pickerWeeks: weeks
    })
  },

  onTimePickerPick (e: any) {
    if (Number(e.detail.value[1]) > Number(e.detail.value[2])) {
      const tmp = []
      tmp.push(e.detail.value[0])
      tmp.push(e.detail.value[1])
      tmp.push(e.detail.value[1])
      this.setData({ timePickerValue: tmp })
    }
  },

  onWeekPickerPick (e: any) {
    if (Number(e.detail.value[0]) > Number(e.detail.value[1])) {
      const tmp = []
      tmp.push(e.detail.value[0])
      tmp.push(e.detail.value[0])
      this.setData({ weekPickerValue: tmp })
    }
  },

  onTimePickerChange (e: any) {
    let jc = ""
    let jcv = ""
    if (e.detail.value[1] === e.detail.value[2]) {
      jc = "第" + e.detail.value[1] + "节"
      jcv = e.detail.value[1]
    } else {
      jc = "第" + e.detail.value[1] + "-" + e.detail.value[2] + "节"
      jcv = e.detail.value[1] + "-" + e.detail.value[2]
    }
    this.setData({
      timePickerNote: e.detail.label[0] + " / " + jc,
      timePickerValue: e.detail.value,
      jieciValue: jcv
    })
  },

  onWeekPickerChange (e: any) {
    let zs = ""
    if (e.detail.value[0] === e.detail.value[1]) {
      zs = "第" + e.detail.value[0] + "周"
    } else {
      zs = "第" + e.detail.value[0] + "-" + e.detail.value[1] + "周"
    }
    this.setData({
      weekPickerNote: zs,
      weekPickerValue: e.detail.value
    })
  },
  
  handleInputName (e: any) {
    this.setData({ addName: e.detail.value })
  },
  
  handleInputTeacher (e: any) {
    this.setData({ addTeacher: e.detail.value })
  },

  handleInputPosition (e: any) {
    this.setData({ addPosition: e.detail.value })
  },

  async addLesson () {
    if (!this.data.addName || !this.data.addPosition || this.data.timePickerValue.length === 0 || this.data.weekPickerValue.length === 0) {
      wx.showToast({
        title: "请补充完整",
        icon: "error",
        duration: 1000
      })
      return
    }
    const res = await apiAddCalendar({
      kcName: this.data.addName,
      teacherName: this.data.addTeacher ? this.data.addTeacher : "",
      xnxq: wx.getStorageSync("calendarTerm"),
      kcWeekBegin: this.data.weekPickerValue[0],
      kcWeekEnd: this.data.weekPickerValue[1],
      kcXingqi: this.data.timePickerValue[0],
      kcJieci: this.data.jieciValue,
      kcLoc: this.data.addPosition,
      kcFeature: ""
    })
    if (res.code === 200) {
      wx.showToast({
        title: "课程添加成功",
        icon: "success",
        duration: 1000
      })
      setTimeout(() => {
        this.resetData()
      }, 1000);
      return
    }
    wx.showToast({
      title: "课程添加失败",
      icon: "error"
    })
  },
  
  goSetting() {
    wx.navigateTo({
      url: "../setting/index/index"
    })
  },

  async exportCalendar () {
    wx.showLoading({ title: "加载中" })
    const semester = wx.getStorageSync("calendarTerm")
    const calendarRes = await apiGetMyCalendar({ xnxq: semester })
    if (calendarRes.code === 400) {
      const spider = await apiRenewAuth(JSON.parse(decode(wx.getStorageSync("jwxtLoginInfo"))))
      if (spider.code === 200) {
        this.exportCalendar()
        return
      }
      wx.clearStorageSync()
      wx.showToast({
        title: "登录已过期",
        icon: "error",
        duration: 1000
      })
      setTimeout(() => {
        wx.reLaunch({
          url: "../user/user"
        })
      }, 1000);
      return
    }
    let calendarList: any = []
    if (calendarRes.code === 200) {
      calendarList = calendarRes.data
    }
    const res = await apiExportCalendar({
      student_id: wx.getStorageSync("studentInfo")["studentNumber"],
      semester: semester,
      calendar: JSON.stringify(calendarList)
    })
    wx.hideLoading()
    if (res.code === 200) {
      wx.setClipboardData({ data: res.data.full_url })
      wx.showModal({
        title: "系统提示",
        content: "导出成功，订阅链接已复制到剪切板"
      })
      return
    }
    wx.showToast({
      title: "导出失败",
      icon: "error"
    })
  }
})
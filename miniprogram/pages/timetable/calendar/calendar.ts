// pages/timetable/calendar/calendar.ts
import dayjs from "dayjs"
import { apiGetTermRange } from "../../../api/common"

Page({
  data: {
    weekNow: 1,
    totalWeeks: 19,
    nowMonth: 1,
    termNow: "2023-2024-1",
    className: "",
    popupVisible: false,
    poupValue: [],
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

  async onLoad() {
    // 初始化默认颜色组
    const defaultColors = ["#f3a683", "#f7d794", "#778beb", "#e77f67", "#cf6a87", "#786fa6", "#f8a5c2", "#63cdda", "#ea8685", "#596275", "#60a3bc", "#4a69bd"]

    // 若颜色组不止一个且选择自定义颜色组
    if (wx.getStorageSync("calendarThemes").length > 0 && wx.getStorageSync("calendarThemesSelected") != 0) {
      this.setData({ colors: wx.getStorageSync("calendarThemes")[wx.getStorageSync("calendarThemesSelected") - 1].colors })
    } else {
      this.setData({ colors: defaultColors })
    }

    await this.getTermRange(this.data.termNow)
    await this.setData({
      className: wx.getStorageSync("tmpClassCalendar")["name"],
      calendarList: wx.getStorageSync("tmpClassCalendar")["data"]
    })
    this.initData()
  },

  onUnload() {
    wx.removeStorageSync("tmpClassCalendar")
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

  async getTermRange(term: string) {
    const res = await apiGetTermRange({ xnxq: term })
    if(res.code === 200) {
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

  initData () {
    this.parse() // 预处理并归类课程
    this.setData({
      currentWeekList: this.getCurrentWeekAndDate(), // 获取本周的日期列表
      currentCourses: this.data.courses[this.getCurrentWeekNumber() - 1], // 获取本周课程
      weekNow: this.getCurrentWeekNumber()
    })
  },

  handleWeekChange (e: any) {
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

  handleLessonDetail (e: any) {
    this.setData({
      popupValue: e.currentTarget.dataset.info,
      popupVisible: true
    })
  },

  onPopupVisibleChange (e: any) {
    this.setData({ popupVisible: e.detail.visible });
  },

  goBack() {
    wx.navigateBack()
  }
})
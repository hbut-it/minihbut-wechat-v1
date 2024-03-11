// pages/timetable/calendar/calendar.ts
import dayjs from "dayjs"
import { apiGetTermRange } from "../../../api/common"

Page({
  data: {
    weekNow: 1,
    totalWeeks: 19,
    nowMonth: 1,
    termNow: "2023-2024-2",
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
    colors: ["#f3a683", "#f7d794", "#778beb", "#e77f67", "#cf6a87", "#786fa6", "#f8a5c2", "#63cdda", "#ea8685", "#596275", "#60a3bc", "#4a69bd"],
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
    const df: Event[] = this.data.calendarList;
    // 以time、week、weeksArray、teacher、place为分组依据，统计每个课程的开始时间和持续节数
    const event_df = df.reduce((acc, event) => {
      const key = `${event.kname}-${event.timeWeek}-${event.kweekStr}-${event.teacherName}-${event.skLoc}`;
      if (!acc[key]) {
        acc[key] = {
          start_at: parseInt(event.timeJc),
          count: 1,
          course_id: event.csId,
          k_week: event.kweek,
          // 保留这些属性
          kname: event.kname,
          timeWeek: event.timeWeek,
          kweekStr: event.kweekStr,
          teacherName: event.teacherName,
          skLoc: event.skLoc,
        };
      } else {
        acc[key].count += 1;
      }
      return acc;
    }, {} as { [key: string]: GroupedEvent });
    const eventArray = Object.values(event_df).sort((a, b) => {
      if (a.start_at !== b.start_at) {
        return a.start_at - b.start_at;
      }
      return 0;
    });
    // 为每个课程分配颜色
    const nameSet = new Set(eventArray.map(event => event.kname));
    const colorDict: { [key: string]: number } = {};
    let colorIndex = 0;
    nameSet.forEach(name => {
      colorDict[name] = colorIndex;
      colorIndex++;
    });
    // 注：kweekStr为逗号分隔字符串，转为列表
    const standard_timetable: StandardTimetable[] = eventArray.map(event => {
      return {
        id: event.course_id,
        name: event.kname,
        teacher: event.teacherName,
        lesson_start: event.start_at,
        lesson_end: event.start_at + event.count - 1,
        classroom: event.skLoc,
        jc: `${event.start_at}-${event.start_at + event.count - 1}`,
        zc: event.k_week,
        colorIndex: colorDict[event.kname],
        color: this.data.colors[colorDict[event.kname]],
        day_in_week: event.timeWeek,
        week_array: event.kweekStr.split(',')
      };
    });
    // 遍历每周
      for (let i = 0; i < this.data.totalWeeks; i++) {
        // 构造长度为7的array
          const week = Array.from({ length: 7 }, () => []);
          // 遍历standard_timetable
          standard_timetable.forEach(course => {
            // 如果当前周在event.week_array中
            if (course.week_array.includes((i + 1).toString())) {
              // 按照event.day_in_week放入week
              week[parseInt(course.day_in_week) - 1].push(course);
            }
          });
          // 将week放入courses
          this.data.courses.push(week);
      }
    return this.data.courses;
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
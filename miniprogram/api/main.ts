import { HttpMethod, request } from '../utils/request/request'

// 查询成绩
export const apiGetReport = (data: API.ReportParams) => {
  return request<API.BaseResponse<API.ReportResult>>("/grade/showMeGrades", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 刷新成绩
export const apiRefreshReport = () => {
  return request<API.BaseResponse<API.ReportResult>>("/edu/spiderTheGrades", {
    method: HttpMethod.POST
  })
}

// 查询排名
export const apiGetRank = (data: API.RankParams) => {
  return request<API.BaseResponse<API.RankResult>>("/grade/getGradesRanking", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 刷新排名
export const apiRefreshRank = (data: API.RankParams) => {
  return request<API.BaseResponse<API.RankResult>>("/grade/showMeGradesRanking", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 查询考场
export const apiGetExam = (data: API.ExamParams) => {
  return request<API.BaseResponse<API.ExamResult>>("/exam/search", {
    method: HttpMethod.GET,
    data
  })
}

// 刷新考场
export const apiRefreshExam = (data: API.ExamParams) => {
  return request<API.BaseResponse<API.ExamResult>>("/edu/spiderTheExam", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取个人课表
export const apiGetMyCalendar = (data: API.CalendarParams) => {
  return request<API.BaseResponse<API.CalendarResult>>("/courseSchedule/showMeCourses", {
    method: HttpMethod.GET,
    data
  })
}

// 删除课程
export const apiDeleteLesson = (data: API.CalendarRemoveParams) => {
  return request<API.BaseResponse<undefined>>("/courseSchedule/deleteCourse", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 刷新课表
export const apiRefreshCalendar = (data: API.CalendarParams) => {
  return request<API.BaseResponse<API.CalendarResult>>("/edu/spiderTheCourses", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 添加个人课程
export const apiAddCalendar = (data: any) => {
  return request<API.BaseResponse<API.CalendarResult>>("/courseSchedule/addMyCourse", {
    method: HttpMethod.GET,
    data
  })
}

// 查询空教室
export const apiGetClassroom = (data: any) => {
  return request<API.BaseResponse<API.ClassroomResult>>("/empty/classroomBySection", {
    method: HttpMethod.GET,
    data
  })
}

// 导出课表
export const apiExportCalendar = (data: any) => {
  return request<API.BaseResponse<any>>("https://api.stslb.cn/hbut/ics", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, true)
}

// 获取所有学院
export const apiGetColleges = () => {
  return request<API.BaseResponse<API.CollegesResult>>("/courseSchedule/queryAllAcademy", {
    method: HttpMethod.GET
  })
}

// 获取所有班级
export const apiGetClasses = (data: API.ClassesParams) => {
  return request<API.BaseResponse<API.ClassesResult>>("/courseSchedule/classList", {
    method: HttpMethod.GET,
    data
  })
}

// 获取班级课表
export const apiGetClassCalendar = (data: API.ClassCalendarParams) => {
  return request<API.BaseResponse<API.CalendarResult>>("/courseSchedule/searchSchedule", {
    method: HttpMethod.GET,
    data
  })
}

// 获取给分统计列表
export const apiGetStatisticsList = (data: API.StatisticsParams) => {
  return request<API.BaseResponse<API.StatisticsResult>>("/scoreStatistics/showMeAllLessons", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取给分统计详情
export const apiGetStatisticsDetail = (data: API.StatisticsDetailParams) => {
  return request<API.BaseResponse<API.StatisticsDetailResult>>("/scoreStatistics/showLessons", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
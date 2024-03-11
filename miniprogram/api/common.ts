import { HttpMethod, request } from '../utils/request/request'

// 获取学生学年学期
export const apiGetTermsAll = () => {
  return request<API.BaseResponse<string[]>>("/now/xnxq", {
    method: HttpMethod.GET
  })
}

// 获取学期区间
export const apiGetTermRange = (data: API.TermRangeParams) => {
  return request<API.BaseResponse<API.TermRangeResult>>("/now/spiderSchoolCalendar", {
    method: HttpMethod.GET,
    data
  })
}

// 获取学生今日课程
export const apiGetTodayLessons = (data: {}) => {
  return request<API.BaseResponse<[]>>("/courseSchedule/showMeCourses/today", {
    method: HttpMethod.GET,
    data
  })
}

// 获取空教室表单默认填写内容
export const apiGetClassroomPlaceholder = () => {
  return request<API.BaseResponse<any>>("/now/showMe/EmptyClassroomArgs", {
    method: HttpMethod.GET
  })
}

// 获取首页公告
export const apiGetIndexNotice = () => {
  return request<API.BaseResponse<any>>("https://api.stslb.cn/hbut/notice", {
    method: HttpMethod.GET
  }, true)
}

// 获取紧急通知
export const apiGetEmergency = () => {
  return request<API.BaseResponse<API.EmergencyResult>>("https://api.stslb.cn/hbut/emergency", {
    method: HttpMethod.GET
  }, true)
}

// 获取武汉天气
export const apiGetWeather = () => {
  return request<API.BaseResponse<any>>("https://api.stslb.cn/hbut/weather", {
    method: HttpMethod.GET
  }, true)
}
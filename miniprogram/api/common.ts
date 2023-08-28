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

// 获取首页公告
export const apiGetIndexNotice = () => {
  return request<API.BaseResponse<API.NoticeResult>>("https://api.stslb.cn/hbut/notice", {
    method: HttpMethod.GET
  }, true)
}

// 获取首页轮播图
export const apiGetIndexSwipers = () => {
  return request<API.BaseResponse<API.SwipersResult>>("https://api.stslb.cn/hbut/swiper", {
    method: HttpMethod.GET
  }, true)
}

// 获取紧急通知
export const apiGetEmergency = () => {
  return request<API.BaseResponse<API.EmergencyResult>>("https://api.stslb.cn/hbut/emergency", {
    method: HttpMethod.GET
  }, true)
}
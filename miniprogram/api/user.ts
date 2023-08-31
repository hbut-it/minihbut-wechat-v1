import { HttpMethod, request } from '../utils/request/request'

// 登录
export const apiLogin = (data: API.AuthParams) => {
  return request<API.BaseResponse<API.AuthResult>>("/auth", {
    method: HttpMethod.POST,
    data
  })
}

// token有效性
export const apiCheckToken = () => {
  return request<API.BaseResponse<undefined>>("/auth/isTokenExpired", {
    method: HttpMethod.POST
  })
}

// token续期
export const apiRefreshToken = () => {
  return request<API.BaseResponse<string>>("/auth/refreshToken", {
    method: HttpMethod.POST
  })
}

// 获取用户信息
export const apiGetUserInfo = () => {
  return request<API.BaseResponse<API.StudentInfo>>("/auth/userDetails", {
    method: HttpMethod.POST
  })
}

// 更新用户信息
export const apiRenewUserInfo = () => {
  return request<API.BaseResponse<any>>("/edu/reflushPersonalMessage", {
    method: HttpMethod.POST
  })
}

// 更新uid和route
export const apiRenewAuth = (data: API.AuthParams) => {
  return request<API.BaseResponse<any>>("/edu/loginEducationWeb", {
    method: HttpMethod.POST,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
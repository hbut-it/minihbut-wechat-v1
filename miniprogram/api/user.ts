import { HttpMethod, request } from '../utils/request/request'

// 登录
export const login = (data: API.AuthParams) => {
  return request<API.BaseResponse<API.AuthResult>>("/auth", {
    method: HttpMethod.POST,
    data
  })
}
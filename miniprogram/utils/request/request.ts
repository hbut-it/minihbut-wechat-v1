type RequestConfig = {
  /** API路径 */
  url?: string
  /** Method类型 */
  method?: HttpMethod
  /** 接口返回数据 */
  data?: any
  /** 无TOKEN触发异常捕获时，是否执行异常逻辑 */
  needToken?: boolean
  /** Header头部 */
  header?: object
  /** 返回的数据格式 */
  dataType?: string
  /** 请求报错时，是否弹出message提示（默认弹出）*/
  noShowMsg?: boolean
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  OPTIONS = "OPTIONS",
  PUT = "PUT",
  DELETE = "DELETE"
}

export const request = <T = any>(url: string, config: RequestConfig, full?: boolean): Promise<T> => {
  let finalURL = ""
  if (!full) {
    finalURL = 'https://hbut.stslb.cn' + url
  } else {
    finalURL = url
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: finalURL,
      method: config.method,
      data: config.data,
      header: {
        'Authorization': wx.getStorageSync('tokenHead') + " " + wx.getStorageSync("token") || '',
        ...config.header
      },
      success: (resp) => {
        resolve(resp.data as unknown as T)
      },
      fail: (err) => {
        reject(err)
        throw err
      }
    })
  })
}
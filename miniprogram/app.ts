// app.ts
import { apiGetEmergency } from "./api/common"

App<IAppOption>({
  globalData: {},
  async onLaunch () {
    // 展示紧急通知
    const res = await apiGetEmergency()
    if (res.code === 200) {
      if (!res.data.switch) { return }
      wx.showModal({
        title: res.data.title,
        content: res.data.content
      })
    }
  }
})
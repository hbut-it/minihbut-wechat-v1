// pages/extra/extra.ts
import { decode } from "js-base64"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: ""
  },

  onLoad(data: any) {
    this.setData({ url: decode(data.url) })
    wx.setNavigationBarTitle({
      title: data.title
    })
  }
})
// pages/about/about.ts
Page({
  /**
   * 返回上一页
   */
  goBack () {
    wx.navigateBack();
  },

  openUpdateLog () {
    wx.navigateTo({
      url: "../updateLog/updateLog"
    })
  }
})
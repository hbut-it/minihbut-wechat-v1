// pages/about/about.ts
Page({
  /**
   * 返回上一页
   */
  goBack () {
    wx.navigateBack();
  },

  openChangeLog () {
    wx.openEmbeddedMiniProgram({
      appId: "wx8abaf00ee8c3202e",
      path: 'scenes/embed__change-log/index',
      extraData: {
        id: "598009"
      }
    })
  }
})
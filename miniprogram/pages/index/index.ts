// pages/index/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {
      current: 1,
      list: [
        { value: "https://tdesign.gtimg.com/miniprogram/images/swiper1.png" },
        { value: "https://tdesign.gtimg.com/miniprogram/images/swiper2.png" }
      ]
    },
    notice: {
      visible: true,
      theme: "info",
      content: "这是一条测试公告"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  goReport() {
    wx.navigateTo({
      url: "../report/report"
    })
  },

  goRank() {
    wx.navigateTo({
      url: "../rank/rank"
    })
  },

  goExam() {
    wx.navigateTo({
      url: "../exam/exam"
    })
  },

  goCalendarAll() {
    wx.navigateTo({
      url: "../calendarAll/calendarAll"
    })
  },

  goClassroom() {
    wx.navigateTo({
      url: "../classroom/classroom"
    })
  },

  goStatistics() {
    wx.navigateTo({
      url: "../statistics/statistics"
    })
  },

  openFeedback() {
    wx.openEmbeddedMiniProgram({
      appId: "wx8abaf00ee8c3202e",
      extraData :{
        id : "598009"
      }
    })
  }
})
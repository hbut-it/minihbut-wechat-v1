// pages/statistics/statistics.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayDate: new Date().getFullYear().toString() + "/" + (new Date().getMonth() + 1).toString() + "/" + new Date().getDate().toString(),
    popupVisible: false,
    termPickerVisible: false,
    termCurrent: "2022-2023-2",
    termValue: ["2022-2023-2"],
    termList: [
      { value: "2022-2023-1", label: "2022-2023-1"},
      { value: "2022-2023-2", label: "2022-2023-2"},
      { value: "2023-2024-1", label: "2023-2024-1"}
    ],
    isRefreshing: false
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

  showPopup() {
    if(!this.data.popupVisible){
      this.setData({
        popupVisible: true
      })
      return;
    }
    this.setData({
      popupVisible: false
    })
  },

  hidePopup() {
    this.setData({
      popupVisible: false
    })
  },

  showTermPicker() {
    this.setData({
      termPickerVisible: true
    })
  },
  
  onPickerChange(e: any) {
    this.setData({
      termValue: e.detail.value,
      termCurrent: e.detail.value[0]
    })
  },

  goAddLesson() {
    wx.navigateTo({
      url: "../calendarAdd/calendarAdd"
    })
  },

  doRefresh() {
    this.setData({
      isRefreshing: true
    })
  }
})
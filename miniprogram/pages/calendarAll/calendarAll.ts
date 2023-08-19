// pages/calendarAll/calendarAll.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cascaderNote: "请选择班级",
    cascaderVisible: false,
    cascaderValue: "",
    cascaderOptions: [
      {
        label: "计算机学院",
        value: "1",
        children: [
          {
            label: "2022级",
            value: "22",
            children: [
              {
                label: "22软件3",
                value: "3"
              }
            ]
          }
        ]
      }
    ]
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

  goBack() {
    wx.navigateBack()
  },

  showCascader() {
    this.setData({ cascaderVisible: true })
  },

  cascaderChange(e: any) {
    console.log(e);
    const { selectedOptions, value } = e.detail;
    this.setData({
      value,
      cascaderNote: selectedOptions.map((item: any) => item.label).join('/'),
    });
  },

  // 每选择一项后触发
  cascaderPick(e: any) {
    console.log(e);
  }
})
// pages/login/login.ts
import { login } from "../../api/user"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
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

  goLicense() {
    wx.navigateTo({
      url: "../extra/extra?title=用户协议&id=1"
    })
  },

  goPrivacy() {
    wx.navigateTo({
      url: "../extra/extra?title=隐私政策&id=2"
    })
  },

  bindUsernameInput(e: any) {
    this.setData({ username: e.detail.value })
  },

  bindPasswordInput(e: any) {
    this.setData({ password: e.detail.value })
  },

  async doLogin() {
    if(!this.data.username) {
      wx.showToast({
        title: "学号不能为空",
        icon: "error"
      })
      return
    }
    if(!this.data.password) {
      wx.showToast({
        title: "密码不能为空",
        icon: "error"
      })
      return
    }
    wx.showLoading({
      title: "登录中"
    })
    const data = {
      username: this.data.username,
      password: this.data.password
    }
    const res = login(data)
    console.log(res)
    // wx.showToast({
    //   title: "登录成功",
    //   icon: "success"
    // })
    // wx.switchTab({
    //   url: '../user/user'
    // })
  }
})
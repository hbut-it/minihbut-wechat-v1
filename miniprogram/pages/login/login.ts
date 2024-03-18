// pages/login/login.ts
import { encode, decode } from "js-base64"
import { apiLogin } from "../../api/user"

Page({
  data: {
    username: "",
    password: "",
    pwdErrorCount: 0,
    checked: false,
    checkboxClass: "login-checkbox",
    tipNote: false
  },

  onShow() {
    const loginInfo = wx.getStorageSync("jwxtLoginInfo")
    if(loginInfo) {
      const info = JSON.parse(decode(loginInfo))
      this.setData({
        username: info.username,
        password: info.password
      })
    }
  },

  /**
   * 返回上一页方法
   */
  goBack() {
    wx.navigateBack()
  },

  /**
   * 查看隐私政策方法
   */
  goPrivacy() {
    wx.navigateTo({
      url: "../privacy/privacy"
    })
  },

  /**
   * 绑定学号输入框输入动作
   * @param e 
   */
  bindUsernameInput(e: any) {
    this.setData({ username: e.detail.value })
  },

  /**
   * 绑定密码输入框输入动作
   * @param e
   */
  bindPasswordInput(e: any) {
    this.setData({ password: e.detail.value })
  },

  /**
   * 登录方法
   */
  async doLogin() {
    // 判断表单必填项
    if (!this.data.username) {
      wx.showToast({
        title: "学号不能为空",
        icon: "error",
        duration: 1000
      })
      return
    }
    if (!this.data.password) {
      wx.showToast({
        title: "密码不能为空",
        icon: "error",
        duration: 1000
      })
      return
    }
    if (!this.data.checked) {
      wx.showToast({
        title: "请阅读并同意相关协议",
        icon: "none"
      })
      return
    }

    // 显示登录加载
    wx.showLoading({ title: "登录中" })

    // 开始登录方法
    const res = await apiLogin({
      username: this.data.username,
      password: this.data.password
    })
    await wx.hideLoading()

    // 登录成功
    if (res.code === 200) {
      wx.setStorageSync("tokenHead", res.data.tokenHead) // 本地储存tokenHead
      wx.setStorageSync("token", res.data.token) // 本地储存token
      wx.setStorageSync("studentInfo", res.data.student) // 本地储存学生非敏感信息
      wx.setStorageSync("jwxtLoginInfo", encode(JSON.stringify({ username: this.data.username, password: this.data.password })))
      await wx.showToast({
        title: "登录成功",
        icon: "success",
        duration: 1000
      })
      setTimeout(() => {
        wx.switchTab({
          url: "../index/index"
        })
      }, 1000);
      return
    }

    // 学号或密码错误
    if (res.code === 400) {
      if (this.data.pwdErrorCount >= 4) {
        wx.showModal({
          title: "警告",
          content: "您已经错误5次，若错误10次教务系统将会锁定登录30分钟，请仔细检查您的输入！"
        })
        return
      }
      await wx.showToast({
        title: "学号或密码错误",
        icon: "error",
        duration: 1000
      })
      this.setData({
        pwdErrorCount: this.data.pwdErrorCount + 1
      })
      return
    }

    // 其他错误
    await wx.showToast({
      title: res.message,
      icon: "error",
      duration: 1000
    })
  },
  
  handleChecked () {
    if(this.data.checked) {
      this.setData({ checkboxClass: "login-checkbox" })
    } else {
      this.setData({ checkboxClass: "login-checkbox-checked" })
    }
    this.setData({ checked: !this.data.checked })
  }
})
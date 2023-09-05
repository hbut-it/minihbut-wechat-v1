// pages/setting/theme/theme.ts
Page({
  data: {
    defaultColors: ["#f3a683", "#f7d794", "#778beb", "#e77f67", "#cf6a87", "#786fa6", "#f8a5c2", "#63cdda", "#ea8685", "#596275", "#2c2c54"],
    themes: [],
    selected: 0,
    isAdding: false,
    addColor: "",
    newTitle: "",
    newTheme: []
  },

  onShow () {
    this.setData({
      themes: ((wx.getStorageSync("calendarThemes").length) > 0) ? wx.getStorageSync("calendarThemes") : [],
      selected: wx.getStorageSync("calendarThemesSelected") ? wx.getStorageSync("calendarThemesSelected") : 0
    })
    console.log(this.data.selected)
  },

  goBack () {
    wx.reLaunch({
      url: "../../calendar/calendar"
    })
  },

  addTheme () {
    this.setData({ isAdding: true })
  },

  handleInputColor (e: any) {
    this.setData({ addColor: e.detail.value })
  },

  handleInputTitle (e: any) {
    this.setData({ newTitle: e.detail.value })
  },
  
  addColor () {
    if (this.data.addColor) {
      const reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
      if (!reg.test(this.data.addColor)) {
        wx.showToast({
          title: "格式不正确",
          icon: "error",
          duration: 1000
        })
        return
      }
      const arr = this.data.newTheme
      arr.push(this.data.addColor)
      this.setData({
        newTheme: arr,
        addColor: ""
      })
    } else {
      wx.showToast({
        title: "请输入颜色",
        icon: "error",
        duration: 1000
      })
    }
  },

  addColorSave () {
    if (this.data.newTheme.length < 10) {
      wx.showToast({
        title: "颜色组不能小于10个",
        icon: "none",
        duration: 1000
      })
      return
    }
    if (wx.getStorageSync("calendarThemes")) {
      const themes = wx.getStorageSync("calendarThemes")
      themes.push({
        id: themes.length + 1,
        title: this.data.newTitle,
        colors: this.data.newTheme
      })
      wx.setStorageSync("calendarThemes", themes)
    } else {
      const themes = []
      themes.push({
        id: 1,
        title: this.data.newTitle,
        colors: this.data.newTheme
      })
      wx.setStorageSync("calendarThemes", themes)
    }
    this.setData({
      newTitle: "",
      newTheme: [],
      isAdding: false
    })
    wx.showToast({
      title: "保存成功",
      icon: "success",
      duration: 1000
    })
    setTimeout(() => {
      this.onShow()
    }, 1000);
  },
  
  handleChoose (e: any) {
    wx.setStorageSync("calendarThemesSelected", e.currentTarget.dataset.id)
    this.setData({ selected: e.currentTarget.dataset.id })
  },

  handleUnchoose () {
    wx.removeStorageSync("calendarThemesSelected")
    this.setData({ selected: 0 })
  },

  handleDelete (e: any) {
    const themes = wx.getStorageSync("calendarThemes")
    themes.splice(e.currentTarget.dataset.id - 1, 1)
    wx.setStorageSync("calendarThemes", themes)
    this.setData({ themes: themes })
    if (this.data.selected === e.currentTarget.dataset.id) {
      wx.removeStorageSync("calendarThemesSelected")
      this.setData({ selected: 0 })
    }
  }
})
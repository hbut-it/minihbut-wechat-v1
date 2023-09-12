// custom-tab-bar/index.ts
Component({
  data: {
    value: null,
    list: [
      { value: 0, pagePath: "pages/index/index", icon: "home", ariaLabel: "首页" },
      { value: 1, pagePath: "pages/calendar/calendar", icon: "calendar", ariaLabel: "课表" },
      { value: 2, pagePath: "pages/user/user", icon: "user", ariaLabel: "我的" },
    ]
  },

  methods: {
    init() {
      const page = getCurrentPages().pop();
      let a = this.data.list.find(item => item.pagePath === page.route)
      this.setData({ value: a.value })
    },

    onChange(e: any) {
      this.setData({ value: e.detail.value })
      wx.switchTab({ url: '/' + this.data.list[e.detail.value].pagePath })
      // 是否开启震动
      if(wx.getStorageSync("settingVibrate")) {
        wx.vibrateShort() // 短震
      }
    }
  }
})

// pages/report/report.ts
import { getKcxz, getKsxs, getXdxz } from "../../utils/reportUtil"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogVisible: false,
    isLoading: false,
    termOptions: [
      {
        value: "2023-2024-1",
        label: "2023-2024-1"
      },
      {
        value: "2022-2023-2",
        label: "2022-2023-2"
      },
      {
        value: "2022-2023-1",
        label: "2022-2023-1"
      }
    ],
    termSelected: "2022-2023-2",
    raw: {
      "code": 200,
      "message": "成绩表获取成功",
      "data": {
          "averageCurrentGrade": 3.5061538461538464,
          "studentGrades": [
              {
                  "cjId": "F65ABC0B6BE20803E0536411000A0187",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "31",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "2",
                  "grade": "1.04",
                  "gradePoints": "76",
                  "kcId": "1300081A",
                  "kname": "物理实验（二）"
              },
              {
                  "cjId": "F61F4048D58D5653E0531520000AD44B",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "31",
                  "xdXz": "2",
                  "ksXs": "1",
                  "credits": "1.5",
                  "grade": "0.78",
                  "gradePoints": "76",
                  "kcId": "0600022A",
                  "kname": "计算机科学导论"
              },
              {
                  "cjId": "F60AB61EC23217E0E0531520000AB891",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "11",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "3",
                  "grade": "1.32",
                  "gradePoints": "72",
                  "kcId": "1100004A",
                  "kname": "毛泽东思想和中国特色社会主义理论体系概论"
              },
              {
                  "cjId": "F5E6EB31671D2C6FE0531520000A76AB",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "31",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "2.5",
                  "grade": "1.6",
                  "gradePoints": "82",
                  "kcId": "1300052A",
                  "kname": "大学物理(二)-2"
              },
              {
                  "cjId": "F5D3FA69F90B592EE0531520000A7D97",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "43",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "4",
                  "grade": "3.6",
                  "gradePoints": "95",
                  "kcId": "0600011A",
                  "kname": "程序设计基础(三)-数据结构与算法基础"
              },
              {
                  "cjId": "F56DBE8B2F5D0920E053F720000A8F6B",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "31",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "3.5",
                  "grade": "2.5900000000000003",
                  "gradePoints": "87",
                  "kcId": "0600032A",
                  "kname": "离散数学"
              },
              {
                  "cjId": "F56D8EE5E9950BF7E053F720000A321C",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "51",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "2",
                  "grade": "1.3199999999999998",
                  "gradePoints": "83",
                  "kcId": "0600013B",
                  "kname": "程序设计综合实践"
              },
              {
                  "cjId": "F5689FCDCF13593BE053F720000AFA94",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "52",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "1",
                  "grade": "0.9400000000000001",
                  "gradePoints": "97",
                  "kcId": "03000003B",
                  "kname": "短学期实践3"
              },
              {
                  "cjId": "F3362182AD5704FDE053F720000A5D3C",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "11",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "3",
                  "grade": "2.34",
                  "gradePoints": "89",
                  "kcId": "1100005A",
                  "kname": "习近平新时代中国特色社会主义思想概论"
              },
              {
                  "cjId": "EFC05598224F153BE053F720000A0ACE",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "99",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "1",
                  "grade": "0.76",
                  "gradePoints": "88",
                  "kcId": "2059062010",
                  "kname": "现代陶艺鉴赏"
              },
              {
                  "cjId": "EE6DBE2145971604E053F720000A271B",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "43",
                  "xdXz": "2",
                  "ksXs": "1",
                  "credits": "4",
                  "grade": "3.2",
                  "gradePoints": "90",
                  "kcId": "0600012A",
                  "kname": "程序设计基础(一)-C语言程序设计"
              },
              {
                  "cjId": "ECCD4B63AF271390E053F720000A063C",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "43",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "3",
                  "grade": "1.7399999999999998",
                  "gradePoints": "79",
                  "kcId": "0600053A",
                  "kname": "数字逻辑"
              },
              {
                  "cjId": "EB0E132584F434B8E053F720000A8592",
                  "username": "2010871107",
                  "dataXnxq": "2022-2023-1",
                  "kcXz": "50",
                  "xdXz": "1",
                  "ksXs": "1",
                  "credits": "2",
                  "grade": "1.56",
                  "gradePoints": "89",
                  "kcId": "4300002B",
                  "kname": "工程训练(二)"
              }
          ],
          "averageAllGrades": 3.354161849710983,
          "arithmeticMeanScore": 84.84615384615384
      }
    },
    reportList: [],
    averageJd: "",
    averagePjf: "",
    dialogShow: []
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
    this.parseList();
    this.setData({
      averageJd: this.data.raw.data.averageCurrentGrade.toFixed(4), // 绩点取小数点后四位
      averagePjf: this.data.raw.data.arithmeticMeanScore.toFixed(2) // 平均分取小数点后两位
    })
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

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 打开成绩详情
  showDialog(e: any) {
    const arr: any = this.data.reportList.filter(item => item.cjId === e.currentTarget.dataset.cjid)
    this.setData({ dialogShow: arr[0] })
    this.setData({ dialogVisible: true })
  },

  // 隐藏详情
  hideDialog() {
    this.setData({ dialogVisible: false })
  },

  // 学期选择方法
  handleDropdown(e: any) {
    this.setData({ termSelected: e.detail.value })
    // this.getReport();
  },

  // 获取成绩列表
  getReport() {
    wx.showLoading({ title: "加载中", mask: true })
  },

  parseList() {
    const list = this.data.raw.data.studentGrades;
    const emptyList = [];
    for(const item of list) {
      item.kcXz = getKcxz(item.kcXz)
      item.ksXs = getKsxs(item.ksXs)
      item.xdXz = getXdxz(item.xdXz)
      emptyList.push(item)
    }
    this.setData({
      reportList: emptyList
    })
  }
})
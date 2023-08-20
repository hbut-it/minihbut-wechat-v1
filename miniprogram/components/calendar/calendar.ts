// components/calendar/calendar.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    weekNowStr: "1",
    weekNow: 1,
    totalWeeks: 19,
    nowMonth: 1,
    get: {
      "code": 200,
      "message": "查询成功",
      "data": [
          {
              "csId": "02941fa262574cb896b7c42fbe1197e7",
              "dataXnxq": "2022-2023-2",
              "teacherName": "于邓波",
              "skLoc": "2-208",
              "timeWeek": "3",
              "timeJc": "11",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "创新理论基础",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9"
              ],
              "kweek": "4-9",
              "kweekStr": "4,5,6,7,8,9",
              "kquality": "通识教育选修课"
          },
          {
              "csId": "03a4fb1d3dd1410aba6cfe99f19c8047",
              "dataXnxq": "2022-2023-2",
              "teacherName": "顾巍",
              "skLoc": "3-403",
              "timeWeek": "2",
              "timeJc": "6",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "程序设计基础(二)-面向对象程序设计(C++)",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11"
              ],
              "kweek": "4-11",
              "kweekStr": "4,5,6,7,8,9,10,11",
              "kquality": "专业基础课"
          },
          {
              "csId": "16795e76a2a54108be045aa17484bb5f",
              "dataXnxq": "2022-2023-2",
              "teacherName": "孙永敏",
              "skLoc": "工1-A002",
              "timeWeek": "2",
              "timeJc": "11",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "思想道德与法治",
              "kweekStrList": [
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15"
              ],
              "kweek": "9-15",
              "kweekStr": "9,10,11,12,13,14,15",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "18ba704c45e545c7840ede3a6ba6f1d5",
              "dataXnxq": "2022-2023-2",
              "teacherName": "周宁琳",
              "skLoc": "2-005",
              "timeWeek": "6",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-1",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "8-17",
              "kweekStr": "8,9,10,11,12,13,14,15,16,17",
              "kquality": "学科基础课"
          },
          {
              "csId": "1afb02af02e64fdd9514b11229efd514",
              "dataXnxq": "2022-2023-2",
              "teacherName": "周宁琳",
              "skLoc": "2-007",
              "timeWeek": "7",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-1",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "8-17",
              "kweekStr": "8,9,10,11,12,13,14,15,16,17",
              "kquality": "学科基础课"
          },
          {
              "csId": "214c70d00abe403fb176b458a623d8fb",
              "dataXnxq": "2022-2023-2",
              "teacherName": "顾巍",
              "skLoc": "2-210",
              "timeWeek": "5",
              "timeJc": "7",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "程序设计基础(二)-面向对象程序设计(C++)",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11"
              ],
              "kweek": "4-11",
              "kweekStr": "4,5,6,7,8,9,10,11",
              "kquality": "专业基础课"
          },
          {
              "csId": "228865ef5b2d4926b8e5618793358561",
              "dataXnxq": "2022-2023-2",
              "teacherName": "顾巍",
              "skLoc": "6A3-1DE",
              "timeWeek": "5",
              "timeJc": "8",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "程序设计基础(二)-面向对象程序设计(C++)",
              "kweekStrList": [
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "12-14",
              "kweekStr": "12,13,14",
              "kquality": "专业基础课"
          },
          {
              "csId": "2395ef97306f41e789db984de2a9bc2b",
              "dataXnxq": "2022-2023-2",
              "teacherName": "顾巍",
              "skLoc": "3-403",
              "timeWeek": "2",
              "timeJc": "5",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "程序设计基础(二)-面向对象程序设计(C++)",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11"
              ],
              "kweek": "4-11",
              "kweekStr": "4,5,6,7,8,9,10,11",
              "kquality": "专业基础课"
          },
          {
              "csId": "273cc47d7ea34dc1bacb4bc84a33ebbe",
              "dataXnxq": "2022-2023-2",
              "teacherName": "胡超竹",
              "skLoc": "3-003",
              "timeWeek": "4",
              "timeJc": "3",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "线性代数",
              "kweekStrList": [
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "7-14",
              "kweekStr": "7,8,9,10,11,12,13,14",
              "kquality": "学科基础课"
          },
          {
              "csId": "2a40a88b2be642a19bea234f2d31ef27",
              "dataXnxq": "2022-2023-2",
              "teacherName": "周宁琳",
              "skLoc": "工1-A005",
              "timeWeek": "4",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-1",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "8-17",
              "kweekStr": "8,9,10,11,12,13,14,15,16,17",
              "kquality": "学科基础课"
          },
          {
              "csId": "2ad3b9b227f7465ca549ff603aaf83bd",
              "dataXnxq": "2022-2023-2",
              "teacherName": "胡超竹",
              "skLoc": "3-001",
              "timeWeek": "6",
              "timeJc": "4",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "线性代数",
              "kweekStrList": [
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "3-14",
              "kweekStr": "3,4,5,6,7,8,9,10,11,12,13,14",
              "kquality": "学科基础课"
          },
          {
              "csId": "2e1a98883ccf4b34abf13e8f9e2edcd7",
              "dataXnxq": "2022-2023-2",
              "teacherName": "廖军",
              "skLoc": "1-004",
              "timeWeek": "2",
              "timeJc": "1",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学物理（二）-1",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11"
              ],
              "kweek": "2-11",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11",
              "kquality": "学科基础课"
          },
          {
              "csId": "2e736067dff140ef954126504cb7e659",
              "dataXnxq": "2022-2023-2",
              "teacherName": "顾巍",
              "skLoc": "6A3-1CF",
              "timeWeek": "2",
              "timeJc": "8",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "程序设计基础(二)-面向对象程序设计(C++)",
              "kweekStrList": [
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "10-14",
              "kweekStr": "10,11,12,13,14",
              "kquality": "专业基础课"
          },
          {
              "csId": "48656f15c3af4640afb82e80bec9d497",
              "dataXnxq": "2022-2023-2",
              "teacherName": "王志华",
              "skLoc": "2-003",
              "timeWeek": "5",
              "timeJc": "5",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-2",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15"
              ],
              "kweek": "2-15",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11,12,13,14,15",
              "kquality": "学科基础课"
          },
          {
              "csId": "5e00ba7a0afa44f698a06d390516d021",
              "dataXnxq": "2022-2023-2",
              "teacherName": "孙永敏",
              "skLoc": "2-512",
              "timeWeek": "5",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "思想道德与法治",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "8-14",
              "kweekStr": "8,9,10,11,12,13,14",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "5f83ee856cf241c3a7e603b446a707cc",
              "dataXnxq": "2022-2023-2",
              "teacherName": "胡超竹",
              "skLoc": "3-003",
              "timeWeek": "4",
              "timeJc": "4",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "线性代数",
              "kweekStrList": [
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "7-14",
              "kweekStr": "7,8,9,10,11,12,13,14",
              "kquality": "学科基础课"
          },
          {
              "csId": "61d489928323441891f7e9e478f449a1",
              "dataXnxq": "2022-2023-2",
              "teacherName": "廖军",
              "skLoc": "1-004",
              "timeWeek": "2",
              "timeJc": "2",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学物理（二）-1",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11"
              ],
              "kweek": "2-11",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11",
              "kquality": "学科基础课"
          },
          {
              "csId": "65cb6223106e4bd7b0fee6ab03e9c560",
              "dataXnxq": "2022-2023-2",
              "teacherName": "于邓波",
              "skLoc": "2-208",
              "timeWeek": "3",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "创新理论基础",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9"
              ],
              "kweek": "4-9",
              "kweekStr": "4,5,6,7,8,9",
              "kquality": "通识教育选修课"
          },
          {
              "csId": "67a8725506ca4af685c80c248009b518",
              "dataXnxq": "2022-2023-2",
              "teacherName": "孙永敏",
              "skLoc": "工1-A002",
              "timeWeek": "2",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "思想道德与法治",
              "kweekStrList": [
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15"
              ],
              "kweek": "9-15",
              "kweekStr": "9,10,11,12,13,14,15",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "69cfc27dfcfd42eba87691692994db18",
              "dataXnxq": "2022-2023-2",
              "teacherName": "杜平高",
              "skLoc": "2-304",
              "timeWeek": "1",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学生心理健康教育",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
              ],
              "kweek": "4-8",
              "kweekStr": "4,5,6,7,8",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "7123128608574070bc87f4888018cf78",
              "dataXnxq": "2022-2023-2",
              "teacherName": "杜平高",
              "skLoc": "2-304",
              "timeWeek": "1",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学生心理健康教育",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
              ],
              "kweek": "4-8",
              "kweekStr": "4,5,6,7,8",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "75f77a0afd224bb18337c1fa2cc048c4",
              "dataXnxq": "2022-2023-2",
              "teacherName": "顾巍",
              "skLoc": "6A3-1DE",
              "timeWeek": "5",
              "timeJc": "7",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "程序设计基础(二)-面向对象程序设计(C++)",
              "kweekStrList": [
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "12-14",
              "kweekStr": "12,13,14",
              "kquality": "专业基础课"
          },
          {
              "csId": "79f1c85e4f3a4d1cbb53c2ac31531bc2",
              "dataXnxq": "2022-2023-2",
              "teacherName": "顾巍",
              "skLoc": "2-210",
              "timeWeek": "5",
              "timeJc": "8",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "程序设计基础(二)-面向对象程序设计(C++)",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11"
              ],
              "kweek": "4-11",
              "kweekStr": "4,5,6,7,8,9,10,11",
              "kquality": "专业基础课"
          },
          {
              "csId": "813af7330a6049098f9392b55ddef5b4",
              "dataXnxq": "2022-2023-2",
              "teacherName": "周宁琳",
              "skLoc": "2-005",
              "timeWeek": "6",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-1",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "8-17",
              "kweekStr": "8,9,10,11,12,13,14,15,16,17",
              "kquality": "学科基础课"
          },
          {
              "csId": "82845e8952d94116a5e3cb4303a73e4a",
              "dataXnxq": "2022-2023-2",
              "teacherName": "肖本新",
              "skLoc": "1-004",
              "timeWeek": "3",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "军事理论",
              "kweekStrList": [
                  "11",
                  "12",
                  "13",
                  "14",
                  "15"
              ],
              "kweek": "11-15",
              "kweekStr": "11,12,13,14,15",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "93202a079e454f7393d48819b9f91b64",
              "dataXnxq": "2022-2023-2",
              "teacherName": "孙永敏",
              "skLoc": "工1-A002",
              "timeWeek": "2",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "思想道德与法治",
              "kweekStrList": [
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15"
              ],
              "kweek": "9-15",
              "kweekStr": "9,10,11,12,13,14,15",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "9883daf3896e40cdb53ac2071da5035a",
              "dataXnxq": "2022-2023-2",
              "teacherName": "周宁琳",
              "skLoc": "2-007",
              "timeWeek": "7",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-1",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "8-17",
              "kweekStr": "8,9,10,11,12,13,14,15,16,17",
              "kquality": "学科基础课"
          },
          {
              "csId": "98be98b334ea4b8f895836dd64aec745",
              "dataXnxq": "2022-2023-2",
              "teacherName": "王志华",
              "skLoc": "2-003",
              "timeWeek": "3",
              "timeJc": "6",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-2",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16"
              ],
              "kweek": "2-16",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16",
              "kquality": "学科基础课"
          },
          {
              "csId": "9bf9e3720fdf488ea7589ea81faa0604",
              "dataXnxq": "2022-2023-2",
              "teacherName": "于邓波",
              "skLoc": "2-208",
              "timeWeek": "3",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "创新理论基础",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9"
              ],
              "kweek": "4-9",
              "kweekStr": "4,5,6,7,8,9",
              "kquality": "通识教育选修课"
          },
          {
              "csId": "a2b98fd4043443efb3af1f782a4b85af",
              "dataXnxq": "2022-2023-2",
              "teacherName": "王志华",
              "skLoc": "2-003",
              "timeWeek": "3",
              "timeJc": "5",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-2",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16"
              ],
              "kweek": "2-16",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16",
              "kquality": "学科基础课"
          },
          {
              "csId": "aa81094dfea240d0956a26d01a31d0f9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "周宁琳",
              "skLoc": "2-005",
              "timeWeek": "6",
              "timeJc": "11",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-1",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "8-17",
              "kweekStr": "8,9,10,11,12,13,14,15,16,17",
              "kquality": "学科基础课"
          },
          {
              "csId": "b01c5ae70c5840b3a804b501833c4955",
              "dataXnxq": "2022-2023-2",
              "teacherName": "顾巍",
              "skLoc": "6A3-1CF",
              "timeWeek": "2",
              "timeJc": "7",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "程序设计基础(二)-面向对象程序设计(C++)",
              "kweekStrList": [
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "10-14",
              "kweekStr": "10,11,12,13,14",
              "kquality": "专业基础课"
          },
          {
              "csId": "b04cc6b1692748be92000489d76f2501",
              "dataXnxq": "2022-2023-2",
              "teacherName": "王志华",
              "skLoc": "4-004",
              "timeWeek": "1",
              "timeJc": "8",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-2",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16"
              ],
              "kweek": "2-16",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16",
              "kquality": "学科基础课"
          },
          {
              "csId": "b0dc76372cb449cca319130188397f8b",
              "dataXnxq": "2022-2023-2",
              "teacherName": "王志华",
              "skLoc": "4-004",
              "timeWeek": "1",
              "timeJc": "7",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-2",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16"
              ],
              "kweek": "2-16",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16",
              "kquality": "学科基础课"
          },
          {
              "csId": "b44efcc1e9d34de192591be86e101fcf",
              "dataXnxq": "2022-2023-2",
              "teacherName": "周宁琳",
              "skLoc": "2-007",
              "timeWeek": "7",
              "timeJc": "11",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-1",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "8-17",
              "kweekStr": "8,9,10,11,12,13,14,15,16,17",
              "kquality": "学科基础课"
          },
          {
              "csId": "b77dead7ce3b40e1b4373fb621cac07e",
              "dataXnxq": "2022-2023-2",
              "teacherName": "周宁琳",
              "skLoc": "工1-A005",
              "timeWeek": "4",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-1",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "8-17",
              "kweekStr": "8,9,10,11,12,13,14,15,16,17",
              "kquality": "学科基础课"
          },
          {
              "csId": "c16729b22f26463e87888503c4f8fab3",
              "dataXnxq": "2022-2023-2",
              "teacherName": "胡超竹",
              "skLoc": "3-001",
              "timeWeek": "6",
              "timeJc": "3",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "线性代数",
              "kweekStrList": [
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "3-14",
              "kweekStr": "3,4,5,6,7,8,9,10,11,12,13,14",
              "kquality": "学科基础课"
          },
          {
              "csId": "d3093a36592a463ea9e96ae88665f6fa",
              "dataXnxq": "2022-2023-2",
              "teacherName": "廖军",
              "skLoc": "工1-B004",
              "timeWeek": "4",
              "timeJc": "1",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学物理（二）-1",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11"
              ],
              "kweek": "2-11",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11",
              "kquality": "学科基础课"
          },
          {
              "csId": "d6d01253f8e446f28ce8949c55aabb61",
              "dataXnxq": "2022-2023-2",
              "teacherName": "周宁琳",
              "skLoc": "工1-A005",
              "timeWeek": "4",
              "timeJc": "11",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-1",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "8-17",
              "kweekStr": "8,9,10,11,12,13,14,15,16,17",
              "kquality": "学科基础课"
          },
          {
              "csId": "daea577663f249568e026af8caea7ee8",
              "dataXnxq": "2022-2023-2",
              "teacherName": "孙永敏",
              "skLoc": "2-512",
              "timeWeek": "5",
              "timeJc": "11",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "思想道德与法治",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "8-14",
              "kweekStr": "8,9,10,11,12,13,14",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "dd94eaa0f2d44418b0db3d3f483c96bb",
              "dataXnxq": "2022-2023-2",
              "teacherName": "孙永敏",
              "skLoc": "2-512",
              "timeWeek": "5",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "思想道德与法治",
              "kweekStrList": [
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "8-14",
              "kweekStr": "8,9,10,11,12,13,14",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "df02c7e8aba842c7a6aee5d32e6dfb93",
              "dataXnxq": "2022-2023-2",
              "teacherName": "肖本新",
              "skLoc": "1-004",
              "timeWeek": "3",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "军事理论",
              "kweekStrList": [
                  "11",
                  "12",
                  "13",
                  "14",
                  "15"
              ],
              "kweek": "11-15",
              "kweekStr": "11,12,13,14,15",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "e153252d44c04d49b9d8bda491d9d7d6",
              "dataXnxq": "2022-2023-2",
              "teacherName": "王志华",
              "skLoc": "2-003",
              "timeWeek": "5",
              "timeJc": "6",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "高等数学(一)-2",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15"
              ],
              "kweek": "2-15",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11,12,13,14,15",
              "kquality": "学科基础课"
          },
          {
              "csId": "f29f7d96696e4914bf5fad94eda23b1e",
              "dataXnxq": "2022-2023-2",
              "teacherName": "肖本新",
              "skLoc": "1-004",
              "timeWeek": "3",
              "timeJc": "11",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "军事理论",
              "kweekStrList": [
                  "11",
                  "12",
                  "13",
                  "14",
                  "15"
              ],
              "kweek": "11-15",
              "kweekStr": "11,12,13,14,15",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "F63226F5ED952C1EE0536411000AE629",
              "dataXnxq": "2022-2023-2",
              "teacherName": "曾伟",
              "skLoc": "中心操场19",
              "timeWeek": "1",
              "timeJc": "3",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "体育-2-体育",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "2-17",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "F63226F5ED962C1EE0536411000AE629",
              "dataXnxq": "2022-2023-2",
              "teacherName": "曾伟",
              "skLoc": "中心操场19",
              "timeWeek": "1",
              "timeJc": "4",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "体育-2-体育",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "2-17",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "f66f3f8ccfcf428093902d5e5b229755",
              "dataXnxq": "2022-2023-2",
              "teacherName": "杜平高",
              "skLoc": "2-304",
              "timeWeek": "1",
              "timeJc": "11",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学生心理健康教育",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
              ],
              "kweek": "4-8",
              "kweekStr": "4,5,6,7,8",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "f77331bd50c13fe6e0536411000ac3d9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "李少帅",
              "skLoc": "工1-A002",
              "timeWeek": "3",
              "timeJc": "4",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "音乐鉴赏",
              "kweekStrList": [
                  "4",
                  "5",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12"
              ],
              "kweek": "4-5,7-12",
              "kweekStr": "4,5,7,8,9,10,11,12",
              "kquality": "限定性选修课"
          },
          {
              "csId": "f77331bd50c23fe6e0536411000ac3d9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "李少帅",
              "skLoc": "工1-A002",
              "timeWeek": "3",
              "timeJc": "3",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "音乐鉴赏",
              "kweekStrList": [
                  "4",
                  "5",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12"
              ],
              "kweek": "4-5,7-12",
              "kweekStr": "4,5,7,8,9,10,11,12",
              "kquality": "限定性选修课"
          },
          {
              "csId": "faeeabf2f39d25f1e0536411000a2cdc",
              "dataXnxq": "2022-2023-2",
              "teacherName": "魏忠明",
              "skLoc": "2-511",
              "timeWeek": "1",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "形势与政策-2",
              "kweekStrList": [
                  "13",
                  "14"
              ],
              "kweek": "13-14",
              "kweekStr": "13,14",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "faeeabf2f39e25f1e0536411000a2cdc",
              "dataXnxq": "2022-2023-2",
              "teacherName": "魏忠明",
              "skLoc": "2-511",
              "timeWeek": "1",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "形势与政策-2",
              "kweekStrList": [
                  "13",
                  "14"
              ],
              "kweek": "13-14",
              "kweekStr": "13,14",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "faeeabf2f39f25f1e0536411000a2cdc",
              "dataXnxq": "2022-2023-2",
              "teacherName": "魏忠明",
              "skLoc": "2-413",
              "timeWeek": "1",
              "timeJc": "10",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "形势与政策-2",
              "kweekStrList": [
                  "11",
                  "12"
              ],
              "kweek": "11-12",
              "kweekStr": "11,12",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "faeeabf2f3a025f1e0536411000a2cdc",
              "dataXnxq": "2022-2023-2",
              "teacherName": "魏忠明",
              "skLoc": "2-413",
              "timeWeek": "1",
              "timeJc": "9",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "形势与政策-2",
              "kweekStrList": [
                  "11",
                  "12"
              ],
              "kweek": "11-12",
              "kweekStr": "11,12",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4eef37ba53c6e0536411000a2a30",
              "dataXnxq": "2022-2023-2",
              "teacherName": "蒋满娟",
              "skLoc": "3-002",
              "timeWeek": "5",
              "timeJc": "3",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "中国近现代史纲要",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "2-6,9-14",
              "kweekStr": "2,3,4,5,6,9,10,11,12,13,14",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4eef37bb53c6e0536411000a2a30",
              "dataXnxq": "2022-2023-2",
              "teacherName": "蒋满娟",
              "skLoc": "3-002",
              "timeWeek": "5",
              "timeJc": "4",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "中国近现代史纲要",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "2-6,9-14",
              "kweekStr": "2,3,4,5,6,9,10,11,12,13,14",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4eef37be53c6e0536411000a2a30",
              "dataXnxq": "2022-2023-2",
              "teacherName": "蒋满娟",
              "skLoc": "3-002",
              "timeWeek": "6",
              "timeJc": "5",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "中国近现代史纲要",
              "kweekStrList": [
                  "3",
                  "4",
                  "5",
                  "6",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "3-6,9-14",
              "kweekStr": "3,4,5,6,9,10,11,12,13,14",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4eef37bf53c6e0536411000a2a30",
              "dataXnxq": "2022-2023-2",
              "teacherName": "蒋满娟",
              "skLoc": "3-002",
              "timeWeek": "6",
              "timeJc": "6",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "中国近现代史纲要",
              "kweekStrList": [
                  "3",
                  "4",
                  "5",
                  "6",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14"
              ],
              "kweek": "3-6,9-14",
              "kweekStr": "3,4,5,6,9,10,11,12,13,14",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eed733fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "7B-317",
              "timeWeek": "5",
              "timeJc": "2",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "4-12,14-17",
              "kweekStr": "4,5,6,7,8,9,10,11,12,14,15,16,17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eed833fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "7B-317",
              "timeWeek": "5",
              "timeJc": "1",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "4-12,14-17",
              "kweekStr": "4,5,6,7,8,9,10,11,12,14,15,16,17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eed933fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "7B-317",
              "timeWeek": "3",
              "timeJc": "2",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "4-17",
              "kweekStr": "4,5,6,7,8,9,10,11,12,13,14,15,16,17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eeda33fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "7B-317",
              "timeWeek": "3",
              "timeJc": "1",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17"
              ],
              "kweek": "4-17",
              "kweekStr": "4,5,6,7,8,9,10,11,12,13,14,15,16,17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eedb33fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "7B-317",
              "timeWeek": "1",
              "timeJc": "6",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "14",
                  "16",
                  "17"
              ],
              "kweek": "14,16-17",
              "kweekStr": "14,16,17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eedc33fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "7B-317",
              "timeWeek": "1",
              "timeJc": "5",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "14",
                  "16",
                  "17"
              ],
              "kweek": "14,16-17",
              "kweekStr": "14,16,17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eedd33fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "5B-003",
              "timeWeek": "1",
              "timeJc": "6",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "13"
              ],
              "kweek": "13",
              "kweekStr": "13",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eede33fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "5B-003",
              "timeWeek": "1",
              "timeJc": "5",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "13"
              ],
              "kweek": "13",
              "kweekStr": "13",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eedf33fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "5B-001",
              "timeWeek": "2",
              "timeJc": "4",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "17"
              ],
              "kweek": "17",
              "kweekStr": "17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc7b4ef0eee033fbe0536411000a0be9",
              "dataXnxq": "2022-2023-2",
              "teacherName": "张茜雯",
              "skLoc": "5B-001",
              "timeWeek": "2",
              "timeJc": "3",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学英语-2",
              "kweekStrList": [
                  "17"
              ],
              "kweek": "17",
              "kweekStr": "17",
              "kquality": "通识教育必修课"
          },
          {
              "csId": "fc98715045b04bf1b47747c50525701d",
              "dataXnxq": "2022-2023-2",
              "teacherName": "廖军",
              "skLoc": "工1-B004",
              "timeWeek": "4",
              "timeJc": "2",
              "studentNumber": "47208c4d42874874b13f7d20d31c3dbb",
              "kname": "大学物理（二）-1",
              "kweekStrList": [
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11"
              ],
              "kweek": "2-11",
              "kweekStr": "2,3,4,5,6,7,8,9,10,11",
              "kquality": "学科基础课"
          }
      ]
    },
    // 原始数据 - 模拟服务端返回内容
    raw: [],
    colors: [
      "#f3a683",
      "#f7d794",
      "#778beb",
      "#e77f67",
      "#cf6a87",
      "#786fa6",
      "#f8a5c2",
      "#63cdda",
      "#ea8685",
      "#596275"
    ],
    courseColors:[],
    // 学期开始时间
    startTime: 1676217600,
    // 学期结束时间
    endTime: 1690041600,
    // 课程时间范围
    leftTimeList: [
      { start: "8:20", end: "9:05" },
      { start: "9:10", end: "9:55" },
      { start: "10:15", end: "11:00" },
      { start: "11:05", end: "11:50" },
      { start: "14:00", end: "14:45" },
      { start: "14:50", end: "15:35" },
      { start: "15:55", end: "16:40" },
      { start: "16:45", end: "17:30" },
      { start: "18:30", end: "19:15" },
      { start: "19:20", end: "20:05" },
      { start: "20:10", end: "20:55" }
    ],
    // 根据周次划分的解析结果
    // 例如 this.data.courses[0] 为第一周的所有课程，以此类推
    // this.data.courses[0] 里会包含七个 array 从 0-6 对应周一到周日，以此类推
    courses: [],
    // 暂存的课程合并数组
    mergedCourses: [],
    currentWeekList: [],
    // 当前课表
    currentCourses: [],
    popupVisible: false,
    popupContent: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    turnLeft() {
      const now = this.data.weekNow
      if(now === 1) {
        return
      }
      this.setData({ weekNow: now - 1 })
      this.setData({ weekNowStr: this.data.weekNow.toString() })
      this.setData({ currentCourses: this.data.courses[this.data.weekNow - 1] })
      this.setData({ currentWeekList: this.getWeekAndDate(now - 1) })
    },
  
    turnRight() {
      const now = this.data.weekNow
      if(now === this.data.totalWeeks) {
        return
      }
      this.setData({ weekNow: now + 1 })
      this.setData({ weekNowStr: this.data.weekNow.toString() })
      this.setData({ currentCourses: this.data.courses[this.data.weekNow - 1] })
      this.setData({ currentWeekList: this.getWeekAndDate(now + 1) })
    },

    // 解析课程
    parse() {
      // 根据学期时间计算本学期周数并生成对应的数组
      var count = 0;
      while(this.semesterWeeks() > count) {
        this.data.courses.push(Array.from({ length: 7 }, () => []))
        count++
      }
      this.data.raw.sort((a, b) => parseInt(a.timeJc) - parseInt(b.timeJc))
      this.setData({
        raw: this.data.raw
      })
      var colorCount = 0
      for(const course of this.data.raw) {
        const courseList = this.data.courseColors.filter(item => item.kname === course.kname)
        if(courseList.length < 1) {
          course.color = this.data.colors[colorCount]
          this.data.courseColors.push(course)
          if(colorCount < 9) {
            colorCount++
          } else {
            colorCount = 0;
          }
        } else {
          course.color = courseList[0].color
        }
      }
      for(const course of this.data.raw) {
        let merged = false;
        for (const mergedCourse of this.data.mergedCourses) {
          if(mergedCourse.timeWeek === course.timeWeek && mergedCourse.kname === course.kname && mergedCourse.skLoc === course.skLoc) {
            const lastJieciArr = mergedCourse.timeJc.split('-')
            const lastJieciEnd = lastJieciArr[1]
            // 如果不存在连续节次
            if(lastJieciEnd === undefined) {
              // 判断已有节次是否与连续
              if(Math.abs(course.timeJc - mergedCourse.timeJc) === 1) {
                const jieciStart = Math.min(course.timeJc, mergedCourse.timeJc)
                const jieciEnd = Math.max(course.timeJc, mergedCourse.timeJc)
                mergedCourse.timeJc = `${jieciStart}-${jieciEnd}`
              } else {
                // 不连续则跳过本次循环
                continue
              }
            } else {
              // 如果存在连续节次，且最后的节次与当前节次是连续的
              if (Math.abs(course.timeJc - lastJieciEnd) === 1) {
                mergedCourse.timeJc = `${lastJieciArr[0]}-${course.timeJc}`
              } else {
                // 不连续则跳过本次循环
                continue
              }
            }
            merged = true;
            break;
          }
        }
        // 如果没有需要合并的则直接插入
        if (!merged) {
          this.data.mergedCourses.push(course)
        }
      }
      // 课程归类
      for (const course of this.data.mergedCourses) {
        // 根据周数进行遍历
        for (const week of course.kweekStrList) {
          // 构建新的数组结构
          const lesson = course.timeJc.split("-")
          const _course = {
            id: course.csId, // 课程ID
            name: course.kname, // 课程名称
            teacher: course.teacherName, // 教师
            lesson_start: lesson[0], // 课程开始节次
            lesson_end: (lesson.length === 2) ? lesson[1] : lesson[0], // 课程结束节次
            classroom: course.skLoc, // 上课地点
            color: course.color //方块颜色
          }
          this.data.courses[parseInt(week) - 1][parseInt(course.timeWeek) - 1].push(_course)
        }
      }
      return this.data.courses
    },
    // 计算学期周数
    semesterWeeks() {
      const startDate = new Date(this.data.startTime * 1000)
      const endDate = new Date(this.data.endTime * 1000)
      // 计算时间差（以秒为单位）
      const timeDiff = Math.abs(endDate - startDate) / 1000
      // 计算总周数
      const totalWeeks = Math.floor(timeDiff / (7 * 24 * 60 * 60))
      // 判断是否存在不满一周的最后一周
      const hasPartialWeek = timeDiff % (7 * 24 * 60 * 60) !== 0
      // 最终总周数
      const semesterWeeks = hasPartialWeek ? totalWeeks + 1 : totalWeeks
      this.setData({
        totalWeeks: semesterWeeks
      })
      return semesterWeeks
    },

    // 获取周数与对应日期
    getWeekAndDate(week) {
      const totalWeeks = this.semesterWeeks()
      const startOfWeek = new Date(this.data.startTime * 1000)
      if (week < 1 || week > totalWeeks) {
        // 无效的选择周数
        return []
      }
      // 获取起始日期的星期几
      const startDayOfWeek = startOfWeek.getDay()
      const weekStart = new Date(startOfWeek)
      weekStart.setDate(startOfWeek.getDate() + (week - 1) * 7 - startDayOfWeek + 1)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6);
      const weekDates = []
      const daysOfWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      this.setData({ nowMonth: new Date(weekStart).getMonth() + 1 })
      for(let i = 0; i < 7; i++) {
        const currentDate = new Date(weekStart)
        currentDate.setDate(weekStart.getDate() + i)
        const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate() < 10 ? "0" : ""}${currentDate.getDate()}`
        weekDates.push({
          title: daysOfWeek[i],
          date: formattedDate
        });
      }
      return weekDates
    },

    // 根据今天日期获取当前周数
    getCurrentWeekNumber() {
      if(Math.floor(new Date().getTime() / 1000) > this.data.endTime || Math.floor(new Date().getTime() / 1000) < this.data.startTime) {
        return 1
      }
      const start = new Date(this.data.startTime * 1000)
      const now = new Date()
      const startOfWeek = new Date(start)
      startOfWeek.setDate(start.getDate() - start.getDay()) // 将起始日期调整到本周的周日
      const diff = now - startOfWeek
      const currentWeekNumber = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1
      if(currentWeekNumber > this.semesterWeeks()) {
        return this.semesterWeeks()
      }
      return currentWeekNumber
    },

    // 获取本周与日期
    getCurrentWeekAndDate() {
      return this.getWeekAndDate(this.getCurrentWeekNumber())
    },

    onVisibleChange() {
      this.setData({
        popupVisible: false
      })
    },
    
    showPopup(e: any) {
      const arr: any = this.data.get.data.filter(item => item.csId === e.currentTarget.dataset.csid)
      this.setData({
        popupContent: arr[0],
        popupVisible: true
      })
    }
  },
  lifetimes: {
    attached() {
      this.data.raw = this.data.get.data
      this.parse() // 预处理并归类课程
      this.setData({
        currentWeekList: this.getCurrentWeekAndDate(), // 获取本周的日期列表
        currentCourses: this.data.courses[this.data.weekNow - 1] // 获取本周课程
      })
    }
  }
})

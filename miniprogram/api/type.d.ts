declare namespace API {
  // 基础返回
  type BaseResponse<T> = {
    code: number,
    message: string,
    data: T
  }

  // 学生信息
  type StudentInfo = {
    studentNumber: string,
    specialNum: string,
    username: string,
    sex: string,
    birthday: string,
    avatar: string,
    cid: number,
    departmentName: string,
    stuGrade: string,
    className: string,
    role: string,
    stuClassId: number,
    cprofession: string,
    email: string
  }

  // 登录请求参数
  type AuthParams = {
    username: string,
    password: string
  }

  // 登录返回
  type AuthResult = {
    tokenHead: string,
    student: StudentInfo,
    token: string
  }

  // 成绩查询请求参数
  type ReportParams = {
    semester: string
  }

  // 单科成绩详情
  type ReportItem = {
    cjId: string,
    username: string,
    dataXnxq: string,
    kcXz: string,
    xdXz: string,
    ksXs: string,
    credits: string,
    grade: string,
    gradePoints: string,
    kcId: string,
    kname: string
  }

  // 成绩查询返回
  type ReportResult = {
    averageCurrentGrade: number,
    studentGrades: ReportItem[],
    averageAllGrades: number,
    arithmeticMeanScore: number
  }

  // 我的课表请求参数
  type CalendarParams = {
    xnxq: string
  }

  // 课表单科详情
  type CalendarItem = {
    csId: string,
    dataXnxq: string,
    teacherName: string,
    skLoc: string,
    timeWeek: string,
    timeJc: string,
    studentNumber: string,
    kweekStrList: string[],
    kquality: string,
    kweekStr: string,
    kname: string,
    kweek: string
  }

  // 课表返回
  type CalendarResult = CalendarItem[]

  // 添加自定义课程请求参数
  type CalendarAddParams = {
    kc_name: string,
    teacher_name: string,
    kc_feature: string,
    xnxq: string,
    kc_week_begin: string,
    kc_week_end: string,
    kc_jieci: string,
    kc_loc: string
  }

  // 添加自定义课程返回
  type CalendarAddResult = CalendarItem[]

  // 删除课程请求参数
  type CalendarRemoveParams = {
    csId: string
  }

  // 删除课程返回
  // type CalendarRemoveResult = {}

  // 学院某个年级所有班级请求参数
  type CollegeClassParams = {
    institute: string,
    grade: string
  }

  // 学院某个年级所有班级返回
  type CollegeClassResult = string[]

  // 班级课表请求参数
  type CalendarClassParams = {
    xnxq: string,
    className: string
  }

  // 考场查询请求参数
  type ExamParams = {
    xnxq: string
  }

  // 考场详情
  type ExamItem = {
    examRoomId: string,
    ksName: string,
    dataXnxq: string,
    ksTime: string,
    ksLocation: string,
    ksPc: string,
    ksZwh: string,
    ksFs: string,
    studentNumber: string
  }

  // 考场查询返回
  type ExamResult = ExamItem[]

  // 空教室查询请求参数
  type ClassroomParams = {
    bid: string,
    week: string,
    xingqi: string,
    jieci: string[],
    page: string
  }

  // 给分查询请求参数(模糊查询)
  type StatisticsParams = {
    courseName: string,
    teacherName: string
  }

  // 给分查询课程详情
  type StatisticsItem = {
    kcMc: string,
    teacherName: string
  }

  // 给分查询返回
  type StatisticsResult = StatisticsItem[]

  // 给分查询详情展示请求参数(精准查询)
  type StatisticsDetailParams = {
    kcName: string,
    teacherName: string
  }

  // 给分查询详情展示返回
  type StatisticsDetailResult = {
    kcMc: string,
    teacherName: string,
    maxGrade: string,
    meanGrade: string, // 平均成绩
    sampleNum: string,
    updateDatetime: string,
    gradesGreaterThan90: string,
    gradesBetween80And90: string,
    gradesBetween70And80: string,
    gradesBetween60And70: string,
    gradesLessThan60: string
  }

  // 获取学期开始和结束时间请求参数
  type TermRangeParams = {
    xnxq: string
  }

  // 获取学期开始和结束时间返回
  type TermRangeResult = {
    start: {
      str: string,
      timestamp: string
    },
    end: {
      str: string,
      timestamp: string
    }
  }

  // 获取所有学年学期返回
  type TermAllResult = string[]
}
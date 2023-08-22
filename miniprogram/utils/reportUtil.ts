/**
 * 课程性质：11、通识教育必修课，12、通识教育选修课，16、限定性选修课，31、学科基础课，32、工程基础课，40、专业核心课，41、专业方向组选课，42、专业任选课，43、专业基础课，44、专业必修课，45、专业选修课，50、基础实践，51、专业实践，52、综合实践，53、其他实践，54、短学期实践，70、辅修双学位理论，71、辅修双学位实践，90、必修，98、重修课，99、公共选修课
 */
export const getKcxz = (kcxzType: string) => {
  switch(kcxzType) {
    default:
      return "未知"
    case "11":
      return "通识教育必修课"
    case "12":
      return "通识教育选修课"
    case "16":
      return "限定性选修课"
    case "31":
      return "学科基础课"
    case "32":
      return "工程基础课"
    case "40":
      return "专业核心课"
    case "41":
      return "专业方向组选课"
    case "42":
      return "专业任选课"
    case "43":
      return "专业基础课"
    case "44":
      return "专业必修课"
    case "45":
      return "专业选修课"
    case "50":
      return "基础实践"
    case "51":
      return "专业实践"
    case "52":
      return "综合实践"
    case "53":
      return "其他实践"
    case "54":
      return "短学期实践"
    case "70":
      return "辅修双学位理论"
    case "71":
      return "辅修双学位实践"
    case "90":
      return "必修"
    case "98":
      return "重修课"
    case "99":
      return "公共选修课"
  }
}

/**
 * 考试形式：1、考试，2、考查，111、一级考试，222、二级考试，333、三级考试
 */
export const getKsxs = (ksxsType: string) => {
  switch(ksxsType) {
    default:
      return "未知"
    case "1":
      return "考试"
    case "2":
      return "考查"
    case "111":
      return "一级考试"
    case "222":
      return "二级考试"
    case "333":
      return "三级考试"
  }
}

/**
 * 修读性质：1、初修，2、重修
 */
export const getXdxz = (xdxzType: string) => {
  switch(xdxzType) {
    default:
      return "未知"
    case "1":
      return "初修"
    case "2":
      return "重修"
  }
}
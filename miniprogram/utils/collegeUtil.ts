/**
 * 学院名称：113、教务处，115、党委研究生工作部、研究生院，201、机械工程学院，202、电气与电子工程学院，206、计算机学院，203、材料与化学工程学院，204、生物工程与食品学院，205、土木建筑雨环境学院，207、艺术设计学院，209、经济与管理学院，211、外国语学院，212、理学院，208、工业设计学院，214、职业技术师范学院，215、国际学院，313、数字艺术产业学院，217、底特律绿色工业学院
 */
export const getCollegeName = (collegeId: string) => {
  switch(collegeId) {
    default:
      return "湖北工业大学"
    case "113":
      return "教务处"
    case "115":
      return "党委研究生工作部、研究生院"
    case "201":
      return "机械工程学院"
    case "202":
      return "电气与电子工程学院"
    case "206":
      return "计算机学院"
    case "203":
      return "材料与化学工程学院"
    case "204":
      return "生物工程与食品学院"
    case "205":
      return "土木建筑与环境学院"
    case "207":
      return "艺术设计学院"
    case "209":
      return "经济与管理学院"
    case "211":
      return "外国语学院"
    case "212":
      return "理学院"
    case "208":
      return "工业设计学院"
    case "214":
      return "职业技术师范学院"
    case "215":
      return "国际学院"
    case "313":
      return "数字艺术产业学院"
    case "217":
      return "底特律绿色工业学院"
  }
}
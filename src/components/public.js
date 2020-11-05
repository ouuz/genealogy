const ExportJsonExcel = require('js-export-excel')

/**
 * @description: 导出家族成员信息并下载
 * @param {Function} genealogy 家族成员信息
 */
function downloadExcel(genealogy) {
  let option = {}
  let data = []

  const getInformation = (tree) => {
    for (const node of tree) {
      node.maritalStatus =  node.maritalStatus ? "是" : "否"
      node.livingStatus =  node.livingStatus ? "是" : "否"
      node.mateName = node.mate ? node.mate.name : ""
      data.push(node)
      if(node.mate){
        node.mate.maritalStatus =  node.mate.maritalStatus ? "是" : "否"
        node.mate.livingStatus =  node.mate.livingStatus ? "是" : "否"
        node.mate.mateName = node.name
        data.push(node.mate)
      }
      if (node.children && node.children.length) {
        getInformation(node.children)
      }
    }
  }

  getInformation(genealogy)

  if (data) {
    option.fileName = "家族成员信息"
    option.datas = [
      {
        sheetData: data,
        sheetName: '家族成员信息表',
        sheetFilter: ["name","birthday","maritalStatus","address","livingStatus","dateOfDeath","mateName"],
        sheetHeader: ["名字","出生日期","是否婚配","家庭住址","是否健在","死亡日期","配偶姓名"]
      }
    ]
  }
  const exportExcel = new ExportJsonExcel(option)
  exportExcel.saveExcel()
}

/**
 * @description: 更改日期格式
 * @param {String} format 要求的日期格式
 * @param {Date} date 需要更改格式的日期
 */
function dateFormat(format, date) {
  let retested;
  const option = {
    "m+": (date.getMonth() + 1).toString(),
    "d+": date.getDate().toString(),
  };
  for (let k in option) {
    retested = new RegExp("(" + k + ")").exec(format);
    if (retested) {
      format = format.replace(retested[1], (retested[1].length === 1) ? (option[k]) : (option[k].padStart(retested[1].length, "0")))
    };
  };
  return format;
}

/**
 * @description: 个人信息展示组件
 * @param {Object} person 用户信息
 */
const Information = ({person}) => {
  return (
    <div className="information">
      <div className={person.livingStatus ? "portraitImgShow" : "defunct"}>
        <div></div>
        <img src={window.location.origin + person.portraitUrl} alt={person.name} />
      </div>
      <div className="name">
        <p>{person.name}</p>
      </div>
      <div className="details">
        <p>出生日期：<span className="birthdayDate">{person.birthday}</span></p>
        <p>家庭地址：{person.address}</p>
        {
          !person.livingStatus 
          ? <p>死亡日期：{person.dateOfDeath}</p>
          : null
        }
      </div>
    </div>
  )
}

/**
 * @description: 搜索功能以及下载功能容器组件
 * @param {Function} setSearch 更改当前搜索的条件
 * @param {Array} genealogy 家族成员信息
 */
const SearchBox = ({setSearch,genealogy}) => {
  return (
    <div className="search">
      <button onClick={() => setSearch("name")}>按照姓名查询</button>
      <button onClick={() => setSearch("birthday")}>按照出生日期查询</button>
      <button onClick={() => setSearch("relationship")}>查询直系祖先后裔关系</button>
      <button onClick={() => downloadExcel(genealogy)}>导出家族信息文件</button>
    </div>
  )
}

export {Information,SearchBox,dateFormat}
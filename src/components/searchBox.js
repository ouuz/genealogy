import React, { useState } from 'react';

/**
 * @description: 按姓名搜索成员组件
 * @param {Function} setSearch 更改搜索条件
 */
const SearchNameBox = ({setSearch}) => {
  const [firstName,setFirstName] = useState("")

  /**
   * @description: 按姓名搜索
   * @param {String} name 搜索条件名字
   */
  const searchByName = (name) => {
    if(name === ""){
      alert("你还没有输入噢~")
    }else{
      let nodeList = document.querySelectorAll(".information")
      let node
      for(let child of nodeList){
        node = child.parentNode.parentNode
        node.className = ""
        if(child.innerText === name){
          node.className = "searchNode"
          setSearch("")
          return;
        }
      }
      alert("没有搜到这个人噢！家里好像没有这个人欸~")
    }
  }

  return (
    <div className="searchBox">
      <div>
        <p>按照姓名查询
          <button 
            onClick={() => setSearch("")}
            className="close"
          >
            <img src={window.location.origin + "/assets/closes.png"} alt="关闭" />
          </button>
        </p>
        <div>
          <p>
            <label htmlFor="title">要查询的姓名：</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </p>
          <p>
            <button onClick={() => searchByName(firstName)}>查询</button>
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * @description: 按照出生日期查询组件
 * @param {Function} setSearch 更改搜索条件
 */
const SearchBirthdayBox = ({setSearch}) => {
  const [date,setDate] = useState("")

  /**
   * @description: 按照出生日期查询
   * @param {String} birthday 搜索条件出生日期
   */
  const searchByBirthday = (birthday) => {
    if(birthday === ""){
      alert("你还没有输入噢~")
    }else{
      let nodeList = document.querySelectorAll(".birthdayDate")
      let node
      for(let child of nodeList){
        node = child.parentNode.parentNode.parentNode.parentNode.parentNode
        node.className = ""
        if(child.innerText === birthday){     
          node.className = "searchNode"
          setSearch("")
          return;
        }
      }
      alert("没有搜到这个人噢！这一天好像家里没人出生噢~")
      setSearch("")
    }
  }

  return (
    <div className="searchBox">
      <div>
        <p>按照出生日期查询
          <button 
            onClick={() => setSearch("")}
            className="close"
          >
            <img src={window.location.origin + "/assets/closes.png"} alt="关闭" />
          </button>
        </p>
        <div>
          <p>
            <label htmlFor="title">要查询的出生日期：</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </p>
          <p>
            <button onClick={() => searchByBirthday(date)}>查询</button>
          </p>
        </div> 
      </div>
    </div>
  )
}

/**
 * @description: 查询直系祖先后裔关系组件
 * @param {Function} setSearch 更改搜索条件
 */
const SearchRelationshipBox = ({setSearch}) => {
  const [name,setName] = useState("")
  const [comparativeName,setComparativeName] = useState("")

  /**
   * @description: 查询直系祖先后裔关系
   * @param {String} name 搜索条件之一名字
   * @param {String} comparativeName 搜索条件之一名字
   */
  const searchRelationship = (name,comparativeName) => {
    let nodeList = document.querySelectorAll(".information")
    let result = "具有直系祖先后裔关系"
    for(let child of nodeList){
      if(child.innerText === name || child.innerText === comparativeName){
        if(child.parentNode.classList.contains("mate")){
          result = "不具有直系祖先后裔关系"
          break ;
        }
      }
    }
    alert(result)
    setSearch("")
  }

  return (
    <div className="searchBox">
      <div>
        <p>查询直系祖先后裔关系
          <button 
            onClick={() => setSearch("")}
            className="close"
          >
            <img src={window.location.origin + "/assets/closes.png"} alt="关闭" />
          </button>
        </p>
        <div>
          <p>
            <label htmlFor="title">第一个人姓名：</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          </p>
          <p>
            <label htmlFor="title">第二个人姓名：</label>
            <input type="text" value={comparativeName} onChange={(e) => setComparativeName(e.target.value)}/>
          </p>
          <p>
            <button onClick={() => searchRelationship(name,comparativeName)}>查询</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export {SearchNameBox, SearchBirthdayBox, SearchRelationshipBox} 

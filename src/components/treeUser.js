import React, { useState } from 'react';
import {SearchNameBox,SearchBirthdayBox,SearchRelationshipBox} from './searchBox'
import {Information,SearchBox,dateFormat} from './public'

/**
 * @description: 普通用户树图组件
 * @param {Array} data 用于创建树图的数据
 * @param {Function} getPermissions 更改当前用户的身份状态
 */
const TreeUser = ({data,getPermissions}) => {
  const [search,setSearch] = useState("")
  const today = dateFormat("mm-dd", new Date())

  /**
   * @description: 用户信息展示节点渲染模板
   * @param {Object} person 用户信息
   * @param {String} desc 当前用户是否为配偶
   */
  const nodeTemplate = (person,desc) => {
    return (
      <div className={`node ${desc === "mate" ? "mate" : ""}`} >
        <img 
          src={window.location.origin + "/assets/生日帽2.png"} 
          alt="生日" 
          className={`birthday ${dateFormat("mm-dd", new Date(person.birthday)) === today ? "show" : "hidden"}`}/>
        <Information person={person}/>
      </div>
    )
  }

  /**
   * @description: 创建树图
   * @param {Array} data 用于创建树图的数据
   */
  const createNode = (data) => {
    let nodes
    if (Object.prototype.toString.call(data) === "[object Array]") {
      nodes = data.map((person,index) => {
        let node = (
          <li key={index}>  
            { nodeTemplate(person,"node") }
            { person.mate ? nodeTemplate(person.mate,"mate") : null}
          </li>)
        if (person.children && person.children.length) {
          node = (
            <li key={index}>
              { nodeTemplate(person,"node") }
              { person.mate ? nodeTemplate(person.mate,"mate") : null}
              { createNode(person.children)}    
            </li>)
        }
        return node
      })
    }
    return ( <ul>{nodes}</ul> )
  }

  return (
    <div className="tree">
      <button onClick={() => getPermissions("exit")} className="exit">退出登录</button>
      <ul className="treeList" > 
        { createNode(data) }   
      </ul>
      <SearchBox setSearch={setSearch} genealogy={data}/>
      {(() => {
        switch(search){
          case "name"  : 
            return <SearchNameBox setSearch={setSearch}/>;
          case "birthday": 
            return <SearchBirthdayBox setSearch={setSearch}/>;
          case "relationship": 
            return <SearchRelationshipBox setSearch={setSearch}/>;
          default : 
            return ;
        }
      })()}  
    </div>
  )
}

export default TreeUser

import React, { useState } from 'react';
import {SearchNameBox,SearchBirthdayBox,SearchRelationshipBox} from './searchBox'
import {IncreasedAndModify} from './increasedAndModify'
import {Information,SearchBox,dateFormat} from './public'

/**
 * @description: 管理员树图组件
 * @param {Array} data 用于创建树图的数据
 * @param {Function} getPermissions 更改当前用户的身份状态
 */
const TreeRoot = ({data,getPermissions}) => {
  const [genealogy, setGenealogy] = useState(data)
  const [change,setChange] = useState(false)
  const [showForm,setShowForm] = useState(false)
  const [current,setCurrent] = useState("爸爸")
  const [currentInformation,setCurrentInformation] = useState("爸爸")
  const [parent,setParent] = useState("爸爸")
  const [status,setStatus] = useState("")
  const [search,setSearch] = useState("")
  const [mate,setMate] = useState("爸爸")
  const today = dateFormat("mm-dd", new Date())

  /**
   * @description: 更新用户信息
   * @param {*} tree 当前循环的列表
   * @param {*} parent 当前选中准备进行操作的用户的父节点姓名
   * @param {*} current 当前选中准备进行操作的用户姓名
   * @param {*} updateInformation 需要更新的用户信息
   */
  const updatePerson = (tree,parent,current,updateInformation) => {
    let list = genealogy;
    for (let node of tree) {
      if (node.name === parent) {
        let index = node.children.findIndex(child => child.name === current)
        if(index !== -1){
          node.children.splice(index,1)
          for(let childIndex in node.children){
            if(node.children[childIndex].birthday > updateInformation.birthday){
              node.children.splice(childIndex,0,updateInformation)
              setGenealogy(list)
              setChange(!change)
              return null
            }
          }
          node.children.push(updateInformation)
          setGenealogy(list)
          setChange(!change)
          return null
        }
      }
      if (node.children) {
        updatePerson(node.children,parent,current,updateInformation)
      }
    }
  }

  /**
   * @description: 增加孩子信息
   * @param {*} tree 当前循环的列表
   * @param {*} parent 当前选中准备进行操作的用户的父节点姓名
   * @param {*} newPerson 需要增加的孩子信息
   */
  const addPerson = (tree,parent,newPerson) => {
    let list = genealogy;
    for (const node of tree) {
      if (node.name === parent) {
        for(let childIndex in node.children){
          if(node.children[childIndex].birthday > newPerson.birthday){
            node.children.splice(childIndex,0,newPerson)
            setGenealogy(list)
            setChange(!change)
            return null
          }
        }
        node.children.push(newPerson)
        setGenealogy(list)
        setChange(!change)
        return null
      }
      if (node.children) {
        addPerson(node.children, parent,newPerson)
      }
    }
  }

  /**
   * @description: 删除孩子
   * @param {*} tree 当前循环的列表
   * @param {*} parent 当前选中准备进行操作的用户的父节点姓名
   * @param {*} deleteChildName 需要删除的孩子姓名
   */
  const deleteChild = (tree,parent,deleteChildName) => {
    let list = genealogy;
    for (const node of tree) {
      if (node.name === parent) {
        let index  = node.children.findIndex(child => child.name === deleteChildName)
        if(index !== -1){
          node.children.splice(index,1)
          setGenealogy(list)
          setChange(!change)
        }
        return null
      }
      if (node.children) {
        deleteChild(node.children, parent,deleteChildName)
      }
    }
  }

  /**
   * @description: 
   * @param {*} tree 当前循环的列表
   * @param {*} deleteMateName 需要删除的配偶姓名
   */
  const deleteMate = (tree,deleteMateName) => {
    let list = genealogy;
    for (const node of tree) {
      if (node.name === deleteMateName) {
        delete node.mate
        setGenealogy(list)
        setChange(!change)
        return null
      }
      if (node.children) {
        deleteMate(node.children,deleteMateName)
      }
    }
  }

  /**
   * @description: 展示更新用户信息的表单
   */
  const showUpdateBox = () => {

    function findPerson (tree,current) {
      for (let node of tree) {
        if (node.name === current) {
          setCurrentInformation(node)
        }
        if (node.children) {
          findPerson(node.children,current)
        }
      }
    }

    findPerson(genealogy,current)
    setStatus("update")
    setShowForm(true)
  }

  /**
   * @description: 展示增加孩子信息的表单
   */
  const showAddBox = () => {
    setStatus("add")
    setShowForm(true)
  }

  /**
   * @description: 用户信息展示节点渲染模板
   * @param {Object} person 用户信息
   * @param {String} desc 当前用户是否为配偶
   */
  const nodeTemplate = (person,desc) => {
    return (
      <div className={`node ${desc === "mate" ? "mate" : ""}`} onClick={((e) => operator(e))}>
        {
          desc === "node" 
          ? <div className="operation operationHidden">
              <button onClick={() => showAddBox()}>增加孩子</button>
              <button onClick={() => deleteChild(genealogy,parent,current)}>删除</button>
              <button onClick={() => showUpdateBox()}>修改</button>
            </div>
          : <div className="operation operationHidden">
              <button onClick={() => deleteMate(genealogy,mate)}>删除</button>
            </div>
        }
        <img 
          src={window.location.origin + "/assets/生日帽2.png"} 
          alt="生日" 
          className={`birthday ${dateFormat("mm-dd", new Date(person.birthday)) === today ? "show" : "hidden"}`}/>
        <Information person={person} />
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

  /**
   * @description: 获取当前操作的用户的姓名、配偶的姓名、父亲的姓名
   * @param {*} e 根据e.currentTarget来获取当前操作的用户
   */
  const operator = (e) => {
    e.currentTarget.firstChild.className = 
    e.currentTarget.firstChild.className === "operation operationShow" 
      ? "operation operationHidden" 
      : "operation operationShow"
    let parent = e.currentTarget.lastChild.parentNode.parentNode.parentNode.parentNode.firstChild.lastChild.innerText
    setParent(parent)
    let current = e.currentTarget.lastChild.children[1].innerText
    setCurrent(current)
    let mate = e.currentTarget.lastChild.parentNode.parentNode.firstChild.lastChild.innerText
    setMate(mate)
  }

  return (
    <div className="tree">
      <button onClick={() => getPermissions("exit")} className="exit">退出登录</button>
      <ul className="treeList" > 
        { createNode(genealogy) }   
      </ul>
      {
        showForm 
        ?<div className="inputForm">
          <button 
            onClick={() => { setShowForm(false); setStatus("")}}
            className="close"
          >
            <img src={window.location.origin + "/assets/close.png"} alt="关闭" />
          </button>
          <IncreasedAndModify 
            currentInformation={currentInformation}
            status={status}
            genealogy={genealogy}
            current={current}
            addPerson={addPerson}
            updatePerson={updatePerson}
            parent={parent}
            setShowForm={setShowForm}
          />
        </div> 
        : null
      }
      <SearchBox setSearch={setSearch} genealogy={genealogy}/>
      {(() => {
        switch(search){
          case "name"  : 
            return <SearchNameBox setSearch={setSearch}/>;
          case "birthday": 
            return <SearchBirthdayBox setSearch={setSearch}/>;
          case "relationship": 
            return <SearchRelationshipBox setSearch={setSearch}/>;
          default :
            return;
        }
      })()}  
    </div>
  )
}

export default TreeRoot

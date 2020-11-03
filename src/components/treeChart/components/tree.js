import React, { useState, useEffect} from 'react';
import Form from './form'

const Tree = ({data}) => {
  const [genealogy, setGenealogy] = useState(data)
  const [change,setChange] = useState(false)
  const [showForm,setShowForm] = useState(false)
  const [current,setCurrent] = useState("爸爸")
  const [currentInformation,setCurrentInformation] = useState("爸爸")
  const [parent,setParent] = useState("爸爸")
  const [status,setStatus] = useState()
  const [mate,setMate] = useState("爸爸")
  const today = new Date().toLocaleDateString()

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

  const deleteMate = (tree,mate,deleteMateName) => {
    let list = genealogy;
    for (const node of tree) {
      if (node.name === mate) {
        delete node.mate
        setGenealogy(list)
        setChange(!change)
        return null
      }
      if (node.children) {
        deleteMate(node.children, mate,deleteMateName)
      }
    }
  }

  const findPerson = (tree,current) => {
    for (let node of tree) {
      if (node.name === current) {
        setCurrentInformation(node)
      }
      if (node.children) {
        findPerson(node.children,current)
      }
    }
  }

  const showUpdateBox = () => {
    findPerson(genealogy,current)
    setStatus("update")
    setShowForm(true)
  }

  const showAddBox = () => {
    setStatus("add")
    setShowForm(true)
  }

  const nodeTemplate = (person) => {
    return (
      <div className="node" onClick={((e) => operator(e))}>
        <div className="operation operationHidden">
          <button onClick={() => showAddBox()}>增加孩子</button>
          <button onClick={() => deleteChild(genealogy,parent,current)}>删除</button>
          <button onClick={() => showUpdateBox()}>修改</button>
        </div>
        {
          person.birthday === today 
          ? <img src={window.location.origin + "/assets/生日帽2.png"} alt="生日" className="birthday"/>
          : null
        }
        <div className="information">
          {
            person.livingStatus 
            ? <img src={window.location.origin + person.portraitUrl} alt={person.name} />
            : <div className="defunct">
                <div></div>
                <img src={window.location.origin + person.portraitUrl} alt={person.name} />
              </div>
          }
          <p>{person.name}</p>
          <div className="details">
            <p>出生日期：{person.birthday}</p>
            <p>家庭地址：{person.address}</p>
            {
              !person.livingStatus 
              ? <p>死亡日期：{person.dateOfDeath}</p>
              : null
            }
          </div>
        </div>
      </div>
    )
  }

  const mateNodeTemplate = (person) => (
    <div className="node mate" onClick={((e) => operator(e))}>
      <div className="operation operationHidden">
        <button onClick={() => deleteMate(genealogy,mate,current)}>删除</button>
        <button>修改</button>
      </div>
      {
        person.birthday === today 
        ? <img src={window.location.origin + "/assets/生日帽2.png"} alt="生日" className="birthday"/>
        : null
      }
      <div className="information">
        {
          person.livingStatus 
          ? <img src={window.location.origin + person.portraitUrl} alt={person.name} />
          : <div className="defunct">
              <div></div>
              <img src={window.location.origin + person.portraitUrl} alt={person.name} />
            </div>
        }
        <p>{person.name}</p>
        <div className="details">
          <p>出生日期：{person.birthday}</p>
          <p>家庭地址：{person.address}</p>
          {
            !person.livingStatus 
            ? <p>死亡日期：{person.dateOfDeath}</p>
            : null
          }
        </div>
      </div>   
    </div>
  )

  const createNode = (data) => {
    let nodes
    if (Object.prototype.toString.call(data) === "[object Array]") {
      nodes = data.map((person,index) => {
        let node = (
          <li key={index}>  
            { nodeTemplate(person) }
            { person.mate ? mateNodeTemplate(person.mate) : null}
          </li>)
        if (person.children && person.children.length) {
          node = (
            <li key={index}>
              { nodeTemplate(person) }
              { person.mate ? mateNodeTemplate(person.mate) : null}
              { createNode(person.children)}    
            </li>)
        }
        return node
      })
    }
    return ( <ul>{nodes}</ul> )
  }

  const operator = (e) => {
    let informationDom = e.target.className === "information" ? e.target : e.target.parentNode
    informationDom.parentNode.firstChild.className = 
    informationDom.parentNode.firstChild.className === "operation operationShow" 
      ? "operation operationHidden" 
      : "operation operationShow"
    let parent = informationDom.parentNode.parentNode.parentNode.parentNode.firstChild.lastChild.innerText
    setParent(parent)
    if(informationDom.children[1].innerText !== "删除"){
      let current = informationDom.children[1].innerText
      setCurrent(current)
    }
    let mate = informationDom.parentNode.parentNode.firstChild.lastChild.innerText
    setMate(mate)
  }

  return (
    <div className="tree">
      <ul className="treeList" > 
      { createNode(genealogy) }   
      </ul>
      {
        showForm 
        ? <Form 
            person={currentInformation}
            change={change}
            setChange={setChange}
            parent={parent}
            setGenealogy={setGenealogy}
            current={current}
            genealogy={genealogy}
            operator={status}
            setShowForm={setShowForm}
          />
        : null
      }

    </div>
  )

}

export default Tree

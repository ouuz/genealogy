import React, { useState, useEffect} from 'react';

const Form = ({person,setShowForm,operator,change,setChange,parent,setGenealogy,current,genealogy}) => {
  const [name,setName] = useState(person.name)
  const [birthday,setBirthday] = useState()
  const [maritalStatus,setMaritalStatus] = useState()
  const [address,setAddress] = useState()
  const [initialize,setInitialize] = useState(false) 

  const updatePerson = (tree,parent,current,updateInformation) => {
    let list = genealogy;
    for (let node of tree) {
      if (node.name === parent) {
        let index = node.children.findIndex(child => child.name === current)
        if(index !== -1){
          node.children.splice(index,1,updateInformation)
          setGenealogy(list)
          setChange(!change)
        }
        return null
      }
      if (node.children) {
        updatePerson(node.children,parent,current,updateInformation)
      }
    }
  }

  const update = () => {
    let information = {
      "name": name,
      "birthday": birthday,
      "maritalStatus": true,
      "address": address,
      "livingStatus": true,
      "dateOfDeath": "",
      "portraitUrl":"/assets/婴儿.png",
      "children": []
    }
    updatePerson(genealogy,parent,current,information)
  }

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

  const add = () => {
    let information = {
      "name": name,
      "birthday": birthday,
      "maritalStatus": true,
      "address": address,
      "livingStatus": true,
      "dateOfDeath": "",
      "portraitUrl":"/assets/婴儿.png",
      "children": []
    }
    addPerson(genealogy,current,information)
  }

  return (
    <div className="inputForm">
      <button onClick={() => setShowForm(false)}>关闭</button>
      <div>
        <p>姓名：<input type="text" value={name || ""} onChange={(e) => setName(e.target.value)}/></p>
        <p>生日：<input type="text" value={birthday || ""} onChange={(e) => setName(e.target.value)}/></p>
        <p>住址：<input type="text" value={address || ""} onChange={(e) => setAddress(e.target.value)}/> </p>
      </div>
      {
        operator === "update" 
        ? <button onClick={()=> update()}>修改</button>
        : <button onClick={()=> add()}>增加</button>
      }
    </div>  
  )
}

export default Form
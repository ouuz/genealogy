import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style/tree.css';
import Login from './components/login'
import TreeRoot from './components/tree'
import TreeUser from './components/treeUser'
import mock from './mock/mock'

/**
 * @description: 树图根组件：根据用户身份状态渲染不同组件
 */
const TreeChart = () => {
  const genealogy = mock
  const [permissions,setPermissions] = useState("")

  /**
   * @description: 更改当前用户的身份状态
   * @param {String} permissions 身份状态
   */
  const getPermissions = (permissions) => {
    setPermissions(permissions)
  }

  return (
    <div className="treeChart">
      {(() => {
        switch(permissions){
          case "root" : 
            return <TreeRoot data={genealogy} getPermissions={getPermissions}/>
          case "user": 
            return <TreeUser data={genealogy} getPermissions={getPermissions}/>
          default:
            return <Login getPermissions={getPermissions}/>
        }  
      })()} 
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <TreeChart/>
  </React.StrictMode>,
  document.getElementById('root')
);

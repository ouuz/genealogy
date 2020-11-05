import React, { useReducer } from 'react';
import PortraitSelection from './portraitSelection'

/**
 * @description: 增加的初始化配偶信息
 */
const initIncreaseMateState = {
  name: "",
  birthday: "",
  address: "",
  livingStatus: true,
  dateOfDeath: "",
  portraitUrl:"/assets/爷爷.png"
}

/**
 * @description: 增加的个人配偶信息
 */
const initIncreaseSelfState = {
  ...initIncreaseMateState,
  maritalStatus: false,
  children: [],
  mate:initIncreaseMateState
}

/**
 * @description: reducer进行数据管理
 * @param {Object} state 用户信息
 * @param {Object} action 更改用户信息的操作
 */
function reducer(state, action) {
  let mate = state.mate
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.value
      };
    case 'birthday':
      return {
        ...state,
        birthday: action.value
      };
    case 'maritalStatus':
      return {
        ...state,
        maritalStatus: action.value
      };
    case 'address':
      return {
        ...state,
        address: action.value
      };
    case 'livingStatus':
      return {
        ...state,
        livingStatus: action.value
      };
    case 'dateOfDeath':
      return {
        ...state,
        dateOfDeath: action.value
      };
    case 'portraitUrl':
      return {
        ...state,
        portraitUrl: action.value
      };
    case 'mateName':
      mate.name = action.value;
      return {
        ...state,
        mate: mate
      };
    case 'mateBirthday':
      mate.birthday = action.value;
      return {
        ...state,
        mate: mate
      };
    case 'mateAddress':
      mate.address = action.value;
      return {
        ...state,
        mate: mate
      };
    case 'mateLivingStatus':
      mate.livingStatus = action.value;
      return {
        ...state,
        mate: mate
      };
    case 'mateDateOfDeath':
      mate.dateOfDeath = action.value;
      return {
        ...state,
        mate: mate
      };
    case 'matePortraitUrl':
      mate.portraitUrl = action.value;
      return {
        ...state,
        mate: mate
      };
    default :
      throw new Error();
  }
}

/**
 * @description: 更新用户信息和增加孩子信息的表单组件
 * @param {Function} setShowForm
 * @param {String} parent 当前选中准备进行操作的用户的父节点姓名
 * @param {Object} currentInformation 当前选中准备进行操作的用户信息
 * @param {String} status 当前进行操作的状态：增加孩子 / 更新用户信息
 * @param {Array} genealogy 家族成员信息
 * @param {String} current 当前选中准备进行操作的用户姓名
 * @param {Function} addPerson 增加孩子信息
 * @param {Function} updatePerson 更新用户信息
 */
const IncreasedAndModify = ({setShowForm,parent,currentInformation,status,genealogy,current,addPerson,updatePerson}) => {
  /**
   * @description: 修改时初始化个人信息
   */
  const initModifySelfState = {
    name: currentInformation.name,
    birthday: currentInformation.birthday,
    maritalStatus: currentInformation.maritalStatus,
    address: currentInformation.address,
    livingStatus: currentInformation.livingStatus,
    dateOfDeath: currentInformation.dateOfDeath,
    portraitUrl:currentInformation.portraitUrl,
    children: currentInformation.children,
    mate: currentInformation.maritalStatus ? currentInformation.mate : initIncreaseMateState
  }

  const [state, dispatch] = useReducer(reducer, status === "update" ? initModifySelfState : initIncreaseSelfState);
  
  /**
   * @description: 更改个人信息头像
   * @param {Object} e 根据e.target来获取当前选择更改的头像
   */
  const changePortrait = (e) => {
    if(e.target.className === "portraitImg"){
      dispatch({type:"portraitUrl",value:`/assets/${e.target.alt}.png`})
    }
  }

  /**
   * @description: 增加孩子信息
   */
  const add = () => {
    let information = state
    information.children = []
    if(!state.maritalStatus)
      delete information.mate
    if(state.name === "" || state.birthday === "" || state.address === ""){
      alert("你的信息还没有填写清楚噢~")
    }else{
      addPerson(genealogy,current,information)
      setShowForm(false)
    }
  }
  
  /**
   * @description: 更新个人信息（包括配偶信息）
   */
  const update = () => {
    if(state.name === "" || state.birthday === "" || state.address === ""){
      alert("你的信息还没有填写清楚噢~")
    }else{
      if(state.maritalStatus){
        if(state.mate.name === "" || state.mate.birthday === "" || state.mate.address === ""){
          alert("你配偶的信息还没有填写清楚噢~")
        }else{
          updatePerson(genealogy,parent,current,state)
          setShowForm(false)
        }
      }
      else{ 
        let information = state
        delete information.mate
        updatePerson(genealogy,parent,current,information)
        setShowForm(false)
      }
    }
  }

  return (
    <div className="selfInformation">
      <div className="selfPortrait">
        <img src={window.location.origin + state.portraitUrl} alt="爷爷" className="portraitImg"/>
      </div>
      <PortraitSelection changePortrait={changePortrait}/>
      <div className="form">
        <p>
          <label>姓名：</label>
          <input 
            type="text" 
            value={state.name} 
            onChange={(e) => dispatch({type: 'name',value:e.target.value})}
          />
        </p>
        <p>
          <label>出生日期：</label>
          <input 
            type="date" 
            value={state.birthday} 
            onChange={(e) => dispatch({type: 'birthday',value:e.target.value})}
          />
        </p>
        <p>
          <label>家庭住址：</label>
          <input 
            type="text" 
            value={state.address} 
            onChange={(e) => dispatch({type: 'address',value:e.target.value})}
          />
        </p>
        <p>
          <label>是否健在：</label>
          <label>
            <input 
              type="radio" 
              name="livingStatus" 
              value="true" 
              checked={state.livingStatus}
              onChange={() => dispatch({type: 'livingStatus',value:true})}
            />是
            <input 
              type="radio" 
              name="livingStatus" 
              value="false" 
              checked={!state.livingStatus} 
              onChange={() => dispatch({type: 'livingStatus',value:false})}
            />否
          </label>
        </p>
        <p className={state.livingStatus ? "hidden" : "show"}>
          <label>死亡日期：</label>
          <input 
            type="date" 
            value={state.dateOfDeath} 
            onChange={(e) => dispatch({type: 'dateOfDeath',value:e.target.value})}
          />
        </p>
        <p>
          <label>是否婚配：</label>
          <label>
            <input 
              type="radio" 
              name="maritalStatus" 
              value="true"
              checked={state.maritalStatus} 
              onChange={() => dispatch({type: 'maritalStatus',value:true})}
            />是
            <input 
              type="radio" 
              name="maritalStatus" 
              value="false" 
              checked={!state.maritalStatus} 
              onChange={() => dispatch({type: 'maritalStatus',value:false})}
            />否
          </label>
        </p>
      </div>
      {
        state.maritalStatus 
        ?  <MateForm 
              maritalStatus={state.maritalStatus}
              state={state.mate}
              dispatch={dispatch}
            />
        : null
      }
      {
        status === "update" 
        ? <button onClick={() => update()}>修改</button>
        : <button onClick={() => add()}>增加</button>
      }
    </div>
  )
}

/**
 * @description: 配偶信息表单组件
 * @param {Object} state 用户配偶信息
 * @param {Function} dispatch 更改用户配偶信息
 * @param {Boolean} maritalStatus 用户是否婚配
 */
const MateForm = ({state,dispatch,maritalStatus}) => {

  /**
   * @description: 更改配偶信息头像
   * @param {Object} e 根据e.target来获取当前选择更改的头像
   */
  const changePortrait = (e) => {
    if(e.target.className === "portraitImg"){
      dispatch({type:"matePortraitUrl",value:`/assets/${e.target.alt}.png`})
    }
  }

  return (
    <div className={maritalStatus ? "show mateInformation" : "hidden mateInformation"}>
      <div className="selfPortrait">
        <img src={window.location.origin + state.portraitUrl} alt="爷爷" className="portraitImg"/>
      </div>
      <PortraitSelection changePortrait={changePortrait}/>
      <div className="form">
        <p>
          <label>配偶姓名：</label>
          <input 
            type="text" 
            value={state.name} 
            onChange={(e) => {dispatch({type: 'mateName',value:e.target.value})}}
          />
        </p>
        <p>
          <label>配偶出生日期：</label>
          <input 
            type="date" 
            value={state.birthday} 
            onChange={(e) => dispatch({type: 'mateBirthday',value:e.target.value})}
          />
        </p>
        <p>
          <label>配偶家庭住址：</label>
          <input 
            type="text" 
            value={state.address} 
            onChange={(e) => dispatch({type: 'mateAddress',value:e.target.value})}
          />
        </p>
        <p>
          <label>配偶是否健在：</label>
          <label>
            <input 
              type="radio" 
              name="livingStatus" 
              value="true" 
              checked={state.livingStatus}
              onChange={() => dispatch({type: 'mateLivingStatus',value:true})}
            />是
            <input 
              type="radio" 
              name="livingStatus" 
              value="false" 
              checked={!state.livingStatus} 
              onChange={() => dispatch({type: 'mateLivingStatus',value:false})}
            />否
          </label>
        </p>
        <p className={state.livingStatus ? "hidden" : "show"}>
          <label>配偶死亡日期：</label>
          <input 
            type="date" 
            value={state.dateOfDeath} 
            onChange={(e) => dispatch({type: 'mateDateOfDeath',value:e.target.value})}
          />
        </p>
      </div>
    </div>
  )
}

export {IncreasedAndModify} 

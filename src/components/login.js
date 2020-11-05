import React, { useReducer} from 'react';
import '../style/login.css'

/**
 * @description: 用户账户信息初始值
 */
const initState = {
  account: "",
  password: "" 
}

/**
 * @description: reducer进行用户账户信息的管理
 * @param {*} state 用户账户信息
 * @param {*} action 更改用户账户信息的操作
 */
function reducer(state, action) {
  switch (action.type) {
    case 'account':
      return {
        ...state,
        account: action.value
      };
    case 'password':
      return {
        ...state,
        password: action.value
      };
    default:
      throw new Error();
  }
}

/**
 * @description: 登录组件
 * @param {Function} getPermissions 更改当前用户的身份状态
 */
const Login = ({getPermissions}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  /**
   * @description: 登录：进行用户权限和管理员权限的区分
   * @param {*}
   */
  const login = () => {
    if(state.account === "root"){
      getPermissions("root")
    }else{
      getPermissions("user")
    }
  }

  return (
    <div className="login">
      <p>
        <input type="text" placeholder="用户名" value={state.account} onChange={(e) => dispatch({type: 'account',value:e.target.value})}/>
      </p>
      <p>
        <input type="password" placeholder="密码" value={state.password} onChange={(e) => dispatch({type: 'password',value:e.target.value})}/>
      </p>
      <p>
        <button onClick={() => login()}>登录</button>
      </p>
    </div>
  )
}

export default Login

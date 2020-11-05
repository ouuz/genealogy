import React from 'react';

/**
 * @description: 可供更改的头像列表组件
 * @param {Function} changePortrait 更改选中的头像
 */
const PortraitSelection = ({changePortrait}) => {
  return (
    <div className="portrait" onClick={(e) => changePortrait(e)}>
      <img src={window.location.origin + "/assets/爷爷.png"} alt="爷爷" className="portraitImg"/>
      <img src={window.location.origin + "/assets/奶奶.png"} alt="奶奶" className="portraitImg"/>
      <img src={window.location.origin + "/assets/叔叔.png"} alt="叔叔" className="portraitImg"/>
      <img src={window.location.origin + "/assets/阿姨.png"} alt="阿姨" className="portraitImg"/>
      <img src={window.location.origin + "/assets/爸爸.png"} alt="爸爸" className="portraitImg"/>
      <img src={window.location.origin + "/assets/妈妈.png"} alt="妈妈" className="portraitImg"/>
      <img src={window.location.origin + "/assets/哥哥.png"} alt="哥哥" className="portraitImg"/>
      <img src={window.location.origin + "/assets/姐姐.png"} alt="姐姐" className="portraitImg"/>
      <img src={window.location.origin + "/assets/婴儿.png"} alt="婴儿" className="portraitImg"/>
      <img src={window.location.origin + "/assets/girl.png"} alt="girl" className="portraitImg"/>
  </div>
  )
}

export default PortraitSelection

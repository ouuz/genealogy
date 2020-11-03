import React from 'react';
import './style/tree.css';
import Tree from './components/tree'
import mock from '../../mock/mock'

const TreeChart = () => {
  const genealogy = mock
  return (
    <div className="treeChart">
      <Tree data={genealogy}/>
    </div>
  )
}

export default TreeChart 

import React, {Component} from 'react';
import './style/tree.css';
import Tree from './components/tree'
import genealogy from '../../mock/mock'

const TreeChart = () => {
  return (
    <div className="treeChart">
    <div class="tree">
      <ul class="treeList">    
        <Tree data={genealogy}/>
      </ul>
    </div>
  </div>
  )
}

export default TreeChart 

import React, {Component} from 'react';

class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: this.props.data || []
    }
  }

    createNode(data) {
      let nodes
      if (Object.prototype.toString.call(data) == "[object Array]") {
        nodes = data.map((person) => {
          let node = (
            <li key={this.count++}>
              <div className="node">{person.name}</div>
            </li>)
          if (person.children && person.children.length) {
            node = (
              <li key={this.count++}>
                <div className="node">{person.name}</div>
                { person.mate
                  ? <div className="node">{person.mate.name}</div>
                  : null
                }
                {this.createNode(person.children)}    
              </li>)
          }
          return node
        })
      }
      return ( <ul>{nodes}</ul> )
    }

    render() {
      this.count = 0
      return this.createNode(this.state.data)
    }
}

export default Tree

import React, { Component } from "react";
import EliminationGame from './EliminationGame';

// grab all the data for that lesson 
// from our API and keeps it here
class LessonHolder extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: ['apple', 'banana', 'pear', 'grape', 'strawberry', 'orange', 'raspberry', 'blueberry', 'mango']
    }
  }

  componentDidMount(){
    
  }
  
  render(){
    return (
      <div>
      </div>
      // <EliminationGame data={this.state.data} />
    );
  }
}

export default LessonHolder;
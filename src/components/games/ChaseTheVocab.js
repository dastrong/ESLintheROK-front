import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import FlipMove from 'react-flip-move';
import CardBlock from '../reusable/CardBlock';
import { addListeners, rmvListeners, setData} from '../../helpers/phase2helpers';

class ChaseTheVocab extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      compressor: 0.6,
      colors: this.props.colors,
    }
    this.addListeners = addListeners.bind(this);
    this.rmvListeners = rmvListeners.bind(this);
    this.setData = setData.bind(this);
  }
  componentDidMount(){
    this.addListeners();
    this.setData(this.props.data);
  }

  componentWillUnmount(){ this.rmvListeners() }

  handleGame = (data = this.state.data) => {

  }

  render(){
   return (
      <FlipMove>
        boxes here
      </FlipMove>
    );
  }
}

export default ChaseTheVocab;
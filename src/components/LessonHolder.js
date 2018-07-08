import React, { Component } from "react";
import { Button } from 'semantic-ui-react';
import DataForm  from '../components/DataForm';
import DataTable from "../components/DataTable";
import EliminationGame from '../components/EliminationGame';
import '../styles/LessonHolder.css';

// grab all the data for that lesson 
// from our API and keeps it here
class LessonHolder extends Component {
  constructor(props){
    super(props);
    this.state = {
      // data: ['apple', 'banana', 'pear', 'grape', 'strawberry', 'orange', 'raspberry', 'blueberry', 'mango']
      vocabularyData: [],
      sentencesData:  [],
      currentText: '',
      currentTranslation: '',
      currentImage: '',
      isVocab: true,
      isDataReady: false,
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { currentText, currentTranslation, currentImage, isVocab } = this.state;
    const newEntry = { 
      text: currentText, 
      translation: currentTranslation,
      image: currentImage
    };
    if(isVocab){
      const vocabularyData = [...this.state.vocabularyData, newEntry];
      // must have 8 words entered for the game to work
      const isDataReady = vocabularyData.length >= 8;
      this.setState({
        vocabularyData,
        currentText: '',
        currentTranslation: '',
        currentImage: '',
        isDataReady,
      });
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    const name = `current${e.target.name}`;
    const value = e.target.value;
    this.setState({[name]:value})
  }
  handleEdit   = (e) => {
    const targetedId = Number(e.target.id);
    const vocabularyData = this.state.vocabularyData.filter((data, i) => targetedId !== i);
    const editData = this.state.vocabularyData.slice(targetedId, targetedId+1);
    const {text, translation, image} = editData[0];
    const isDataReady = vocabularyData.length >= 8;
    this.setState({
      vocabularyData,
      currentText: text,
      currentTranslation: translation,
      currentImage: image,
      isDataReady,
    });
  }  
  handleDelete = (e) => {
    const vocabularyData = this.state.vocabularyData.filter((data, i) => Number(e.target.id) !== i);
    const isDataReady = vocabularyData.length >= 8;
    this.setState({vocabularyData, isDataReady});
  }
  handleGame   = (e) => {
    console.log(e.target)
    this.setState({})
  }

  render(){
    const { currentText, currentTranslation, currentImage, vocabularyData, isDataReady } = this.state;
    return (
      <div className='lesHold'>
        <DataForm handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  text={currentText}
                  image={currentImage}
                  translation={currentTranslation} />
        <DataTable vocabularyData={vocabularyData} 
                   handleDelete={this.handleDelete}
                   handleEdit={this.handleEdit} />
        <Button fluid 
                color='teal'
                disabled={!isDataReady}
                onClick={this.handleGame} 
                content='Continue to Game' />
      </div>
      // <EliminationGame data={this.state.data} />
    );
  }
}

export default LessonHolder;
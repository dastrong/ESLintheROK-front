import React, { Component } from "react";
import { Accordion, Icon } from 'semantic-ui-react';
import DataAccordion  from './DataAccordion';
import '../../styles/DataEntryPage.css';

class DataEntryPage extends Component {
  static defaultProps = {
    onSave() {}
  }
  constructor(props){
    super(props);
    this.state = {
      currentText: '',
      currentTranslation: '',
      currentImage: '',
      isVocab: true,
      activeIndex: 0,
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { currentText, currentTranslation, currentImage, isVocab } = this.state;
    const { onSave } = this.props;
    const newEntry = { 
      text: currentText, 
      translation: currentTranslation,
      image: currentImage
    };
    onSave(newEntry, isVocab);
    this.setState({
      currentText: '',
      currentTranslation: '',
      currentImage: '',
    });
  }
  handleChange = (e) => {
    e.preventDefault();
    const name = `current${e.target.name}`;
    const value = e.target.value;
    this.setState({[name]:value})
  }


  handleEdit   = (e) => {
    const { vocabularyData, expressionData, onEdit } = this.props;
    const { isVocab } = this.state;
    const targetedId = Number(e.target.id);
    let editData;
    if(this.state.isVocab){
      const data = vocabularyData.filter((data, i) => targetedId !== i);
      editData = vocabularyData.slice(targetedId, targetedId+1);
      onEdit(data, isVocab);
    } else {
      const data = expressionData.filter((data, i) => targetedId !== i);
      editData = expressionData.slice(targetedId, targetedId+1);
      onEdit(data, isVocab);
    }
    const {text, translation, image} = editData[0];
    this.setState({
      currentText: text,
      currentTranslation: translation,
      currentImage: image,
    });
  }  


  handleDelete = (e) => {
    if(this.state.isVocab){
      const vocabularyData = this.props.vocabularyData.filter((data, i) => Number(e.target.id) !== i);
      this.props.onEdit(vocabularyData, this.state.isVocab)
    } else {
      const expressionData = this.props.expressionData.filter((data, i) => Number(e.target.id) !== i);
      this.props.onEdit(expressionData, this.state.isVocab)
    }
  }


  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    newIndex === 1 ?
      this.setState({ 
        activeIndex: 1, 
        isVocab: false,
        currentText: '',
        currentTranslation: '',
        currentImage: '',
        }) :
      this.setState({
        activeIndex: newIndex,
        isVocab: true,
        currentText: '',
        currentTranslation: '',
        currentImage: '',
        });
  }

  render(){
    const { currentText, currentTranslation, currentImage, activeIndex } = this.state;
    const { vocabularyData, expressionData, isDataReady } = this.props;
    return (
      <div className='lesHold'>
        <Accordion style={{width: '90%'}}>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            Enter your vocabulary here!
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <DataAccordion handleChange={this.handleChange}
                           handleSubmit={this.handleSubmit}
                           handleDelete={this.handleDelete}
                           handleEdit={this.handleEdit}
                           currentText={currentText}
                           currentImage={currentImage}
                           currentTranslation={currentTranslation} 
                           data={vocabularyData} 
                           isDataReady={isDataReady} />
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='dropdown' />
            Enter your key expressions here!
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <DataAccordion handleChange={this.handleChange}
                           handleSubmit={this.handleSubmit}
                           handleDelete={this.handleDelete}
                           handleEdit={this.handleEdit}
                           currentText={currentText}
                           currentImage={currentImage}
                           currentTranslation={currentTranslation} 
                           data={expressionData}
                           isDataReady={isDataReady} />
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}

export default DataEntryPage;
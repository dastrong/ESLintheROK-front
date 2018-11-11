import React, { PureComponent } from "react";
import { Accordion, Icon, Progress } from 'semantic-ui-react';
import {
  handleSubmit, handleEdit, handleChange, handleDelete,
  handleClick, handleChapter, handleTitle, handlePost,
  checkDataType, checkDataArrays,
  clearFields, getProgress
} from './helperFunc';
import { DataAccordion } from './helperComp';
import './Data.css';
import DataButton from './DataButton'
import APIDataInputs from "./APIDataInputs";

class DataPage extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      ...clearFields,
      vocabulary: this.props.vocabulary || [],
      expressions: this.props.expressions || [],
      chapter: null,
      title: null,
      activeIndex: 0,
      isVocab: true,
      isDataReady: false,
      dataChanged: false,
      percent: null,
    }
    this.checkDataType = checkDataType.bind(this);
    this.checkDataArrays = checkDataArrays.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.handleEdit   = handleEdit.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleDelete = handleDelete.bind(this);
    this.handleClick  = handleClick.bind(this);
    this.handleTitle  = handleTitle.bind(this);
    this.handleChapter = handleChapter.bind(this);
    this.getProgress = getProgress.bind(this);
    this.handlePost = handlePost.bind(this);
  }

  componentDidMount(){ 
    this.checkDataArrays();
    if(this.props.fromLessonsPage || this.props.fromDataModal) return;
    document.title = 'Custom Lesson - ESL in the ROK'
  }
  
  componentDidUpdate(){ this.checkDataArrays() }

  render(){
    const { activeIndex, vocabulary, expressions, chapter, title, percent } = this.state;
    const { isGameReady, sendData, fromLessonsPage, isAPI } = this.props;
    const cxAccV = vocabulary.length >= 9 ? 'complete' : 'incomplete';
    const cxAccE = expressions.length >= 6 ? 'complete' : 'incomplete';
    const color = percent < 20 ? 'red' : 
                  percent < 40 ? 'orange' : 
                  percent < 60 ? 'yellow' : 
                  percent < 80 ? 'teal' : 
                  percent < 100 ? 'blue' : 'green'; 
    return (
      <div className='data-container'>
        <Progress
          percent={percent}
          color={color}
          attached='top'
        />
        <DataButton 
          isAPI={isAPI}
          postData={this.handlePost}
          isGameReady={isGameReady}
          sendData={()=>this.setState({ dataChanged: false }, sendData(vocabulary, expressions))}
          {...this.state}
        />
        <Progress 
          percent={percent}
          color={color}
          attached='bottom'
        />
        { isAPI && <APIDataInputs chapter={chapter} title={title} handleChapter={this.handleChapter} handleTitle={this.handleTitle} /> }
        <Accordion fluid>
          <Accordion.Title 
            active={activeIndex === 0} 
            index={0}
            onClick={this.handleClick}
            className={cxAccV}
          >
            <Icon name='dropdown' />
            {`${fromLessonsPage ? 'Edit' : 'Enter'} your vocabulary here!`}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <DataAccordion 
              data={vocabulary} 
              {...this}
              {...this.props}
              {...this.state}
            />
          </Accordion.Content>

          <Accordion.Title 
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
            className={cxAccE}
          >
            <Icon name='dropdown' />
            {`${fromLessonsPage ? 'Edit' : 'Enter'} your expressions here!`}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <DataAccordion 
              data={expressions} 
              {...this}
              {...this.props}
              {...this.state}
            />
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}

export default DataPage;
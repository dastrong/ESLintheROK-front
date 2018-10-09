import React, { PureComponent } from "react";
import classNames from 'classnames';
import { Accordion, Icon, Button, Input } from 'semantic-ui-react';
import {
  handleSubmit, handleEdit, handleChange, handleDelete,
  handleClick, handleChapter, handleTitle, handlePostRequest,
  checkDataType, checkDataReadiness, checkDataArrays,
  clearFields
} from './helperFunc';
import { DataAccordion } from './helperComp';
import './Data.css';

class DataPageAPI extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      ...clearFields,
      postRoute: this.props.postRoute,
      vocabulary: [],
      expressions: [],
      chapter: null,
      title: null,
      activeIndex: 0,
      isVocab: true,
      isDataReady: false,
    }
    this.checkDataType = checkDataType.bind(this);
    this.checkDataReadiness = checkDataReadiness.bind(this);
    this.checkDataArrays = checkDataArrays.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.handleEdit   = handleEdit.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleDelete = handleDelete.bind(this);
    this.handleClick  = handleClick.bind(this);
    this.handleTitle  = handleTitle.bind(this);
    this.handleChapter = handleChapter.bind(this);
    this.handlePostRequest = handlePostRequest.bind(this);
  }

  componentDidUpdate(){ this.checkDataArrays() }

  render(){
    const { 
      chapter, title, activeIndex, vocabulary, expressions, isDataReady
    } = this.state;
    const cxBtn = classNames('submit-data-btn', { 'disabled': !isDataReady });
    const cxAccV = vocabulary.length >= 9 ? 'complete' : 'incomplete';
    const cxAccE = expressions.length >= 6 ? 'complete' : 'incomplete';
    const cxChap = `extra-input ${chapter ? 'completed' : 'incomplete'}`;
    const cxTitl = `extra-input ${title ? 'completed' : 'incomplete'}`;
    return (
      <div className='api data-page-container'>
        <Button
          fluid 
          // onClick={()=> this.handlePostRequest({ chapter, title, vocabulary, expressions })}
          onClick={()=> {
            const data = { chapter, title, vocabulary, expressions };
            this.props.handlePost(this.handlePostRequest(data))
          }}
          color='green'
          className={cxBtn}
          content={
            !isDataReady 
              ? 'Please complete all the fields marked with red.'
              : "Thanks! Submit lesson."
          }
        />
        <div className='extra-inputs'>
          <Input
            value={chapter || ''}
            onChange={this.handleChapter}
            name='chapter'
            className={cxChap} 
            placeholder='Chapter'
            type='number'
            min='1'
            max='15'
          />
          <Input
            value={title || ''}
            onChange={this.handleTitle}
            name='title'
            className={cxTitl} 
            placeholder="Title"
          />
        </div>
        <Accordion fluid>
          <Accordion.Title 
            active={activeIndex === 0} 
            index={0}
            onClick={this.handleClick}
            className={cxAccV}
          >
            <Icon name='dropdown' />
            'Enter vocabulary here!'
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
            'Enter expressions here!'
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

export default DataPageAPI;
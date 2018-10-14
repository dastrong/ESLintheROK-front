import React, { PureComponent } from "react";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Accordion, Icon, Button } from 'semantic-ui-react';
import {
  handleSubmit, handleEdit, handleChange, handleDelete,
  handleClick,
  checkDataType, checkDataReadiness, checkDataArrays,
  clearFields
} from './helperFunc';
import { DataAccordion } from './helperComp';
import './Data.css';

class DataPage extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      ...clearFields,
      vocabulary: this.props.vocabulary || [],
      expressions: this.props.expressions || [],
      activeIndex: 0,
      isVocab: true,
      isDataReady: false,
      dataChanged: false,
    }
    this.checkDataType = checkDataType.bind(this);
    this.checkDataReadiness = checkDataReadiness.bind(this);
    this.checkDataArrays = checkDataArrays.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.handleEdit   = handleEdit.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleDelete = handleDelete.bind(this);
    this.handleClick  = handleClick.bind(this);
  }

  componentDidMount(){ 
    this.checkDataArrays();
    if(this.props.fromLessonsPage) return;
    document.title = 'Custom Lesson - ESL in the ROK'
  }
  
  componentDidUpdate(){ this.checkDataArrays() }

  render(){
    const { 
      activeIndex, vocabulary, expressions, isDataReady, dataChanged
    } = this.state;
    const { isGameReady, sendData, fromLessonsPage } = this.props;
    const cxBtn = classNames('submit-data-btn', { 'disabled': !isDataReady });
    const cxAccV = vocabulary.length >= 9 ? 'complete' : 'incomplete';
    const cxAccE = expressions.length >= 6 ? 'complete' : 'incomplete';
    return (
      <div className='data-page-container'>
        <Button
          fluid 
          as={!isGameReady || dataChanged ? 'button' : Link}
          onClick={()=> this.setState({ dataChanged: false }, 
            sendData(vocabulary, expressions))
          }
          to={{
            pathname: "/games",
            state: { pageTransition:'slideUp' }
          }}
          color={!isDataReady || dataChanged ? 'green' : 'blue'}
          className={cxBtn}
          content={
            !isDataReady 
              ? "Please enter more vocabulary or expressions"
              :  dataChanged
                ? "Ready? Set your data again, please."
                : !isGameReady
                  ? 'Finished editing? Set your data!'
                  : "Success! Go to game selections screen."
          }
        />
        <Accordion fluid>
          <Accordion.Title 
            active={activeIndex === 0} 
            index={0}
            onClick={this.handleClick}
            className={cxAccV}
          >
            <Icon name='dropdown' />
            {fromLessonsPage ? 'Edit vocabulary here!' : 'Enter your vocabulary here!'}
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
            {fromLessonsPage ? 'Edit expressions here!' : 'Enter your key expressions here!'}
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
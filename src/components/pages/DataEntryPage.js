import React, { PureComponent, Fragment} from "react";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Accordion, Icon, Button, Form, Table } from 'semantic-ui-react';
import '../../styles/pages/DataEntryPage.css';

// clears our input fields
const clearFields = {
  currentText: '',
  currentTranslation: '',
  currentImage: '',
}

class DataEntryPage extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      ...clearFields,
      vocabularyData: this.props.vocabularyData || [],
      expressionData: this.props.expressionData || [],
      activeIndex: 0,
      isVocab: true,
      isDataReady: false,
      dataChanged: false,
    }
  }

  componentDidMount(){ this._checkDataArrays() }
  componentDidUpdate(){ this._checkDataArrays() }
  
  // helpers to keep code DRY 
  _checkDataType(isVocab){ return isVocab ? 'vocabularyData' : 'expressionData'; }

  _checkDataReadiness() {
    const { vocabularyData, expressionData } = this.state;
    return vocabularyData.length >= 8 && expressionData.length >= 6;
  }

  _checkDataArrays(){
    const isDataReady = this._checkDataReadiness();
    if(isDataReady === this.state.isDataReady) return;
    this.setState({ isDataReady });
  }

  // form handlers
  handleSubmit = (e) => {
    e.preventDefault();
    const { currentText, currentTranslation, currentImage, isVocab } = this.state;
    const newEntry = { 
      text: currentText || '',
      translation: currentTranslation || '',
      image: currentImage || '',
    };
    const dataType = this._checkDataType(isVocab);
    this.setState({
      ...clearFields,
      [dataType]: [...this.state[dataType], newEntry],
      dataChanged: true,
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    const name = `current${e.target.name}`;
    const value = e.target.value;
    this.setState({[name]:value});
  }

  handleEdit = (e) => {
    const targetedId = Number(e.target.id);
    const dataType = this._checkDataType(this.state.isVocab);
    // returns the target obj and an updated array without that obj
    const splitData = this.state[dataType].reduce((acc, cVal, i)=>{
      targetedId === i
        ? acc.target = cVal
        : acc.rest.push(cVal);
      return acc;
    },{ target: {}, rest:[] });
    const {text, translation, image} = splitData.target;
    this.setState({
      [dataType]: splitData.rest,
      currentText: text,
      currentTranslation: translation,
      currentImage: image,
      dataChanged: true,
    });
  }

  handleDelete = (e) => {
    const dataType = this._checkDataType(this.state.isVocab);
    const updatedData = this.state[dataType].filter((x, i) => Number(e.target.id) !== i);
    this.setState({ [dataType]: updatedData, dataChanged: true,});
  }
  
  // handles opening and closing the accordion
  handleClick = (e, { index }) => {
    const newIndex = this.state.activeIndex === index ? -1 : index
    this.setState({ 
      ...clearFields,
      activeIndex: newIndex, 
      isVocab: newIndex < 1,
    })
  }

  render(){
    const { 
      activeIndex, vocabularyData, expressionData, isDataReady, dataChanged
    } = this.state;
    const { isGameReady, sendData, fromLessonsPage } = this.props;
    const cxBtn = classNames('submit-data-btn', { 'disabled': !isDataReady });
    const cxAccV = vocabularyData.length >= 8 ? 'complete' : 'incomplete';
    const cxAccE = expressionData.length >= 6 ? 'complete' : 'incomplete';
    return (
      <div className='data-page-container'>
        <Button
          fluid 
          as={!isGameReady || dataChanged ? 'button' : Link}
          onClick={()=> this.setState({ dataChanged: false }, 
            sendData(vocabularyData, expressionData))
          }
          to='/games'
          color={!isDataReady || dataChanged ? 'violet' : 'blue'}
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
              data={vocabularyData} 
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
              data={expressionData} 
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

export default DataEntryPage;


const DataAccordion = ({
  data,
  // input fields
  currentImage, currentText, currentTranslation, 
  // functions
  handleChange, handleSubmit, handleDelete, handleEdit
}) => (
  <Fragment>
    <DataForm 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      text={currentText}
      image={currentImage}
      translation={currentTranslation}
    />
    <DataTable
      data={data} 
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  </Fragment>
);

const DataForm = ({handleSubmit, handleChange, image, text, translation}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Input 
        width={4}
        name='Text'
        value={text || ''}
        onChange={handleChange} 
        placeholder='ex) tree' 
        autoFocus 
      />
      <Form.Input 
        width={4}
        name='Translation'
        value={translation || ''}
        onChange={handleChange}
        placeholder='ex) 나무'
      />
      <Form.Input 
        width={6}
        name='Image'
        value={image || ''}
        onChange={handleChange}
        placeholder='ex) https://nothingToCHereSorry.jpg'
      />
      <Form.Button
        width={2}
        fluid
        color='green'
        type='submit'
      >
        Add
      </Form.Button>
    </Form.Group>
  </Form> 
);

const DataTable = ({ data, handleDelete, handleEdit }) => {
  // returns list of data for the table below
  const items = data.map((item, i)=>(
    <Table.Row key={i}>
      <Table.Cell>
        {item.text}
      </Table.Cell>
      <Table.Cell>
        {item.translation}
      </Table.Cell>
      <Table.Cell>
        <a href={item.image}>{item.image}</a>
      </Table.Cell>
      <Table.Cell textAlign={'center'}>
        <Icon 
          link
          id={i}
          onClick={handleEdit}
          size='large'
          color='blue'
          name='edit'
          style={{textAlign: 'left'}}
        />
        <Icon
          link
          id={i}
          onClick={handleDelete}
          size='large'
          color='red'
          name='delete'
          style={{textAlign: 'right'}}
        />
      </Table.Cell>
    </Table.Row>
  ));
  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={4}>
            Text
          </Table.HeaderCell>
          <Table.HeaderCell width={4}>
            Translation
          </Table.HeaderCell>
          <Table.HeaderCell width={6}>
            Image URL
          </Table.HeaderCell>
          <Table.HeaderCell width={2} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items}
      </Table.Body>
    </Table>
  )
};
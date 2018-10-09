import React, { Fragment } from 'react';
import { Form, Table, Icon } from 'semantic-ui-react';

export const DataAccordion = ({
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

export const DataForm = ({handleSubmit, handleChange, image, text, translation}) => (
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

export const DataTable = ({ data, handleDelete, handleEdit }) => {
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
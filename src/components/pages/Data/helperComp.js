import React, { Fragment } from 'react';
import { Form, Table, Icon } from 'semantic-ui-react';

export const DataAccordion = ({
  data, currentText, 
  // functions
  handleChange, handleSubmit, handleDelete, handleEdit
}) => (
  <Fragment>
    <DataForm 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      text={currentText}
    />
    <DataTable
      data={data} 
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  </Fragment>
);

export const DataForm = ({ handleSubmit, handleChange, text }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Input 
        name='Text'
        value={text || ''}
        onChange={handleChange} 
        placeholder='ex) tree'
      />
      <Form.Button 
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
    <Table celled striped textAlign='center' widths={16}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={12}>
            Text
          </Table.HeaderCell>
          <Table.HeaderCell width={4} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items}
      </Table.Body>
    </Table>
  )
};
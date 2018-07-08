import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const DataTable = ({vocabularyData, handleDelete, handleEdit}) => {
  const items = vocabularyData.map((data, i)=>(
    <Table.Row key={i}>
      <Table.Cell>
        {data.text}
      </Table.Cell>
      <Table.Cell>
        {data.translation}
      </Table.Cell>
      <Table.Cell>
        <a href={data.image}>{data.image}</a>
      </Table.Cell>
      <Table.Cell style={{textAlign: 'center'}}>
        <Icon link id={i} onClick={handleEdit}   size='large' color='blue' name='edit'   style={{textAlign: 'left'}}/>
        <Icon link id={i} onClick={handleDelete} size='large' color='red'  name='delete' style={{textAlign: 'right'}}/>
      </Table.Cell>
    </Table.Row>
  ));
  return (
    <Table celled >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={4}>Text        </Table.HeaderCell>
          <Table.HeaderCell width={4}>Translation </Table.HeaderCell>
          <Table.HeaderCell width={7}>Image URL   </Table.HeaderCell>
          <Table.HeaderCell width={1} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items}
      </Table.Body>
    </Table>
  )
};

export default DataTable;
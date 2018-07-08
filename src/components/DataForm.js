import React from 'react';
import { Form } from 'semantic-ui-react';

const DataForm = ({handleSubmit, handleChange, image, text, translation}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Input  width={4} name='Text'        value={text}        onChange={handleChange} placeholder='ex) tree' autoFocus />
      <Form.Input  width={4} name='Translation' value={translation} onChange={handleChange} placeholder='ex) 나무' />
      <Form.Input  width={7} name='Image'       value={image}       onChange={handleChange} placeholder='ex) https://i.pinimg.com/564x/0a/15/72/0a1572b08e34b132262a05b383f7424f.jpg'/>
      <Form.Button width={1} fluid color='green' type='submit'>Next</Form.Button>
    </Form.Group>
  </Form> 
);

export default DataForm;
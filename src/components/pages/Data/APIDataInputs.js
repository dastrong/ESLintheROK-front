import React from 'react';
import { Input } from 'semantic-ui-react';

const APIDataInputs = ({ chapter, title, handleChapter, handleTitle }) => {
  const cxChap = `extra-input ${chapter ? 'completed' : 'incomplete'}`;
  const cxTitl = `extra-input ${title ? 'completed' : 'incomplete'}`;

  return (
    <div className='extra-inputs'>
      <Input
        value={chapter || ''}
        onChange={handleChapter}
        name='chapter'
        className={cxChap} 
        placeholder='Chapter'
        type='number'
        min='1'
        max='15'
      />
      <Input
        value={title || ''}
        onChange={handleTitle}
        name='title'
        className={cxTitl} 
        placeholder="Title"
      />
    </div>
  )
}

export default APIDataInputs;
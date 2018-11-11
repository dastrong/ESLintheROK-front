import React from 'react';
import LessonsHolder from './LessonsHolder';

const LessonsPage = props => (
  <div className='page-container'>
    <div className='page-container-inner'>
      <LessonsHolder {...props} />
    </div>
  </div>
)

export default LessonsPage;
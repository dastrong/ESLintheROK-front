import React from 'react';
import '../../../styles/pages/gamePages/Instructions.css';

const InstructionsList = ({ listData }) => (
  <ul className='instructions-list'>
    {listData.map((item, i)=>
      <li key={i}>
        {item}
      </li>
    )}
  </ul>
)

export default InstructionsList;
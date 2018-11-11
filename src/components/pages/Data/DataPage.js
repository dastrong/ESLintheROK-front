import React from "react";
import DataHolder from './DataHolder';

const DataPage = props => (
  <div className='page-container'>
    <div className='page-container-inner'>
      <DataHolder {...props} />
    </div>
  </div>
)

export default DataPage;
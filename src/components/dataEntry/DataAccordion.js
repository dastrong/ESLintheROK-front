import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import DataForm  from './DataForm';
import DataTable from "./DataTable";

const DataAccordion = ({
  currentImage, currentText, currentTranslation, handleChange, handleSubmit, handleDelete, handleEdit, isDataReady, data
}) => (
  <div>
    <DataForm handleChange={handleChange}
              handleSubmit={handleSubmit}
              text={currentText}
              image={currentImage}
              translation={currentTranslation} />
    <DataTable data={data} 
              handleDelete={handleDelete}
              handleEdit={handleEdit} />
    <Button fluid 
            as={Link}
            to='/games'
            color='teal'
            disabled={!isDataReady}
            content='Continue to Game' />
  </div>
);

export default DataAccordion;
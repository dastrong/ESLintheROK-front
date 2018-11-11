import React from 'react';
import { Dropdown } from 'semantic-ui-react';

// used in the first screen
const GradesPrimary = ({ loading, options, getData }) => (
  <div className='first-screen'>
    What grade are you looking for?
    <Dropdown
      selection
      compact
      onChange={e=> getData('books', { screen:2, url:e.target.id })}
      loading={loading}
      disabled={loading}
      placeholder='Choose Here'
      options={options}
    />
  </div>
)

// used in the second screen
const GradesSecondary = ({  options, grade, getData }) => (
  <span className='current-grade'>Showing Books for Grade: {' '}
    <Dropdown 
      inline
      options={options}
      placeholder={grade ? String(grade) : ''}
      onChange={e=> getData('books', { screen:2, url:e.currentTarget.id, activePage:1 })}
    />
  </span>
)

export { GradesPrimary, GradesSecondary };
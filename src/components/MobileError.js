import React from 'react';
import PageHeader from './pages/PageHeader';
import '../styles/MobileError.css'

const MobileError = () => (
  <div className='mobile-container'>
    <PageHeader 
      icon='mobile'
      text="Welco. . . nvm."
    />
    <div className='mobile-inner'>
      <h2>ESL in the ROK is <span>not</span> optimized for this screen size.</h2>
      <h3>Please adjust the size or visit us again on a larger screen</h3>
      <hr />
      <h3>WHY?</h3>
      <p>This site was made to replace certain PPT game templates used in the classroom. It's designed for a larger screen size.</p>
      <br />
      <p>Sorry for the inconvenience.</p>
    </div> 
  </div>
)

export default MobileError;
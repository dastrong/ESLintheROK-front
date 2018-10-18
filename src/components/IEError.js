import React from 'react';
import PageHeader from './pages/PageHeader';
import '../styles/StartUpError.css'

const IEError = () => (
  <div className='startUpError-container'>
    <PageHeader 
      icon='internet explorer'
      text="Welco. . . nvm."
    />
    <div className='startUpError-inner'>
      <h1>It looks like you're using Internet Explorer (IE).</h1>
      <h2>ESL in the ROK is <span>not</span> optimized for IE.</h2>
      <h3>Please use a modern browser like Chrome, Firefox or Opera.</h3>
      <p>If you are not using IE, please let me know through my Kakao Group Chat: ESL in the ROK</p>
      <hr />
      <h3>Why don't I support IE?</h3>
      <p>This site was created using newer technologies. IE does not support those technologies.</p>
      <br />
      <p>Sorry for the inconvenience.</p>
    </div> 
  </div>
)

export default IEError;
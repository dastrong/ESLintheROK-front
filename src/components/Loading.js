import React from 'react';
import { Icon } from 'semantic-ui-react';

const Loading = () => (
  <div style={{
    backgroundColor: '#eee', 
    height: '100vh', 
    width: '100vw',
    fontSize: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Icon loading name='spinner' size='large' />
  </div>
)

export default Loading;
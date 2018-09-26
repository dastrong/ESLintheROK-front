import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const styleHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '20px'
}

const styleHR = {
  border: '0.8px solid rgba(0,0,0,.6)',
  margin: '7px 5px 3px',
}

const PageHeader = ({ icon, text, info, color }) => (
  <Header 
    as='h2'
    textAlign='center'
    style={styleHeader}
  >
    <Icon name={icon} circular color={color} />
    <Header.Content>
      {text}
      <Header.Subheader>
        {info}
      </Header.Subheader>
      <hr style={styleHR}></hr>
    </Header.Content>
  </Header>
)

export default PageHeader;
import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Image } from 'semantic-ui-react';
import Favicon from '../../assets/images/Favicon.svg';

const styleHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '14px 0 14px 10px',
  margin: '0',
}

const styleHR = {
  border: '0.8px solid rgba(0,0,0,.6)',
  margin: '7px 5px 3px',
}

const styleImg = {
  marginTop: '.14em',
  width: '2.4em',
  height: 'auto',
  verticalAlign: 'middle',
}

const styleContent = {
  paddingLeft: '.725rem',
  paddingRight: '.75rem',
  width: '300px',
}

const PageHeader = ({ icon, text, color }) => (
  <Header 
    as='h2'
    color={color}
    textAlign='center'
    style={styleHeader}
  >
    <Image
      as={Link}
      to={{
        pathname: '/',
        state: {pageTransition: 'slideUp'}
      }}
      style={styleImg}
      src={Favicon} 
      alt='logo'
    />
    <Header.Content style={styleContent}>
      ESL in the ROK
      <Header.Subheader>
        {text}
      </Header.Subheader>
      <hr style={styleHR}></hr>
    </Header.Content>
    <Icon
      name={icon}
      circular
      color={color}
    />
  </Header>
)

export default PageHeader;
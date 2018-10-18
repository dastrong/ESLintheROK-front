import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Image } from 'semantic-ui-react';
import Favicon from '../../assets/images/Favicon.svg';
import '../../styles/pages/PageHeader.css';

const PageHeader = ({ icon, text, color }) => (
  <Header 
    as='h2'
    color={color}
    textAlign='center'
  >
    <Image
      as={Link}
      to={{
        pathname: '/',
        state: {pageTransition: 'slideUp'}
      }}
      src={Favicon} 
      alt='logo'
    />
    <Header.Content>
      ESL in the ROK
      <Header.Subheader>
        {text}
      </Header.Subheader>
      <hr />
    </Header.Content>
    <Icon
      name={icon}
      circular
      color={color}
    />
  </Header>
)

export default PageHeader;
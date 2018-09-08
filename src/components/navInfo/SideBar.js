import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react';
import '../../styles/navInfo/SideBar.css';

const SideBar = ({ showSideBar, hideSideBar, isSideBarVisible }) => (
  <div className='sidebar sidebar-main'>
    <Button 
      className='sideBarBtn'
      icon='list' 
      size='massive' 
      onClick={showSideBar} 
    />

    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      onHide={hideSideBar}
      vertical
      visible={isSideBarVisible}
      width='wide'
    >
      <Menu.Item>
        <Button.Group style={{width: '100%'}} size='massive'>
          <Button basic 
                  inverted 
                  as={Link}
                  to='/'
                  color='teal' 
                  icon='home' 
                  onClick={hideSideBar} />
          <Button basic 
                  inverted
                  color='violet' 
                  icon='x' 
                  onClick={hideSideBar} />
        </Button.Group>
      </Menu.Item>
      <Menu.Item 
        as={Link}
        onClick={hideSideBar}
        to='/elimination'
      >
        <Icon name='x' />
        Elimination
      </Menu.Item>
      <Menu.Item 
        as={Link}
        onClick={hideSideBar}
        to='/whatsbehind'
      >
        <Icon name='find' />
        What's Behind
      </Menu.Item>
      <Menu.Item 
        as={Link}
        onClick={hideSideBar}
        to='/stars'
      >
        <Icon name='star' />
        Stars Writing
      </Menu.Item>
      <Menu.Item 
        as={Link}
        onClick={hideSideBar}
        to='/lotto'
      >
        <Icon name='won' />
        Word Lotto
      </Menu.Item>
      <Menu.Item 
        as={Link}
        onClick={hideSideBar}
        to='/sparkle'
      >
        <Icon name='diamond' />
        Sparkle Die
      </Menu.Item>
      <Menu.Item 
        as={Link}
        onClick={hideSideBar}
        to='/kimchi'
      >
        <Icon name='heart' />
        Kimchi Elimination
      </Menu.Item>
      <Menu.Item 
        as={Link}
        onClick={hideSideBar}
        to='/bowling'
      >
        <Icon name='bowling ball' />
        Letter Bowling
      </Menu.Item>
      <Menu.Item 
        as={Link}
        onClick={hideSideBar}
        to='/chase'
      >
        <Icon name='exchange' />
        Chase the Vocab
      </Menu.Item>
    </Sidebar>
  </div>
);

export default SideBar;
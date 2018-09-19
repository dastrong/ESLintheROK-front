import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { games } from '../../helpers/data';
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
      <Menu.Item className='home-close-btn-group'>
        <Button.Group size='massive'>
          <Button basic 
                  inverted
                  as={Link}
                  to={{
                    pathname: '/',
                    state: { slideLeft:true }
                  }}
                  color='blue' 
                  icon='home' 
                  onClick={hideSideBar} />
          <Button basic 
                  inverted
                  color='red' 
                  icon='x' 
                  onClick={hideSideBar} />
        </Button.Group>
      </Menu.Item>
      {/* creates our menu links, if the game has been marked completed */}
      {games
      .filter(({ info })=> info.completed)
      .map(({ router, info })=>
        <MenuItem
          key={router.path}
          path={router.path}
          icon={router.icon}
          title={info.title}
          hideSideBar={hideSideBar}
        />
      )}
    </Sidebar>
  </div>
);

const MenuItem = ({ path, icon, title, hideSideBar }) => (
  <Menu.Item 
    as={Link}
    onClick={hideSideBar}
    to={{
      pathname: `${path}`,
      state: { slideLeft:true }
    }}
  >
    <Icon name={icon} />
    {title}
  </Menu.Item>
);

export default SideBar;
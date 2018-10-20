import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { games } from '../../helpers/data';
import '../../styles/navInfo/SideBar.css';

class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = { visible: false }
  }
  
  showSideBar = () => this.setState({ visible: !this.state.visible })

  hideSideBar = () => this.setState({ visible: false })

  render(){
    return (
      <div className='sidebar sidebar-main'>
        <Button 
          className='sideBarBtn'
          icon='list'
          size='massive' 
          onClick={this.showSideBar} 
          style={{ opacity: this.props.opacity}}
        />
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={this.hideSideBar}
          vertical
          visible={this.state.visible}
          width='wide'
        >
          <Menu.Item className='home-close-btn-group'>
            <Button.Group size='massive'>
              <Button basic 
                      inverted
                      as={Link}
                      to={{
                        pathname: '/',
                        state: { pageTransition:'slideRight' }
                      }}
                      color='blue' 
                      icon='home' 
                      onClick={this.hideSideBar} />
              <Button basic 
                      inverted
                      color='red' 
                      icon='x' 
                      onClick={this.hideSideBar} />
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
              hideSideBar={this.hideSideBar}
            />
          )}
        </Sidebar>
      </div>
    )
  };
};

export default SideBar;

const MenuItem = ({ path, icon, title, hideSideBar }) => (
  <Menu.Item 
    as={Link}
    onClick={hideSideBar}
    to={{
      pathname: `${path}`,
      state: { pageTransition:'slideLeft' }
    }}
  >
    <Icon name={icon} />
    {title}
  </Menu.Item>
);
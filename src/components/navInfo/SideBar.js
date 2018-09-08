import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react';
import '../../styles/navInfo/SideBar.css';

class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = { visible: false }
  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  handleSideBarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state
    return (
      <div className='sidebar sidebar-main'>
        <Button 
          className='sideBarBtn'
          icon='list' 
          size='massive' 
          onClick={this.handleButtonClick} 
        />

        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={this.handleSideBarHide}
          vertical
          visible={visible}
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
                      onClick={this.handleButtonClick} />
              <Button basic 
                      inverted
                      color='violet' 
                      icon='x' 
                      onClick={this.handleButtonClick} />
            </Button.Group>
          </Menu.Item>
          <Menu.Item as={Link}
                     to='/elimination'>
            <Icon name='x' />
            Elimination
          </Menu.Item>
          <Menu.Item as={Link}
                     to='/whatsbehind'>
            <Icon name='find' />
            What's Behind
          </Menu.Item>
          <Menu.Item as={Link}
                     to='/stars'>
            <Icon name='star' />
            Stars Writing
          </Menu.Item>
          <Menu.Item as={Link}
                     to='/lotto'>
            <Icon name='won' />
            Word Lotto
          </Menu.Item>
          <Menu.Item as={Link}
                     to='/sparkle'>
            <Icon name='diamond' />
            Sparkle Die
          </Menu.Item>
          <Menu.Item as={Link}
                     to='/kimchi'>
            <Icon name='heart' />
            Kimchi Elimination
          </Menu.Item>
          <Menu.Item as={Link}
                     to='/bowling'>
            <Icon name='bowling ball' />
            Letter Bowling
          </Menu.Item>
          <Menu.Item as={Link}
                     to='/chase'>
            <Icon name='exchange' />
            Chase the Vocab
          </Menu.Item>
        </Sidebar>
      </div>
    )
  }
}

export default SideBar;
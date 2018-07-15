import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react';
import '../styles/SideBar.css';

class SideBarMain extends Component {
  constructor(props){
    super(props);
    this.state = { visible: false }
  }

  // document level keypress to handle game hotkeys
  // componentDidMount()   { document.addEventListener('keydown', this.handleKeyEvent); };
  // componentWillUnmount(){ document.removeEventListener('keydown', this.handleKeyEvent); };

  // handleKeyEvent = (e) => { if(e.keyCode === 77) this.handleButtonClick(); };

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state
    // const { handleHomeClick } = this.props;
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
          onHide={this.handleSidebarHide}
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
          <Menu.Item as='a'>
            <Icon name='find' />
            What's Behind
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='star' />
            Stars Writing
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='won' />
            Word Lotto
          </Menu.Item>
        </Sidebar>
      </div>
    )
  }
}

export default SideBarMain;
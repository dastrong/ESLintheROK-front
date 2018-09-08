import React, {Component} from 'react'
import { Header, Icon, Modal } from 'semantic-ui-react';
import '../../styles/navInfo/InfoModal.css';

const info = [
  {
    path: ['elimination', 'whatsbehind', 'stars', 'lotto'],
    keyCuts: [
      {key: 'Space / Enter', description: 'Refresh the game'},
      {key: 'Left-Arrow', description: 'Refresh the game and use vocabulary'},
      {key: 'Right-Arrow', description: 'Refresh the game and use expressions'},
      {key: 'Up-Arrow', description: 'Increase the font size'},
      {key: 'Down-Arrow', description: 'Decrease the font size'}
    ]
  },
  {
    path: 'kimchi',
    keyCuts: [
      {key: 'Space / Enter', description: 'Refresh the game'},
      {key: 'Left-Arrow', description: 'Increase kimchi frequency'},
      {key: 'Right-Arrow', description: 'Decrease kimchi frequency'},
      {key: 'Up-Arrow', description: 'Increase the font size'},
      {key: 'Down-Arrow', description: 'Decrease the font size'}
    ]
  },
  {
    path: 'sparkle',
    keyCuts: [
      {key: 'Space / Enter', description: 'Refresh the game'},
      {key: 'Left-Arrow', description: 'Decrease the timer (min: 5s)'},
      {key: 'Right-Arrow', description: 'Increase the timer (max: 20s)'},
      {key: 'Up-Arrow', description: 'Increase the font size'},
      {key: 'Down-Arrow', description: 'Decrease the font size'}
    ]
  },
  {
    path: 'bowling',
    keyCuts: [
      {key: 'Space / Enter', description: 'Refresh the game'},
      {key: 'Left-Arrow', description: 'Decrease the total rounds'},
      {key: 'Right-Arrow', description: 'Increase the total rounds'},
    ]
  },
  {
    path: 'chase',
    keyCuts: [
      {key: 'Space / Enter', description: 'Refresh the game'},
      {key: 'Left-Arrow', description: 'Refresh the game and use vocabulary'},
      {key: 'Right-Arrow', description: 'Refresh the game and use expressions'},
      {key: 'Up-Arrow', description: 'Increase the font size'},
      {key: 'Down-Arrow', description: 'Decrease the font size'},
      {key: 'C', description: 'Change the block color'},
      {key: '1-9', description: 'Change the difficulty (easiest:1, hardest:9, default:5)'}
    ]
  },
]

class InfoModal extends Component {
  constructor(props){
    super(props);
    this.state = { visible: false }
  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  handleInfoModalHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    // returns an object containing hotkey info or undefined
    const gameInfoObj = info.find(x=>(x.path.includes(this.props.pathName)));
    if(!gameInfoObj){ console.log('no hotkey object found') };

    // returns a list of hotkeys for the chosen game or null
    const hotkeys = gameInfoObj
      ? gameInfoObj.keyCuts.map((x, i)=>(
          <div className='info-modal-item' key={i}>
            <div className='info-modal-item-key'>
              {x.key}
            </div>
            <div className='info-modal-item-des'>
              {x.description}
            </div>
          </div>
        ))
      : null;

    return (
      <div>
        <Icon
          className='info-modal-icon'
          size='huge' 
          name='info circle'
          onClick={this.handleButtonClick} 
          link
        />
        <Modal 
          open={visible}
          size='small'
          className='info-modal' 
          onClose={this.handleInfoModalHide}
          closeIcon
        >
          <Header icon='info' content='Keyboard Shortcuts' />
          <Modal.Content>
            <div className='info-modal-container'>
              <div className='info-modal-item header'>
                <div className='info-modal-item-key'>
                  Key
                </div>
                <div className='info-modal-item-des'>
                  Description
                </div>
              </div>
              {hotkeys}
            </div>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default InfoModal;
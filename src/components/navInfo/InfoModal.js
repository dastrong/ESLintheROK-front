import React, {Component} from 'react'
import { Header, Icon, Modal } from 'semantic-ui-react';
import '../../styles/navInfo/InfoModal.css';

class InfoModal extends Component {
  constructor(props){
    super(props);
    this.state = { visible: false }
  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  handleInfoModalHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state
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
              <div className='info-modal-item'>
                <div className='info-modal-item-key'>
                  Spacebar
                  <br></br>
                  Enter
                </div>
                <div className='info-modal-item-des'>
                  Refresh the game
                </div>
              </div>
              <div className='info-modal-item'>
                <div className='info-modal-item-key'>
                  Left-Arrow
                </div>
                <div className='info-modal-item-des'>
                  Refresh the game and use vocabulary
                </div>
              </div>
              <div className='info-modal-item'>
                <div className='info-modal-item-key'>
                  Right-Arrow
                </div>
                <div className='info-modal-item-des'>
                  Refresh the game and use expressions
                </div>
              </div>
              <div className='info-modal-item'>
                <div className='info-modal-item-key'>
                  Up-Arrow
                </div>
                <div className='info-modal-item-des'>
                  Increase the font size
                </div>
              </div>
              <div className='info-modal-item'>
                <div className='info-modal-item-key'>
                  Down-Arrow
                </div>
                <div className='info-modal-item-des'>
                  Decrease the font-size
                </div>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default InfoModal;
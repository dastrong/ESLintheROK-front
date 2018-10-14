import React, { Component, Fragment } from 'react'
import ReactGA from 'react-ga';
import { Header, Icon, Modal } from 'semantic-ui-react';
import { hotKeyInfo } from '../../helpers/data';
import '../../styles/navInfo/InfoModal.css';

class InfoModal extends Component {
  constructor(props){
    super(props);
    this.state = { visible: false }
  }

  handleButtonClick = () => {
    ReactGA.event({
      category: 'Modal',
      action: `Clicked ${this.props.path} Modal`,
      label: this.props.path
    });
    this.setState({ visible: !this.state.visible });
  }

  handleInfoModalHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    // returns an object containing hotkey info or undefined
    const game = hotKeyInfo.find(({ path })=> path === this.props.path);
    // returns a list of hotkeys for the chosen game
    const hotkeys = game.keyCuts.map((x, i)=>(
      <div className='info-modal-item' key={i}>
        <div className='info-modal-item-key'>
          {typeof x.key !== 'string' 
            ? x.key.map(d=><Fragment key={d}>{d} <br /></Fragment>) 
            : x.key}
        </div>
        <div className='info-modal-item-des'>
          {x.description}
        </div>
      </div>
    ));

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
          size='large'
          className='info-modal' 
          onClose={this.handleInfoModalHide}
          closeIcon
        >
          <Header icon='info' content='Game Shortcuts' />
          <Modal.Content>
            <div className='info-modal-container'>
              <div className='info-modal-item header'>
                <div className='info-modal-item-key'>
                  Shortcut
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
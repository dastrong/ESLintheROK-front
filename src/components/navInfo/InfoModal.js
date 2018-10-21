import React, { Component, Fragment } from 'react'
import ReactGA from 'react-ga';
import { Header, Icon, Modal, Popup, Dropdown } from 'semantic-ui-react';
import { fonts } from '../../helpers/data';
import '../../styles/navInfo/InfoModal.css';

class InfoModal extends Component {
  constructor(props){
    super(props);
    this.state = { visible: false }
  }

  handleButtonClick = () => {
    const { path } = this.props.gameData.router;
    ReactGA.event({
      category: 'Modal',
      action: `Clicked ${path} Modal`,
      label: path
    });
    this.setState({ visible: !this.state.visible });
  }

  handleInfoModalHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    const { gameData, opacity, font, changeFont } = this.props;
    // returns a list of hotkeys for the chosen game
    const hotkeys = gameData.keyCuts.map((x, i)=>(
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
        <Popup 
          wide='very'
          trigger={
            <Icon
              link
              className='info-modal-icon'
              size='huge' 
              name='help circle'
              onClick={this.handleButtonClick} 
              style={{opacity: opacity}}
            />
          }
          content={
            <Fragment>
              <h3>{gameData.info.title} Help</h3>
              <p>You can view these in game too.</p>
              <p>Just hover up here and click.</p>
              <p><span style={{fontWeight: 'bold'}}>Note:</span> Each game has different helpers</p>
            </Fragment>
          }
          position='bottom center'
          horizontalOffset={-12}
        />
        <Modal 
          open={visible}
          className='info-modal' 
          onClose={this.handleInfoModalHide}
          closeIcon
        >
          <Header textAlign='center'>
            <Icon name='info' />
            {`${gameData.info.title} Options`}
            {gameData.info.attachments && <Icon
              link
              name='download'
              onClick={()=> window.open("https://drive.google.com/drive/folders/1gaVcobvZ3zPp-EsGlfQr9_yQh97k7IQn?usp=sharing", "_blank")}
            />}
          </Header>
          <Dropdown
            fluid
            selection
            onChange={(e, {value}) => changeFont(value)}
            placeholder={`Select a new font (Current Font: ${font.slice(0, font.indexOf(','))})`}
            options={fonts}
          />
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
import React from 'react';
import { Button, Modal, Image } from 'semantic-ui-react';

const GifModal = ({url, handleReset}) => (
  <Modal size='fullscreen'
         open={true} 
         onClose={() => handleReset()}>
    <Modal.Content scrolling={false}>
      <Image src={url} 
             alt="Loading... unless your area has blocked GIPHY.com"
             size='huge' 
             centered={true} 
             verticalAlign='middle' />
    </Modal.Content>
    <Modal.Actions>
      <Button positive 
              icon='angle right' 
              labelPosition='right' 
              content='Play Again?' 
              onClick={() => handleReset()}/>
    </Modal.Actions>
  </Modal>
);

export default GifModal;
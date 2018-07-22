import React from 'react';
import { Button, Modal, Image } from 'semantic-ui-react';

const GifModal = ({url, handleReset}) => (
  <Modal size='large' open={true} onClose={handleReset}>
    <Modal.Content>
      <Image src={url} 
             alt='Loading...'
             size='large' 
             centered={true} 
             verticalAlign='middle' />
    </Modal.Content>
    <Modal.Actions>
      <Button positive 
              icon='angle right' 
              labelPosition='right' 
              content='Play Again?' 
              onClick={handleReset} />
    </Modal.Actions>
  </Modal>
);

export default GifModal;
import React, { Component } from 'react';
import { Button, Modal, Image } from 'semantic-ui-react';

class GifModal extends Component {
  constructor(props){
    super(props);
    this.state = { open: true };
  }

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { url, handleReset } = this.props;
    return (
      <div>
        <Modal size='large' open={open} onClose={this.close}>
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
      </div>
    )
  }
}

export default GifModal;
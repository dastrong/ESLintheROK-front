import React, { PureComponent } from 'react'
import { Modal } from 'semantic-ui-react'
import LessonsHolder from '../pages/Lessons/LessonsHolder';
import DataHolder from '../pages/Data/DataHolder';

class DataModal extends PureComponent {
  
  render(){
    const { 
      sendData, isGameReady, dataModalName, showDataModal, closeModal, vocabulary, expressions
    } = this.props;
    const showLessons = dataModalName === 'lessons';
    const showData = dataModalName === 'data';
    return (
      <Modal 
        basic
        size='large'
        className='data-modal'
        open={showDataModal}
        onClose={closeModal}
      >
        <Modal.Content>
          <div className='page-container-inner'>
            {showLessons
              ? <LessonsHolder
                  sendData={sendData} 
                  isGameReady={isGameReady}
                  fromDataModal={true}
                />
              : <DataHolder 
                  {...this.props}
                  vocabulary={showData ? [] : vocabulary}
                  expressions={showData ? [] : expressions}
                  fromDataModal={true}
                />
            }
          </div>
        </Modal.Content>
      </Modal>
    )
  }
}

export default DataModal;
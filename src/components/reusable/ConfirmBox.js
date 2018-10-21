import React, { Component } from 'react'
import { Confirm } from 'semantic-ui-react'

const styles = {
  textAlign: 'center',
  letterSpacing: '0.3px',
}

class ConfirmBox extends Component {
  state = { open: this.props.open }

  render() {
    const { onConfirm, cancelText, confirmText, header, content } = this.props;
    return (
      <Confirm
        style={styles}
        open={this.state.open}
        header={header}
        content={content}
        cancelButton={cancelText}
        confirmButton={confirmText}
        onCancel={()=>this.setState({open:false})}
        onConfirm={()=>this.setState({open:false}, onConfirm)}
      />
    )
  }
}

export default ConfirmBox
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

const containerStyle = {
  minHeight: 'calc(100vh - 100px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const messageStyle = {
  textAlign: 'center',
  width: '100%',
  margin: '0',
}

const imgStyle = { margin: 'auto' }

class ErrorPage extends Component {

  componentDidMount(){
    document.title = 'Error - ESL in the ROK';
  }

  render(){
    const { header, content } = this.props;
    return (
      <div style={containerStyle}>
        <Message
          style={messageStyle} 
          error
          size='big'
          header={header}
          content={content}
        />
        <img 
          style={imgStyle}
          src='https://res.cloudinary.com/dastrong/image/upload/f_auto,q_45/v1539070526/TeacherSite/Misc/ErrorMeme.jpg'
          alt='fry-meme'
        />
      </div>
    );
  }
}

export default ErrorPage
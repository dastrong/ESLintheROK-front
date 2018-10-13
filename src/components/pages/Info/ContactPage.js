import React, { Component } from 'react';
import { Divider, Icon} from 'semantic-ui-react';
import ContactForm from './ContactForm';
import PageHeader from '../PageHeader';
import kakaoQR from '../../../assets/images/kakaoQR.jpg';
import './Info.css';

class ContactPage extends Component {

  componentDidMount(){
    document.title = 'Contact - ESL in the ROK'
  }

  render(){
    return (
      <div className='content-container'>
        <PageHeader 
          icon='mail'
          text='Contact Us'
          info='Join a conversation below'
          color='blue'
        />
        <div className='content-info contact'>
          <div className='contact-holders'>
            <h1>Interactive</h1>
            <div className='contact-interactive'>
              <h3>Join a conversation</h3>
              <br />
              <div className='interactive-chats'>
                <div>
                  <h3>KorShare Chat</h3>
                  <a 
                    href='http://www.korshare.org'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Icon 
                      size='massive'
                      name='computer'
                      color='black'
                    />
                  </a>
                </div>
                <div>
                  <h3>Kakao Chat</h3>
                  <img src={kakaoQR} alt='Kakao QR Code' />
                </div>
              </div>
              <br />
              <span>Vote for the games you want 
                <a 
                  href='http://www.korshare.org' 
                  target='_blank' 
                  rel='noopener noreferrer'
                > here</a>.
              </span>
            </div>
          </div>
          <Divider vertical>OR</Divider>
          <div className='contact-holders'>
            <h1>Email</h1>
            <div>
              <h3>Contact the developer</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactPage;
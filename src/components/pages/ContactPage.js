import React, { Component } from 'react';
import { Divider, Form, Icon} from 'semantic-ui-react';
import PageHeader from './PageHeader';
import kakaoQR from '../../assets/images/kakaoQR.jpg';
import '../../styles/pages/ContentPages.css';

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
              <EmailForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactPage;


const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class EmailForm extends Component {
  constructor(props){
    super(props);
    this.state = { name: '', email: '', text: '' }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
    .then(resp => {
      console.log(resp);
      alert("Success!")
    })
    .catch(error => alert(error));
    e.preventDefault();
  };

  render() {
    const { name, email, text } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <Form.Input 
          required
          name='name'
          value={name}
          placeholder='Name'
          onChange={this.handleChange}
          />
        <Form.Input 
          required
          name='email'
          value={email}
          type='email'
          placeholder='Email'
          onChange={this.handleChange}
        />
        <Form.TextArea 
          required
          name='text'
          value={text}
          rows='5'
          placeholder='Enter your question here'
          onChange={this.handleChange}
        />
        <Form.Button 
          fluid 
          color='blue'
          type='submit' 
          content='Submit' 
        />
      </Form> 
    )
  }
}
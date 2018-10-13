import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import './Info.css';

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class ContactForm extends Component {
  constructor(props){
    super(props);
    this.state = { name: '', email: '', text: '' }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    this.setState({ loading: true })
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
    .then(({ status }) => this.setState({ 
      status, 
      loading: false, 
      message: status === 200 ? 'Success! Email sent.' : 'Error. Please try again later.'
    }))
    .catch(error => console.log(error));
    e.preventDefault();
  };

  render() {
    const { name, email, text, status, message, loading } = this.state
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
          type='submit' 
          disabled={message !== undefined}
          loading={loading}
          content={message || 'Submit' }
          color={!status ? 'blue'
                 :status === 200 ? 'green' : 'red'}
        />
      </Form> 
    )
  }
}

export default ContactForm;
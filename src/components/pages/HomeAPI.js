import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import '../../styles/pages/HomeAPI.css';

class HomeAPI extends Component {

  componentDidMount(){
    document.title = 'Hidden Home - ESL in the ROK'
  }

  render(){
    return (
      <div className='home-container'>
        <h2>Welcome to the hidden part of 
          {<Link to={{
            pathname: '/',
            state: { pageTransition:'slideUp' }
          }}> ESL In The ROK</Link>}
        </h2>
        <h3>Currently, we NEED users to enter lesson data</h3>
        <h5>Any help is much appreciated.</h5>
        <hr />
        <div className='home-lists'>
          <h3>Directions</h3>
          <ul>
            <li>Select a grade.</li>
            <li>Choose your book.</li>
            <li>Click create lesson.</li>
            <li className='starred-li'>*Please, don't create a lesson if one already exists*</li>
            <br />
            <li>Only use the vocabulary given for that lesson in that book's teacher guide</li>
            <li className='starred-li'>*When someone choose a lesson, they have the option to add extra words they may have taught*</li>
            <br />
            <li>For expressions, the above still applies.</li>
            <li>ex) I like apples.</li>
            <li>You can flip out apples with the other food vocabulary words.</li>
            <li>You can also include fill in the blank expressions: I like _____.</li>
            <li className='starred-li'>*If you have any questions, don't hesitate to ask*</li>
          </ul>
          <h3>What's Required?</h3>
          <ul>
            <li>Lesson number and title</li>
            <li>At least 9 vocabulary words</li>
            <li>At least 6 key expressions</li>
          </ul>
        </div>
        <Button 
          as={Link}
          to={{
            pathname: '/api/data',
            state: { pageTransition:'slideUp' }
          }}
          color='green'
          size='big'
          content='Get Started'
        />
      </div>
    )
  }
}

export default HomeAPI;
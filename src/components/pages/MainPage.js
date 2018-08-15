import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react';
import '../../styles/pages/MainPage.css';

const MainPage = () => (
  <section>
    <Header as='h1' style={{marginTop: '50px'}}>Collection of ESL Games</Header>
    <Header as='h3'>Inspired by ESL Teachers in Korea</Header>
    <div>
      <div>
        <h1>Convenient</h1>
        <h4>Have 5 minutes of spare time or do you want to reward your class?</h4>
        <p>Use one of our ready made lesson material</p>
        <Button as={Link} to='/games' color='teal' content='View Lessons' />
      </div>
      <div>
        <h1>Customizable</h1>
        <h4>Would you like to use our games in during your classes?</h4>
        <p>Enter your own vocabulary, expressions and images</p>
        <Button as={Link} to='/data' color='green' content='Create Your Own' />
      </div>
    </div>
  </section>
);

export default MainPage;
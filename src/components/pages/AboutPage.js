import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';
import '../../styles/pages/ContentPages.css';

class AboutPage extends Component {
  
  componentDidMount(){
    document.title = 'About - ESL in the ROK'
  }

  render(){
    return (
      <div className='content-container'>
        <PageHeader 
          icon='user'
          text='ABOUT'
          info="Learn about this site and it's creator"
          color='violet'
        />
        <div className='content-info'>
          <h1>The Site</h1>
          <p>I was created to assist public school English teachers in Korea.</p>
          <p>I'm responsive, adjustable and loaded with helpful shortcuts to improve your experience. I'm far superior to my powerpoint counterpart (you won't experience any blue screen of death with me either).</p>
          <p>I'm completely free-to-use!</p>
          <p>If you have any questions, head over to my {<Link to={{
            pathname: '/faq',
            state: { pageTransition:'slideUp' }
          }}>FAQs</Link>}.</p>
          <h1>The Creator</h1>
          <p>Hey, I'm Daniel. Currently, I work at two public elementary schools for the GOE in Changwon.</p>
          <p>For the last year or so, I've been learning how to program and this site is my latest creation. It took me nearly four months of nights and weekends to produce a site that I was confident could and would be utilized around Korea.</p>
          <p>Even though there's already 8 games, there are many still to be added. Let me know here what games you would like to see next.</p>
          <p>If there are any developers out there that want to help improve site features or create new games, contact me to discuss.</p>
        </div>
      </div>
    )
  }
};

export default AboutPage;
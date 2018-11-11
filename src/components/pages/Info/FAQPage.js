import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from 'semantic-ui-react';
import './Info.css';

const panels = [
  {
    key: 'What-is-this-site',
    title: 'What is this site?',
    content: {
      key: 'What-is-this-site-content',
      content: (
        <p>For starters, read about us {<Link to={{pathname: '/about', state:{pageTransition: 'slideUp'}}}>here</Link>}.</p>
      )
    }
  },
  {
    key: "question-that-isn't-listed-below",
    title: "I have a question that isn't listed below.",
    content: {
      key: "question-that-isn't-listed-below-content",
      content: (
        <div>
          <p>Head to our {<Link to={{pathname: '/contact', state:{pageTransition: 'slideUp'}}}>contact</Link>} page.</p>
          <p>If you have an urgent question, use the Kakao group chat.</p>
        </div>
      )
    }
  },
  {
    key: 'Who-is-this-site-for',
    title: 'Who is this site for?',
    content: {
      key: 'Who-is-this-site-for-content',
      content: (
        <div>
          <p>English public school teachers in South Korea will benefit the most.</p>
          <p>Although any teacher can enter custom data and modify the rules for their classes.</p>
        </div>
      )
    }
  },
  {
    key: 'Are-there-any-fees',
    title: 'Are there any fees?',
    content: {
      key: 'Are-there-any-fees-content',
      content: (
        <p>Unlike other websites, this one is completely free to use.</p>
      )
    }
  },
  {
    key: 'Did-you-invent-all-these-games',
    title: 'Did you invent all these games?',
    content: {
      key: 'Did-you-invent-all-these-games-content',
      content: (
        <div>
          <p>Not all of them.</p>
          <p>If you know the creator of a game or want credit yourself, contact me.</p>
        </div>
      )
    }
  },
  {
    key: 'Will-you-be-adding-more-games',
    title: 'Will you be adding more games?',
    content: {
      key: 'Will-you-be-adding-more-games-content',
      content: (
        <div>
          <p>Yes!</p>
          <p>There's about 10 more that I'm looking to add.</p>
        </div>
      )
    }
  },
  {
    key: 'Will-you-be-adding-any-bomb-games',
    title: 'Will you be adding any bomb games?',
    content: {
      key: 'Will-you-be-adding-any-bomb-games-content',
      content: (
        <div>
          <p>Sorry, but no.</p>
          <p>I don't want any copyright issues and those PPTs are great as is.</p>
        </div>
      )
    }
  },
  {
    key: 'made-a-powerpoint-game',
    title: 'I made a powerpoint game, can you recreate it here?',
    content: {
      key: 'made-a-powerpoint-game-content',
      content: (
        <div>
          <p>It depends.</p>
          <p>{<Link to={{pathname: '/contact', state:{pageTransition: 'slideUp'}}}>Contact</Link>} me to discuss.</p>
        </div>
      )
    }
  },
  {
    key: 'How-do-I-use-the-games',
    title: 'How do I use the games?',
    content: {
      key: 'How-do-I-use-the-games-content',
      content: (
        <div>
          <p>Each game has a teacher and student instructions page with English and Korean languages.</p>
          <p>To view helpful shortcuts: hover your mouse over the top-right (while in the game) and an icon will appear. Click it.</p>
          <p>Each games plays differently, but most tricks work across games.</p>
        </div>
      )
    }
  },
  {
    key: 'lessons-data-slow-to-load',
    title: 'Why is the lessons data slow to load?',
    content: {
      key: 'lessons-data-slow-to-load-content',
      content: (
        <div>
          <p>One server goes to sleep after 30 minutes, if it's not interacted with.</p>
          <p>If you are the person to wake it up, it'll take a couple seconds.</p>
          <p>In my tests, if it's awake it'll load under 2 seconds. The wake up process should take under 10 seconds.</p>
        </div>
      )
    }
  },
];

class FAQPage extends Component {
  constructor(props){
    super(props);
    this.state = { activeIndex: 0 }
  }

  componentDidMount(){
    document.title = 'FAQ - ESL in the ROK'
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex })
  }

  render(){
    return (
      <div className='page-container'>
        <div className='content-info'>
          <Accordion defaultActiveIndex={0} panels={panels} />
        </div>
      </div>
    );
  }
}

export default FAQPage;
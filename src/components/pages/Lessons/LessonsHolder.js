import React, { PureComponent } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { GradesPrimary, GradesSecondary } from './Grades';
import PaginationMenu from './PaginationMenu';
import Books from './Books';
import DataHolder from '../Data/DataHolder';
import './Lessons.css';

class LessonsHolder extends PureComponent {
  state = {
    screen: 1,
    grades: [],
    books: {books: []},
    lessons: {lessons: []},
    activePage: 1,
    loading: false,
    URLs: [],
    data: {
      vocabulary: [],
      expressions: [],
    },
    baseURL: process.env.REACT_APP_LESSONS_API_URL,
    isAPI: this.props.isAPI,
  }
  
  componentDidMount(){ 
    this.getData('grades', {url: '/'});
    if(this.props.fromLessonsPage || this.props.fromDataModal) return;
    document.title = 'Choose Lesson - ESL in the ROK'
  }

  setData = ({ vocabulary, expressions }) => this.setState({ screen:3, data: { vocabulary, expressions }});

  getData = (dataSource, settings) => {
    let { baseURL, URLs } = this.state;
    if(dataSource === 'books' && URLs.length > 1){ URLs = URLs.slice(0,1) }
    if(dataSource === 'lessons' && URLs.length > 2){ URLs = URLs.slice(0,2) }
    this.setState({ loading:true, URLs:[...URLs, settings.url], ...settings }, ()=> {
      const combinedURLs = this.state.URLs.join('');
      fetch(baseURL+combinedURLs)
      .then((blob)=> blob.json())
      .then((json)=> this.setState({ loading:false, [dataSource]:json }))
      .catch(err=>console.log(err))
    });
  }

  closeBook = () => this.setState({ targetLocation:null, targetID:null });

  handlePaginationChange = (e, { activePage }) => this.setState({activePage});

  changeScreen = ({ screen }) => this.setState({ screen, targetID:null, targetLocation:null });

  render(){
    const { screen, loading, grades, books, activePage, data, isAPI } = this.state;
    const { sendData, isGameReady } = this.props;
    // options for the grades dropdown
    const options = 
      grades
      .sort((a,b)=>a.grade-b.grade)
      .map(({ grade, _id })=> ({ key: _id, text: grade, id: _id }));

    // choose their grade screen
    const FirstScreen = 
      <CSSTransition
        in={screen === 1}
        classNames='first-screen'
        timeout={{exit: 1000}}
      >
        <GradesPrimary
          loading={loading}
          options={options}
          getData={this.getData}
        />
      </CSSTransition>

    // choose their book and lesson screen
    const SecondScreen = 
      <CSSTransition
        classNames='second-screen'
        timeout={0}
      >
        <div className='second-screen'>
          <GradesSecondary
            grade={books.grade}
            options={options}
            getData={this.getData}
          />
          <Books
            getData={this.getData}
            setData={this.setData}
            closeBook={this.closeBook}
            deleteURLs={this.deleteURLs}
            changeScreen={this.changeScreen}
            {...this.state}
          />
          <PaginationMenu
            books={books.books}
            activePage={activePage}
            handleChange={this.handlePaginationChange}
          />
        </div>
      </CSSTransition>

    const ThirdScreen = 
      <CSSTransition
        classNames='third-screen'
        timeout={0}
      >
        <DataHolder
          isAPI={isAPI}
          postRoute={this.state.baseURL + this.state.URLs.join('')}
          sendData={sendData}
          fromLessonsPage={true}
          isGameReady={isGameReady}
          vocabulary={data.vocabulary} 
          expressions={data.expressions}
          changeScreen={this.changeScreen}
        />
      </CSSTransition>
  
    return (
      <TransitionGroup className='lessons-container'>
        {screen === 1 && FirstScreen}
        {screen === 2 && SecondScreen}
        {screen === 3 && ThirdScreen}
      </TransitionGroup>
    );
  }
}

export default LessonsHolder;
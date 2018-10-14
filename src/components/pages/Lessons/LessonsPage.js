import React, { PureComponent, Fragment } from 'react';
import DataPageAPI from '../Data/DataPageAPI';
import DataPage    from '../Data/DataPage';
import {
  handleLoader, handleFetch, handlePost, handleMessage, changeIndex,
  handleGradeClick, handleBookClick, handleLessonClick, handleLessonAPIClick,
} from './helperFunc';
import {
  LoadIcon, MessageBanner, Steps,
  Grades, Books, Lessons, ErrorMessageBanner,
} from './helperComp';
import './LessonsPage.css'

class LessonsPage extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      grades: [],
      books:   {books:   []},
      lessons: {lessons: []},
      data: {
        vocabulary: [],
        expressions: [],
      },
      showMessage: false,
      showLoader: false,
      baseURL: process.env.REACT_APP_LESSONS_API_URL,
      apiRoute: '',
      isAPI: this.props.isAPI,
    }
    this.handleLoader = handleLoader.bind(this);
    this.handleFetch = handleFetch.bind(this);
    this.handleGradeClick = handleGradeClick.bind(this);
    this.handleBookClick = handleBookClick.bind(this);
    this.handleLessonClick = handleLessonClick.bind(this);
    this.handleLessonAPIClick = handleLessonAPIClick.bind(this);
    this.changeIndex = changeIndex.bind(this);
    this.handlePost = handlePost.bind(this);
    this.handleMessage = handleMessage.bind(this);
  }

  componentDidMount(){
    // returns all grades available to start
    this.handleLoader(0, '/', 'grades');
    document.title = this.props.isAPI ? 'Create Lesson - ESL in the ROK' : 'Choose Lesson - ESL in the ROK';
  }

  render(){
    const { index, apiRoute, data, baseURL, isAPI,
            grades, books, lessons,
            showMessage, showLoader,
          } = this.state;
    const { sendData, isGameReady } = this.props;

    const gradesList = index === 0 && !showLoader &&
      <Grades
        grades={grades}
        handleClick={this.handleGradeClick}
      />

    const booksList = index === 1 && books._id && !showLoader && 
      <Fragment>
        <ErrorMessageBanner 
          color='red'
          header='A quick heads up'
          content="If your book has a red icon, there's no lesson data for it..YET. Contact me to volunteer and help out"
        />
        <Books 
          books={books.books}
          handleClick={this.handleBookClick}
        />
      </Fragment>
    
    const lessonsList = index === 2 && lessons._id && !showLoader &&
      <Lessons 
        isAPI={isAPI}
        book={lessons}
        handleClick={isAPI ? this.handleLessonAPIClick : this.handleLessonClick}
      />
    
    const dataPage = index === 3 && data._id && !isAPI && !showLoader
      ? <DataPage
          sendData={sendData}
          fromLessonsPage={true}
          isGameReady={isGameReady}
          vocabulary={data.vocabulary} 
          expressions={data.expressions} 
        />
      : index === 3 && isAPI && !showLoader && 
        <DataPageAPI 
          postRoute={baseURL+apiRoute}
          handlePost={this.handlePost}
          handleMessage={this.handleMessage}
        />

    return (
      <div className='lessons-container'>
        <Steps
          index={index}
          handleClick={this.changeIndex}
        />
        <MessageBanner 
          hidden={!showMessage}
          color='green'
          header='Success!'
          content='Thanks for contributing!'
        />
        <div className='lessons-container-inner'>
          <LoadIcon active={showLoader} />
          {gradesList}
          {booksList}
          {lessonsList}
          {dataPage}
        </div>
      </div>
    );
  }
}

export default LessonsPage;
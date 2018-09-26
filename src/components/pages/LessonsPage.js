import React, { PureComponent } from 'react';
import { Step, Loader, Dimmer } from 'semantic-ui-react';
import DataEntryPage from './DataEntryPage';
import '../../styles/pages/LessonsPage.css'

const baseURL = 'https://api-teach-site-dastrong.c9users.io/api';
const stepInfo = [
  {
    title: 'GRADE',
    description: 'Choose a grade',
    show: 'showGrades',
  },
  {
    title: 'BOOK',
    description: 'Choose a book',
    show: 'showBooks',
  },
  {
    title: 'LESSON',
    description: 'Choose a lesson',
    show: 'showLessons',
  },
  {
    title: 'EDIT',
    description: 'Edit the data',
    show: 'showEdit',
  },
]

class LessonsPage extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      grades: [],
      books:   {books:   []},
      lessons: {lessons: []},
      data:    {vocabulary: [], 
                expressions:[]},
      gradeID:  undefined,
      bookID:   undefined,
      lessonID: undefined,
      showLoader: false,
      showGrades: false,
      showBooks:  false,
      showLessons: false,
      showEdit:    false, 
      isGameReady: false,
    }
  }

  componentDidMount(){
    this.handleLoader('/', {showGrades:true}, 'grades', 0);
  }
  
  handleLoader = (urlAddOns, show, x, index) => {
    this.setState({ showLoader: true }, this.handleFetch(urlAddOns, show, x, index));
  }

  handleFetch = (urlAddOns, show, x, index) => {
    fetch(baseURL+urlAddOns)
    .then((blob)=>blob.json())
    .then((json)=>this.setState({
      showLoader: false,
      ...show,
      [x]: json,
      index,
    }));
  }

  changeIndex = (e) => {
    e.persist();
    this.setState({index: Number(e.target.id)});
  }

  handleGradeClick = (e) => {
    const id = e.currentTarget.id;
    this.handleLoader(id, { showGrades: false, showBooks: true }, 'books', 1)
  }

  handleBookClick = (e) => {
    const id = e.currentTarget.id;
    this.handleLoader(id, { showBooks: false, showLessons: true }, 'lessons', 2)
  }

  handleLessonClick = (e) => {
    const id = e.currentTarget.id;
    this.handleLoader(id, { showLessons: false, showEdit: true }, 'data', 3)
  }

  render(){
    const { index, 
            grades, books, lessons, data,
            showLoader, showGrades, showBooks, showLessons, showEdit,
          } = this.state;
    const { sendData, isGameReady } = this.props;
    return (
      <div className='lessons-container'>
        <Steps
          index={index}
          info={stepInfo}
          handleClick={this.changeIndex}
        />
        <div 
          className='lessons-container-inner'
        >
          { showLoader ? <LoadIcon active={true} /> : null }
          { grades.length && showGrades && !showLoader
              ? <Grades 
                  grades={grades}
                  handleClick={this.handleGradeClick}
                />
              : null }
          { books.books.length && showBooks && !showLoader
              ? <Books 
                  books={books.books}
                  gradeURL={`/${books._id}`}
                  handleClick={this.handleBookClick}
                />
              : null }
          { lessons.lessons.length && showLessons && !showLoader
              ? <Lessons 
                  book={lessons}
                  bookURL={`/${books._id}/${lessons._id}`}
                  handleClick={this.handleLessonClick}
                />
              : null }
          { data.vocabulary.length && data.expressions.length && showEdit && !showLoader 
              ? <DataEntryPage
                  sendData={sendData}
                  fromLessonsPage={true}
                  isGameReady={isGameReady}
                  vocabularyData={data.vocabulary} 
                  expressionData={data.expressions} 
                />
              : null }
        </div>
      </div>
    );
  }
}

export default LessonsPage;

//========================================//
//========================================//
//========================================//

const Steps = ({ info, index, changeIndex }) => (
  <Step.Group
    fluid
    ordered
    size='large'
    onClick={changeIndex}
  >
    {
      info.map(({ title, description }, i)=> 
        <Step 
          key={i}
          id={i}
          completed={index > i}
          disabled={index < i}
          active={index === i}
        >
          <Step.Content id={i}>
            <Step.Title 
              id={i}
              content={title}
            />
            <Step.Description
              id={i}
              content={description}
            />
          </Step.Content>
        </Step>
      )
    }
  </Step.Group>
);

const LoadIcon = ({ active }) => (
    <Dimmer active={active}>
      <Loader size='massive' />
    </Dimmer>
)

const Grades = ({ grades, handleClick }) => (
  grades.map(({ grade, _id }, i)=> 
    <div 
      onClick={handleClick}
      className='lessons-item lessons-item-grade' 
      key={i}
      id={`/${_id}`}
    >
      {grade}
    </div>
  )
);

const Books = ({ books, gradeURL, handleClick })=> (
  books.map(({ publisher, author, imageURL, _id }, i)=> (
    <div 
      onClick={handleClick}
      className='lessons-item lessons-item-book' 
      key={i}
      id={`${gradeURL}/${_id}`}
    >
      <img src={imageURL} alt='book-cover' />
      {`${publisher}, ${author}`}
    </div>
  ))
)

const Lessons = props => (
  <div className='chosen-book-container'>
    <img src={props.book.imageURL} alt='book-cover'/>
    <div className='chosen-book-content'>
      <h1>{`${props.book.publisher}, ${props.book.author}`}</h1>
      <LessonList {...props} />
    </div>
  </div>
)

const LessonList = ({ book, bookURL, handleClick }) => (
  <ul className='chosen-book-lessons-list'>
    {book.lessons.map(({ chapter, title, _id }, i)=> (
      <li 
        key={i}
        onClick={handleClick}
        id={`${bookURL}/${_id}`}
      >
        {`${chapter} - ${title}`}
      </li>
    ))}
  </ul>
)
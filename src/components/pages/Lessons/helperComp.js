import React from 'react';
import { Step, Loader, Dimmer, Message, Button } from 'semantic-ui-react';

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

export const LoadIcon = ({ active }) => (
  <Dimmer active={active}>
    <Loader size='massive' />
  </Dimmer>
)

export const MessageBanner = props => (
  <Message success
    {...props}
  />
)

export const Steps = ({ index, handleClick }) => (
  <Step.Group
    fluid
    ordered
    size='large'
    onClick={handleClick}
  >
    {
      stepInfo.map(({ title, description }, i)=> 
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

export const Grades = ({ grades, handleClick }) => (
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

export const Books = ({ books, handleClick })=> (
  books.map(({ publisher, author, imageURL, _id }, i)=> (
    <div 
      onClick={handleClick}
      className='lessons-item lessons-item-book' 
      key={i}
      id={`/${_id}`}
    >
      <img src={imageURL} alt='book-cover' />
      {`${publisher}, ${author}`}
    </div>
  ))
)

export const Lessons = props => (
  <div className='chosen-book-container'>
    <img src={props.book.imageURL} alt='book-cover'/>
    <div className='chosen-book-content'>
      <h1>{`${props.book.publisher}, ${props.book.author}`}</h1>
      { props.isAPI
        ? <Button 
            color='green'
            content='Add Lesson'
            id={props.book._id}
            onClick={props.handleClick}
          />
        : null }
      <LessonList {...props} />
    </div>
  </div>
)

export const LessonList = ({ book, handleClick, isAPI }) => (
  <ul className='chosen-book-lessons-list'>
    {book.lessons.map(({ chapter, title, _id }, i)=> (
      <li 
        key={i}
        onClick={!isAPI ? handleClick : null}
        id={`/${_id}`}
      >
        {`${chapter} - ${title}`}
      </li>
    ))}
  </ul>
)
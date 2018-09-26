import React from 'react';
import { Button, Icon, Step } from 'semantic-ui-react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const InstructionsHolder = ({
  // from state
  game, instructions, language, index,
  // from props
  direction, forPerson, transitionClass, isGameReady,
  // functions
  handleClick, changeIndex, changeLanguage
}) => (
  <div className='instructions-container'>
    <Steps 
      instructions={instructions[language]}
      index={index}
      changeIndex={changeIndex}
    />
    <ul 
      className='instructions-list'
      onClick={handleClick}  
    >
      <InstructionsList 
        index={index}
        instructions={instructions}
        language={language}
        game={game}
        forPerson={forPerson}
      />
    </ul>
    <ButtonGroup 
      flipOrder={forPerson === 'forTeachers'}
      direction={direction}
      transitionClass={transitionClass}
      game={game}
      language={language}
      changeLanguage={changeLanguage}
      isGameReady={isGameReady}
    />
    <Images 
      info={game.info}
    />
  </div>
)

// creates two identical images
const Images = ({ info }) => {
  return Array(2).fill(undefined).map((x,i)=>
    <img 
      key={`img-${i}`}
      src={info.images.topText}
      alt={info.title}
    />
  )
}

// creates step for instructions
// adds an ALL step to view a blob of instructions
const Steps = ({ instructions, index, changeIndex }) => (
  <Step.Group
    fluid 
    onClick={changeIndex}
  >
    {
      ['ALL', ...instructions].map((x,i)=>(
        <Step
          key={i}
          active={index === i}
          id={i}
          link
        >
          <Step.Content>
            <Step.Title id={i}>
              {i ? i : x}
            </Step.Title>
          </Step.Content>
        </Step>
      ))
    }
  </Step.Group>
);

// returns the correct list type 
const InstructionsList = ({ index, instructions, language, forPerson, game }) => (
  index
    // if index is > 0 show a single item
    ? <TransitionGroup component={null}>
        <CSSTransition
          key={index} 
          classNames='instructions-list-item-single'
          timeout={{ enter: 1000, exit: 1000 }}
        >
          <SingleInstruction 
            text={instructions[language][index-1]}
            index={index}
          />
        </CSSTransition>
      </TransitionGroup>
    // if index is 0 show all items
    : <MultipleInstructions 
        listData={game.instructions[forPerson][language]}
      />
)

// returns a single list item
const SingleInstruction = ({ text }) => (
  <li className='instructions-list-item-single'>
    {text}
  </li>
);

// returns an entire list 
const MultipleInstructions = ({ listData }) => (
  listData.map((item, i)=>
    <li key={i}>
      {item}
    </li>
  )
);

// returns a group of buttons
const ButtonGroup = ({ 
  flipOrder, direction, transitionClass, game, language, changeLanguage, isGameReady
}) => {
  const cx = classNames('instructions-buttons', { 
      'instructions-buttons-reverse' : flipOrder });
  const startBtn = classNames('massive', { 'disabled': !isGameReady });
  return (
    <div className={cx}>
      <Button  
        as={Link}
        to={{
          pathname: `${game.router.path}`,
          state: { pageTransition:transitionClass }
        }}
        className='massive'
        color='blue'
        icon labelPosition={direction}
      >
        <Icon size='large' name={`angle ${direction}`} /> 
        BACK
      </Button>

      <Button  
        as={Link}
        to={{
          pathname: `${game.router.path}/start`,
          state: { pageTransition:'slideUp' }
        }}
        className={startBtn}
        color='green'
      >
        START
      </Button>
      <Button  
        onClick={changeLanguage}
        className='massive'
        color='orange'
      >
        {language === 'english' ? 'KOREAN' : 'ENGLISH'}
      </Button>
    </div>
  );
}
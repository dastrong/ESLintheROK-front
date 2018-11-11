import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon, Button, Dropdown } from 'semantic-ui-react';

class Books extends Component {
  state = {
    lessons: [],
    sendingData: false,
  }
  
  getLessonData = async () => {
    const { baseURL, URLs, setData } = this.props;
    const combinedURLs = baseURL + URLs.join('');
    const urls = this.state.lessons.map(url=>`${combinedURLs}/${url}`);
    let [vocabulary, expressions] = [[],[]];
    await Promise.all(urls.map(url=>
      fetch(url)
      .then((blob)=>blob.json())
      .then((json)=>{
        vocabulary = [...vocabulary, ...json.vocabulary];
        expressions = [...expressions, ...json.expressions];
      })
      .catch(err=>console.log(err))
    )).catch(err=>console.log(err))
    setData({ vocabulary, expressions });
  }

  clearBook = () => this.setState({ lessons:[], sendingData:false }, this.props.closeBook);

  handleClick = (e) => {
    const id = e.currentTarget.id;
    const { x, width } = e.target.getBoundingClientRect();
    const middlePoint = window.innerWidth/2;
    const targetLoca = middlePoint - (x + (width/2));
    this.props.getData('lessons', { url: id, targetLocation:targetLoca, targetID:id })
  }

  render(){
    const { books, lessons, targetID, targetLocation, loading, activePage, isAPI, changeScreen } = this.props;
    const whichPages = activePage === 1 ? [0,5] : [5,books.length];

    const options = lessons.lessons
      .sort((a,b)=>a.chapter>b.chapter)
      .map(({ _id, chapter, title })=> ({ key:_id, value:_id, text: `${chapter}: ${title}` }))
    
    const labels = label => ({
      color: 'blue',
      content: `${label.text.slice(0, label.text.indexOf(':'))}`,
    })

    console.log('INTERMITTENT ERROR. PLEASE RELOAD THE PAGE AND REPORT ERROR.')

    const items = 
      books.books
      .sort((a,b)=>a.publisher>b.publisher)
      .slice(...whichPages)
      .map(({ lessons, publisher, author, imageURL, _id }, i)=> {
        const active = targetID === `/${_id}`;
        const leftOrRight = i < 3 ? '+' : '-';
        const cO = classNames({ active: active });
        const cX = classNames({ notActive: !active && targetID });        
        return (
          <div 
            key={i}
            className={`book-item ${cO + cX}`}
            style={active 
              ? {transform: `
              translateX(${targetLocation}px) 
              rotateY(${leftOrRight}180deg) 
              scale(2)
              `} 
              : null
            }
          >
            <div 
              className={`front ${cO}`}
              onClick={this.handleClick}
              id={`/${_id}`}
            >
              <img src={imageURL} alt='book-cover' />
              <div>
                <p>{`${publisher}, ${author}`}</p>
                <Icon 
                  color={lessons.length > 0 ? 'green' : 'red'} 
                  name='folder open' 
                />
              </div>
            </div>
            <div className={`back ${cO}`}>
              <Button 
                fluid
                color='green'
                content={isAPI ? 'Create Lesson' : 'Continue'}
                disabled={isAPI || this.state.lessons.length ? false : true}
                loading={this.state.sendingData}
                onClick={isAPI 
                  ? ()=> changeScreen({screen:3})
                  : ()=> this.setState({sendingData:true}, this.getLessonData)
                }
              />
              <Dropdown
                fluid multiple selection compact
                placeholder={
                  loading 
                    ? 'Loading...' 
                    : isAPI
                      ? "Please, don't recreate lessons!"
                      : lessons.length
                        ? 'Select your lesson'
                        : 'No lessons found' 
                }
                open={!loading}
                options={options}
                renderLabel={labels}
                onChange={(e, {value})=> this.setState({lessons: value})}
              />
              <Icon 
                name='x'
                size='big'
                color='red'
                className='close-book'
                onClick={this.clearBook}
              />
            </div>
          </div>
        )
      })

    return ( 
      <div className='book-holder'>
        {items}
      </div>
    )
  }
}

export default Books;
import React, { PureComponent, Fragment } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Link } from 'react-router-dom';
import DataPage         from './pages/Data/DataPage';
import AboutPage        from './pages/Info/AboutPage';
import ContactPage      from './pages/Info/ContactPage';
import FAQPage          from './pages/Info/FAQPage';
import LessonsPage      from './pages/Lessons/LessonsPage';
import MainPage         from './pages/MainPage';
import GamesPage        from './pages/GamesPage';
import HomeAPI          from './pages/HomeAPI';
import GamePage         from './pages/GamePage';
import InstructionsPage from './pages/InstructionsPage';
import ErrorPage        from './pages/ErrorPage';
import Switch           from '../helpers/Switch';
import { games }        from '../helpers/data';
import PageHeader from './pages/PageHeader';

class Routers extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      length: this.props.history.length
    }
  }

  componentDidUpdate(){
    const { history } = this.props;
    if(history.action === 'POP') return;
    return history.length < this.state.length
      ? this.setState({length: history.length})
      : history.length !== this.state.length
        ? this.setState(({length})=>({length: length + 1}))
        : null;
  }
  
  childFactoryCreator = (props) => child => React.cloneElement(child, props)

  render(){
    const { 
      vocabulary, 
      expressions,
      isGameReady,
      sendData,
      colors,
      location,
      history,
    } = this.props;
    // returns an className for page transitions
    const cx = history.length === this.state.length && history.action === 'POP'
                ? 'page page-slideDown'
                : location.state 
                  ? `page page-${location.state.pageTransition}` 
                  : 'page';
    return (
      <TransitionGroup
        component={null}
        // updates exit classes so animations are correct
        childFactory={this.childFactoryCreator({ classNames: `${cx}`, timeout:{ enter: 1000, exit: 1000 } })}
      >
        <CSSTransition 
          key={location.pathname}
          classNames={cx}
          timeout={{ enter: 1000, exit: 1000 }}
        >
          <section>
            <Route 
              location={location}
              render={()=> (
                <Switch location={location}>
                  <Route 
                    exact
                    path='/'
                    component={MainPage}
                  />
                  <Route 
                    exact
                    path='/data' 
                    render={()=>
                      <Fragment>
                        <PageHeader 
                          icon='cogs'
                          text='Custom Lesson'
                          info='Enter your own lesson data below'
                          color='teal'
                        />
                        <DataPage
                          vocabulary={vocabulary}
                          expressions={expressions}
                          isGameReady={isGameReady}
                          sendData={sendData}
                        />
                      </Fragment>
                    }
                  />
                  <Route 
                    exact
                    path='/api' 
                    render={()=>
                      <Fragment>
                        <PageHeader 
                          icon='cogs'
                          text='Hidden Home'
                          info='Enter a lesson for everyone to use'
                          color='teal'
                        />
                        <HomeAPI 
                          vocabulary={vocabulary}
                          expressions={expressions}
                          isGameReady={isGameReady}
                          sendData={sendData}
                        />
                      </Fragment>
                    }
                  />
                  <Route 
                    exact
                    path='/api/data'
                    render={()=>
                      <Fragment>
                        <PageHeader 
                          icon='cogs'
                          text='Hidden Data'
                          info='Enter your own lesson data below'
                          color='teal'
                        />
                        <LessonsPage isAPI={true} />
                      </Fragment>
                    }
                  />
                  <Route 
                    exact
                    path='/games'
                    component={GamesPage}
                  />
                  <Route 
                    exact
                    path='/contact'
                    component={ContactPage}
                  />
                  <Route 
                    exact
                    path='/about'
                    component={AboutPage}
                  />
                  <Route 
                    exact
                    path='/faq'
                    component={FAQPage}
                  />
                  <Route 
                    exact
                    path='/lessons'
                    render={()=> 
                      <Fragment>
                        <PageHeader 
                          icon='book'
                          text='Ready Made Lessons'
                          info='Choose your lesson below'
                          color='orange'
                        />
                        <LessonsPage
                          sendData={sendData}
                          isGameReady={isGameReady}
                        />
                      </Fragment>
                    }
                  />
                  {/* GAME ROUTES */}
                  {games.map(({ info, router })=>
                    <Fragment key={`${router.path}-routes`}>
                      <Route
                        exact
                        key={router.path}
                        path={router.path}
                        render={({ match })=> 
                          <GamePage
                            title={`Home - ${info.title}`}
                            path={match.path}
                            isGameReady={isGameReady} /> }
                      />
                      <Route
                        exact
                        key={`${router.path}-teacher`}
                        path={`${router.path}/teacher`}
                        render={()=> 
                          <InstructionsPage
                            title={`Teacher Instructions - ${info.title}`}
                            forPerson='forTeachers'
                            direction='right'
                            transitionClass='slideLeft'
                            path={router.path}
                            isGameReady={isGameReady} /> }
                      />
                      <Route
                        exact
                        key={`${router.path}-student`}
                        path={`${router.path}/student`}
                        render={()=> 
                          <InstructionsPage
                            title={`Student Instructions - ${info.title}`}
                            forPerson='forStudents'
                            direction='left'
                            transitionClass='slideRight'
                            path={router.path}
                            isGameReady={isGameReady} /> }
                      />
                      <Route
                        exact
                        key={`${router.path}-start}`}
                        path={`${router.path}/start`}
                        render={()=>
                          vocabulary.length < 9 || expressions.length < 6
                            ? <ErrorPage 
                                header="Sorry... there wasn't enough data to start that game."
                                content={<p>Go back to the 
                                  {<Link to={{ 
                                    pathname: '/lessons', 
                                    state: { pageTransition:'slideUp' }
                                  }}> lessons </Link>}
                                  page or enter your own data 
                                  {<Link to={{ 
                                    pathname: '/data', 
                                    state: { pageTransition:'slideUp' }
                                  }}> here</Link>}.</p>}
                              />
                            : <router.component 
                                title={info.title}
                                expressions={expressions}
                                vocabulary={vocabulary}
                                colors={colors}
                                isGameReady={isGameReady} /> }
                      />
                    </Fragment>
                  )}
                  <Route 
                    render={()=>
                      <ErrorPage 
                        header="Sorry... that page doesn't exist."
                        content={<p>Double check the URL or head
                          {<Link to={{ 
                            pathname: '/', 
                            state: { pageTransition:'slideUp' }
                          }}> home</Link>}.</p>}
                      />
                    }
                  />
                </Switch>
              )}
            />
          </section>
        </CSSTransition>
      </TransitionGroup> 
    )
  }
}

export default Routers;
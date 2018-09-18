import React, { Component, Fragment, PureComponent } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, withRouter } from 'react-router-dom';
import SideBar             from './navInfo/SideBar';
import InfoModal           from './navInfo/InfoModal';
import MainPage            from './pages/MainPage';
import GamesPage           from './pages/GamesPage';
import GameScreen          from './pages/gamePages/GameScreen';
import DataEntryPage       from './pages/dataEntry/DataEntryPage';
import TeacherInstructions from './pages/gamePages/TeacherInstructions';
import StudentInstructions from './pages/gamePages/StudentInstructions';
import PageWrapper         from './PageWrapper';
import Switch              from '../helpers/Switch';
import { games }           from '../helpers/data';

class Routers extends Component {
  constructor(props){
    super(props);
    this.state = {
      prevRoute: Object.keys(this.props.location.state),
    }
  }

  // keeps the current and previous routes
  // used to keep track of transitions
  componentDidUpdate(prevProps){
    if(prevProps.location.pathname === this.props.location.pathname) return;
    const { prevRoute } = this.state;
    console.log(...Object.keys(this.props.location.state))
    prevRoute.length < 2
      ? this.setState({ 
          prevRoute: [...prevRoute, ...Object.keys(this.props.location.state)] 
        })
      : this.setState({
          prevRoute: [...prevRoute.slice(1, prevRoute.length), ...Object.keys(this.props.location.state)]
        });
  }

  render(){
    const { 
      isSideBarVisible, 
      vocabularyData, 
      expressionData,
      isDataReady,
      showSideBar,
      hideSideBar,
      onSave,
      onEdit,
      colors,
      location
    } = this.props;    
    const { pathname, state } = location;
    const index = pathname.indexOf('/start'); 
    const showInfoModal = index !== -1;
    // if you click to  screen slides right
    // add that class to the main page
    const exitClass = state && state.slideDown
      ? 'slideDown'
      : state && state.slideLeft
        ? 'slideLeft'
        : state && state.slideRight
          ? 'slideRight'
          : '';
    console.log(exitClass)
    
    return (
      <div>
        <SideBar 
          showSideBar={showSideBar}
          hideSideBar={hideSideBar}
          isSideBarVisible={isSideBarVisible} 
          {...location}
        />
        { 
          showInfoModal
            ? <InfoModal path={pathname.slice(1,index)} />
            : null 
        }
        <TransitionGroup>
          <CSSTransition 
            key={pathname}
            classNames="page"
            onExit={()=>{console.log('heyyy')}}
            // classNames={{
            //   appear: `${exitClass}-appear`,
            //   appearActive: `${exitClass}-active-appear`,
            //   enter: `${exitClass}-enter`,
            //   enterActive: `${exitClass}-active-enter`,
            //   enterDone: `${exitClass}-done-enter`,
            //   exit: `${exitClass}-exit`,
            //   exitActive: `${exitClass}-active-exit`,
            //   exitDone: `sdfsef`,
            //  }}
            timeout={{ enter: 1000, exit: 1000 }}
          >
            <Route 
              location={location}
              render={()=> (
                <Switch>
                  <Route 
                    exact
                    path='/'
                    render={()=> 
                      <PageWrapper>
                        <MainPage showSideBar={showSideBar} />
                      </PageWrapper>
                    }
                  />
                  <Route 
                    exact
                    path='/data' 
                    render={()=> 
                      <PageWrapper>
                        <DataEntryPage 
                          vocabularyData={vocabularyData}
                          expressionData={expressionData}
                          isDataReady={isDataReady}
                          onSave={onSave} 
                          onEdit={onEdit} 
                        />
                      </PageWrapper>
                    }
                  />
                  <Route 
                    exact
                    path='/games'
                    render={()=>
                      <PageWrapper>
                        <GamesPage />
                      </PageWrapper>
                    }
                  />
                  {/* GAME ROUTES */}
                  {games.map(({ router })=>
                    <Fragment key={`${router.path}-routes`}>
                      <Route
                        exact
                        key={router.path}
                        path={router.path}
                        render={({ match })=>
                          <PageWrapper>
                            <GameScreen match={match}/>
                          </PageWrapper>
                        }
                      />
                      <Route
                        exact
                        key={`${router.path}-teacher`}
                        path={`${router.path}/teacher`}
                        render={()=> 
                          <PageWrapper>
                            <TeacherInstructions path={router.path} />
                          </PageWrapper> 
                        }
                      />
                      <Route
                        exact
                        key={`${router.path}-student`}
                        path={`${router.path}/student`}
                        render={()=>
                          <PageWrapper>
                            <StudentInstructions path={router.path} />
                          </PageWrapper>
                        }
                      />
                      <Route
                        exact
                        key={`${router.path}-start}`}
                        path={`${router.path}/start`}
                        render={()=> 
                          <PageWrapper>
                            <router.component 
                              expressionData={expressionData}
                              vocabularyData={vocabularyData}
                              colors={colors} />
                          </PageWrapper>
                        }
                      />
                    </Fragment>
                  )}
                </Switch>
              )}
            />
          </CSSTransition>
        </TransitionGroup> 
      </div>
    )
  }
}

export default withRouter(Routers);
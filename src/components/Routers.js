import React, { PureComponent, Fragment } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route } from 'react-router-dom';
import MainPage            from './pages/MainPage';
import GamesPage           from './pages/GamesPage';
import GameScreen          from './pages/gamePages/GameScreen';
import DataEntryPage       from './pages/dataEntry/DataEntryPage';
import InstructionsPage    from './pages/gamePages/InstructionsPage';
import Switch              from '../helpers/Switch';
import { games }           from '../helpers/data';

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
      vocabularyData, 
      expressionData,
      isDataReady,
      showSideBar,
      onSave,
      onEdit,
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
                    render={()=> <MainPage showSideBar={showSideBar} /> }
                  />
                  <Route 
                    exact
                    path='/data' 
                    render={()=> 
                      <DataEntryPage 
                        vocabularyData={vocabularyData}
                        expressionData={expressionData}
                        isDataReady={isDataReady}
                        onSave={onSave} 
                        onEdit={onEdit} 
                      />
                    }
                  />
                  <Route 
                    exact
                    path='/games'
                    render={()=> <GamesPage /> }
                  />
                  {/* GAME ROUTES */}
                  {games.map(({ router })=>
                    <Fragment key={`${router.path}-routes`}>
                      <Route
                        exact
                        key={router.path}
                        path={router.path}
                        render={({ match })=> <GameScreen path={match.path}/> }
                      />
                      <Route
                        exact
                        key={`${router.path}-teacher`}
                        path={`${router.path}/teacher`}
                        render={()=> <InstructionsPage
                                      forPerson='forTeachers'
                                      direction='right'
                                      transitionClass='slideLeft'
                                      path={router.path} /> }
                      />
                      <Route
                        exact
                        key={`${router.path}-student`}
                        path={`${router.path}/student`}
                        render={()=> <InstructionsPage
                                      forPerson='forStudents'
                                      direction='left'
                                      transitionClass='slideRight'
                                      path={router.path} /> }
                      />
                      <Route
                        exact
                        key={`${router.path}-start}`}
                        path={`${router.path}/start`}
                        render={()=>
                          <router.component 
                            expressionData={expressionData}
                            vocabularyData={vocabularyData}
                            colors={colors} />
                        }
                      />
                    </Fragment>
                  )}
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
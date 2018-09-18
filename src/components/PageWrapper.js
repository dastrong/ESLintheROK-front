import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const PageWrapper = ({ location: {state}, children }) => {
  // const classes = classNames('page')
  // const classes = classNames('page', {
    // 'page--left': state && state.left, 
    // 'page--right': state && state.right, 
    // 'page--down': state && state.down, 
    // 'page-slideLeft': state && state.slideLeft,
    // 'page-slideRight': state && state.slideRight,
  // })
  return (
    <section>
      {children}
    </section>
  );
}

export default withRouter(PageWrapper);
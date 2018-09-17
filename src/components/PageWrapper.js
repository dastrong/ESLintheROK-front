import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const PageWrapper = ({ location: {state}, children }) => {
  const classes = classNames('page', {
    'page--left': state && state.left, 
    'page--right': state && state.right, 
    'page--down': state && state.down, 
  })
  return (
    <section className={classes}>
      {children}
    </section>
  );
}

export default withRouter(PageWrapper);
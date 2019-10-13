import React, { cloneElement } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const childFactoryCreator = props => child => cloneElement(child, props);

export default ({ isBack, location, children }) => {
  // applies the correct transiton classes depending on the users flow
  const cx = isBack
    ? "page page-slideDown"
    : location.state
    ? `page page-${location.state.pageTransition}`
    : "page";

  const transitionVals = { classNames: cx, timeout: 1000 };

  return (
    <TransitionGroup
      component={null}
      // updates exit classes so animations are correct
      childFactory={childFactoryCreator({ ...transitionVals })}
    >
      <CSSTransition key={location.key} {...transitionVals}>
        <section>{children}</section>
      </CSSTransition>
    </TransitionGroup>
  );
};

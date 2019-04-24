import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Routes from "./Routes";

function RoutesAnimater() {
  const [] = useState();

  const childFactoryCreator = props => child => React.cloneElement(child, props);

  const cx =
    history.length === this.state.length && history.action === "POP"
      ? "page page-slideDown"
      : location.state
      ? `page page-${location.state.pageTransition}`
      : "page";

  return (
    <TransitionGroup
      component={null}
      // updates exit classes so animations are correct
      childFactory={childFactoryCreator({
        classNames: `${cx}`,
        timeout: { enter: 1000, exit: 1000 },
      })}
    >
      <CSSTransition
        key={location.pathname}
        classNames={cx}
        timeout={{ enter: 1000, exit: 1000 }}
      >
        <section>
          <Routes />
        </section>
      </CSSTransition>
    </TransitionGroup>
  );
}

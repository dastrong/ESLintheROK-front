import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Menu, Sidebar } from "semantic-ui-react";
import { games } from "../../helpers/data";
import "../../styles/navInfo/SideBar.css";

class SideBar extends Component {
  openAndClose = name => {
    this.props.openDataModal(name);
    this.props.closeSideBar();
  };

  render() {
    const {
      opacity,
      isGameReady,
      showSideBar,
      openSideBar,
      closeSideBar
    } = this.props;
    return (
      <div className="sidebar sidebar-main">
        <Button
          className="sideBarBtn"
          icon="list"
          size="massive"
          onClick={openSideBar}
          style={{ opacity }}
        />
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={closeSideBar}
          vertical
          visible={showSideBar}
          width="wide"
        >
          <Menu.Item className="home-close-btn-group">
            <Button.Group size="massive">
              <Button
                basic
                inverted
                size="massive"
                as={Link}
                to={{
                  pathname: "/",
                  state: { pageTransition: "slideRight" }
                }}
                color="blue"
                icon="home"
                onClick={closeSideBar}
              />
              <Button
                basic
                inverted
                color="red"
                icon="x"
                onClick={closeSideBar}
              />
            </Button.Group>
          </Menu.Item>
          <Menu.Item className="lesson-btns">
            <Button.Group>
              <Button
                basic
                inverted
                onClick={() => this.openAndClose("lessons")}
                color="green"
              >
                <Icon size="big" name="book" />
                Lessons
              </Button>
              <Button
                basic
                inverted
                onClick={() => this.openAndClose("data")}
                color="yellow"
              >
                <Icon size="big" name="cogs" />
                Custom
              </Button>
              <Button
                basic
                inverted
                onClick={() => this.openAndClose("dataEdit")}
                color="orange"
                disabled={!isGameReady}
              >
                <Icon size="big" name="edit" />
                Edit Data
              </Button>
            </Button.Group>
          </Menu.Item>
          {/* creates our menu links, if the game has been marked completed */}
          {games
            .filter(({ info }) => info.completed)
            .map(({ router, info }) => (
              <MenuItem
                key={router.path}
                path={router.path}
                icon={router.icon}
                title={info.title}
                closeSideBar={closeSideBar}
              />
            ))}
        </Sidebar>
      </div>
    );
  }
}

export default SideBar;

const MenuItem = ({ path, icon, title, closeSideBar }) => (
  <Menu.Item
    as={Link}
    onClick={closeSideBar}
    to={{
      pathname: `${path}`,
      state: { pageTransition: "slideLeft" }
    }}
  >
    <Icon name={icon} />
    {title}
  </Menu.Item>
);

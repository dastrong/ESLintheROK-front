import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Menu, Sidebar } from "semantic-ui-react";
import { games } from "../../helpers/data";
import { useStore } from "../../store";
import "../../styles/navInfo/SideBar.css";

export default function SideBar(props) {
	const [{ showSideBar, isGameReady }, dispatch] = useStore();

	function openAndClose(e, { name }) {
		dispatch({ type: "openDataModal", name });
		dispatch({ type: "closeSideBar" });
	}

	const closeSideBar = () => dispatch({ type: "closeSideBar" });

	const { opacity } = props;
	return (
		<div className="sidebar sidebar-main">
			<Button
				className="sideBarBtn"
				icon="list"
				size="massive"
				onClick={() => dispatch({ type: "openSideBar" })}
				style={{ opacity }}
			/>
			<Sidebar
				as={Menu}
				vertical
				inverted
				width="wide"
				icon="labeled"
				animation="overlay"
				visible={showSideBar}
				onHide={closeSideBar}
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
								state: { pageTransition: "slideRight" },
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
							name="lessons"
							onClick={openAndClose}
							color="green"
						>
							<Icon size="big" name="book" />
							Lessons
						</Button>
						<Button
							basic
							inverted
							name="data"
							onClick={openAndClose}
							color="yellow"
						>
							<Icon size="big" name="cogs" />
							Custom
						</Button>
						<Button
							basic
							inverted
							name="dataEdit"
							onClick={openAndClose}
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

const MenuItem = ({ path, icon, title, closeSideBar }) => (
	<Menu.Item
		as={Link}
		onClick={closeSideBar}
		to={{
			pathname: `${path}`,
			state: { pageTransition: "slideLeft" },
		}}
	>
		<Icon name={icon} />
		{title}
	</Menu.Item>
);

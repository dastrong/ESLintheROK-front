import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Image, Label, Card } from "semantic-ui-react";
import PageHeader from "./reusable/PageHeader";
import { games } from "../helpers/data";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Games.css";

export default function GamesPage() {
  useDocumentTitle("Games - ESL in the ROK");

  return (
    <>
      <PageHeader icon="game" text="Select a game for more information" color="blue" />
      <div className="gamesPage-container">
        <Grid>
          <GridItems games={games} />
        </Grid>
      </div>
    </>
  );
}

const GridItems = ({ games }) =>
  games
    .filter(({ info }) => info.completed)
    .map(({ router, info }) => (
      <Card key={router.path}>
        <Card.Content textAlign="center">
          <Label attached="top" color="grey" content={info.dataUsed.join(", ")} />
          <Card.Header content={info.title} />
          <Card.Description content={info.description} />
          <PlayGameButton url={router.path} />
          <Label attached="bottom" color="grey" content={info.skills.join(", ")} />
        </Card.Content>
        <Image
          src={info.images.bottomText}
          label={
            info.attachments && {
              as: "a",
              corner: "right",
              color: "red",
              icon: "download",
              href:
                "https://drive.google.com/drive/folders/1gaVcobvZ3zPp-EsGlfQr9_yQh97k7IQn?usp=sharing",
              target: "_blank",
            }
          }
        />
      </Card>
    ));

const PlayGameButton = ({ url }) => (
  <Button
    as={Link}
    to={{
      pathname: `${url}`,
      state: { pageTransition: "slideUp" },
    }}
    color="green"
    content="View More"
  />
);

import React from "react";
import Error from "../Error";
import TextLink from "@Reusable/TextLink";

export default function GameVerifier({ isGameFound, children }) {
  return !isGameFound ? (
    <Error
      header="Sorry, game not found."
      content={
        <p>
          Go back to the <TextLink path="games" text=" games screen" />.
        </p>
      }
    />
  ) : (
    children
  );
}

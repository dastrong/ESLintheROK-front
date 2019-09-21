import React from "react";
import TextLink from "./TextLink";
import Error from "../routes/Error";

export default ({ isGameFound, children }) => (
  <>
    {!isGameFound ? (
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
    )}
  </>
);

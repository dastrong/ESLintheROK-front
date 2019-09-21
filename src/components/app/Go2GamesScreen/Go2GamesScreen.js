import React, { useState, useEffect, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import { Modal, Button } from "semantic-ui-react";
import { useStore } from "store";
import useFirstRun from "hooks/useFirstRun";

function Go2GamesScreen({ location }) {
  const { pathname } = location;
  const isFirstRun = useFirstRun();

  const [open, setOpen] = useState(false);
  const [canStayHere, setCanStayHere] = useState(false);
  const [{ vocabulary, expressions }, dispatch] = useStore();

  useEffect(() => {
    if (isFirstRun) return;
    // don't open modal if we're already
    if (pathname === "/games") return;
    // determine if we give the user the option to stay on this page
    const canStayHere = !(pathname === "/lessons" || pathname === "/data");
    setCanStayHere(canStayHere);
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vocabulary, expressions]);

  const _closeModal = useCallback(() => {
    setOpen(false);
    dispatch({ type: "closeDataModal" });
  }, [dispatch]);

  return (
    <Modal open={open} size="tiny">
      <Modal.Header>Success! Data set and saved to your browser.</Modal.Header>
      <Modal.Content>Do you want to go to the games page now?</Modal.Content>
      <Modal.Actions>
        <Button
          disabled={!canStayHere}
          onClick={_closeModal}
          content="Nope, stay here."
        />
        <Button
          positive
          as={Link}
          to={{ pathname: "/games", state: { pageTransition: "slideUp" } }}
          onClick={_closeModal}
          content="Yup, take me there."
        />
      </Modal.Actions>
    </Modal>
  );
}

export default withRouter(Go2GamesScreen);

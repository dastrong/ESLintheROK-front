import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, Image } from "semantic-ui-react";
import useFirstRun from "../../hooks/useFirstRun";
import "./GifModal.css";

export default function GifModal({ handleReset, open }) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const isFirstRun = useFirstRun();

  const _closer = useCallback(() => {
    setIsOpen(false);
    handleReset();
  }, [setIsOpen, handleReset]);

  // delay opening the modal to allow confetti to drop
  // closes instantly though
  useEffect(() => {
    if (isFirstRun) return;
    if (!open) return _closer();
    const id = setTimeout(() => setIsOpen(true), 2500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // fetches a random url when parent component open prop changes
  useEffect(() => {
    if (!open) return;

    async function fetchGIF() {
      const searchTerm = "fail, funny";
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${
        process.env.REACT_APP_GIPHY_KEY
      }&tag=${searchTerm}&rating=G`;
      const resp = await fetch(url);
      const gif = await resp.json();
      const gifURL = gif.data.images.original.url;
      setURL(gifURL);
    }

    fetchGIF();
  }, [open, setURL]);

  return (
    <Modal basic open={isOpen} onClose={_closer} className="gif-modal">
      <Modal.Actions>
        <Button
          positive
          icon="angle right"
          labelPosition="right"
          content="Play Again?"
          onClick={_closer}
        />
      </Modal.Actions>
      <Modal.Content scrolling={false} image>
        <Image
          src={url}
          alt="Loading... unless your area has blocked GIPHY.com"
          size="huge"
          centered={true}
          verticalAlign="middle"
        />
      </Modal.Content>
    </Modal>
  );
}

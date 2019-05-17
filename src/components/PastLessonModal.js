import React from "react";
import { Modal } from "semantic-ui-react";
import { useStore } from "../store";

export default function PassLessonModal() {
  const [{ showPastLessons }, storePatch] = useStore();

  return (
    <Modal
      closeIcon
      open={showPastLessons}
      onClose={() => storePatch({ type: "closePastLessons" })}
    >
      <div>
        <p>Past</p>
        <p>Lessons</p>
        <p>Modal</p>
      </div>
    </Modal>
  );
}

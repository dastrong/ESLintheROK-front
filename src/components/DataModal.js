import React from "react";
import { Modal } from "semantic-ui-react";
import Lessons from "./ChooseLesson";
import Data from "./Data";
import { useStore } from "../store";

export default function DataModal() {
  const [{ showDataModal, dataModalName }, dispatch] = useStore();
  console.log(dataModalName);
  return (
    <Modal
      basic
      size="large"
      className="data-modal"
      open={showDataModal}
      onClose={() => dispatch({ type: "closeDataModal" })}
    >
      <Modal.Content>
        <div className="page-container-inner">
          {dataModalName === "lessons" ? <Lessons /> : <Data />}
        </div>
      </Modal.Content>
    </Modal>
  );
}

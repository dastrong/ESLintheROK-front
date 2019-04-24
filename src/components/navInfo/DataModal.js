import React from "react";
import { Modal } from "semantic-ui-react";
import LessonsHolder from "../pages/Lessons/LessonsHolder";
import DataHolder from "../pages/Data/DataHolder";
import { useStore } from "../../store";

export default function DataModal() {
  const [{ showDataModal, dataModalType }, dispatch] = useStore();

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
          {dataModalType === "lessons" ? (
            <LessonsHolder fromDataModal={true} />
          ) : (
            <DataHolder fromDataModal={true} />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
}

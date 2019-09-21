import React from "react";
import { Modal } from "semantic-ui-react";
import Data from "@Data";
import Lessons from "@Lessons";
import { useStore } from "store";

export default function DataModal() {
  const [store, dispatch] = useStore();
  const { showDataModal, dataModalName, vocabulary, expressions } = store;
  const data = { vocabulary, expressions };
  const daPrp = dataModalName === "dataEdit" ? data : { vocabulary: [], expressions: [] };

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
          {dataModalName === "lessons" ? <Lessons /> : <Data data={daPrp} />}
        </div>
      </Modal.Content>
    </Modal>
  );
}

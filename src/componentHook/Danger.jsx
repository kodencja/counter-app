import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function areEqual(prevProps, nextProps) {
  return prevProps.onModalIsOpen === nextProps.onModalIsOpen;
}

function Danger(props) {
  const { onHandleModalDelete, onSetModalIsOpen, onModalIsOpen } = props;

  console.log("Danger Fn");

  return (
    <Modal
      className="dialog-box border border-warning text-center py-4 px-5"
      isOpen={onModalIsOpen}
      onRequestClose={() => onSetModalIsOpen(false)}
      shouldCloseOnOverlayClick={false}
      style={{
        overlay: { backgroundColor: "rgba(169, 169, 180, 0.733)" },
        content: {
          color: "crimson",
          backgroundColor: "whitesmoke",
          padding: "30px",
        },
      }}
    >
      <div className="btn-close2">
        <button
          className="btn btn-sm btn-basic btn-alert close-btn border-dark font-weight-bold"
          onClick={() => onSetModalIsOpen(false)}
        >
          X
        </button>
      </div>

      <p className="bg-warning mb-3 p-1 h5">Danger Zone!</p>
      <p className="mb-4 confirm-age h6">Confirm deleting the product!</p>
      <h5 className="dialog-question text-center mx-auto">
        Are you sure you want to delete the product from the list?
      </h5>
      <button
        className="btn btn-danger btn-alert mr-5 mt-3"
        id="yes"
        onClick={onHandleModalDelete}
      >
        YES
      </button>
      <button
        className="btn btn-primary btn-alert mt-3"
        id="no"
        onClick={onHandleModalDelete}
      >
        NO
      </button>
    </Modal>
  );
}

export default React.memo(Danger, areEqual);
